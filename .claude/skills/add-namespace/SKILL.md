---
name: add-namespace
description: Creates or fixes a namespace package (apidom-ns-{spec}-{version}) in the ApiDOM monorepo for a new API specification or a new specification version, including element classes, refractor visitors, the specification object, predicates, media types, tests and package config. Use when the namespace package itself is the job, for example "create apidom-ns-openapi-3-3", "add the elements for RAML", "fix the refractor/specification object of the new namespace", or as phase 1 of /add-spec-version, even if the user doesn't say "namespace". End-to-end requests to "add support for" a spec version (namespace, parser adapters, apidom-reference, apidom-ls) belong to /add-spec-version, which runs this skill as its first phase.
---

# Add Namespace Package Skill

## Overview

This skill guides you through creating a complete namespace package (`apidom-ns-{spec}-{version}`) for a new API specification version. It automates the creation of all required files and directories following ApiDOM's established patterns.

This file holds the workflow and the rules. Code templates and longer examples live in `references/` and are meant to be read on demand, at the phase that needs them:

| Reference file | Contents | Read when |
|----------------|----------|-----------|
| `references/package-config.md` | Directory layout, `package.json`, `tsconfig.json`, `tsconfig.declaration.json`, README structure, CHANGELOG header | Phase 2, Phase 3 steps 3.1, 3.10, 3.11, 3.13 |
| `references/elements-and-namespace.md` | Element class template, type mappings, `namespace.ts`, `predicates.ts`, `media-types.ts`, `registration.ts`, `index.ts`, naming conventions (incl. root element), reserved field names, CSS classes, NCEs | Phase 3 steps 3.2-3.5, 3.8, 3.9 |
| `references/refractor-visitors.md` | Fixed fields / map / reference-or-object / patterned fields visitors, extending a parent's visitor, `specification.ts` for a brand-new spec and for a parent extension, common specification features (from OAS 3.2) | Phase 1 (feature checklist), Phase 3 steps 3.6, 3.7 |
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

## Rules That Reviews Keep Catching

The root `CLAUDE.md` ("Best Practices for Adding Specification Versions") is always loaded and covers
the general rules: check the parent version first, verify every field against the spec, implement all
new fields, verify URLs, search before creating. This skill adds the namespace-specific parts:

1. **The field map is the source of fields.** Work from the parent-vs-new field map (built by
   `/add-spec-version`, or by you in Phase 1). Each field comes from this version's Fixed Fields tables
   and is marked `NEW` or `INHERITED`. The spec's JSON Schema may be used to double-check a field's
   type, never as a source of fields: it can contain fields that aren't in the Fixed Fields tables
   (PR #5182 added a non-existent `AgentCard.url` and missed `AgentSkill.id`).
2. **Inherited fields are not redefined**, neither as element getters nor as new field visitors in
   `specification.ts`; the parent's code already handles them, and a copy drifts from it. Run
   `node .claude/skills/add-spec-version/scripts/check-redefined-fields.mjs packages/apidom-ns-{spec}-{version}`
   when extending a parent.
3. **Verify URLs with the script**, not by eye: dialect, schema and specification URLs (including
   `#anchors`) go through
   `node .claude/skills/add-spec-version/scripts/verify-urls.mjs packages/apidom-ns-{spec}-{version}`.
   It checks status codes and anchors. Fall back to `curl -I <url>` only for a single URL the script
   reports as `UNVERIFIED`.
4. **Copy real files, then adapt.** The templates in `references/` are taken from
   `apidom-ns-arazzo-1`, `apidom-ns-a2a-1` and `apidom-ns-openapi-3-2`; when a template and the sibling
   package disagree, the sibling package is right.

## Skill Instructions

### Phase 1: Gather Information

You need:

1. **Specification name** (e.g. `openapi`, `asyncapi`, `arazzo`) and **version** in package form
   (`3-2`, `1`)
2. **Package description** for `package.json`
3. **Parent namespace**, if the version extends an existing one (e.g.
   `@swagger-api/apidom-ns-openapi-3-1` for OpenAPI 3.2), and the **sibling package** to copy from
   (`apidom-ns-arazzo-1` or `apidom-ns-a2a-1` for a brand-new spec, the parent otherwise)
4. **The field map**: every object of the spec, every field with its type, whether it is a fixed or
   patterned field, and `NEW` / `INHERITED` status against the parent. Also note the root object, which
   fields are maps or arrays (they become NCEs), whether the spec has a Reference Object (`$ref`) and
   whether it allows `x-*` extensions.

Where to get it, in order:

- **Invoked from `/add-spec-version`, or a tracking doc `ADD-{SPEC}-{VERSION}.md` exists at the repo
  root**: take items 1-4 from the tracking doc and its field map. Don't ask the user again.
- **Otherwise**: read the official specification yourself and build the field map following
  `.claude/skills/add-spec-version/references/field-map-template.md`. The element list comes from the
  spec's object definitions and Fixed Fields tables, not from the user typing it out.

Ask the user only for what can't be inferred: typically the spec URL or version if they weren't given,
and the package description if the spec's own summary doesn't fit.

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
- **3.6**: Pick the visitor type per field: `FixedFieldsVisitor` for objects with known properties, `MapVisitor` for key-value collections of one type, and a `specPath` function using `isReferenceLikeElement` for collections whose values can be a Reference Object or a concrete object. When extending a parent, an existing object's visitor subclasses the parent's visitor and only swaps the element class. Set `canSupportSpecificationExtensions` to `true` only for elements that accept `x-*` fields per the spec. A visitor used by a single element lives in that element's visitor directory (`visitors/{spec}-{version}/agent-capabilities/ExtensionsVisitor.ts`), not at the top level.
- **3.12**: Add a `schema` entry for every object-, array- and map-valued field of the field map, including array items (`'<*>'`) and map values (`'[key: *]'`). apidom-ls needs it for YAML documents.
- **3.13**: README: copy the sibling namespace's README and keep its sections and order (Installation, namespace, Predicates, Traversal, Refractors, Refractor plugins with "Replace Empty Element plugin", Implementation progress), adapting examples. CHANGELOG: header only, no entries; release automation writes them (see `references/package-config.md`).
- **3.7**: When extending a parent, list every object with this version's own `$visitor`, and fill `fixedFields` field by field: reuse the parent's entry (`ParentSpecification.visitors.document.objects.{Object}.fixedFields.{field}`) for inherited fields and add new fields with a `// {Spec} {version} addition` comment. Don't spread the parent's `objects`; see `apidom-ns-openapi-3-2/src/refractor/specification.ts`.
- Naming: element classes PascalCase, registered element names camelCase, visitor directories kebab-case (see the naming sections in the reference files).

### Phase 4: Copy Supporting Files

Which files are copied depends on whether the namespace stands alone or extends a parent.

**Brand-new spec** (no parent, like `apidom-ns-arazzo-1` and `apidom-ns-a2a-1`): copy these from the
sibling package and adapt them:

1. `src/refractor/visitors/generics/FixedFieldsVisitor.ts`, `PatternedFieldsVisitor.ts`, `MapVisitor.ts`
2. `src/refractor/visitors/FallbackVisitor.ts`, `SpecificationVisitor.ts`, `Visitor.ts`
3. `src/refractor/visitors/SpecificationExtensionVisitor.ts` (only if the spec has `x-*` extensions)
4. `src/refractor/predicates.ts` (`isReferenceLikeElement`, extension predicate)
5. `src/refractor/index.ts` (`refract`, `createRefractor`), `src/refractor/toolbox.ts`
6. `src/traversal/visitor.ts`
7. `test/mocha-bootstrap.ts`, `.mocharc.json`, `.eslintignore`, `.gitignore`, `.npmrc`
8. `config/api-extractor/api-extractor.json`, `vite.config.ts` (update package and library name)

**Extending a parent** (like `apidom-ns-openapi-3-2` on `apidom-ns-openapi-3-1`): the generic
visitors, `FallbackVisitor`, `SpecificationVisitor`, `Visitor`, `SpecificationExtensionVisitor` and
`isReferenceLikeElement` are imported from the parent package, not copied; the new package has no
`visitors/generics/` directory and no `src/refractor/predicates.ts`. Copy from the parent and adapt
only:

1. `src/refractor/index.ts` (default `specPath` points at the new root object, `Visitor` type imported
   from the parent), `src/refractor/toolbox.ts` (uses this namespace's predicates and namespace)
2. `src/traversal/visitor.ts`
3. The parent's refractor plugins (`src/refractor/plugins/`), so they produce this version's elements
4. Test setup, dotfiles, `config/api-extractor/api-extractor.json`, `vite.config.ts` as above

`src/index.ts` then re-exports the inherited visitor classes from the parent (see 3.9 in
`references/elements-and-namespace.md`).

**Copy, then prune** (brand-new spec). Copied files carry the source spec's features and wording. After copying:

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

### Phase 7: Update Root Files

The root `package.json` `workspaces` glob (`./packages/*`) already picks up the new package, and the
root `tsconfig.json` has no project references, so neither needs an entry. What does change:

1. **`package-lock.json`**: run `npm i` at the repo root so the new workspace is recorded.
2. **Root `README.md`**: add the package to the `npm install` list and to "Available namespaces" under
   "ApiDOM Namespaces", in alphabetical order.
3. **Root `package.json` `unlink` script**: add the package name. The list is maintained by hand and is
   behind (OAS 3.2 and A2A were not added), so compare it with `ls packages` while you are there.

Do not add entries to the package `CHANGELOG.md`; it keeps only the standard header until the first release.

## Final Verification Checklist

Before reporting the namespace as done:

- [ ] No fields from the parent version are redefined in element classes or the specification object
- [ ] ALL new fields from the specification's "Fixed Fields" tables are implemented, and no invented fields were added
- [ ] `verify-urls.mjs` passes for every URL used (dialects, schemas, specification links, anchors)
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
- [ ] Root files updated: `package-lock.json` (`npm i`), README package lists, `unlink` script

## Next Steps After Namespace Creation

`/add-spec-version` runs these as separate phases, one PR each:

1. **Parser adapters** (`/add-parser-adapter`): `apidom-parser-adapter-{spec}-json-{version}` and `-yaml-{version}`
2. **apidom-reference** (`/add-reference-support`): parse parsers, resolve/dereference/bundle strategies
3. **apidom-ls** (`/update-ls-config`, then `/review-ls-changes`): completion, documentation, lint
4. **swagger-editor** (outside this repo, if applicable): import the namespace, add a preview plugin

## References

- **Example Packages**:
  - Simple: `apidom-ns-arazzo-1` (26 elements, workflow-focused)
  - Medium: `apidom-ns-openapi-3-1` (34 elements, JSON Schema integration)
  - Complex: `apidom-ns-asyncapi-3` (131 elements, protocol bindings)
- **Architecture**: See CLAUDE.md "Three-Stage Processing Pipeline"
- **Templates and examples**: `references/` (see the table in the Overview)
