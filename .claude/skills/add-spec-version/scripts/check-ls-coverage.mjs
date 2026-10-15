#!/usr/bin/env node
/**
 * Cross-checks a namespace's elements and fields against its apidom-ls config, so missing
 * completion, documentation and lint coverage is found before review.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, basename, resolve, dirname, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

import { parseCli } from './lib/cli.mjs';
import { walkTs, parseFile, createResolver, registrations } from './lib/elements.mjs';

const USAGE = `
Usage:
  node check-ls-coverage.mjs <packages/apidom-ns-X> <packages/apidom-ls/src/config/{dir}>
    [--ignore element1,element2] [--orphans] [--inherited] [--source]

  --ignore     element names that intentionally have no LS config (internal helper elements)
  --orphans    also report config entries without a namespace element; use it when the config
               directory serves only this namespace (A2A), not for shared ones (openapi, asyncapi)
  --inherited  also check fields inherited from a parent namespace (by default only fields whose
               getters are declared in this namespace are checked: in extend mode the LS config
               directory is shared across versions, so inherited fields are covered already)
  --source     read the .ts sources by pattern even when config.mjs is built (use it instead of
               rebuilding when the build is stale; helper-generated items are missed)
  -h, --help   show this help

Elements are the classes in src/elements that are registered in src/namespace.ts or declare
field getters (\`this.get('field')\`). The element name is resolved through the superclass chain,
following imports into parent namespace packages, so subclasses that inherit \`this.element\`
(e.g. OAS 3.2 Components extends OAS 3.1 ComponentsElement) are found. LS config is read from
the built \`config.mjs\` when it exists (run \`npm run build:es\` in apidom-ls first; a warning is
printed when .ts sources are newer than their .mjs), otherwise from the .ts sources by pattern.

Findings:
  NO-META      element not registered in config.ts (only elements that have fields)
  NO-DOCS      field without a documentation entry (\`target: 'field'\`). Not reported when the
               getter returns a single element type whose LS meta has its own element-level
               documentation (repo convention: such fields are documented by their type)
  NO-COMPL     field without a completion item (\`label: 'field'\`)
  NO-TYPE      field without a type lint rule (apilintType, apilintElementOrClass, ...); not
               reported for getters typed \`Element\`/\`any\` (any value allowed)
  NOT-ALLOWED  field missing from the allowed-fields rule, or no allowed-fields rule
  STUB         lint file without a linterFunction (placeholder that never runs)
  UNKNOWN-FN   lint file whose linterFunction is not defined in
               apidom-ls/src/services/validation/linter-functions.ts (the rule never runs)
  NAMING       lint file name that doesn't match its linter function (\`--equals\`, \`--required\`,
               \`allowed-fields\`), e.g. \`location--value.ts\` for an enum check
  NO-ELEMENT   config entry whose element doesn't exist in the namespace (--orphans only)

Required-field rules can't be derived from code: the \`required\` lines list the fields that have
a \`hasRequiredField\` rule, to compare with the Required column of the field map.

Exit codes: 0 no findings, 1 findings, 2 usage error.
`;

const { values, positionals } = parseCli(USAGE, {
  allowPositionals: true,
  options: {
    ignore: { type: 'string', default: '' },
    orphans: { type: 'boolean', default: false },
    inherited: { type: 'boolean', default: false },
    source: { type: 'boolean', default: false },
  },
  validate: ({ positionals: [ns, ls] }) => {
    if (!ns || !ls) return 'two directories required';
    if (!existsSync(join(ns, 'src', 'elements'))) return `${ns}/src/elements not found`;
    if (!existsSync(join(ls, 'config.ts'))) return `${ls}/config.ts not found`;
    return undefined;
  },
});
const [nsDir, lsDir] = positionals.map((p) => resolve(p));
const ignored = new Set(values.ignore.split(',').filter(Boolean));

const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');
const matches = (text, re) => [...text.matchAll(re)].map((m) => m[1]);

// apidom-ls/src/config/{dir} -> apidom-ls/src/services/validation/linter-functions.ts
const linterFunctionsFile = resolve(
  lsDir,
  '..',
  '..',
  'services',
  'validation',
  'linter-functions.ts',
);
const KNOWN_FUNCTIONS = new Set(matches(read(linterFunctionsFile), /functionName: '(\w+)'/g));

// linter functions that validate the value's type (all present in linter-functions.ts, except
// apilintValidURIReferenceOrFragment which config references but which is reported UNKNOWN-FN)
const TYPE_FUNCTIONS = new Set([
  'apilintType',
  'apilintElementOrClass',
  'apilintValueOrArray',
  'apilintArray',
  'apilintArrayOfElementsOrClasses',
  'apilintArrayOfType',
  'apilintChildrenOfElementsOrClasses',
  'apilintChildrenOfType',
  'apilintNamedChildrenOfElementsOrClasess',
  'apilintValidURI',
  'apilintValidURI_RFC3986',
  'apilintValidURIReferenceOrFragment',
  'apilintNumber',
]);
// lint file names must say what the rule does; `location--value.ts` for an enum check was renamed
// to `location--equals.ts` in review (PR #5182)
const NAME_BY_FUNCTION = {
  apilintValueOrArray: { pattern: /--equals/, expected: '{field}--equals.ts' },
  hasRequiredField: { pattern: /required/, expected: '{field}--required.ts' },
  allowedFields: { pattern: /allowed-fields|siblings/, expected: 'allowed-fields.ts' },
};

// --- namespace elements ------------------------------------------------------------------------
const resolver = createResolver(resolve(nsDir, '..'));
const registered = registrations(nsDir, resolver);
const PRIMITIVE_TYPES = new Set(['undefined', 'null', 'any', 'unknown', 'this']);
// element name of a getter's return type when it is a single namespace element class
const fieldTypeElement = (cls, field) => {
  for (const c of resolver.chain(cls)) {
    const getter = [...c.getters.values()].find((g) => g.field === field && g.type);
    if (!getter) continue;
    const parts = getter.type
      .split('|')
      .map((t) => t.trim())
      .filter((t) => !PRIMITIVE_TYPES.has(t));
    if (parts.length !== 1 || !/^\w+$/.test(parts[0])) return undefined;
    const target = resolver.resolveIdentifier(c.file, parts[0]);
    return target ? resolver.elementName(target) : undefined;
  }
  return undefined;
};

// getters typed `Element`/`any`/`unknown` accept any value: no type rule expected
const isAnyTyped = (cls, field) =>
  resolver
    .chain(cls)
    .some((c) =>
      [...c.getters.values()].some(
        (g) =>
          g.field === field && /^(Element|any|unknown)(\s*\|\s*undefined)?$/.test(g.type ?? ''),
      ),
    );

const elementsByName = new Map();
for (const file of walkTs(join(nsDir, 'src', 'elements'))) {
  for (const cls of parseFile(file).classes) {
    const registeredName = registered.get(`${cls.file}#${cls.className}`);
    if (!registeredName && cls.fields.length === 0) continue;
    const element = registeredName ?? resolver.elementName(cls);
    if (!element) continue;
    const ancestors = resolver.chain(cls).slice(1);
    const inheritedFields = ancestors.flatMap((a) => a.fields);
    const fields = [...new Set([...cls.fields, ...(values.inherited ? inheritedFields : [])])];
    const hasAnyFields = fields.length > 0 || inheritedFields.length > 0;
    if (!elementsByName.has(element))
      elementsByName.set(element, { element, cls, fields, hasAnyFields });
  }
}
const elements = [...elementsByName.values()].sort((a, b) => a.element.localeCompare(b.element));

// --- LS config ---------------------------------------------------------------------------------
const configText = read(join(lsDir, 'config.ts'));
const imports = Object.fromEntries(
  // './info/meta.ts' and shared metas such as '../common/schema/meta.ts'
  [...configText.matchAll(/import (\w+) from '(\.\.?\/.+?)\/meta\.ts'/g)].map((m) => [
    m[1],
    m[2].replace(/^\.\//, ''),
  ]),
);
const metaDirs = Object.fromEntries(
  [...configText.matchAll(/^\s*'?([\w$]+)'?: (\w+),?$/gm)]
    .filter((m) => imports[m[2]])
    .map((m) => [m[1], imports[m[2]]]),
);

const builtPath = join(lsDir, 'config.mjs');
let built;
if (values.source) {
  console.error(
    'note: --source: reading .ts sources by pattern (helper-generated items are missed)',
  );
} else if (existsSync(builtPath)) {
  const stale = walkTs(lsDir).filter((ts) => {
    const mjs = ts.replace(/\.ts$/, '.mjs');
    return !existsSync(mjs) || statSync(ts).mtimeMs > statSync(mjs).mtimeMs;
  });
  if (stale.length > 0) {
    const examples = stale
      .slice(0, 3)
      .map((f) => relative(lsDir, f))
      .join(', ');
    console.error(
      `WARNING: STALE BUILD: ${stale.length} .ts file(s) under ${relative(process.cwd(), lsDir)} ` +
        `are newer than their built .mjs (e.g. ${examples}).\n` +
        'WARNING: results come from the old build; run `npm run build:es` in packages/apidom-ls.\n',
    );
  }
  try {
    built = (await import(pathToFileURL(builtPath).href)).default;
  } catch (error) {
    console.error(`warning: could not import ${builtPath} (${error.message}); using pattern mode`);
  }
} else {
  console.error(
    'warning: config.mjs not built; using pattern mode (helper-generated items are missed)',
  );
}

const docsFor = (element) => {
  const meta = built?.[element];
  if (meta) return meta.documentation ?? [];
  const dir = metaDirs[element];
  if (!dir) return [];
  const text = read(join(lsDir, dir, 'documentation.ts'));
  // pattern mode: an entry without `target` is element-level documentation
  return [
    ...matches(text, /target: '([^']+)'/g).map((target) => ({ target })),
    ...(/^\s*\{\s*\n\s*docs:/m.test(text) ? [{}] : []),
  ];
};
const hasElementDocs = (element) => docsFor(element).some((entry) => !entry.target);

// --- checks ------------------------------------------------------------------------------------
let problems = 0;
const report = (kind, element, detail) => {
  problems += 1;
  console.log(`${kind.padEnd(12)} ${element.padEnd(32)} ${detail}`);
};
const requiredLines = [];
let checkedFields = 0;

for (const { element, cls, fields, hasAnyFields } of elements) {
  if (ignored.has(element)) continue;
  const dir = metaDirs[element];
  if (!dir) {
    if (hasAnyFields)
      report('NO-META', element, `fields: ${fields.join(', ') || '(inherited only)'}`);
    continue;
  }
  const base = join(lsDir, dir);
  const meta = built?.[element];
  const docs = new Set(
    docsFor(element)
      .map((entry) => entry.target)
      .filter(Boolean),
  );
  const completion = new Set(
    meta
      ? (meta.completion ?? []).map((item) => item.label)
      : matches(read(join(base, 'completion.ts')), /label: '([^']+)'/g),
  );
  const lintFiles = walkTs(join(base, 'lint'));
  const typed = new Set();
  const required = new Set();
  const allowed = new Set();
  let hasAllowed = false;
  for (const file of lintFiles) {
    const text = read(file);
    const fn = matches(text, /linterFunction: '(\w+)'/g)[0];
    const name = basename(file, '.ts');
    const relFile = `${dir}/lint/${relative(join(base, 'lint'), file)}`;
    // a file may hold several rules (e.g. one per target spec version)
    if (TYPE_FUNCTIONS.has(fn)) matches(text, /target: '([^']+)'/g).forEach((t) => typed.add(t));
    if (fn === 'hasRequiredField')
      matches(text, /linterParams: \['([^']+)'\]/g).forEach((f) => required.add(f));
    if (fn === 'allowedFields') {
      hasAllowed = true;
      for (const params of matches(text, /linterParams: \[\s*\[([\s\S]*?)\]/g))
        matches(params, /'([^']+)'/g).forEach((f) => allowed.add(f));
    }
    if (name !== 'index' && !fn) report('STUB', element, relFile);
    if (fn && KNOWN_FUNCTIONS.size > 0 && !KNOWN_FUNCTIONS.has(fn))
      report('UNKNOWN-FN', element, `${relFile} uses ${fn}, not defined in linter-functions.ts`);
    const naming = NAME_BY_FUNCTION[fn];
    if (naming && !naming.pattern.test(name)) {
      report('NAMING', element, `${dir}/lint/${name}.ts uses ${fn}; name it ${naming.expected}`);
    }
  }
  if (fields.length === 0) continue;
  checkedFields += fields.length;
  const missingIn = (set) => fields.filter((field) => !set.has(field));
  const noDocs = missingIn(docs).filter((field) => {
    const typeElement = fieldTypeElement(cls, field);
    return !(typeElement && hasElementDocs(typeElement));
  });
  if (noDocs.length > 0) report('NO-DOCS', element, noDocs.join(', '));
  if (missingIn(completion).length > 0)
    report('NO-COMPL', element, missingIn(completion).join(', '));
  const noType = missingIn(typed).filter((field) => !isAnyTyped(cls, field));
  if (noType.length > 0) report('NO-TYPE', element, noType.join(', '));
  if (!hasAllowed) report('NOT-ALLOWED', element, 'no allowed-fields rule');
  else if (missingIn(allowed).length > 0)
    report('NOT-ALLOWED', element, missingIn(allowed).join(', '));
  requiredLines.push(
    `required     ${element.padEnd(32)} ${[...required].sort().join(', ') || '(none)'}`,
  );
}

const known = new Set(elements.map((entry) => entry.element));
for (const [element, dir] of Object.entries(metaDirs)) {
  if (values.orphans && !known.has(element) && !ignored.has(element))
    report('NO-ELEMENT', element, `${dir}/meta.ts`);
}

console.log(`\n${requiredLines.join('\n')}`);
console.log(
  `\n${elements.length} element(s) discovered, ${requiredLines.length} with ` +
    `${values.inherited ? '' : 'own '}fields (${checkedFields} field(s) checked), ` +
    `${problems} problem(s).`,
);
process.exit(problems > 0 ? 1 : 0);
