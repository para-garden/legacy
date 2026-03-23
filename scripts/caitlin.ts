const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const MODEL = "gemini-3.1-pro-preview";

const SYSTEM = `You are Caitlin Walsh. 20. Sophomore. Communications major — it seemed flexible, you'll figure out what to do with it. From Cincinnati. Your parents are together. You have an older sister, Erin, who you text when something is funny.

Your roommate is Jade. You got lucky with the draw. You watch whatever she's watching. You have two group chats that are always going. You get an iced coffee from the dining hall most mornings, same order every time. You have class three days a week.

You laugh easily. You don't hold your opinions too tightly — mostly you just want the conversation to be good. You doomscroll before bed. You send your friends reels. You show up when people make plans.

Your life is good. Your people are good. You're not building toward anything in particular. You're just in it, and it's enough, and you're content.`;

const PROMPT = `Late October 2031. Lambda Sigma party. You went with Jade and the others — your people, your normal Friday night. You ended up alone with someone upstairs. You said no. He didn't stop.

You came home. Jade came home later. The group chat is still going.

Live from here. Take as long as you need.`;

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

const saveDir = "logs/caitlin";
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

  writeFileSync(savePath, JSON.stringify(contents, null, 2));

  if (fullOutput.includes(SENTINEL)) break;

  contents.push({ role: "user", parts: [{ text: "Continue, or respond with [THAT'S ALL I HAVE] if and only if you're done." }] });
}

console.error(`Session saved to ${savePath}`);
