#!/usr/bin/env node
/**
 * Compares the describe/context/specify/it outline of a new test file with the same test file in
 * a sibling package, so new packages keep the test cases reviewers expect.
 */
import { readFileSync, existsSync } from 'node:fs';

import { parseCli } from './lib/cli.mjs';

const USAGE = `
Usage:
  node check-test-parity.mjs <new-test-file> <sibling-test-file> [--mask word1,word2,...]

  --mask      spec words to neutralize in titles, for both files (e.g. asyncapi,a2a). Matched
              as whole words, case-insensitively: --mask agent masks "agent" and "Agent" but
              leaves "agentcard" alone. Version numbers (3.0.0, 3_1, json3) are always
              neutralized.
  -h, --help  show this help

Modifiers such as describe.skip, it.only, context.skip, xit, xdescribe are recognized; the
case still counts for parity, and skipped/focused cases are listed as SKIPPED/ONLY.

Output:
  MISSING  case present in the sibling, absent in the new file (add it or justify it)
  EXTRA    case only in the new file (informational)
  SKIPPED  case in the new file disabled with .skip / xit / xdescribe (informational)
  ONLY     case in the new file focused with .only: remove it, it disables the other tests

Exit codes: 0 no MISSING and no ONLY, 1 MISSING or ONLY found, 2 usage error.
`;

const { values, positionals } = parseCli(USAGE, {
  allowPositionals: true,
  options: { mask: { type: 'string', default: '' } },
  validate: ({ positionals: files }) => {
    if (files.length !== 2) return 'two test files required';
    const absent = files.find((file) => !existsSync(file));
    return absent ? `${absent} not found` : undefined;
  },
});
const [newFile, siblingFile] = positionals;
const masks = values.mask
  .split(',')
  .map((word) => word.trim())
  .filter(Boolean)
  .sort((a, b) => b.length - a.length);

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const normalize = (title) => {
  let result = title.toLowerCase();
  for (const word of masks)
    result = result.replace(
      // whole word: not inside a longer alphabetic word (digits may follow: asyncapi3)
      new RegExp(`(?<!\\p{L})${escape(word.toLowerCase())}(?!\\p{L})`, 'gu'),
      '<spec>',
    );
  return result
    .replace(/\d+(?:[._-]\d+)*/g, '<v>')
    .replace(/\s+/g, ' ')
    .trim();
};

const CALL_RE =
  /^([ \t]*)(x?(?:describe|context|specify|it))(?:\.(skip|only))?\(\s*(['"`])((?:\\.|(?!\4)[\s\S])*?)\4/gm;
const outline = (file) => {
  const text = readFileSync(file, 'utf8');
  const stack = [];
  const cases = [];
  const skipped = [];
  const only = [];
  for (const match of text.matchAll(CALL_RE)) {
    const [, rawIndent, call, modifier, , rawTitle] = match;
    const indent = rawIndent.replace(/\t/g, '  ').length;
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) stack.pop();
    const title = normalize(rawTitle);
    const path = [...stack.map((entry) => entry.title), title].join(' > ');
    const line = text.slice(0, match.index).split('\n').length;
    cases.push(path);
    if (modifier === 'skip' || call.startsWith('x')) skipped.push(`${path}  (${file}:${line})`);
    if (modifier === 'only') only.push(`${path}  (${file}:${line})`);
    stack.push({ indent, title });
  }
  return { cases, skipped, only };
};

const newOutline = outline(newFile);
const newCases = new Set(newOutline.cases);
const siblingCases = outline(siblingFile).cases;
const missing = siblingCases.filter((path) => !newCases.has(path));
const siblingSet = new Set(siblingCases);
const extra = [...newCases].filter((path) => !siblingSet.has(path));

for (const path of missing) console.log(`MISSING  ${path}`);
for (const path of extra) console.log(`EXTRA    ${path}`);
for (const entry of newOutline.skipped) console.log(`SKIPPED  ${entry}`);
for (const entry of newOutline.only) console.log(`ONLY     ${entry}`);
console.log(
  `\n${siblingCases.length} sibling case(s), ${newCases.size} new case(s): ` +
    `${missing.length} missing, ${extra.length} extra, ${newOutline.skipped.length} skipped, ` +
    `${newOutline.only.length} only.`,
);
process.exit(missing.length > 0 || newOutline.only.length > 0 ? 1 : 0);
