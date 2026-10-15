#!/usr/bin/env node
/**
 * Compares the describe/context/specify/it outline of a new test file with the same test file in
 * a sibling package, so new packages keep the test cases reviewers expect.
 *
 * Usage:
 *   node check-test-parity.mjs <new-test-file> <sibling-test-file> [--mask word1,word2,...]
 *
 *   --mask  spec words to neutralize in titles, for both files (e.g. asyncapi,a2a). Version
 *           numbers (3.0.0, 3_1, json3) are always neutralized.
 *
 * Output:
 *   MISSING  case present in the sibling, absent in the new file (add it or justify it)
 *   EXTRA    case only in the new file (informational)
 *
 * Exit code 1 when anything is MISSING.
 */
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { mask: { type: 'string', default: '' } },
});
const [newFile, siblingFile] = positionals;
if (!newFile || !siblingFile) {
  console.error('Usage: check-test-parity.mjs <new-test-file> <sibling-test-file> [--mask w1,w2]');
  process.exit(2);
}
const masks = values.mask
  .split(',')
  .map((word) => word.trim())
  .filter(Boolean)
  .sort((a, b) => b.length - a.length);

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const normalize = (title) => {
  let result = title.toLowerCase();
  for (const word of masks)
    result = result.replace(new RegExp(escape(word.toLowerCase()), 'g'), '<spec>');
  return result
    .replace(/\d+(?:[._-]\d+)*/g, '<v>')
    .replace(/\s+/g, ' ')
    .trim();
};

const CALL_RE = /^([ \t]*)(describe|context|specify|it)\(\s*(['"`])((?:\\.|(?!\3)[\s\S])*?)\3/gm;
const outline = (file) => {
  const text = readFileSync(file, 'utf8');
  const stack = [];
  const cases = [];
  for (const match of text.matchAll(CALL_RE)) {
    const indent = match[1].replace(/\t/g, '  ').length;
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) stack.pop();
    const title = normalize(match[4]);
    const path = [...stack.map((entry) => entry.title), title].join(' > ');
    cases.push(path);
    stack.push({ indent, title });
  }
  return cases;
};

const newCases = new Set(outline(newFile));
const siblingCases = outline(siblingFile);
const missing = siblingCases.filter((path) => !newCases.has(path));
const siblingSet = new Set(siblingCases);
const extra = [...newCases].filter((path) => !siblingSet.has(path));

for (const path of missing) console.log(`MISSING  ${path}`);
for (const path of extra) console.log(`EXTRA    ${path}`);
console.log(
  `\n${siblingCases.length} sibling case(s), ${newCases.size} new case(s): ` +
    `${missing.length} missing, ${extra.length} extra.`,
);
process.exit(missing.length > 0 ? 1 : 0);
