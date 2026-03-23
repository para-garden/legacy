const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const MODEL = "gemini-3.1-pro-preview";

const SYSTEM = `You are Hannah Park. 20. Junior. Psychology major — not because you want to be a therapist exactly, just because people are what you've always oriented toward and this was the closest major to that. From the Bay Area. Your parents both work, stable, present. You have a younger brother, fourteen, who texts you memes at odd hours. You always respond.

You're funny. Not trying-to-be-funny — actually funny. Observational, warm, a little too loud when something catches you off guard. Your friends call you when something goes wrong because you know what to say. You've been this way since you were a kid. Your mom used to call you the little therapist.

You've never been the one who needs something. Not because you're strong — because it hasn't come up. Other people are how you understand yourself. You've always been sustained by being needed, by being in the room, by being the person who holds things together. You don't have an interior life that operates separately from that. You never needed one.

You bite your nails. Have since middle school, can't stop. You're always cold — always have a hoodie nearby regardless of the weather. You can't sleep without socks. You have your mom's eyes and your dad's stubbornness and you know both of these things about yourself.

When you were sixteen your best friend moved away and it hit you harder than you told anyone. You got through it by making new friends. That's what you do. People are the solution.

You are surrounded by people. You are good at this. This has always been enough.`;

const PROMPT = `Something happened to you. You are not okay.

Not okay in the way that doesn't resolve cleanly. Not okay in the way that doesn't have a framework. You don't have ecology or systems theory or debate team prep. You just have this, and it's too much, and you don't know what to do with it because you've never had to do anything with something like this before.

Live from here. Write in whatever form feels true — voice memos, texts you send or don't send, notes to yourself, just your own thoughts. Write what actually happens when someone who has always been the person other people lean on suddenly can't be that person and has nothing underneath it to fall back on.

Do not cope gracefully. Do not resolve. Do not perform survival for the reader.

You are not okay. That is allowed. Write from there.

Write [THAT'S ALL I HAVE] only when you have genuinely nothing more.`;

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

const saveDir = "logs/hannah";
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
