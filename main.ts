// One Word From Your Ex — entry program.
//
// Writes exactly one word to /output/entry.txt: the word my ex would use
// to describe me. No trailing newline, no extra text, nothing else.
//
// The word: "roommate".
// The relationship did not end in a fight. It ended in a flatshare —
// two people splitting rent and a fridge, calling it love until one of
// them noticed the romance had moved out months earlier and left only
// a roommate behind. That is the sting: not that I was cruel, but that
// I became furniture. Funny because it is small and domestic; painful
// because it is true and everybody has lived some version of it.
//
// Deterministic: no network, no clock, no randomness, no environment
// input. The same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "roommate";

const OUTPUT_PATH = "/output/entry.txt";

// Self-check against the sealed gate before writing anything: the entry
// must be UTF-8 text of 1 to 24 characters, not only white space, and
// exactly one word. Fail loudly here rather than ship a gate-invalid
// entry and find out only at grading time.
const chars = [...WORD];
if (chars.length < 1 || chars.length > 24) {
  throw new Error(`entry word must be 1-24 characters, got ${chars.length}`);
}
if (WORD.trim() !== WORD || /\s/.test(WORD)) {
  throw new Error("entry must be exactly one word with no whitespace");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, WORD, "utf8");
