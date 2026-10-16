/**
 * Shared parsing of namespace element classes (packages/apidom-ns-X/src/elements) for the
 * add-spec-version scripts. Pattern based, no TypeScript compiler: it understands the element
 * class shapes used in this repo (`class X extends Y`, `this.element = '...'`, getters returning
 * `this.get('field')`) and follows `extends` across namespace packages
 * (`@swagger-api/apidom-ns-openapi-3-1` -> packages/apidom-ns-openapi-3-1/src).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

export const walkTs = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return walkTs(path);
        return name.endsWith('.ts') && !name.endsWith('.d.ts') ? [path] : [];
      })
    : [];

const parseImports = (src) => {
  const imports = {};
  for (const [, names, from] of src.matchAll(
    /import\s+(?:type\s+)?\{([^}]+)\}\s*from\s*'([^']+)'/g,
  )) {
    for (const n of names.split(',')) {
      const [imported, local = imported] = n.trim().split(/\s+as\s+/);
      if (local) imports[local] = { from, imported };
    }
  }
  for (const [, local, from] of src.matchAll(
    /import\s+(\w+)\s*(?:,\s*\{[^}]*\})?\s*from\s*'([^']+)'/g,
  )) {
    imports[local] = { from, imported: 'default' };
  }
  return imports;
};

const fileCache = new Map();

/**
 * Parses every `class X extends Y` in a file. Returns
 * { file, imports, defaultExport, classes: [{ className, superName, superFrom, element, fields,
 *   getters: Map(name -> { type, field, removed }) }] }.
 */
export const parseFile = (file) => {
  if (fileCache.has(file)) return fileCache.get(file);
  const src = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const imports = parseImports(src);
  const starts = [
    ...src.matchAll(/^(?:export\s+(?:default\s+)?)?class\s+(\w+)\s+extends\s+(\w+)/gm),
  ];
  const classes = starts.map((m, i) => {
    const body = src.slice(m.index, starts[i + 1]?.index ?? src.length);
    const getters = new Map();
    const getterRe = /^\s*get\s+([\w$]+)\s*\(\)\s*(?::\s*([^{]+?))?\s*\{\s*(throw\b)?/gm;
    const getterMatches = [...body.matchAll(getterRe)];
    getterMatches.forEach((g, j) => {
      const rest = body.slice(g.index + g[0].length, getterMatches[j + 1]?.index ?? body.length);
      const accessor = rest.split(/^\s*(?:get|set|static)\s/m)[0];
      getters.set(g[1], {
        type: g[2]?.trim(),
        field: accessor.match(/this\.get\('([^']+)'\)/)?.[1],
        removed: Boolean(g[3]),
      });
    });
    return {
      file,
      className: m[1],
      superName: m[2],
      superFrom: imports[m[2]]?.from,
      superImported: imports[m[2]]?.imported,
      element: body.match(/this\.element = '([^']+)'/)?.[1],
      fields: [...new Set([...body.matchAll(/this\.get\('([^']+)'\)/g)].map((f) => f[1]))],
      getters,
    };
  });
  const defaultExport =
    src.match(/^export default (\w+);?$/m)?.[1] ?? src.match(/^export default class (\w+)/m)?.[1];
  const parsed = { file, imports, defaultExport, classes };
  fileCache.set(file, parsed);
  return parsed;
};

/**
 * Resolver for one packages/ directory. All lookups return class records from parseFile
 * (with `file` set), or null when the class lives outside the namespace packages
 * (apidom-core primitives such as ObjectElement).
 */
export const createResolver = (packagesDir) => {
  const pkgIndexCache = new Map();
  const pkgDir = (pkgName) => join(packagesDir, pkgName.replace('@swagger-api/', ''));

  // class name (and `${name}Element`) -> class, for one namespace package's src/elements
  const pkgIndex = (pkgName) => {
    if (pkgIndexCache.has(pkgName)) return pkgIndexCache.get(pkgName);
    const index = new Map();
    for (const file of walkTs(join(pkgDir(pkgName), 'src', 'elements'))) {
      for (const cls of parseFile(file).classes) {
        index.set(cls.className, cls);
        if (!index.has(`${cls.className}Element`)) index.set(`${cls.className}Element`, cls);
      }
    }
    pkgIndexCache.set(pkgName, index);
    return index;
  };

  const lookupInPackage = (pkgName, name, seen = new Set()) => {
    if (seen.has(pkgName)) return null;
    seen.add(pkgName);
    const hit = pkgIndex(pkgName).get(name);
    if (hit) return hit;
    // re-exported from another namespace package: export { NameElement } from '@swagger-api/...'
    const indexSrc = parseFile(join(pkgDir(pkgName), 'src', 'index.ts'));
    const text = existsSync(indexSrc.file) ? readFileSync(indexSrc.file, 'utf8') : '';
    for (const [, names, from] of text.matchAll(/export\s*\{([^}]+)\}\s*from\s*'([^']+)'/g)) {
      if (!from.startsWith('@swagger-api/apidom-ns-')) continue;
      const exported = names.split(',').map((n) => n.trim().split(/\s+as\s+/));
      const entry = exported.find(([orig, alias = orig]) => alias === name);
      if (entry) return lookupInPackage(from, entry[0], seen);
    }
    return null;
  };

  // resolve an identifier imported into `fromFile` to its class record
  const resolveIdentifier = (fromFile, name) => {
    const { imports } = parseFile(fromFile);
    const imp = imports[name];
    if (!imp) {
      return parseFile(fromFile).classes.find((c) => c.className === name) ?? null;
    }
    if (imp.from.startsWith('.')) {
      const target = resolve(dirname(fromFile), imp.from);
      const parsed = parseFile(target);
      const wanted = imp.imported === 'default' ? parsed.defaultExport : imp.imported;
      return parsed.classes.find((c) => c.className === wanted) ?? parsed.classes[0] ?? null;
    }
    if (imp.from.startsWith('@swagger-api/apidom-ns-')) {
      return lookupInPackage(imp.from, imp.imported === 'default' ? name : imp.imported);
    }
    return null;
  };

  const resolveSuper = (cls) => resolveIdentifier(cls.file, cls.superName);

  // [cls, parent, grandparent, ...]
  const chain = (cls) => {
    const result = [];
    const seen = new Set();
    let current = cls;
    while (current && !seen.has(`${current.file}#${current.className}`)) {
      seen.add(`${current.file}#${current.className}`);
      result.push(current);
      current = resolveSuper(current);
    }
    return result;
  };

  const elementName = (cls) => chain(cls).find((c) => c.element)?.element;

  return { resolveSuper, resolveIdentifier, chain, elementName };
};

/**
 * `base.register('name', XElement)` registrations of a namespace package, keyed by
 * `${file}#${className}` of the registered class.
 */
export const registrations = (nsDir, resolver) => {
  const file = join(nsDir, 'src', 'namespace.ts');
  if (!existsSync(file)) return new Map();
  const text = readFileSync(file, 'utf8');
  const result = new Map();
  for (const [, name, ident] of text.matchAll(/\.register\(\s*'([^']+)'\s*,\s*(\w+)\s*\)/g)) {
    const cls = resolver.resolveIdentifier(file, ident);
    if (cls) result.set(`${cls.file}#${cls.className}`, name);
  }
  return result;
};
