/**
 * Headless page-overflow checker.
 *
 * `format: document` content renders `.page` divs styled as a fixed 8.5x11
 * paper page (scaled to fit the panel, never resized) with `overflow: hidden`
 * — content that doesn't fit is silently clipped. This script walks every
 * `format: document` node, opens
 * it in a real browser via the dev server, and measures each `.page` div's
 * scrollHeight against its clientHeight to catch clipped content.
 *
 * Run standalone: bun run src/check-pages.ts
 * Or: bun run check:pages
 *
 * Pass --screenshots to also save a per-page PNG of every `.page` div to
 * check-pages-output/ in the project root, with the clipping temporarily
 * disabled so the image shows the full content even where it overflows.
 */
import { mkdir, readFile } from "fs/promises";
import { join } from "path";
import { chromium, type Browser, type ElementHandle, type Page } from "@playwright/test";
import { findMarkdownFiles, CONTENT_DIR } from "./content";
import { parseFrontmatterLenient } from "./frontmatter";
import { siteConfig } from "./site-config";

const READY_TIMEOUT_MS = 30_000;
const PANEL_TIMEOUT_MS = 15_000;
const LISTEN_LINE_RE = /listening on http:\/\/localhost:(\d+)/;
/** Fingerprint unique to this app's index.html — distinguishes "this dev
 * server is up" from "something is answering on this port." */
const APP_FINGERPRINT = 'aria-roledescription="spatial graph"';

const UNDERFULL_RATIO = 0.4;

/** --screenshots: save a per-page screenshot (with overflow clipping
 * temporarily disabled) alongside the usual measurement pass. */
const SCREENSHOTS_ENABLED = process.argv.includes("--screenshots");
const SCREENSHOT_DIR = join(import.meta.dir, "../check-pages-output");

interface PageMeasurement {
  pageIndex: number;
  scrollHeight: number;
  clientHeight: number;
  status: "overflow" | "underfull" | "ok";
}

interface Overflow {
  nodeId: string;
  pageIndex: number;
  scrollHeight: number;
  clientHeight: number;
  overflowPx: number;
  screenshotPath?: string;
}

/** Find every `format: document` node id under public/content. */
async function findDocumentNodeIds(): Promise<string[]> {
  const files = await findMarkdownFiles(CONTENT_DIR);
  const ids: string[] = [];

  for (const file of files) {
    const src = await readFile(file.path, "utf-8");
    const fm = parseFrontmatterLenient(src);
    if (fm?.format === "document") {
      ids.push(file.id);
    }
  }

  return ids;
}

/**
 * Read the spawned dev server's stdout until it prints its "listening on"
 * line, and return the port it actually bound. We start it with PORT=0 so
 * Bun picks any free port — this avoids colliding with a `bun run dev`
 * the user may already have running on 3000.
 */
async function readAssignedPort(stdout: ReadableStream<Uint8Array>, timeoutMs: number): Promise<number> {
  const reader = stdout.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const deadline = Date.now() + timeoutMs;

  try {
    while (Date.now() < deadline) {
      const remaining = deadline - Date.now();
      const { value, done } = await Promise.race([
        reader.read(),
        new Promise<{ value: undefined; done: true }>((resolve) =>
          setTimeout(() => resolve({ value: undefined, done: true }), remaining),
        ),
      ]);
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const match = LISTEN_LINE_RE.exec(buffer);
      if (match?.[1]) return Number(match[1]);
    }
  } finally {
    reader.releaseLock();
  }

  throw new Error(`Dev server did not report a listening port within ${timeoutMs}ms`);
}

/** Wait for the dev server to respond on devUrl, and confirm it's actually this app. */
async function waitForServer(devUrl: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(devUrl);
      if (res.ok) {
        const body = await res.text();
        if (body.includes(APP_FINGERPRINT)) return;
        throw new Error(
          `Something is responding on ${devUrl}, but it isn't this app (missing "${APP_FINGERPRINT}"). ` +
            `Is another server already bound to that port?`,
        );
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("isn't this app")) throw err;
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Dev server did not become ready within ${timeoutMs}ms`);
}

/** Filesystem-safe stem for a node id: `world/factions/foo` -> `world-factions-foo`. */
function screenshotStem(nodeId: string): string {
  return nodeId.replace(/\//g, "-");
}

/**
 * Screenshot a single `.page` element with its overflow clipping disabled,
 * so the image shows the full content even where it would normally be cut
 * off. `.page` has a CSS-fixed height (8.5x11 paper), so `overflow: hidden`
 * alone doesn't change the element's own box — clipped content renders past
 * the box's bottom edge, outside the screenshot's crop region. To actually
 * capture it, we also stretch the element's height to its scrollHeight for
 * the duration of the screenshot, then restore both properties.
 */
async function captureUnclippedScreenshot(el: ElementHandle<SVGElement | HTMLElement>, filePath: string): Promise<void> {
  await el.evaluate((node) => {
    const style = (node as HTMLElement).style;
    style.setProperty("overflow", "visible");
    style.setProperty("height", `${(node as HTMLElement).scrollHeight}px`);
  });
  try {
    await el.screenshot({ path: filePath });
  } finally {
    await el.evaluate((node) => {
      const style = (node as HTMLElement).style;
      style.removeProperty("overflow");
      style.removeProperty("height");
    });
  }
}

async function checkNode(browser: Browser, devUrl: string, nodeId: string): Promise<{ overflows: Overflow[]; failed: boolean }> {
  let page: Page | undefined;
  const overflows: Overflow[] = [];
  let failed = false;

  try {
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

    // Unlock all content-gated nodes so gated documents can be checked too.
    // Content gate keys are read from site-config rather than hardcoded, so
    // new gates are picked up automatically.
    await page.addInitScript((gateKeys: string[]) => {
      for (const key of gateKeys) {
        localStorage.setItem(`legacy:${key}`, "1");
      }
    }, Object.keys(siteConfig.contentGates));

    await page.goto(`${devUrl}/?focus=${encodeURIComponent(nodeId)}`, {
      waitUntil: "domcontentloaded",
    });

    // Wait for panel content to load
    await page.waitForSelector("#panel-body", { timeout: PANEL_TIMEOUT_MS });

    // Check if .page elements exist
    const pageElements = await page.$$(".page");
    if (pageElements.length === 0) {
      console.error(`  ! ${nodeId}: no .page divs found (format: document requires page wrappers)`);
      failed = true;
      return { overflows, failed };
    }

    const measurements = await page.$$eval(".page", (pages) =>
      pages.map((el) => ({
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      })),
    );

    const screenshotPaths: string[] = [];
    if (SCREENSHOTS_ENABLED) {
      const stem = screenshotStem(nodeId);
      for (let i = 0; i < pageElements.length; i++) {
        const el = pageElements[i];
        if (!el) continue;
        const filename = `${stem}-page-${i}.png`;
        const filePath = join(SCREENSHOT_DIR, filename);
        await captureUnclippedScreenshot(el, filePath);
        screenshotPaths[i] = filename;
      }
    }

    measurements.forEach((m, i) => {
      if (m.scrollHeight > m.clientHeight) {
        overflows.push({
          nodeId,
          pageIndex: i,
          scrollHeight: m.scrollHeight,
          clientHeight: m.clientHeight,
          overflowPx: m.scrollHeight - m.clientHeight,
          screenshotPath: screenshotPaths[i],
        });
      }
    });
  } catch (err) {
    console.error(`  ! ${nodeId}: failed to check (${(err as Error).message})`);
    failed = true;
  } finally {
    await page?.close();
  }

  return { overflows, failed };
}

async function main(): Promise<void> {
  const nodeIds = await findDocumentNodeIds();

  if (nodeIds.length === 0) {
    console.log("No format: document files found. Nothing to check.");
    process.exit(0);
  }

  console.log(`Found ${nodeIds.length} format: document file(s).`);

  if (SCREENSHOTS_ENABLED) {
    await mkdir(SCREENSHOT_DIR, { recursive: true });
    console.log(`Screenshots enabled. Saving to ${SCREENSHOT_DIR}`);
  }

  console.log("Starting dev server on a free port...");

  // PORT=0 asks Bun for any free port, so this doesn't collide with a
  // `bun run dev` the user may already have running on 3000.
  const devServer = Bun.spawn(["bun", "run", "src/dev.ts"], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: "0" },
  });

  let browser: Browser | undefined;

  try {
    const port = await readAssignedPort(devServer.stdout, READY_TIMEOUT_MS);
    const devUrl = `http://localhost:${port}`;
    console.log(`Dev server bound to ${devUrl}. Waiting for it to be ready...`);

    await waitForServer(devUrl, READY_TIMEOUT_MS);
    console.log("Dev server ready. Launching browser...");

    browser = await chromium.launch();

    const allOverflows: Overflow[] = [];
    const failedNodeIds: string[] = [];

    for (const nodeId of nodeIds) {
      console.log(`Checking ${nodeId}...`);
      const { overflows, failed } = await checkNode(browser, devUrl, nodeId);
      allOverflows.push(...overflows);
      if (failed) failedNodeIds.push(nodeId);
    }

    console.log("\n--- Results ---");

    if (allOverflows.length === 0) {
      console.log(`All ${nodeIds.length - failedNodeIds.length} checked document(s) clean. No overflow found.`);
    } else {
      console.log(`Found ${allOverflows.length} overflowing page(s):\n`);
      for (const o of allOverflows) {
        console.log(
          `  ${o.nodeId} — page ${o.pageIndex}: overflow by ${o.overflowPx}px ` +
            `(scrollHeight ${o.scrollHeight} > clientHeight ${o.clientHeight})`,
        );
        if (o.screenshotPath) {
          console.log(`    screenshot: ${o.screenshotPath}`);
        }
      }
    }

    if (failedNodeIds.length > 0) {
      console.log(`\n${failedNodeIds.length} check(s) failed to run (see errors above):`);
      for (const id of failedNodeIds) console.log(`  ${id}`);
    }

    process.exit(allOverflows.length > 0 || failedNodeIds.length > 0 ? 1 : 0);
  } finally {
    await browser?.close();
    devServer.kill();
    await devServer.exited;
  }
}

await main();
