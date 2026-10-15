---
name: add-namespace
description: Creates a new namespace package (apidom-ns-{spec}-{version}) for a new API specification or a new specification version in the ApiDOM monorepo, including element classes, refractor visitors, the specification object, predicates, media types, tests and package config. Use when adding support for a new spec (e.g. RAML, API Blueprint) or a new version of an existing one (e.g. OpenAPI 3.3, AsyncAPI 4.0), even if the user only asks to "add support for" a spec version and never says "namespace".
disable-model-invocation: false
user-invocable: true
---

# Add Namespace Package Skill

## Overview

This skill guides you through creating a complete namespace package (`apidom-ns-{spec}-{version}`) for a new API specification version. It automates the creation of all required files and directories following ApiDOM's established patterns.

This file holds the workflow and the rules. Code templates and longer examples live in `references/` and are meant to be read on demand, at the phase that needs them:

| Reference file | Contents | Read when |
|----------------|----------|-----------|
| `references/package-config.md` | Directory layout, `package.json`, `tsconfig.json`, `tsconfig.declaration.json`, README structure, CHANGELOG header | Phase 2, Phase 3 steps 3.1, 3.10, 3.11, 3.13 |
| `references/elements-and-namespace.md` | Element class template, type mappings, `namespace.ts`, `predicates.ts`, `media-types.ts`, `registration.ts`, `index.ts`, naming conventions (incl. root element), reserved field names, CSS classes, NCEs | Phase 3 steps 3.2-3.5, 3.8, 3.9 |
| `references/refractor-visitors.md` | Fixed fields / map / dynamic type detection visitors, `specification.ts`, advanced specification patterns, parent namespace inheritance, common specification features (from OAS 3.2) | Phase 1 (feature checklist), Phase 3 steps 3.6, 3.7 |
| `references/replace-empty-element.md` | Plugin template, which fields need `schema` entries, wiring, tests | Phase 3 step 3.12, Phase 5 |
| `references/testing.md` | Sibling parity, every-field rule, element refractor test, `test/predicates.ts`, adapter-path normalization test | Phase 5 |
| `references/troubleshooting.md` | Build errors, test failures, type errors | Phase 6, when something fails |

## When to Use

Use this skill when:
- Adding support for a completely new API specification (e.g., RAML, API Blueprint)
- Adding a new major/minor version of an existing specification (e.g., OpenAPI 4.0, OpenAPI 3.3, AsyncAPI 4.0)
- The specification can be serialized in JSON or YAML format

**Recent Example**: OpenAPI 3.2.0 support was added using these patterns, introducing features like:
- New HTTP methods (QUERY)
- Dynamic operations (additionalOperations)
- Reusable media types (components.mediaTypes)
- Global JSON Schema dialect (jsonSchemaDialect)

## Prerequisites

Before running this skill:
1. **Understand the specification**: Read and analyze the specification document thoroughly
2. **Determine parent namespace**: Identify if you can base your implementation on an existing namespace (e.g., AsyncAPI 3 based on AsyncAPI 2)
3. **Identify all elements**: List all object types defined in the specification
4. **Map specification structure**: Understand the hierarchical relationships between elements

## IMPORTANT: Common Mistakes to Avoid

**READ THIS SECTION CAREFULLY** before starting implementation. Refer to `CLAUDE.md` in the repository root for detailed guidelines.

### Critical Validation Steps

When implementing a new specification version (especially when extending a parent version):

1. **Check Parent Version First** (⚠️ MOST COMMON MISTAKE):
   - Before adding ANY field to an element, check if it already exists in the parent version
   - Example: Don't add `Components.pathItems` in OAS 3.2 if it already exists in OAS 3.1
   - Read the parent namespace element file: `packages/apidom-ns-{parent}/src/elements/{ElementName}.ts`
   - Read the parent specification document to understand what fields already exist

2. **Verify Field Existence in Specification**:
   - Confirm field names appear in official specification "Fixed Fields" tables
   - Don't add fields that don't exist (e.g., don't add `components.webhooks` if spec has `webhooks` at root level)
   - Cross-reference with JSON Schema files and specification examples

3. **Implement ALL New Fields**:
   - Create a comprehensive checklist of ALL objects and fields
   - Compare systematically against parent version
   - Don't skip fields that seem unimportant - implement everything

4. **Verify All URLs**:
   - Test every URL with `curl -I <url>` before using it
   - Common URLs: dialect URLs, schema URLs, specification URLs
   - Example: Use `https://spec.openapis.org/oas/3.2/dialect/2025-09-17` (with date), not `.../dialect/base`

5. **Search Before Creating**:
   - Before creating new files, search for similar existing files
   - Use Glob/Grep to find related implementations
   - Don't create duplicates (e.g., `OpenApi3-1.ts` when `OpenApi3-2.ts` should be used)

### Pre-Implementation Checklist

Before writing ANY code:
- [ ] Read FULL official specification (not summaries)
- [ ] Read parent version specification (if extending)
- [ ] Read parent namespace implementation files
- [ ] Create comparison table: parent version vs current version
- [ ] Mark which fields are NEW vs inherited
- [ ] Verify all URLs exist (test with curl)
- [ ] List ALL new fields for each object

## Skill Instructions

### Phase 1: Gather Information

Ask the user for the following information:

1. **Specification Name**: The name of the specification (e.g., 'openapi', 'asyncapi', 'arazzo')
2. **Specification Version**: The version string (e.g., '3-1', '2', '4-0')
3. **Package Description**: Short description for package.json
4. **Parent Namespace** (optional): If basing on existing namespace, which one? (e.g., '@swagger-api/apidom-ns-asyncapi-2')
5. **Specification Elements**: List of all element types in the specification with their properties

   For each element, collect:
   - Element name (PascalCase, e.g., 'Workflow', 'Info', 'Server')
   - Element type: 'object' | 'array' | 'string' | 'number' | 'boolean'
   - Properties (for object types):
     - Property name (camelCase)
     - Property type (StringElement, ArrayElement, ObjectElement, or custom element type)
     - Whether it's a fixed field or patterned field
   - CSS classes (optional, for specialized element identification)
   - Whether it's the root specification element

While building the parent-vs-current comparison table, skim "Common Specification Features to Support" in `references/refractor-visitors.md`. It lists the kinds of changes new versions typically introduce (new HTTP methods, dynamic operation collections, reusable component types, global configuration fields, webhooks, self-reference fields, extended metadata fields), which makes it harder to overlook a new field.

### Phase 2: Create Package Structure

Read "Package Directory Layout" in `references/package-config.md` and create that tree under `packages/apidom-ns-{spec}-{version}/`. In short:

- `src/elements/` (plus `nces/` for Named Collection Elements), `src/refractor/` (visitors, plugins, specification, registration, toolbox), `src/traversal/`, and `src/{index,namespace,predicates,media-types}.ts`
- `test/` (refractor element tests with `__snapshots__/`, fixtures, `mocha-bootstrap.ts`, `predicates.ts`, `tsconfig.json`)
- `config/api-extractor/` and `vite.config.ts`
- `package.json`, `tsconfig.json`, `tsconfig.declaration.json`, `README.md`

Search the repository for an existing package with the same name or overlapping files before creating anything.

### Phase 3: Generate Core Files

Work through these steps in order. Each step names the reference file holding its template; read that file before writing the step's code, and replace every `{placeholder}`.

| Step | File(s) | Template in |
|------|---------|-------------|
| 3.1 | `package.json` | `references/package-config.md` |
| 3.2 | `src/elements/{ElementName}.ts` for each element | `references/elements-and-namespace.md` |
| 3.3 | `src/namespace.ts` | `references/elements-and-namespace.md` |
| 3.4 | `src/predicates.ts` | `references/elements-and-namespace.md` |
| 3.5 | `src/media-types.ts` | `references/elements-and-namespace.md` |
| 3.6 | `src/refractor/visitors/{spec}-{version}/{element-name}/index.ts` for each element | `references/refractor-visitors.md` |
| 3.7 | `src/refractor/specification.ts` | `references/refractor-visitors.md` |
| 3.8 | `src/refractor/registration.ts` | `references/elements-and-namespace.md` |
| 3.9 | `src/index.ts` (main export) | `references/elements-and-namespace.md` |
| 3.10 | `tsconfig.json` | `references/package-config.md` |
| 3.11 | `tsconfig.declaration.json` | `references/package-config.md` |
| 3.12 | `src/refractor/plugins/replace-empty-element.ts` | `references/replace-empty-element.md` |
| 3.13 | `README.md` and `CHANGELOG.md` | `references/package-config.md` |

Key points per step (details and code are in the reference files):

- **3.1**: Add the parent namespace to `dependencies` if extending an existing namespace.
- **3.2**: When extending a parent version, the element class extends the parent element and adds getters/setters only for fields that are NEW in this version. Redefining inherited fields is the most common mistake in review, because it duplicates behaviour that already works. Fields named like an ApiDOM element property (`id`, `element`, `meta`, `attributes`, `content`, `classes`, ...) get a renamed accessor; see "Reserved Field Names" in `references/elements-and-namespace.md`. Implement every field of the field map and nothing else: no field from another version or from the spec's JSON Schema that isn't in its Fixed Fields table (PR #5182 added a non-existent `AgentCard.url` and missed `AgentSkill.id`).
- **Root element name**: `{spec}{Name}{major}` style, unique across namespaces: `openApi3_1`, `asyncApi3`, `arazzoSpecification1`, `a2aAgentCard1`. A bare object name such as `agentCard` doesn't identify the spec and version, and was renamed in review (PR #5182).
- **3.4**: Every element needs an `is{ElementName}Element` predicate; add `hasClass` checks for elements with CSS classes.
- **3.6**: Pick the visitor type per field: `FixedFieldsVisitor` for objects with known properties, `MapVisitor` for dynamic key-value collections, and dynamic type detection for collections that can hold a Reference or a concrete element. Set `canSupportSpecificationExtensions` to `true` only for elements that accept `x-*` fields per the spec. A visitor used by a single element lives in that element's visitor directory (`visitors/{spec}-{version}/agent-capabilities/ExtensionsVisitor.ts`), not at the top level.
- **3.12**: Add a `schema` entry for every object-, array- and map-valued field of the field map, including array items (`'<*>'`) and map values (`'[key: *]'`). apidom-ls needs it for YAML documents.
- **3.13**: README: copy the sibling namespace's README and keep its sections and order (Installation, namespace, Predicates, Traversal, Refractors, Refractor plugins with "Replace Empty Element plugin", Implementation progress), adapting examples. CHANGELOG: header only, no entries; release automation writes them (see `references/package-config.md`).
- **3.7**: When extending a parent, spread the parent `specificationObj` and override only changed or new objects, reusing parent visitors where possible.
- Naming: element classes PascalCase, registered element names camelCase, visitor directories kebab-case (see the naming sections in the reference files).

### Phase 4: Copy Supporting Files

Copy the following files from a similar namespace package (e.g., `apidom-ns-arazzo-1`):

1. `src/refractor/visitors/generics/FixedFieldsVisitor.ts`
2. `src/refractor/visitors/generics/PatternedFieldsVisitor.ts`
3. `src/refractor/visitors/generics/MapVisitor.ts`
4. `src/refractor/visitors/FallbackVisitor.ts`
5. `src/refractor/visitors/SpecificationExtensionVisitor.ts`
6. `src/refractor/visitors/SpecificationVisitor.ts`
7. `src/refractor/visitors/Visitor.ts`
8. `src/refractor/index.ts` (createRefractor function)
9. `src/refractor/toolbox.ts`
10. `src/refractor/predicates.ts`
11. `src/traversal/visitor.ts`
12. `test/mocha-bootstrap.ts`
13. `config/api-extractor/api-extractor.json` (update package name)
14. `vite.config.ts` (update package and library name)

**Copy, then prune.** Copied files carry the source spec's features and wording. After copying:

- Spec has no Reference Object / `$ref`: remove `isReferenceLikeElement` and reference handling from `src/refractor/predicates.ts` and the visitors.
- Spec has no `x-*` extensions: remove `SpecificationExtensionVisitor`, `isSpecificationExtension` and the `canSupportSpecificationExtensions` branches. PR #5182 kept both for A2A, which has neither; the code could never run.
- Grep the copied files for the source spec's names and fix comments and doc blocks (`FallbackVisitor` still said "Given OpenApi3_1Visitor ...").

```bash
grep -rn -i -e "{source-spec}" -e "{SourceRoot}" packages/apidom-ns-{spec}-{version}/src
```

### Phase 5: Generate Tests

Before writing tests, read `references/testing.md`. Its two rules: mirror the sibling package's test files (checked with `check-test-parity.mjs`), and set every field of the element. Create:

- `test/refractor/elements/{ElementName}/index.ts` for each element (snapshot test of the refracted tree, every field set)
- `test/predicates.ts` covering every `is{ElementName}Element` predicate (instance, subtype, non-element, duck-typing)
- `test/refractor/plugins/replace-empty-element/` (object fields, array items, map values)
- an adapter-path test for any input normalization the refractor does
- `test/tsconfig.json`

### Phase 6: Build and Test

1. **Build the monorepo** (required before testing):
   ```bash
   npm run build
   ```

2. **Run tests for the new package**:
   ```bash
   cd packages/apidom-ns-{spec}-{version}
   npm run test
   ```

3. **Run type checking**:
   ```bash
   npm run typescript:check-types
   ```

4. **Run linting**:
   ```bash
   npm run lint
   ```

If any of these fail, read `references/troubleshooting.md`.

### Phase 7: Update Root Configuration

1. **Add to root package.json workspaces** (if not already included by glob pattern)

2. **Update root tsconfig.json** with project reference:
   ```json
   {
     "references": [
       { "path": "./packages/apidom-ns-{spec}-{version}" }
     ]
   }
   ```

3. **Root `package.json` `unlink` script** and root `README.md` package list: add the new package.

Do not add entries to the package `CHANGELOG.md`; it keeps only the standard header until the first release.

## Final Verification Checklist

Before reporting the namespace as done:

- [ ] No fields from the parent version are redefined in element classes or the specification object
- [ ] ALL new fields from the specification's "Fixed Fields" tables are implemented, and no invented fields were added
- [ ] Every URL used (dialects, schemas, specification links) was verified with `curl -I` and returns 200
- [ ] No duplicate files (searched before creating)
- [ ] Every element has an element class, a namespace registration, a predicate, a visitor, a `specification.ts` entry, a `registration.ts` refractor, exports in `src/index.ts`, and a test that sets every field
- [ ] `replace-empty-element` plugin covers every object/array/map field (incl. array items and map values), is exported, tested and documented in the README
- [ ] Root element name follows `{spec}{Name}{major}`; reserved field names use renamed accessors
- [ ] No copied predicates, visitors or comments for features the spec doesn't have (references, `x-*` extensions, other spec names)
- [ ] README has the sibling namespace's sections; CHANGELOG is header-only
- [ ] `check-test-parity.mjs` against the sibling's tests: every `MISSING` added or justified
- [ ] All imports use the `.ts` extension
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] `npm run typescript:check-types` passes
- [ ] `npm run lint` passes
- [ ] Root configuration (workspaces, tsconfig references, `unlink` script, README package list) updated

## Next Steps After Namespace Creation

`/add-spec-version` runs these as separate phases, one PR each:

1. **Parser adapters** (`/add-parser-adapter`): `apidom-parser-adapter-{spec}-json-{version}` and `-yaml-{version}`
2. **apidom-reference** (`/add-reference-support`): parse parsers, resolve/dereference/bundle strategies
3. **apidom-ls** (`/update-ls-config`, then `/review-ls-changes`): completion, documentation, lint
4. **swagger-editor** (outside this repo, if applicable): import the namespace, add a preview plugin

## References

- **PDF Instructions**: Section on "Adding a completely new specification"
- **Example Packages**:
  - Simple: `apidom-ns-arazzo-1` (26 elements, workflow-focused)
  - Medium: `apidom-ns-openapi-3-1` (34 elements, JSON Schema integration)
  - Complex: `apidom-ns-asyncapi-3` (131 elements, protocol bindings)
- **Architecture**: See CLAUDE.md "Three-Stage Processing Pipeline"
- **Templates and examples**: `references/` (see the table in the Overview)
