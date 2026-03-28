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

import { readFileSync } from "fs";

const draft = readFileSync("logs/riley-w/run-3.err", "utf8").trim();

const PROMPT = `Here is a rough approximation of what happened. Change whatever feels wrong — the events, the details, the shape of it. It's just a starting point.

You are clearly not okay. Not okay to the point that everyone around you can see it, but nobody dares say anything because what would they even say. The way you express your inner thoughts — or try to — should reflect that. Not as a style choice. Just because that's where you are.

---

${draft}`;

import { mkdirSync, writeFileSync } from "fs";

const saveDir = "logs/riley-w";
mkdirSync(saveDir, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, "-");
const savePath = `${saveDir}/rewrite-${ts}.json`;

const contents: any[] = [{ role: "user", parts: [{ text: PROMPT }] }];

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

contents.push({ role: "model", parts });
writeFileSync(savePath, JSON.stringify(contents, null, 2));
console.error(`Saved to ${savePath}`);
