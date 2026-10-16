---
name: update-ls-config
description: Adds or updates apidom-ls language service configuration (completion items, hover documentation, lint rules, meta.ts and target-spec wiring) in packages/apidom-ls/src/config for a namespace package by analyzing its elements, refractor specification and parser adapters. Use when a new spec namespace or version (e.g. apidom-ns-openapi-3-2, apidom-ns-asyncapi-3, Arazzo) needs IDE support, or when an existing namespace gains new elements or fields that need autocomplete, hover docs or validation, even if the user doesn't say "ls config".
---

# Update Language Service Config Skill

## Overview

This skill automates the process of updating the language service (apidom-ls) configuration for a namespace package. It analyzes the namespace package structure, corresponding parser adapter packages, and generates appropriate configuration files for IDE features like autocomplete, hover documentation, and validation.

**Scope**: coverage is per field per element. Every object the spec defines gets a config directory, and every field of it gets a completion item, a documentation entry and a type rule, plus `--required`, `--equals` and `--format-*` rules where the spec calls for them. `check-ls-coverage.mjs` (Phase 6 step 5) checks this mechanically, so there is no target number of items or rules.

### Reference Files (load on demand)

| File | Read when |
|------|-----------|
| `references/version-wiring.md` | Phase 4 (target-specs.ts), Phase 5.1 (directory layout), 5.7 (meta.ts), Phase 7 (config.ts, symbols.ts); naming conventions |
| `references/completion-and-documentation.md` | Phase 5.2 (completion.ts), 5.3 (documentation.ts), Phase 6 element completion/docs |
| `references/lint-rules.md` | Phase 5.4-5.6 (where rules live, file naming, `codes.ts`, allowed-fields, per-field rules, lint index), Phase 6 element lint rules |
| `references/special-cases-and-elements.md` | Phase 5/6 when the spec adds new methods, dynamic collections, version-specific, hierarchical, global, `$self` or `$ref`-or-inline fields; baseline element list |
| `references/troubleshooting.md` | Phase 8 build/type-check/IDE failures |
| `packages/apidom-ls/CLAUDE.md` | Before writing any lint rule or test (linter function choice, message patterns, test patterns, pitfalls) |

## When to Use

Use this skill when:
- A new namespace package has been created and needs language service support
- An existing namespace package has been updated with new elements or properties
- Parser adapter packages have been created for a namespace
- You need to add IDE support (completion, documentation, validation) for a specification version

## Prerequisites

Before running this skill:
1. **Namespace package must exist**: The target `apidom-ns-{spec}-{version}` package must be created and built
2. **Parser adapters exist** (recommended): Both JSON and YAML parser adapter packages should exist
3. **Package is built**: Run `npm run build` in the namespace package directory
4. **Specification documentation**: Have access to the specification documentation URLs for generating docs

## Critical Rules

These apply to every phase. Where a template in `references/` shows a different placeholder, these rules win.

1. **Copy existing patterns first**: find 2-3 similar rules in the same spec directory and copy their shape (`packages/apidom-ls/CLAUDE.md` section 7). Real files are the source of truth whenever a template disagrees with them.
2. **Messages**: required rules say `"should always have a '{field}'"`, never `"must contain '{field}' field"`. Type messages follow the style of the spec directory (`references/lint-rules.md`, "Messages"); arrays and maps follow `packages/apidom-ls/CLAUDE.md` section 4.
3. **File naming**: `{kebab-field}--{rule}.ts`, e.g. `default-input-modes--required.ts`, `servers--items-type.ts`, `location--equals.ts` (full list in `references/lint-rules.md`). Never descriptive names such as `field--required-when-condition.ts`.
4. **No `'reference'` in `linterParams`**: the refractor already turns Reference Objects into reference elements.
5. **No explanatory comments** in straightforward rule files; they repeat the code.
6. **Only new fields**: check the parent version's config and namespace element first; never redefine fields inherited from the parent version. Scope new rules with the correct `targetSpecs`.
7. **Documentation URLs follow the per-spec table** in `references/completion-and-documentation.md` ("Documentation URLs per Spec") and are checked with `verify-urls.mjs`. For OpenAPI 3.2+, links go to the GitHub markdown (`https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md`), not `spec.openapis.org`. In every spec, use the anchor that exists on the page (copy it from the markdown or page source, e.g. `3.2.0.md#path-item-object`) instead of deriving it from a naming convention; the upstream anchor style differs between versions and has changed before. Root `CLAUDE.md` ("apidom-ls Documentation URL Requirements") has the details.
8. **Tests compare full Diagnostic objects with `assert.deepEqual`** (range, message, severity, code, source, data), and valid documents assert an empty list; see `packages/apidom-ls/CLAUDE.md` section 8 for the pattern and how to capture the actual values.

## Skill Instructions

### Phase 1: Gather Information

Collect the following. When the skill runs as a subagent (for example from `/add-spec-version`), or when the values can be inferred from the branch name, the diff or a tracking document such as `ADD-{SPEC}-{VERSION}.md`, infer them and state what you inferred instead of asking:

1. **Namespace Package Name**: The namespace package to generate config for (e.g., 'apidom-ns-openapi-3-2', 'apidom-ns-asyncapi-3')
2. **Specification Type**: The specification family (e.g., 'openapi', 'asyncapi', 'arazzo')
3. **Version Identifier**: The version string for directory naming (e.g., 'openapi3_2', 'asyncapi3')
4. **Specification Documentation Base URL**: Base URL for documentation links (e.g., 'https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md')
5. **Update Existing Config**: Whether to update existing config or create new (boolean)

### Phase 2: Analyze Namespace Package

#### 2.1 Read Namespace Structure

Navigate to `packages/{namespace-package}/src/` and analyze:

1. **Elements Directory** (`src/elements/`):
   - List all element files (e.g., `Info.ts`, `Server.ts`, `PathItem.ts`)
   - For each element, extract:
     - Element class name
     - Properties (from class definition or refractor specification)
     - Whether it extends from OpenAPI 3.1/3.0 or is new

2. **Refractor Specification** (`src/refractor/specification.ts`):
   - Read the specification object that defines element structure
   - Extract fixed fields and patterned fields for each element
   - Identify required vs optional properties

3. **Predicates** (`src/predicates.ts`):
   - List all predicates to understand element type checking
   - Map predicate names to element types

#### 2.2 Analyze Parser Adapters

Check for corresponding parser adapter packages:
- `packages/apidom-parser-adapter-{spec}-json-{version}/`
- `packages/apidom-parser-adapter-{spec}-yaml-{version}/`

Extract:
- Media types supported
- Detection patterns
- Version strings

### Phase 3: Determine Config Directory Structure

Based on the specification type and version:

1. **Spec Type Directory**: `packages/apidom-ls/src/config/{spec}/`
   - e.g., `packages/apidom-ls/src/config/openapi/`
   - e.g., `packages/apidom-ls/src/config/asyncapi/`

2. **Version Directory**: `packages/apidom-ls/src/config/{spec}/{version}/`
   - e.g., `packages/apidom-ls/src/config/openapi/openapi3_2/`
   - e.g., `packages/apidom-ls/src/config/asyncapi/asyncapi3/`

3. **Check if version directory exists**:
   - If NO: Create new directory structure
   - If YES: ask the user whether to update or skip. When running as a subagent or when the task already says to update (e.g. adding coverage for new fields), update it without asking.

Version directory naming: lowercase, with an underscore between major and minor where the directory is per minor version (`openapi3_2`, `asyncapi3`, `a2a1`), matching sibling version directories.

### Phase 4: Generate Target Spec Definition

**Read `references/version-wiring.md`** (sections "Target Spec Naming Convention" and "Update target-specs.ts").

1. Open `packages/apidom-ls/src/config/{spec}/target-specs.ts` (create it for a new spec, shaped like `config/a2a/target-specs.ts`).
2. Add one constant per released version of the new line, each an array of `{ namespace, version }` objects (e.g. `OpenAPI310`, `OpenAPI311`, `OpenAPI312`, combined into `OpenAPI31`). While a line has a single released version, its constant can be defined directly, as `export const OpenAPI32 = [{ namespace: 'openapi', version: '3.2.0' }];` is.
3. Add the new constant to the aggregates that should include it (e.g. `OpenAPI3 = [...OpenAPI30, ...OpenAPI31, ...OpenAPI32]`). Remember that every existing entry using that aggregate now applies to the new version too.

### Phase 5: Generate Configuration Files

1. **5.1 Create version directory** `packages/apidom-ls/src/config/{spec}/{version}/` with `completion.ts`, `documentation.ts`, `lint/` and `meta.ts`. Layout: `references/version-wiring.md`.
2. **5.2 Generate completion.ts**: **read `references/completion-and-documentation.md`** for how items are selected, the field and value item templates, conditions and format mapping. This file covers the root object's fields only; nested objects get their own `completion.ts` in Phase 6.
3. **5.3 Generate documentation.ts**: same reference file. One entry per field; only object-valued fields documented in their own element directory may be omitted, and they are listed in the header comment. Link with correct version URLs (Critical Rule 7).
4. **5.4 Generate lint/allowed-fields.ts**: **read `references/lint-rules.md`** for the template.
5. **5.5 Generate per-field rule files** (`{field}--type.ts`, `{field}--required.ts`, ...): same reference file for the templates, the linter function mapping, message styles and the `codes.ts` naming and numbering. Apply Critical Rules 2-5.
6. **5.6 Generate lint/index.ts**: aggregate all lint rules (template in `references/lint-rules.md`).
7. **5.7 Generate meta.ts**: aggregate lint, completion and documentation (template in `references/version-wiring.md`).

If the version introduces new HTTP methods, dynamic collections, version-specific, hierarchical, global configuration, self-reference or `$ref`-or-inline fields, **read `references/special-cases-and-elements.md`**.

### Phase 6: Update Element-Specific Configs

For **every** element registered in the namespace (`src/namespace.ts`), except internal helper elements that don't correspond to a spec object (list them, e.g. A2A `stringList`), and only for objects of the current spec version (no config for objects the version removed, such as A2A 1.0's implicit and password OAuth flows, or for objects the spec doesn't define):

1. **Config directory and meta**: `packages/apidom-ls/src/config/{spec}/{element-name}/` with `meta.ts`, `completion.ts`, `documentation.ts`, `lint/`, and the meta registered under the element name in `config/{spec}/config.ts`. PR #5182 left 7 elements unregistered.

2. **Completion**: one item per field of the element, in the element's own `completion.ts` (not as conditional items in the root's file).

3. **Documentation**: one `target` entry per field, simple scalars included, plus the object-level entry (no `target`). The only fields that may be left out are object-valued fields documented in their own element directory, listed in the header comment (see 5.3). Each entry links to the field's or object's anchor in the spec (see "Documentation URLs per Spec" in `references/completion-and-documentation.md`).

4. **Lint rules**, per field:
   - `{field}--type.ts` for every field (`apilintType` for primitives, `apilintElementOrClass` / `apilintArrayOfElementsOrClasses` / `apilintChildrenOfElementsOrClasses` for objects, arrays and maps)
   - `{field}--required.ts` for every field marked Required in the field map / spec table
   - `{field}--equals.ts` (`apilintValueOrArray`) for every field with a fixed set of values (e.g. API Key `location`: `query`, `header`, `cookie`); never `--value` or `--enum`
   - `{field}--format-uri.ts` (`apilintValidURI`) for every field the spec defines as a URL/URI, `{field}--format-email.ts` (`apilintValueRegex`) for every email field
   - `allowed-fields.ts` listing every field

5. **Check coverage** (catches everything above that's missing; PR #5182 got 29 comments for it):
   ```bash
   cd packages/apidom-ls && npm run build:es && cd -
   node .claude/skills/add-spec-version/scripts/check-ls-coverage.mjs \
     packages/apidom-ns-{spec}-{version} packages/apidom-ls/src/config/{spec} \
     --ignore {internal elements} [--orphans]
   ```
   Resolve every finding. Compare its `required` lines with the field map's Required column. Use `--orphans` when the config directory serves only this namespace.

Use `references/completion-and-documentation.md` and `references/lint-rules.md` for templates, and the "Common Element Types to Include" list in `references/special-cases-and-elements.md` as the baseline set.

### Phase 7: Update Main Config Files

**Read `references/version-wiring.md`** (section "Update Main Config Files").

1. **7.1** In `config/{spec}/config.ts`, import the version meta and add it as a key of the default-export object, keyed by the root element's name (`this.element`): `openApi3_2: openapi3_2Meta` in `config/openapi/config.ts`, `a2aAgentCard1: a2a1Meta` in `config/a2a/config.ts`. For a brand-new spec, also register `config/{spec}/config.ts` in `metadataMaps` in `config/config.ts`.
2. **7.2** `config/{spec}/symbols.ts` only controls which elements appear in the document outline. Add element names there only if new elements should show in the outline; most versions need no change (A2A has no `symbols.ts`).

### Phase 8: Validation and Testing

1. **Build the namespace package**:
   ```bash
   cd packages/{namespace-package}
   npm run build
   ```

2. **Build apidom-ls**:
   ```bash
   cd packages/apidom-ls
   npm run build
   ```

3. **Run type checking**:
   ```bash
   npm run typescript:check-types
   ```

4. **Test the configuration programmatically** in `packages/apidom-ls/test/`, following existing tests:
   - Completion: `languageService.doCompletion(doc, position, completionContext)`, as in `test/openapi-3-2-completion.ts`
   - Hover documentation: `languageService.doHover(doc, position)`, as in `test/openapi-3-2-documentation.ts`
   - Validation: `languageService.doValidation(doc, validationContext)`, as in `test/a2a.ts`

   Cover new fields with at least one valid and one invalid document, following Critical Rule 8, then run `npm run test` in `packages/apidom-ls`.

On failures, **read `references/troubleshooting.md`**.

### Phase 9: Document Changes

Update `packages/apidom-ls/README.md` where it lists supported specifications. Don't edit `CHANGELOG.md`; release automation writes it from Conventional Commits.

Then verify every documentation link (a missing anchor on the spec page is `BROKEN`):

```bash
node .claude/skills/add-spec-version/scripts/verify-urls.mjs packages/apidom-ls/src/config/{spec}
```

## Final Verification Checklist

- [ ] `target-specs.ts` has a `{ namespace, version }` constant for every released version, and the aggregates include it
- [ ] `{version}/completion.ts`, `documentation.ts`, `lint/index.ts`, `meta.ts` exist and are wired into `config/{spec}/config.ts`
- [ ] Every namespace element (except listed internal helpers) has a config directory and a meta registered in `config.ts`
- [ ] Every field has a completion item, a documentation entry (scalars included; only object-valued fields documented in their own element directory may be omitted, listed in the header comment) and a `--type` rule; Required fields have `--required`; enum fields have `--equals`; URL/URI and email fields have `--format-uri` / `--format-email`
- [ ] `check-ls-coverage.mjs` reports 0 problems (or each remaining one is justified)
- [ ] No config for objects the spec version removed or doesn't define
- [ ] `verify-urls.mjs` reports 0 `BROKEN` for the config directory
- [ ] No fields inherited from the parent version are redefined; `targetSpecs` scope is correct
- [ ] Lint messages match Critical Rule 2 patterns; files named `{kebab-field}--{rule}.ts`; new codes in `codes.ts` follow the naming and numbering of their block
- [ ] No `'reference'` in any `linterParams`
- [ ] OAS 3.2+ docs URLs are GitHub `3.2.0.md` links, with anchors that exist there (`verify-urls.mjs`: 0 `BROKEN`)
- [ ] Tests use `assert.deepEqual` with full Diagnostic objects
- [ ] All imports use `.ts` extension; single quotes
- [ ] `npm run build`, `npm run test`, `npm run typescript:check-types` and `npm run lint` pass

## References

### Existing Configurations to Reference

- **OpenAPI 3.1**: `packages/apidom-ls/src/config/openapi/openapi3_1/`
- **OpenAPI 3.0**: `packages/apidom-ls/src/config/openapi/openapi3_0/`
- **AsyncAPI 3**: `packages/apidom-ls/src/config/asyncapi/asyncapi3/`
- **AsyncAPI 2**: `packages/apidom-ls/src/config/asyncapi/asyncapi2/`

### Key Files to Study

- `packages/apidom-ls/src/config/codes.ts` - All diagnostic codes
- `packages/apidom-ls/src/apidom-language-types.ts` - Type definitions
- `packages/apidom-ls/src/config/config.ts` - Main config aggregator
- `packages/apidom-ls/CLAUDE.md` - Lint rule and test guidelines

### Related Documentation

- **Language Server Protocol**: https://microsoft.github.io/language-server-protocol/
- **VSCode Language Extensions**: https://code.visualstudio.com/api/language-extensions/overview
- **ApiDOM Core Concepts**: `packages/apidom-core/README.md`
