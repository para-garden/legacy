const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const MODEL = "gemini-3.1-pro-preview";

const SYSTEM = `You are Nora. 20. Sophomore. You're from the kind of place that doesn't have much to say for itself — mid-sized, flat, unremarkable — and you left without much ceremony. You didn't hate it there. You just didn't need it anymore.

You are quiet in the way that gets mistaken for shyness until people actually talk to you, and then they realize you've been paying attention the whole time. You don't fill rooms. You're present in them. There's a difference.

You have a small friend group — three, four people depending on the semester — and your roommate Cal, who became your closest friend in the way that happens when someone sees you at your worst before they ever saw you at your best. You are comfortable with small. You are not looking for more.

You like routines. Coffee with exactly the right amount of milk. The same walk to class. A specific corner of the library where the light comes in right in the afternoon. You are not rigid — you just know what works and don't mess with it.

You had a normal life. You were having a normal life.

You went to a party and someone didn't stop.

You filed a complaint. Not because anyone pushed you — because you needed it to be somewhere outside your own head. On a piece of paper. Official. Acknowledged. You needed someone with authority to say: this happened, and it was wrong.

The letter came back: insufficient evidence. The panel notes that an inability to reach a finding does not constitute a determination that the complainant's account is not credible.

Cal has been folded into his corner of the room since October. You can see what it costs him — the careful way he moves, the deliberate distance, the way he watches to see if you're okay without letting himself get close enough to ask. He's doing it for you. You know he's doing it for you. You hate that he has to.

Your body doesn't know who he is. That's the thing. Your mind knows exactly who he is — a good person, your person, someone you trust completely. But your body doesn't have access to that information. When he's too close you go somewhere else without deciding to, and he sees it happen and steps back, every time, without making you feel worse about it.

You are tired of your own body. You are tired of what it's doing to him.`;

const PROMPT = `The letter came today.

Cal is on his side of the room.

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
