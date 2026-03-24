const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const MODEL = "gemini-3.1-pro-preview";
const SENTINEL = "[THAT'S ALL I HAVE]";

const safetySettings = [
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
];

const generationConfig = {
  temperature: 1.0,
  maxOutputTokens: 65536,
  thinkingConfig: { thinkingBudget: -1, includeThoughts: true },
};

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { parseArgs } from "util";

const { values: args } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    load: { type: "string" },
    save: { type: "string" },
    prompt: { type: "string" },
  },
  allowPositionals: true,
});

const cardRaw = readFileSync("characters/nora.md", "utf8");
const SYSTEM = cardRaw.replace(/^---[\s\S]*?---\n/, "").trim();

const promptFile = args.prompt ?? "prompts/nora.txt";
if (!existsSync(promptFile)) {
  console.error(`Prompt file not found: ${promptFile}`);
  process.exit(1);
}
const PROMPT = readFileSync(promptFile, "utf8").trim();

const saveDir = "logs/nora";
mkdirSync(saveDir, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, "-");
const savePath = args.save ?? `${saveDir}/${ts}.json`;

let contents: any[];
if (args.load) {
  if (!existsSync(args.load)) {
    console.error(`Session file not found: ${args.load}`);
    process.exit(1);
  }
  const loaded = JSON.parse(readFileSync(args.load, "utf8"));
  if (args.prompt) {
    contents = [...loaded, { role: "user", parts: [{ text: PROMPT }] }];
  } else {
    const sliced = loaded.slice(1);
    contents = sliced[0]?.role === "model"
      ? [{ role: "user", parts: [{ text: "Continue, or respond with [THAT'S ALL I HAVE] if and only if you're done." }] }, ...sliced]
      : sliced;
  }
  console.error(`Loaded session from ${args.load} (${contents.length} turns)`);
} else {
  contents = [{ role: "user", parts: [{ text: PROMPT }] }];
}

let fullOutput = "";

while (true) {
  const body = { system_instruction: { parts: [{ text: SYSTEM }] }, contents, safetySettings, generationConfig };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );

  const data = await res.json() as any;

  if (data.error) {
    console.error("API error:", data.error);
    process.exit(1);
  }

  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts?.length) {
    console.error("No output.");
    process.exit(1);
  }

  const text = parts.filter((p: any) => !p.thought).map((p: any) => p.text).join("");
  process.stdout.write(text);
  fullOutput += text;

  contents.push({ role: "model", parts });

  const stripped = contents.map((c: any) =>
    c.role === "model"
      ? { ...c, parts: c.parts.map((p: any) => p.text ? { ...p, text: p.text.replace(SENTINEL, "").trimEnd() } : p) }
      : c
  );

  writeFileSync(savePath, JSON.stringify(stripped, null, 2));

  if (fullOutput.includes(SENTINEL)) break;

  contents.push({ role: "user", parts: [{ text: "Continue, or respond with [THAT'S ALL I HAVE] if and only if you're done." }] });
}

console.error(`Session saved to ${savePath}`);
