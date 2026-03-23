import { readFileSync, writeFileSync } from "fs";
import { parseArgs } from "util";

const { values: args, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    "last-entry": { type: "string" },
  },
  allowPositionals: true,
});

const input = positionals[0];
const output = positionals[1];

if (!input || !output) {
  console.error("Usage: bun extract-journal.ts [--last-entry 'Month D, YYYY'] <input> <output>");
  process.exit(1);
}

const lastEntry = args["last-entry"] ?? null;

const text = readFileSync(input, "utf8");
const lines = text.split("\n");

const dateHeader = /^[A-Z][a-z]+ \d+, \d{4}$/;
const timeHeader = /^\d{1,2}:\d{2} (AM|PM)$/;
const entryEnd = /^\./;

const entries: string[] = [];
let inEntry = false;
let current: string[] = [];
let expectTime = false;
let isLastEntry = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (!inEntry && dateHeader.test(line)) {
    isLastEntry = lastEntry !== null && line === lastEntry;
    inEntry = true;
    current = [line];
    expectTime = true;
    continue;
  }

  if (expectTime) {
    expectTime = false;
    if (timeHeader.test(line)) {
      current.push(line);
    } else {
      // No time line — treat current line as body
      current.push(line);
    }
    continue;
  }

  if (inEntry) {
    if (entryEnd.test(line)) {
      entries.push(current.join("\n").trimEnd());
      current = [];
      inEntry = false;
      if (isLastEntry) break;
    } else {
      current.push(line);
    }
  }
}

// Capture any trailing entry without a terminator
if (inEntry && current.length > 1) {
  entries.push(current.join("\n").trimEnd());
}

const result = entries.join("\n\n---\n\n");
writeFileSync(output, result);
console.log(`Extracted ${entries.length} entries → ${output}`);
