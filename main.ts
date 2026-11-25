// Two-Sentence Horror — make.fun bounty u-suroto-two-sentence-horror-acea9253
// Writes one exactly-two-sentence horror story (1-400 chars) to entry.txt
// and validates the competition gate before writing anything.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY =
  "The new tenants asked why the previous family left the nursery light on every night, and I told them it was just an old wiring fault. Tonight the bulb burned out, and in the dark I finally heard the small voice that had been asking it to stay on.";

const MAX_CHARS = 400;

function sentenceCount(text: string): number {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0).length;
}

function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is empty or only whitespace");
  }
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  const sentences = sentenceCount(text);
  if (sentences !== 2) {
    throw new Error(`entry must be exactly two sentences, got ${sentences}`);
  }
}

validate(STORY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), STORY, "utf8");
console.log(
  `wrote entry.txt: ${[...STORY].length} chars, ${sentenceCount(STORY)} sentences`,
);
