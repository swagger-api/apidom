---
name: update-ls-config
description: Adds or updates apidom-ls language service configuration (completion items, hover documentation, lint rules, meta.ts and target-spec wiring) in packages/apidom-ls/src/config for a namespace package by analyzing its elements, refractor specification and parser adapters. Use when a new spec namespace or version (e.g. apidom-ns-openapi-3-2, apidom-ns-asyncapi-3, Arazzo) needs IDE support, or when an existing namespace gains new elements or fields that need autocomplete, hover docs or validation, even if the user doesn't say "ls config".
disable-model-invocation: false
user-invocable: true
---

# Update Language Service Config Skill

**Skill Name:** `update-ls-config`
**Description:** Updates apidom-ls configuration for a specific namespace package by analyzing the namespace structure and creating completion, documentation, and lint configurations.

## Overview

This skill automates the process of updating the language service (apidom-ls) configuration for a namespace package. It analyzes the namespace package structure, corresponding parser adapter packages, and generates appropriate configuration files for IDE features like autocomplete, hover documentation, and validation.

**Scale**: Based on OpenAPI 3.2.0 implementation, expect to create:
- 70+ completion items for comprehensive property suggestions
- 50+ lint rules for validation (one per element type minimum)
- Documentation for complex/union type properties
- Support for all specification elements and their nested properties

### Reference Files (load on demand)

| File | Read when |
|------|-----------|
| `references/version-wiring.md` | Phase 4 (target-specs.ts), Phase 5.1 (directory layout), 5.7 (meta.ts), Phase 7 (config.ts, symbols.ts); naming conventions |
| `references/completion-and-documentation.md` | Phase 5.2 (completion.ts), 5.3 (documentation.ts), Phase 6 element completion/docs |
| `references/lint-rules.md` | Phase 5.4-5.6 (allowed-fields, `{field}--{type}.ts`, lint index), Phase 6 element lint rules |
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

1. **Copy existing patterns first**: before writing any rule, find 2-3 similar existing rules and copy their shape (e.g. `find packages/apidom-ls/src/config -name "*--required*.ts" | head -3`). Read `packages/apidom-ls/CLAUDE.md` (sections 1-7) instead of reinventing guidance.
2. **Lint error message patterns** (copy exactly):
   - Required: `"should always have a '{field}'"` (never `"must contain '{field}' field"`)
   - Type: `"'{field}' must be a {type}"`
   - Array of elements: `"'{field}' must be an array of {Type} Objects"`
   - Array of primitives: `"'{field}' must be an array of {type}s"`
   - Map values: `"{Object} values must be of {Type} shape"`
3. **File naming**: `{field}--{type}.ts` or `{field}--{type}-{version}.ts` (e.g. `title--required.ts`, `summary--type.ts`). Never verbose names like `field--required-when-condition.ts`.
4. **No `'reference'` in `linterParams`**: the refractor handles reference elements.
5. **No unnecessary comments** in straightforward validation code.
6. **Only new fields**: check the parent version's config and namespace element first; never redefine fields inherited from the parent version. Scope new rules with the correct `targetSpecs`.
7. **OpenAPI 3.2+ documentation URLs must be GitHub links with camelCase anchors**: `https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#pathItemObject` (not `spec.openapis.org`, not kebab-case). OAS 3.0.x keeps `https://spec.openapis.org/oas/v3.0.4.html#kebab-case-anchor`; OAS 3.1.x keeps the GitHub `3.1.0.md#camelCaseAnchor` format.
8. **Tests use `assert.deepEqual` on full Diagnostic objects** (range, message, severity, code, source, data). Never filter and check selected properties. See `packages/apidom-ls/CLAUDE.md` section 8:
   ```typescript
   const result = await languageService.doValidation(doc);
   const expected: Diagnostic[] = [
     {
       range: { start: { line: 10, character: 14 }, end: { line: 10, character: 28 } },
       message: "'enum' must be an array of strings",
       severity: 1,
       code: 2120100,
       source: 'apilint',
       data: {},
     },
   ];
   assert.deepEqual(result, expected);
   ```
   For valid documents: `assert.deepEqual(apilintErrors, [])`.

## Skill Instructions

### Phase 1: Gather Information

Ask the user for the following information:

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
   - If YES: Ask user whether to update or skip

Version directory naming: lowercase with underscore (`openapi3_2`, `asyncapi3`, `arazzo1_0`), matching other version directories.

### Phase 4: Generate Target Spec Definition

**Read `references/version-wiring.md`** (sections "Target Spec Naming Convention" and "Update target-specs.ts").

1. Open `packages/apidom-ls/src/config/{spec}/target-specs.ts`.
2. Add the new version constant if it doesn't exist (e.g. `export const OpenAPI32 = Symbol.for('openapi3.2');`).
3. Update the `targetSpecs` array to include the new symbol.

### Phase 5: Generate Configuration Files

1. **5.1 Create version directory** `packages/apidom-ls/src/config/{spec}/{version}/` with `completion.ts`, `documentation.ts`, `lint/` and `meta.ts`. Layout: `references/version-wiring.md`.
2. **5.2 Generate completion.ts**: **read `references/completion-and-documentation.md`** for the template, coverage strategy (root, nested, collection, value and special-field completions), format selection rules, condition functions and the OpenAPI 3.2.0 item breakdown. Aim for comprehensive coverage of all properties at all nesting levels.
3. **5.3 Generate documentation.ts**: same reference file. Document complex/union-type properties; list omitted simple fields in the header comment; link with correct version URLs (Critical Rule 7).
4. **5.4 Generate lint/allowed-fields.ts**: **read `references/lint-rules.md`** for the template.
5. **5.5 Generate lint/{element}--type.ts files**: same reference file for the type validation template, linter functions by validation type, linter function mapping, coverage list and the Info lint directory example. Apply Critical Rules 2-5.
6. **5.6 Generate lint/index.ts**: aggregate all lint rules (template in `references/lint-rules.md`).
7. **5.7 Generate meta.ts**: aggregate lint, completion and documentation (template in `references/version-wiring.md`).

If the version introduces new HTTP methods, dynamic collections, version-specific, hierarchical, global configuration, self-reference or `$ref`-or-inline fields, **read `references/special-cases-and-elements.md`**.

### Phase 6: Update Element-Specific Configs

For each element type in the namespace (e.g., Info, Server, PathItem):

1. **Check if element config directory exists**:
   - Path: `packages/apidom-ls/src/config/{spec}/{element-name}/`
   - If it doesn't exist and element is specific to this version, create it

2. **Generate element completion config**:
   - List all properties of the element
   - Generate completion items for each property

3. **Generate element documentation config**:
   - Document complex properties

4. **Generate element lint rules**:
   - Type validation for each property
   - Required field validation
   - Allowed fields validation

Use `references/completion-and-documentation.md` and `references/lint-rules.md` for templates, and the "Common Element Types to Include" list in `references/special-cases-and-elements.md` as the baseline set.

### Phase 7: Update Main Config Files

**Read `references/version-wiring.md`** (section "Update Main Config Files").

1. **7.1** In `config/{spec}/config.ts`, add import and export for the new version config (`{version}Meta`).
2. **7.2** In `config/{spec}/symbols.ts`, add symbols if new element types were introduced.

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

4. **Test the configuration**:
   - Open a sample file in an IDE with the language server
   - Verify autocomplete works for the new version
   - Verify hover documentation appears
   - Verify validation/linting works

5. **Add/update tests** in `packages/apidom-ls/test/` following Critical Rule 8, then run `npm run test` in `packages/apidom-ls`.

On failures, **read `references/troubleshooting.md`**.

### Phase 9: Document Changes

Update `packages/apidom-ls/README.md` or `CHANGELOG.md` to reflect:
- New specification version support
- Added completion items
- Added validation rules
- Any breaking changes

## Final Verification Checklist

- [ ] Target spec symbol added to `target-specs.ts` and `targetSpecs` array
- [ ] `{version}/completion.ts`, `documentation.ts`, `lint/index.ts`, `meta.ts` exist and are wired into `config/{spec}/config.ts`
- [ ] Every new element/field has completion, documentation (if complex/union) and lint coverage
- [ ] No fields inherited from the parent version are redefined; `targetSpecs` scope is correct
- [ ] Lint messages match Critical Rule 2 patterns; files named `{field}--{type}.ts`
- [ ] No `'reference'` in any `linterParams`
- [ ] OAS 3.2+ docs URLs are GitHub links with camelCase anchors
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
