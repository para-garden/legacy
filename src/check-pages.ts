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
 */
import { readFile } from "fs/promises";
import { chromium, type Browser, type Page } from "@playwright/test";
import { findMarkdownFiles, CONTENT_DIR } from "./content";
import { parseFrontmatterLenient } from "./frontmatter";

const READY_TIMEOUT_MS = 30_000;
const PANEL_TIMEOUT_MS = 15_000;
const LISTEN_LINE_RE = /listening on http:\/\/localhost:(\d+)/;
/** Fingerprint unique to this app's index.html — distinguishes "this dev
 * server is up" from "something is answering on this port." */
const APP_FINGERPRINT = 'aria-roledescription="spatial graph"';

interface Overflow {
  nodeId: string;
  pageIndex: number;
  scrollHeight: number;
  clientHeight: number;
  overflowPx: number;
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

async function checkNode(browser: Browser, devUrl: string, nodeId: string): Promise<{ overflows: Overflow[]; failed: boolean }> {
  let page: Page | undefined;
  const overflows: Overflow[] = [];
  let failed = false;

  try {
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

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

    measurements.forEach((m, i) => {
      if (m.scrollHeight > m.clientHeight) {
        overflows.push({
          nodeId,
          pageIndex: i,
          scrollHeight: m.scrollHeight,
          clientHeight: m.clientHeight,
          overflowPx: m.scrollHeight - m.clientHeight,
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
