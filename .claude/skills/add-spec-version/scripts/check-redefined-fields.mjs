#!/usr/bin/env node
/**
 * Reports element getters in a namespace package that are already defined by an
 * ancestor element in a parent namespace (e.g. `pathItems` redefined in OAS 3.2
 * Components although OAS 3.1 Components already has it).
 *
 * Usage: node check-redefined-fields.mjs <namespace-package-dir>
 * Example: node check-redefined-fields.mjs packages/apidom-ns-openapi-3-2
 *
 * Exit code 1 when redefinitions are found.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';

const pkgDir = resolve(process.argv[2] ?? '');
if (!process.argv[2] || !existsSync(join(pkgDir, 'src/elements'))) {
  console.error('Usage: node check-redefined-fields.mjs <packages/apidom-ns-*>');
  process.exit(2);
}
const packagesDir = dirname(pkgDir);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return name.endsWith('.ts') ? [path] : [];
  });

const parseElementFile = (file) => {
  const src = readFileSync(file, 'utf8');
  const classMatch = src.match(/class\s+(\w+)\s+extends\s+(\w+)/);
  if (!classMatch) return null;
  const [, className, superName] = classMatch;
  const imports = {};
  for (const [, names, from] of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*'([^']+)'/g)) {
    for (const n of names.split(',')) {
      const local = n.trim().split(/\s+as\s+/).pop();
      if (local) imports[local] = from;
    }
  }
  for (const [, local, from] of src.matchAll(/import\s+(\w+)\s+from\s*'([^']+)'/g)) {
    imports[local] = from;
  }
  // Qualify type identifiers with their import source so that e.g. SchemaElement from
  // OAS 3.2 and SchemaElement from OAS 3.1 count as different types.
  const qualify = (type) =>
    type.replace(/\b[A-Z]\w*\b/g, (id) => {
      const from = imports[id];
      if (!from) return id;
      return `${id}@${from.startsWith('.') ? resolve(dirname(file), from) : from}`;
    });
  const getters = new Map(
    [...src.matchAll(/^\s*get\s+([\w$]+)\s*\(\)\s*:\s*([^{]+?)\s*\{\s*(throw\b)?/gm)].map(
      (m) => [m[1], { type: m[2], qualified: qualify(m[2]), removed: Boolean(m[3]) }],
    ),
  );
  return { file, className, superName, superFrom: imports[superName], getters };
};

const indexCache = new Map();
const elementIndex = (pkgName) => {
  if (indexCache.has(pkgName)) return indexCache.get(pkgName);
  const dir = join(packagesDir, pkgName.replace('@swagger-api/', ''), 'src/elements');
  const index = new Map();
  if (existsSync(dir)) {
    for (const file of walk(dir)) {
      const parsed = parseElementFile(file);
      if (parsed) {
        index.set(parsed.className, parsed);
        index.set(`${parsed.className}Element`, parsed);
      }
    }
  }
  indexCache.set(pkgName, index);
  return index;
};

const resolveSuper = (element) => {
  const { superName, superFrom, file } = element;
  if (!superFrom) return null;
  if (superFrom.startsWith('@swagger-api/apidom-ns-')) {
    return elementIndex(superFrom).get(superName) ?? null;
  }
  if (superFrom.startsWith('.')) {
    const target = resolve(dirname(file), superFrom);
    return existsSync(target) ? parseElementFile(target) : null;
  }
  return null;
};

const ancestorGetters = (element) => {
  const found = new Map();
  let current = resolveSuper(element);
  const seen = new Set();
  while (current && !seen.has(current.file)) {
    seen.add(current.file);
    for (const [g, type] of current.getters) {
      if (!found.has(g)) found.set(g, { file: current.file, ...type });
    }
    current = resolveSuper(current);
  }
  return found;
};

const rel = (p) => p.replace(`${packagesDir}/`, '');
let problems = 0;
let overrides = 0;
let removals = 0;
for (const file of walk(join(pkgDir, 'src/elements'))) {
  const element = parseElementFile(file);
  if (!element) continue;
  const inherited = ancestorGetters(element);
  for (const [getter, { type, qualified, removed }] of element.getters) {
    const ancestor = inherited.get(getter);
    if (!ancestor) continue;
    if (removed) {
      removals += 1;
      console.log(`REMOVED    ${rel(file)}: '${getter}' throws (field removed in this version)`);
    } else if (ancestor.qualified === qualified) {
      problems += 1;
      console.log(`REDEFINED  ${rel(file)}: '${getter}' (${type}) already in ${rel(ancestor.file)}`);
    } else {
      overrides += 1;
      console.log(
        `OVERRIDE   ${rel(file)}: '${getter}' ${ancestor.type} -> ${type} (${rel(ancestor.file)})`,
      );
    }
  }
}

console.log(
  `\n${basename(pkgDir)}: ${problems} redefined with same type, ${overrides} type override(s), ` +
    `${removals} removal(s).`,
);
if (problems > 0) {
  console.log('REDEFINED getters duplicate the parent: remove them.');
  console.log('OVERRIDE getters narrow the return type: keep only if this version changed the type.');
  process.exit(1);
}
