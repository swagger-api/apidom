#!/usr/bin/env node
/**
 * Reports element getters in a namespace package that are already defined by an ancestor element
 * in a parent namespace (e.g. `pathItems` redefined in OAS 3.2 Components although OAS 3.1
 * Components already has it).
 */
import { existsSync } from 'node:fs';
import { join, resolve, dirname, basename, relative } from 'node:path';

import { parseCli } from './lib/cli.mjs';
import { walkTs, parseFile, createResolver } from './lib/elements.mjs';

const USAGE = `
Usage: node check-redefined-fields.mjs <namespace-package-dir>
Example: node check-redefined-fields.mjs packages/apidom-ns-openapi-3-2

Every class in src/elements (several per file are fine) is compared with its ancestors, following
\`extends\` into parent namespace packages. Getters with or without a return type annotation are
compared; types are compared with each identifier qualified by its import source.

Findings:
  REDEFINED  same return type from the same import source as the ancestor: remove the getter
  RETYPED    same type text, but the identifiers now come from this namespace (e.g. this
             version's SchemaElement instead of the parent's): keep it when the refractor produces
             this namespace's element for the field, which is the usual reason for it
  OVERRIDE   return type text changed: keep only if this version changed the field's type
  REMOVED    getter throws: field removed in this version

Exit codes: 0 no REDEFINED getters, 1 REDEFINED getters found, 2 usage error.
`;

const { positionals } = parseCli(USAGE, {
  allowPositionals: true,
  validate: ({ positionals: [dir] }) => {
    if (!dir) return 'namespace package directory required';
    if (!existsSync(join(dir, 'src', 'elements'))) return `${dir}/src/elements not found`;
    return undefined;
  },
});
const pkgDir = resolve(positionals[0]);
const packagesDir = dirname(pkgDir);
const resolver = createResolver(packagesDir);

// qualify type identifiers with their import source so that e.g. SchemaElement from OAS 3.2 and
// SchemaElement from OAS 3.1 count as different types
const qualify = (file, type) => {
  const { imports } = parseFile(file);
  return type.replace(/\b[A-Z]\w*\b/g, (id) => {
    const imp = imports[id];
    if (!imp) return id;
    return `${id}@${imp.from.startsWith('.') ? resolve(dirname(file), imp.from) : imp.from}`;
  });
};

const ancestorGetters = (cls) => {
  const found = new Map();
  for (const ancestor of resolver.chain(cls).slice(1)) {
    for (const [name, getter] of ancestor.getters) {
      if (!found.has(name)) found.set(name, { ...getter, file: ancestor.file });
    }
  }
  return found;
};

const rel = (p) => relative(packagesDir, p);
const counts = { REDEFINED: 0, RETYPED: 0, OVERRIDE: 0, REMOVED: 0 };
const typeText = (type) => (type ? `(${type})` : '(no return type)');
for (const file of walkTs(join(pkgDir, 'src', 'elements'))) {
  for (const cls of parseFile(file).classes) {
    const inherited = ancestorGetters(cls);
    const where = `${rel(file)}${parseFile(file).classes.length > 1 ? ` (${cls.className})` : ''}`;
    for (const [getter, { type, removed }] of cls.getters) {
      const ancestor = inherited.get(getter);
      if (!ancestor) continue;
      if (removed) {
        counts.REMOVED += 1;
        console.log(`REMOVED    ${where}: '${getter}' throws (field removed in this version)`);
      } else if (type === ancestor.type || type === undefined || ancestor.type === undefined) {
        const same =
          type === undefined || ancestor.type === undefined
            ? type === ancestor.type
            : qualify(file, type) === qualify(ancestor.file, ancestor.type);
        if (same || type === undefined) {
          counts.REDEFINED += 1;
          console.log(
            `REDEFINED  ${where}: '${getter}' ${typeText(type)} already in ${rel(ancestor.file)}`,
          );
        } else if (ancestor.type === undefined) {
          counts.OVERRIDE += 1;
          console.log(
            `OVERRIDE   ${where}: '${getter}' (no return type) -> ${type} (${rel(ancestor.file)})`,
          );
        } else {
          counts.RETYPED += 1;
          console.log(
            `RETYPED    ${where}: '${getter}' ${type} now imported from this namespace ` +
              `(${rel(ancestor.file)})`,
          );
        }
      } else {
        counts.OVERRIDE += 1;
        console.log(
          `OVERRIDE   ${where}: '${getter}' ${ancestor.type} -> ${type} (${rel(ancestor.file)})`,
        );
      }
    }
  }
}

console.log(
  `\n${basename(pkgDir)}: ${counts.REDEFINED} redefined, ${counts.RETYPED} retyped (same type ` +
    `name, own import), ${counts.OVERRIDE} type override(s), ${counts.REMOVED} removal(s).`,
);
if (counts.REDEFINED > 0) console.log('REDEFINED getters duplicate the parent: remove them.');
if (counts.RETYPED > 0)
  console.log(
    "RETYPED getters return this namespace's own element class: keep them when the refractor " +
      "produces this namespace's element for the field.",
  );
if (counts.OVERRIDE > 0)
  console.log(
    'OVERRIDE getters change the return type: keep only if this version changed the type.',
  );
process.exit(counts.REDEFINED > 0 ? 1 : 0);
