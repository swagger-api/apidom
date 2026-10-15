#!/usr/bin/env node
/**
 * Cross-checks a namespace's elements and fields against its apidom-ls config, so missing
 * completion, documentation and lint coverage is found before review.
 *
 * Usage:
 *   node check-ls-coverage.mjs <packages/apidom-ns-X> <packages/apidom-ls/src/config/{dir}>
 *     [--ignore element1,element2] [--orphans]
 *
 *   --ignore   element names that intentionally have no LS config (internal helper elements)
 *   --orphans  also report config entries without a namespace element; use it when the config
 *              directory serves only this namespace (A2A), not for shared ones (openapi, asyncapi)
 *
 * Elements and fields are read from the namespace's element classes (`this.element = '...'` and
 * `this.get('field')`); fields inherited from a parent namespace are not listed. LS config is read
 * from the built `config.mjs` when it exists (run `npm run build:es` in apidom-ls first for exact
 * results), otherwise from the `.ts` sources by pattern.
 *
 * Findings (exit code 1 when any):
 *   NO-META      element not registered in config.ts
 *   NO-DOCS      field without a documentation entry (`target: 'field'`)
 *   NO-COMPL     field without a completion item (`label: 'field'`)
 *   NO-TYPE      field without a type lint rule (apilintType, apilintElementOrClass, ...)
 *   NOT-ALLOWED  field missing from the allowed-fields rule, or no allowed-fields rule
 *   STUB         lint file without a linterFunction (placeholder that never runs)
 *   NAMING       lint file name that doesn't match its linter function (`--equals`, `--required`,
 *                `allowed-fields`), e.g. `location--value.ts` for an enum check
 *   NO-ELEMENT   config entry whose element doesn't exist in the namespace (--orphans only)
 *
 * Required-field rules can't be derived from code: the `required` lines list the fields that have
 * a `hasRequiredField` rule, to compare with the Required column of the field map.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    ignore: { type: 'string', default: '' },
    orphans: { type: 'boolean', default: false },
  },
});
const [nsDir, lsDir] = positionals;
if (!nsDir || !lsDir) {
  console.error(
    'Usage: check-ls-coverage.mjs <packages/apidom-ns-X> <packages/apidom-ls/src/config/{dir}> [--ignore a,b] [--orphans]',
  );
  process.exit(2);
}
const ignored = new Set(values.ignore.split(',').filter(Boolean));

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return path.endsWith('.ts') && !path.endsWith('.d.ts') ? [path] : [];
  });
const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');
const matches = (text, re) => [...text.matchAll(re)].map((m) => m[1]);

const TYPE_FUNCTIONS = new Set([
  'apilintType',
  'apilintElementOrClass',
  'apilintValueOrArray',
  'apilintArrayOfElementsOrClasses',
  'apilintArrayOfType',
  'apilintChildrenOfElementsOrClasses',
  'apilintValidURI',
  'apilintNumber',
]);
// lint file names must say what the rule does; `location--value.ts` for an enum check was renamed
// to `location--equals.ts` in review (PR #5182)
const NAME_BY_FUNCTION = {
  apilintValueOrArray: { pattern: /--equals/, expected: '{field}--equals.ts' },
  hasRequiredField: { pattern: /required/, expected: '{field}--required.ts' },
  allowedFields: { pattern: /allowed-fields|siblings/, expected: 'allowed-fields.ts' },
};

const elements = walk(join(nsDir, 'src', 'elements'))
  .map((file) => {
    const text = read(file);
    const element = matches(text, /this\.element = '([^']+)'/g)[0];
    const fields = [...new Set(matches(text, /this\.get\('([^']+)'\)/g))];
    return element && fields.length > 0 ? { element, fields } : undefined;
  })
  .filter(Boolean);

const configText = read(join(lsDir, 'config.ts'));
const imports = Object.fromEntries(
  [...configText.matchAll(/import (\w+) from '\.\/(.+?)\/meta\.ts'/g)].map((m) => [m[1], m[2]]),
);
const registered = Object.fromEntries(
  [...configText.matchAll(/^\s*'?([\w$]+)'?: (\w+),?$/gm)]
    .filter((m) => imports[m[2]])
    .map((m) => [m[1], imports[m[2]]]),
);

const builtPath = resolve(lsDir, 'config.mjs');
let built;
if (existsSync(builtPath)) {
  try {
    built = (await import(pathToFileURL(builtPath).href)).default;
  } catch (error) {
    console.warn(`warning: could not import ${builtPath} (${error.message}); using pattern mode`);
  }
} else {
  console.warn(
    'warning: config.mjs not built; using pattern mode (helper-generated items are missed)',
  );
}

let problems = 0;
const report = (kind, element, detail) => {
  problems += 1;
  console.log(`${kind.padEnd(12)} ${element.padEnd(32)} ${detail}`);
};
const requiredLines = [];

for (const { element, fields } of elements) {
  if (ignored.has(element)) continue;
  const dir = registered[element];
  if (!dir) {
    report('NO-META', element, `fields: ${fields.join(', ')}`);
    continue;
  }
  const base = join(lsDir, dir);
  const meta = built?.[element];
  const docs = new Set(
    meta
      ? (meta.documentation ?? []).map((entry) => entry.target).filter(Boolean)
      : matches(read(join(base, 'documentation.ts')), /target: '([^']+)'/g),
  );
  const completion = new Set(
    meta
      ? (meta.completion ?? []).map((item) => item.label)
      : matches(read(join(base, 'completion.ts')), /label: '([^']+)'/g),
  );
  const lintFiles = existsSync(join(base, 'lint')) ? walk(join(base, 'lint')) : [];
  const typed = new Set();
  const required = new Set();
  const allowed = new Set();
  let hasAllowed = false;
  for (const file of lintFiles) {
    const text = read(file);
    const fn = matches(text, /linterFunction: '(\w+)'/g)[0];
    const target = matches(text, /target: '([^']+)'/g)[0];
    if (TYPE_FUNCTIONS.has(fn) && target) typed.add(target);
    if (fn === 'hasRequiredField')
      matches(text, /linterParams: \['([^']+)'\]/g).forEach((f) => required.add(f));
    if (fn === 'allowedFields') {
      hasAllowed = true;
      const params = text.match(/linterParams: \[\s*\[([\s\S]*?)\]/);
      if (params) matches(params[1], /'([^']+)'/g).forEach((f) => allowed.add(f));
    }
    const name = basename(file, '.ts');
    if (name !== 'index' && !fn)
      report('STUB', element, `${dir}/lint/${file.slice(join(base, 'lint').length + 1)}`);
    const naming = NAME_BY_FUNCTION[fn];
    if (naming && !naming.pattern.test(name)) {
      report('NAMING', element, `${dir}/lint/${name}.ts uses ${fn}; name it ${naming.expected}`);
    }
  }
  const missingIn = (set) => fields.filter((field) => !set.has(field));
  if (missingIn(docs).length > 0) report('NO-DOCS', element, missingIn(docs).join(', '));
  if (missingIn(completion).length > 0)
    report('NO-COMPL', element, missingIn(completion).join(', '));
  if (missingIn(typed).length > 0) report('NO-TYPE', element, missingIn(typed).join(', '));
  if (!hasAllowed) report('NOT-ALLOWED', element, 'no allowed-fields rule');
  else if (missingIn(allowed).length > 0)
    report('NOT-ALLOWED', element, missingIn(allowed).join(', '));
  requiredLines.push(
    `required     ${element.padEnd(32)} ${[...required].sort().join(', ') || '(none)'}`,
  );
}

const known = new Set(elements.map((entry) => entry.element));
for (const [element, dir] of Object.entries(registered)) {
  if (values.orphans && !known.has(element) && !ignored.has(element))
    report('NO-ELEMENT', element, `${dir}/meta.ts`);
}

console.log(`\n${requiredLines.join('\n')}`);
console.log(`\n${elements.length} element(s) with own fields, ${problems} problem(s).`);
process.exit(problems > 0 ? 1 : 0);
