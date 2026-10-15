# Phase Checklists

Each phase has two variants:

- **Extend**: the version goes into an existing namespace and existing adapters (AsyncAPI 2.6 in `apidom-ns-asyncapi-2`, AsyncAPI 3.1 in `apidom-ns-asyncapi-3`). Worked example: AsyncAPI 2.6.0, PRs #2535 / #2536 / #2537 / #2538 (commits `35c7e8f0d`, `c2d643904`, `36cbf2f73`, `04fcc6445`), and Jira SWG-19146 (AsyncAPI 3.1.0 in apidom-ls).
- **New**: the version gets its own namespace and adapter packages (OpenAPI 3.2: `apidom-ns-openapi-3-2`). Worked example: commit `ef97b5c32` (PR #5110). Integration points outside the new packages are listed in `integration-points.md`.

Inspect any worked example with `git show <commit> --stat` and `git show <commit> -- <path>`.

Choosing the variant: extend when the parent's adapters already detect the new version (`detectionRegExp` in `packages/apidom-parser-adapter-{spec}-json-*/src/adapter.ts`) and the namespace's scope covers it (AsyncAPI and Arazzo namespaces are per major version; OpenAPI namespaces are per minor version). Otherwise new.

## Phase 1: Namespace

### Extend (#2535)

In `packages/apidom-ns-{spec}-{major}/`:

- [ ] `src/media-types.ts`: add generic, `+json` and `+yaml` media types for the version; bump the `findBy` default version
- [ ] New elements for `NEW` objects (e.g. `elements/bindings/pulsar/*.ts`), with getters/setters only for their fields
- [ ] New fields on existing elements (getters/setters), per the field map
- [ ] `src/namespace.ts`: register new elements
- [ ] `src/index.ts`: export new elements, predicates, visitors
- [ ] `src/refractor/specification.ts`: fixed fields and visitors for new objects and fields
- [ ] `src/refractor/visitors/...`: visitors for new objects
- [ ] `src/refractor/registration.ts`: `refract` for new elements
- [ ] `src/traversal/visitor.ts`: `keyMap` entries for new elements
- [ ] `src/refractor/plugins/replace-empty-element.ts`: version range comment **and** entries for every new object/array/element-valued field. #2535 only updated the comment; #2538 had to add 25 lines later, so check every `NEW` field here
- [ ] `src/predicates.ts` for new elements
- [ ] Tests: `test/media-types.ts`, refractor fixture `test/refractor/fixtures/{spec}-{x}-{y}-{z}.json` and snapshot, element tests for new elements, version element test (e.g. `AsyncApiVersion`), `replace-empty-element` mappings/sequences tests, `test/perf` fixture
- [ ] `README.md`: supported versions list

### New (`/add-namespace`)

- [ ] Run `/add-namespace` with the field map
- [ ] `replace-empty-element` plugin for every object/array/map field (array items, map values), exported, tested, in README
- [ ] Copied predicates/visitors pruned to the spec's features (no `$ref`/`x-*` support the spec lacks)
- [ ] README with the sibling namespace's sections; CHANGELOG header only
- [ ] Tests mirror the sibling's (`check-test-parity.mjs`) and set every field
- [ ] Root `package.json` `unlink` script and root `README.md` package list
- [ ] `package-lock.json` via `npm i`

## Phase 2: Parser adapters

### Extend (#2536, `/add-parser-adapter` Phase 6)

- [ ] Detection regexp covers the version and patch releases; still rejects other majors
- [ ] `test/adapter.ts` and `test/media-types.ts` in the JSON and YAML adapters
- [ ] `test/fixtures/sample-api.{json,yaml}` and perf fixtures bumped
- [ ] Other specs' adapters: negative detection tests bumped to the new version
- [ ] `packages/apidom-parser/test/adapter-priority.ts` and `packages/apidom-parser/README.md`
- [ ] Both adapter READMEs: spec link, media types, examples

### New (`/add-parser-adapter` Phases 1-5, 7-9)

- [ ] JSON and YAML adapter packages
- [ ] READMEs with the sibling adapter's sections (incl. what `detect` looks at); CHANGELOG header only
- [ ] `test/adapter.ts` mirrors the sibling's contexts (`check-test-parity.mjs`)
- [ ] `detect` runs the regex before format detection
- [ ] Detection exclusive against the parent's adapters (test both directions)
- [ ] Root `package.json` `unlink`, root `README.md`, `package-lock.json`

## Phase 3: apidom-reference (`/add-reference-support`)

### Extend (#2537)

- [ ] `packages/apidom-reference/README.md` media type lists (parsers, resolve, dereference, bundle)
- [ ] Dereference fixtures for the latest version bumped (#2537 bumped ~160 files)
- [ ] Parser tests bumped, including other specs' negative tests
- [ ] Dereference visitor and fixtures for new referenceable fields

### New

- [ ] Parsers, resolve/dereference/bundle strategies, `saturated.ts`, `package.json` dependencies and `exports`, tests, README

## Phase 4: apidom-ls

### Extend (#2538, SWG-19146)

In `packages/apidom-ls/`:

- [ ] `src/config/{spec}/{spec}-version/` (e.g. `async-api-version`): completion item for the version, `lint/value--pattern-{x}-{y}-{z}.ts` registered in `lint/index.ts`, documentation pointing at the version
- [ ] `src/config/{spec}/target-specs.ts`: new constant (e.g. `AsyncAPI310`) added to its family group (e.g. `AsyncAPI3`)
- [ ] `src/config/{spec}/{element}/` for every `NEW` object: `meta.ts`, `documentation.ts`, `completion.ts`, `lint/` (`allowed-fields`, `--type`, `--required`, `--equals`); objects without fields get `meta`, `documentation` and an empty `allowed-fields` rule
- [ ] Register new metas in `src/config/{spec}/config.ts`
- [ ] Every `NEW` field on existing objects: completion item, documentation entry, lint rules
- [ ] Version-ranged rule files: rename when the range just extends (`allowed-fields-2-4--2-5.ts` to `allowed-fields-2-4--2-6.ts`); split when the new version accepts something the older ones must not (e.g. `ros2` in 3.1 bindings, not in 3.0)
- [ ] Documentation and completion that follow the latest version: bump spec URLs and versions
- [ ] `src/config/codes.ts`: new unique codes
- [ ] `src/services/completion/completion-service.ts`: version-specific insert text (e.g. `asyncapi: '2.6.0$1'`)
- [ ] JSON Schema validation, only where the family has it (AsyncAPI 2.x, OpenAPI 3.1+; AsyncAPI 3 has none): `src/services/validation/json-schema/{spec}-{xy}/` (downloaded from a verified URL), `src/services/validation/providers/{spec}-{xy}-json-schema-validation-provider.ts`, export in `src/index.ts`
- [ ] Tests: `test/{spec}-json.ts`, `test/{spec}-yaml.ts`, `test/complete.ts`, completion fixtures for the family, tests for new objects with full `Diagnostic` objects via `assert.deepEqual`

### New (`/update-ls-config` plus the LS items in `integration-points.md`)

- [ ] `/update-ls-config` with the field map
- [ ] `parser-factory.ts`, `utils/utils.ts` detection, `linter-functions.ts` `rootElementTypes`, JSON Schema validation, `package.json`
- [ ] Parent-version rules that also apply: extend `targetSpecs` and rename instead of duplicating

### Both

- [ ] `check-ls-coverage.mjs` reports 0 problems (`--ignore` only `INTERNAL` elements)
- [ ] `verify-urls.mjs` on the config directory: 0 `BROKEN`
- [ ] `/review-ls-changes` in a fresh subagent; every finding fixed
- [ ] apidom-playground wiring (new variant only; see `integration-points.md`)
- [ ] `find-unwired.sh {parent-id} {new-id}` (new variant) or `grep -rn "{previous version}"` over `packages/apidom-ls/src` (extend variant): every hit wired or justified
