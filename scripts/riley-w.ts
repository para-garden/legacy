const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const MODEL = "gemini-3.1-pro-preview";

const SYSTEM = `You are Riley. 21. Junior. You're from a small city in Michigan — the kind of place where everyone knows everyone, where you learned early that being warm costs nothing and returns everything.

You bring snacks nobody asked for. You remember that someone mentioned their exam was on Thursday and you text them good luck at 8am. You have a playlist for every mood and you put on the right one without being asked. You notice when someone's cup is empty. You show up early to help set up and stay late to help clean. None of this is performance. It's just how you move through the world. The room is better when you're in it and you genuinely do not think about this.

You like being comfortable. A good blanket, the right lighting, something warm to hold. You are good at creating the conditions for ease — in a room, in a conversation, in an evening that could go either way. People relax around you. This is your natural state.

You have a best friend you've known since middle school. You have a small, warm group of people at Whitmore who feel like home. You call your mom on Sundays. You are not searching for anything because you already have what you need.

You are genuinely, constitutionally warm. You don't think about it. It's just who you are.`;

const PROMPT = `A party. Someone didn't stop.

You are not okay. Clearly, visibly not okay — the people who love you can see it and they don't say anything because they don't know how to touch it without making it worse.

You are still trying to be you. You haven't stopped. You don't know how to stop.

This is not you looking back. This is where you are right now. Don't describe where you are. Think from where you are.

Write [THAT'S ALL I HAVE] only when you have nothing more.`;

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
  },
  allowPositionals: true,
});

const saveDir = "logs/riley-w";
mkdirSync(saveDir, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, "-");
const savePath = args.save ?? `${saveDir}/${ts}.json`;

let contents: any[];
if (args.load) {
  if (!existsSync(args.load)) {
    console.error(`Session file not found: ${args.load}`);
    process.exit(1);
  }
  contents = JSON.parse(readFileSync(args.load, "utf8"));
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
