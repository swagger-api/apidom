---
name: add-parser-adapter
description: Creates the JSON and YAML parser adapter packages (`apidom-parser-adapter-{spec}-json-{version}` / `apidom-parser-adapter-{spec}-yaml-{version}`) for an existing ApiDOM namespace (`apidom-ns-*`), or extends existing adapters when a new version is added to an existing namespace (e.g. AsyncAPI 2.6, AsyncAPI 3.1): detection, media types, tests, READMEs and apidom-parser priority tests. Use when a namespace lacks JSON/YAML parsing, right after `/add-namespace`, as phase 2 of /add-spec-version, or when a spec version must become detectable and parseable, even if the user doesn't say "parser adapter". apidom-reference wiring is a separate skill, /add-reference-support.
disable-model-invocation: false
user-invocable: true
---

# Add Parser Adapter Skill

**Skill Name:** `add-parser-adapter`
**Description:** Creates or extends parser adapter packages for ApiDOM namespace packages.

## Overview

This skill has two modes:

- **New**: a namespace has no adapters yet. It discovers which `apidom-ns-*` packages are missing `apidom-parser-adapter-*` packages, lets you select which to create, and generates both the JSON and YAML adapter packages (Phases 1-5, 8-9).
- **Extend**: a new version was added to an existing namespace whose adapters already exist (e.g. AsyncAPI 2.6 in `apidom-ns-asyncapi-2`). Only detection, tests and docs change (Phase 6).

apidom-reference integration (parse parsers, resolve/dereference/bundle strategies, `saturated.ts`) is **not** part of this skill; run `/add-reference-support` afterwards.

## When to Use

Use this skill when:
- A namespace package exists but lacks parser adapters
- You need to add JSON and/or YAML parsing support for an existing namespace
- You've just created a new namespace using `/add-namespace` and need to add parsers
- A new version was added to an existing namespace and its adapters must detect it

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
| `references/troubleshooting.md` | Phase 8, whenever build/tests fail | Build errors, test failures, detection issues |

## Skill Instructions

### Phase 1: Discover Missing Parser Adapters

If the version belongs to an existing namespace whose adapters exist, skip to Phase 6 (extend mode).

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

### Phase 6: Extend Existing Adapters (extend mode only)

Worked example: AsyncAPI 2.6.0, PR #2536 (commit `c2d643904`, `git show c2d643904 -- <path>`). Repeat for the JSON and the YAML adapter of the namespace.

1. **Detection**: check that `detectionRegExp` in `src/adapter.ts` matches the new version and still rejects versions outside the namespace (e.g. the next major). Change it only when it doesn't; `asyncapi-*-2` already matched `2.x.y`.
2. **Media types**: `src/media-types.ts` derives from the namespace, so the new version comes in automatically. Verify in a test (`test/media-types.ts`) through the namespace, e.g. that `mediaTypes.latest()` is now the new version.
3. **Adapter tests** (`test/adapter.ts`): add positive detection for `{version}` and a patch release (`2.6.0`, `2.6.1`) via both `detect` and `detectionRegExp`; bump "latest" samples to the new version.
4. **Fixtures**: bump `test/fixtures/sample-api.{json,yaml}` (and `test/perf/fixtures/*`) to the new version.
5. **Other specs' adapters**: their negative detection tests use this spec's latest version (e.g. `openapi-json-3-1` asserts it does not detect `"asyncapi": "2.5.0"`); bump them to the new version.
6. **apidom-parser**: `packages/apidom-parser/test/adapter-priority.ts` and `packages/apidom-parser/README.md` use the latest version of the spec; bump them.
7. **READMEs**: in both adapter READMEs add the spec link (`[{Spec} {version} specification](...)`), the new media types to the supported list, and use the new version in `detect`/`parse` examples.

Find every place still pinned to the previous latest version:

```bash
grep -rn --include='*.ts' --include='*.md' --include='*.json' --include='*.yaml' \
  -e '{field}": "{previous}"' -e '{field}: {previous}' -e 'version={previous}' \
  packages/apidom-parser-adapter-* packages/apidom-parser --exclude-dir=node_modules
```

Then continue with Phase 8 for the touched packages.

### Phase 7: Repository Wiring (new mode only)

1. Add both new package names to the root `package.json` `unlink` script.
2. Add the packages to the root `README.md` package list.
3. Run `npm i` at the root to update `package-lock.json`.

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

3. **Run apidom-parser tests** (adapter priority):
   ```bash
   cd ../../apidom-parser
   npm run test
   ```

4. **Run full monorepo build** (from root):
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

2. **Create CHANGELOG.md** for new packages:
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
- New adapters are useless to apidom-reference and apidom-ls until wired there: follow up with `/add-reference-support` and `/update-ls-config`.

### Naming Conventions

**Parser Adapter Packages**:
- Pattern: `apidom-parser-adapter-{spec}-{format}-{version}`
- Examples:
  - `apidom-parser-adapter-openapi-json-3-2`
  - `apidom-parser-adapter-asyncapi-yaml-3`
  - `apidom-parser-adapter-json-schema-json-2019-09`
  - `apidom-parser-adapter-arazzo-yaml-1`

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

## References

- **Existing Parser Adapters**:
  - Simple: `apidom-parser-adapter-arazzo-json-1`
  - OpenAPI (reference implementation): `apidom-parser-adapter-openapi-json-3-2`, `apidom-parser-adapter-openapi-yaml-3-2`
  - AsyncAPI: `apidom-parser-adapter-asyncapi-yaml-3`

- **Extend mode example**: PR #2536 (AsyncAPI 2.6.0), commit `c2d643904`
- **Next step**: `/add-reference-support` (apidom-reference parsers and strategies)

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

Repository root:
- [ ] `package.json` `unlink` script, `README.md` package list, `package-lock.json`

Extend mode:
- [ ] Detection covers the new version (and patch releases), rejects other majors
- [ ] `test/adapter.ts`, `test/media-types.ts`, fixtures bumped in both adapters
- [ ] Other specs' adapter negative tests bumped
- [ ] `apidom-parser` adapter-priority test and README bumped
- [ ] Both adapter READMEs: spec link, media types, examples

### Verification

After running this skill, verify:

- [ ] JSON parser adapter package created
- [ ] YAML parser adapter package created
- [ ] Both adapters build successfully
- [ ] All adapter tests pass
- [ ] `apidom-parser` tests pass
- [ ] Full monorepo builds successfully
- [ ] Documentation updated (README, CHANGELOG)
- [ ] Type checking passes for all packages
- [ ] Linting passes for all packages
