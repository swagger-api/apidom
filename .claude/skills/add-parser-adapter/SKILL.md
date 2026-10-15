---
name: add-parser-adapter
description: Creates the JSON and YAML parser adapter packages (`apidom-parser-adapter-{spec}-json-{version}` / `apidom-parser-adapter-{spec}-yaml-{version}`) for an existing ApiDOM namespace (`apidom-ns-*`) and wires them into apidom-reference (parse parsers, resolve/dereference/bundle strategies, `saturated.ts`, dependencies). Use when a namespace lacks JSON/YAML parsing, right after `/add-namespace`, or when a spec version must become parseable, resolvable, dereferenceable or bundleable via apidom-reference, even if the user doesn't say "parser adapter".
disable-model-invocation: false
user-invocable: true
---

# Add Parser Adapter Skill

**Skill Name:** `add-parser-adapter`
**Description:** Creates parser adapter packages for existing ApiDOM namespace packages and integrates them with apidom-reference.

## Overview

This skill automates the process of creating parser adapter packages for API namespaces that don't yet have parsers. It discovers which `apidom-ns-*` packages are missing corresponding `apidom-parser-adapter-*` packages, allows you to select which ones to create, generates the complete parser adapter packages (both JSON and YAML), and integrates them with `apidom-reference`.

## When to Use

Use this skill when:
- A namespace package exists but lacks parser adapters
- You need to add JSON and/or YAML parsing support for an existing namespace
- You want to make a namespace usable in apidom-reference workflows
- You've just created a new namespace using `/add-namespace` and need to add parsers

## Prerequisites

Before running this skill:
1. **Namespace package exists**: The target `apidom-ns-*` package must exist
2. **Specification version field**: Know the field name used to detect the specification version (e.g., `"openapi"`, `"asyncapi"`, `"arazzo"`)
3. **Version pattern**: Know the version pattern (e.g., `"3.1.0"` for OpenAPI 3.1)
4. **Root element**: Know the root specification element class name (e.g., `OpenApi3_1Element`, `ArazzoSpecification1Element`)
5. **Monorepo built**: Run `npm run build` at least once to ensure packages are available

## Reference Files

Load these only when the phase that needs them starts:

| File | Read during | Contents |
|------|-------------|----------|
| `references/user-selection-questions.md` | Phase 2 | Exact `AskUserQuestion` payloads |
| `references/adapter-package-templates.md` | Phases 4 and 5 | Directory layout, package.json, tsconfigs, config files (incl. `vite.config.ts`), `src/adapter.ts`, `src/media-types.ts`, template variables, detection regexps |
| `references/adapter-test-templates.md` | Phases 4.7 and 5.5 | `test/adapter.ts`, `test/media-types.ts`, fixtures for JSON and YAML adapters |
| `references/reference-parsers.md` | Phase 6 | apidom-reference parser classes, parser tests, `saturated.ts` parser registration, package.json `optionalDependencies`/`devDependencies` and `exports` |
| `references/reference-strategies.md` | Phase 7 | Resolve/dereference/bundle strategies, dereference visitor, util and selectors, strategy registration and `exports`, strategy tests |
| `references/troubleshooting.md` | Phase 8, whenever build/tests/integration fail | Build errors, test failures, integration issues |

## Skill Instructions

### Phase 1: Discover Missing Parser Adapters

Scan the packages directory to identify namespaces without parser adapters:

1. **Find all namespace packages**:
   ```bash
   ls -1 packages | grep "^apidom-ns-"
   ```

2. **Find all parser adapter packages**:
   ```bash
   ls -1 packages | grep "^apidom-parser-adapter-"
   ```

3. **Identify missing adapters** by comparing:
   - For each `apidom-ns-{spec}-{version}`, check if these exist:
     - `apidom-parser-adapter-{spec}-json-{version}`
     - `apidom-parser-adapter-{spec}-yaml-{version}`

   Special naming cases:
   - API Design Systems: `api-design-systems` (no version)
   - JSON Schema: Pattern is `json-schema-{json|yaml}-{version}`
   - Others: Pattern is `{spec}-{json|yaml}-{version}`

4. **Build options list** of missing adapters:
   ```typescript
   interface MissingAdapter {
     namespace: string;           // e.g., "apidom-ns-openapi-3-2"
     spec: string;                // e.g., "openapi"
     version: string;             // e.g., "3-2"
     missingJSON: boolean;        // true if JSON adapter missing
     missingYAML: boolean;        // true if YAML adapter missing
   }
   ```

### Phase 2: User Selection

**Read `references/user-selection-questions.md` now** for the exact question payloads.

1. Present the missing adapters to the user using `AskUserQuestion` (one option per missing namespace, e.g. "OpenAPI 3.2 (JSON + YAML)").
2. After selection, ask for: the specification version field name, the version pattern, and the root specification element class name (or discover it from namespace exports).

### Phase 3: Extract Namespace Information

Read the namespace package to extract required information:

1. **Read namespace package.json**:
   ```typescript
   const namespacePkg = JSON.parse(
     readFile(`packages/apidom-ns-${spec}-${version}/package.json`)
   );
   ```

2. **Find root element class** by reading the namespace exports:
   - Look for elements that extend from the spec (e.g., files matching pattern like `OpenApi*.ts`, `AsyncApi*.ts`, `Arazzo*.ts`)
   - Read the namespace's `src/index.ts` to identify exported element classes
   - Look for the specification root element (typically has "Specification" or the spec name in PascalCase)

3. **Determine media types** by reading `src/media-types.ts`

4. **Extract version from namespace**:
   - Parse the version number from the namespace package name
   - Convert to regex pattern for detection

### Phase 4: Generate JSON Parser Adapter

**Read `references/adapter-package-templates.md` (section "JSON Parser Adapter") before creating any file**, then `references/adapter-test-templates.md` (section "JSON Parser Adapter Tests") when you reach step 7.

1. Create the directory structure `packages/apidom-parser-adapter-{spec}-json-{version}/` (4.1).
2. Generate `package.json` (4.2) — depends on `@swagger-api/apidom-parser-adapter-json` and the namespace package. Take the version from a sibling package's `package.json` (never hard-code one).
3. Generate `src/adapter.ts` (4.3) exporting `detectionRegExp`, `detect`, `parse`, `namespace` and re-exporting `mediaTypes`. Fill all template variables listed with the template.
4. Generate `src/media-types.ts` (4.4) using `filterByFormat('generic')` + `filterByFormat('json')`.
5. Generate `tsconfig.json` and `tsconfig.declaration.json` (4.5).
6. Copy config files from an existing adapter (e.g., `apidom-parser-adapter-openapi-json-3-2`): `config/api-extractor/`, `vite.config.ts` (browser bundle, update `packageName`/`libraryName`), `.mocharc.json`, `.eslintignore`, `.gitignore`, test config (4.6).
7. Generate tests: `test/adapter.ts`, `test/media-types.ts`, `test/fixtures/sample-spec.json` (4.7).

### Phase 5: Generate YAML Parser Adapter

Create the YAML parser adapter package (similar to JSON but with YAML-specific changes). **Use the "YAML Parser Adapter" section of `references/adapter-package-templates.md`** and the "YAML Parser Adapter Tests" section of `references/adapter-test-templates.md`.

1. Same directory structure as JSON (5.1), named `apidom-parser-adapter-{spec}-yaml-{version}`.
2. `package.json` (5.2): replace `-json-` with `-yaml-` everywhere and depend on `@swagger-api/apidom-parser-adapter-yaml-1-2` instead of `@swagger-api/apidom-parser-adapter-json`.
3. `src/adapter.ts` (5.3): YAML detection regexp that matches both YAML and JSON forms; parse via `parseYAML`/`detectYAML`.
4. `src/media-types.ts` (5.4): `filterByFormat('generic')` + `filterByFormat('yaml')`.
5. Tests (5.5): YAML fixtures, YAML-specific detection, plus JSON detection.

### Phase 6: Integrate with apidom-reference

Add the new parser adapters to the `apidom-reference` package. Based on OpenAPI 3.2.0 implementation, a complete integration requires creating components for all four phases: **parse**, **resolve**, **dereference**, and **bundle**.

**Read `references/reference-parsers.md` now.** Then:

1. Create parser classes `packages/apidom-reference/src/parse/parsers/{spec}-json-{version}/index.ts` and `.../{spec}-yaml-{version}/index.ts` (6.1).
2. Create parser tests and fixtures in `packages/apidom-reference/test/parse/parsers/{spec}-{json|yaml}-{version}/` (6.2).
3. Import and register both parsers in `options.parse.parsers` in `packages/apidom-reference/src/configuration/saturated.ts` (6.3), following the Parser Registration Order below.
4. Add both adapter packages (and the namespace package, if missing) to `optionalDependencies` (`^{currentVersion}`) and `devDependencies` (`"*"`) of `packages/apidom-reference/package.json` (6.4).
5. Add `exports` subpath entries `./parse/parsers/{spec}-json-{version}` and `./parse/parsers/{spec}-yaml-{version}` to `packages/apidom-reference/package.json` (6.5).

### Phase 7: Create Additional Reference Strategies

**Read `references/reference-strategies.md` now.** Then create, under `packages/apidom-reference/src/`:

1. Resolve strategy: `resolve/strategies/{spec}-{version}/index.ts`, extends `ResolveStrategy` (7.1).
2. Dereference strategy: `dereference/strategies/{spec}-{version}/index.ts`, extends `DereferenceStrategy` (7.2).
3. Dereference visitor: `dereference/strategies/{spec}-{version}/visitor.ts`, copied from the parent version (7.3).
4. `util.ts` and selectors: `dereference/strategies/{spec}-{version}/util.ts`, `selectors/$anchor.ts`, `selectors/uri.ts` (7.4).
5. Bundle strategy: `bundle/strategies/{spec}-{version}/index.ts`, extends `BundleStrategy` (7.5).
6. Register all three strategies in `saturated.ts` (`options.resolve.strategies`, `options.dereference.strategies`, `options.bundle.strategies`) and add their `exports` subpath entries to `package.json` (7.6).
7. Tests in `test/dereference/` and `test/bundle/` (optionally `test/resolve/`) under `strategies/{spec}-{version}/` (7.7).

All three strategies share the plain name `'{spec}-{version}'` (e.g. `'openapi-3-2'`); the resolve strategy finds the dereference strategy by that name.

Phase 7 is optional for basic parser adapter functionality but **highly recommended** for production use. If skipping initially, create a follow-up task to add these strategies.

### Phase 8: Build and Test

If anything fails, **read `references/troubleshooting.md`**.

1. **Build the new parser adapter packages**:
   ```bash
   # Build JSON adapter
   cd packages/apidom-parser-adapter-{spec}-json-{version}
   npm run build

   # Build YAML adapter
   cd ../apidom-parser-adapter-{spec}-yaml-{version}
   npm run build
   ```

2. **Run tests for parser adapters**:
   ```bash
   cd packages/apidom-parser-adapter-{spec}-json-{version}
   npm run test
   npm run typescript:check-types
   npm run lint

   cd ../apidom-parser-adapter-{spec}-yaml-{version}
   npm run test
   npm run typescript:check-types
   npm run lint
   ```

3. **Build apidom-reference**:
   ```bash
   cd ../../apidom-reference
   npm run build
   ```

4. **Run apidom-reference tests**:
   ```bash
   npm run test
   npm run typescript:check-types
   npm run lint
   ```

5. **Run full monorepo build** (from root):
   ```bash
   npm run build
   npm run test
   ```

### Phase 9: Update Documentation

1. **Update parser adapter README files**:
   - Explain what the adapter does
   - Show usage examples
   - Document detection patterns
   - List supported media types

2. **Update apidom-reference README**:
   - Add new parsers to supported specifications list

3. **Create CHANGELOG.md** for new packages:
   ```markdown
   # Changelog

   All notable changes to this project will be documented in this file.

   ## [1.0.0] - YYYY-MM-DD

   ### Added
   - Initial release
   - Parser adapter for {Spec Name} {Version} JSON documents
   - Detection support for {specField} field
   - Full refraction into semantic ApiDOM
   ```

## Critical Rules

- Always use `.ts` extensions in imports.
- Test media types through the parser (`ApiDOMParser.findMediaType()`), never `mediaTypes.latest()` directly (lesson from OpenAPI 3.2.0).
- YAML adapter detection must accept both YAML and JSON forms; JSON adapter detection only JSON.
- Detection must accept patch bumps and reject major bumps and invalid versions (e.g. `01`, `x`). Minor bumps depend on the namespace scope: OpenAPI 3.x adapters reject the next minor (3.1 rejects `3.2.0`, 3.2 rejects `3.3.0`); major-scoped specs (AsyncAPI, Arazzo) accept it.
- Media types always combine `'generic'` with the format-specific types.
- Register parsers and strategies in `saturated.ts` in the order below; never forget the resolve/dereference/bundle registrations.

### Naming Conventions

**Parser Adapter Packages**:
- Pattern: `apidom-parser-adapter-{spec}-{format}-{version}`
- Examples:
  - `apidom-parser-adapter-openapi-json-3-2`
  - `apidom-parser-adapter-asyncapi-yaml-3`
  - `apidom-parser-adapter-json-schema-json-2019-09`
  - `apidom-parser-adapter-arazzo-yaml-1`

**Parser Classes in apidom-reference**:
- Pattern: `{SpecName}{Format}{Version}Parser`
- Use underscores for version separators in class names: `3_2`, `2019_09`
- Examples:
  - `OpenAPIJSON3_2Parser`
  - `AsyncAPIYAML3Parser`
  - `JSONSchema2019_09Parser`
  - `ArazzoJSON1Parser`

**Directory Names**:
- Use kebab-case with hyphens
- Pattern: `{spec}-{format}-{version}`
- Examples: `openapi-json-3-2`, `asyncapi-yaml-3`

### Special Cases

**JSON Schema**:
- Namespace pattern: `apidom-ns-json-schema-{version}`
- Parser pattern: `apidom-parser-adapter-json-schema-{format}-{version}`
- Examples:
  - `apidom-parser-adapter-json-schema-json-2019-09`
  - `apidom-parser-adapter-json-schema-yaml-2020-12`

**API Design Systems**:
- No version in package name
- Pattern: `apidom-parser-adapter-api-design-systems-{format}`

### Parser Registration Order

In `saturated.ts` (`options.parse.parsers`), maintain the current order:
1. OpenAPI (2, 3.0, 3.1, 3.2, oldest to newest)
2. AsyncAPI (2, 3)
3. Arazzo (1)
4. A2A (1)
5. API Design Systems (after all versioned specs, not first)
6. Generic parsers at the end: ApiDOM JSON, JSON, YAML 1.2, Binary

Within a spec, the JSON parser precedes the YAML parser of the same version, and a new version is inserted directly after its parent version (e.g. the 3.2 pair right after the 3.1 pair). A brand-new spec goes after the last versioned spec group and before API Design Systems. Strategy arrays follow the same version order, with `ApiDOMResolveStrategy` / `ApiDOMDereferenceStrategy` always last.

## References

- **Existing Parser Adapters**:
  - Simple: `apidom-parser-adapter-arazzo-json-1`
  - OpenAPI (reference implementation): `apidom-parser-adapter-openapi-json-3-2`, `apidom-parser-adapter-openapi-yaml-3-2`
  - AsyncAPI: `apidom-parser-adapter-asyncapi-yaml-3`

- **apidom-reference Integration**:
  - Parser classes: `packages/apidom-reference/src/parse/parsers/`
  - Configuration: `packages/apidom-reference/src/configuration/saturated.ts`
  - Tests: `packages/apidom-reference/test/parse/parsers/`

- **Architecture**: See CLAUDE.md "Parser Adapters" section

## Post-Creation Checklist

### Integration Points (every one must be touched)

New adapter packages (repeat for `json` and `yaml`):
- [ ] `packages/apidom-parser-adapter-{spec}-{format}-{version}/package.json`
- [ ] `.../src/adapter.ts` and `.../src/media-types.ts`
- [ ] `.../tsconfig.json` and `.../tsconfig.declaration.json`
- [ ] `.../config/api-extractor/api-extractor.json` and `.../vite.config.ts` (`packageName`/`libraryName` updated)
- [ ] `.../.mocharc.json`, `.../.eslintignore`, `.../.gitignore`
- [ ] `.../test/adapter.ts`, `.../test/media-types.ts`, `.../test/fixtures/sample-spec.{json|yaml}`, `.../test/mocha-bootstrap.ts`, `.../test/.eslintrc`, `.../test/tsconfig.json`
- [ ] `.../README.md` and `.../CHANGELOG.md`

`packages/apidom-reference`:
- [ ] `src/parse/parsers/{spec}-json-{version}/index.ts` and `src/parse/parsers/{spec}-yaml-{version}/index.ts`
- [ ] `test/parse/parsers/{spec}-json-{version}/` and `test/parse/parsers/{spec}-yaml-{version}/` (tests + fixtures)
- [ ] `src/configuration/saturated.ts`: parser imports + `options.parse.parsers`
- [ ] `package.json`: both adapters (and namespace) in `optionalDependencies` and `devDependencies`
- [ ] `package.json`: `exports` entries for both parsers
- [ ] `src/resolve/strategies/{spec}-{version}/index.ts`
- [ ] `src/dereference/strategies/{spec}-{version}/index.ts`
- [ ] `src/dereference/strategies/{spec}-{version}/visitor.ts` and `util.ts`
- [ ] `src/dereference/strategies/{spec}-{version}/selectors/$anchor.ts` and `selectors/uri.ts`
- [ ] `src/bundle/strategies/{spec}-{version}/index.ts`
- [ ] `src/configuration/saturated.ts`: strategy imports + `options.resolve.strategies`, `options.dereference.strategies`, `options.bundle.strategies`
- [ ] `package.json`: `exports` entries for the resolve, dereference (+ selectors) and bundle strategies
- [ ] `test/dereference/strategies/{spec}-{version}/`, `test/bundle/strategies/{spec}-{version}/` (optionally `test/resolve/strategies/{spec}-{version}/`)
- [ ] `README.md`: new parsers in supported specifications list

### Verification

After running this skill, verify:

- [ ] JSON parser adapter package created
- [ ] YAML parser adapter package created
- [ ] Both adapters build successfully
- [ ] All adapter tests pass
- [ ] Parser classes created in apidom-reference
- [ ] Parser tests created in apidom-reference
- [ ] saturated.ts updated with new parsers
- [ ] apidom-reference `optionalDependencies`, `devDependencies` and `exports` updated
- [ ] apidom-reference builds successfully
- [ ] apidom-reference tests pass
- [ ] Full monorepo builds successfully
- [ ] Documentation updated (README, CHANGELOG)
- [ ] Type checking passes for all packages
- [ ] Linting passes for all packages
