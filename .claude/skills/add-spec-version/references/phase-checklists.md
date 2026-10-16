# Phase Checklists

Each phase has two variants:

- **Extend**: the version goes into an existing namespace and existing adapters (AsyncAPI 2.6 in `apidom-ns-asyncapi-2`, AsyncAPI 3.1 in `apidom-ns-asyncapi-3`). Worked examples: AsyncAPI 2.6.0, PRs #2535 / #2536 / #2537 / #2538 (commits `35c7e8f0d`, `c2d643904`, `36cbf2f73`, `04fcc6445`), and AsyncAPI 3.1.0, PRs #5261 / #5262 / #5263 / #5264 (Jira SWG-19146 for apidom-ls).
- **New**: the version gets its own namespace and adapter packages (OpenAPI 3.2: `apidom-ns-openapi-3-2`). Worked example: commit `ef97b5c32` (PR #5110). Integration points outside the new packages are listed in `integration-points.md`.

Inspect any worked example with `git show <commit> --stat` and `git show <commit> -- <path>`.

Choosing the variant: extend when the parent's adapters already detect the new version (`detectionRegExp` in `packages/apidom-parser-adapter-{spec}-json-*/src/adapter.ts`) and the namespace's scope covers it (AsyncAPI and Arazzo namespaces are per major version; OpenAPI namespaces are per minor version). Otherwise new.

## Phase 1: Namespace

### Extend (#2535)

In `packages/apidom-ns-{spec}-{major}/`:

- [ ] `src/media-types.ts`: add generic, `+json` and `+yaml` media types for the version; bump the `findBy` default version. Every `mediaTypes.latest()` caller (the multi-format schema visitor's default `schemaFormat`, `replace-empty-element`) now gets the new version, and `mediaTypes.includes()` makes the new schema format media types refract to Schema elements
- [ ] New elements for `NEW` objects (e.g. `elements/bindings/pulsar/*.ts`), with getters/setters only for their fields. When this namespace's elements extend another major's (`apidom-ns-asyncapi-3` extends `apidom-ns-asyncapi-2`), objects that exist only from this version are written natively here (`apidom-ns-asyncapi-3/src/elements/bindings/ros2/` in #5261), and the subclass of the container element gets the accessor (`ServerBindings.ros2` and its three siblings)
- [ ] Nested objects the sibling bindings don't model as elements (Kafka `topicConfiguration`, Pulsar `retention`, ROS 2 `qosPolicies`) stay plain objects: value visitor in `specification.ts`, `ObjectElement` entry in `replace-empty-element`
- [ ] New fields on existing elements (getters/setters), per the field map
- [ ] `src/namespace.ts`: register new elements
- [ ] `src/index.ts`: export new elements, predicates, visitors
- [ ] `src/refractor/specification.ts`: fixed fields and visitors for new objects and fields
- [ ] `src/refractor/visitors/...`: visitors for new objects
- [ ] `src/refractor/registration.ts`: `refract` for new elements
- [ ] `src/traversal/visitor.ts`: `keyMap` entries for new elements
- [ ] `src/refractor/plugins/replace-empty-element.ts`: version range comment **and** entries for every new object/array/element-valued field. #2535 only updated the comment; #2538 had to add 25 lines later, so check every `NEW` field here
- [ ] `src/predicates.ts` for new elements, when their siblings have predicates (AsyncAPI binding elements have none)
- [ ] Version range comments (`AsyncApi >= 3.0.0 <=3.1.0 specification elements.`) in `index.ts`, `registration.ts`, `specification.ts`, `traversal/visitor.ts`, the multi-format schema visitor and the `replace-empty-element` example
- [ ] Tests: `test/media-types.ts`, refractor fixture `test/refractor/fixtures/{spec}-{x}-{y}-{z}.json` and snapshot, element tests for new elements, version element test (e.g. `AsyncApiVersion`), `replace-empty-element` mappings/sequences tests, `test/perf` fixture. Build the new fixture from the previous version's by inserting the new parts as text (re-serializing it with `json.dump` and prettier expands every inline object). Cover `CHANGED-TEXT` behaviour as well as `NEW` fields (AsyncAPI 3.1: scalar Message Example `payload`, Server `x-` extension, 3.1.0 `schemaFormat`)
- [ ] `README.md`: supported versions list (if the README is still a scaffold stub, as `apidom-ns-asyncapi-3`'s was, at least the versions list and installation)

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
- [ ] `test/adapter.ts` (new version, a patch release, rejection of the next major) and `test/media-types.ts` (keep the previous version's case, add the new one) in the JSON and YAML adapters
- [ ] Each adapter's `npm test` reports passing tests; check `.mocharc.json` `spec` (`asyncapi-json-3` pointed at `test/**/*.mjs` and ran none)
- [ ] `test/fixtures/sample-api.{json,yaml}` and perf fixtures bumped
- [ ] Other specs' adapters: keep their negative detection tests unchanged (don't swap `"asyncapi": "2.6.0"` for the new version)
- [ ] `packages/apidom-parser/test/adapter-priority.ts` and `packages/apidom-parser/README.md`, if they already use this family (AsyncAPI 3 isn't wired there)
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

- [ ] `packages/apidom-reference/README.md` media type lists (parsers, resolve, dereference, bundle). If the family has no sections there yet, add them (AsyncAPI 3 parsers and dereference strategy were undocumented until #5263); take the media types and their order from the parser class and the namespace
- [ ] Dereference fixtures for the latest version bumped (#2537 bumped ~160 files, #5263 116)
- [ ] Parser tests (`context` titles, fixtures) bumped, keeping an explicit `canParse` check for the previous version's media type; other specs' negative tests stay as they are
- [ ] Dereference visitor and fixtures for new referenceable fields; for new objects that can't hold references, an optional fixture reaching them through a `components` reference documents that they are transcluded (ROS 2 bindings in #5263)

### New

- [ ] Parsers; resolve/dereference/bundle strategies only if the spec has Reference Objects or `$ref` (/add-reference-support Phase 3); `saturated.ts`, `package.json` dependencies and `exports`, tests, README

## Phase 4: apidom-ls

### Extend (#2538, SWG-19146 / #5264)

In `packages/apidom-ls/`:

- [ ] `src/config/{spec}/{spec}-version/` (e.g. `async-api-version`): completion item for the version, `lint/value--pattern-{x}-{y}-{z}.ts` registered in `lint/index.ts` (a real `apilintValueRegex` rule with a quick fix, copied from `value--pattern-2-6-0.ts`, with a code next to the family's other version-pattern codes; not an empty `LinterMeta`), documentation pointing at the version
- [ ] `src/config/{spec}/target-specs.ts`: new constant (e.g. `AsyncAPI310`) added to its family group (e.g. `AsyncAPI3`)
- [ ] `src/config/{spec}/{element}/` for every `NEW` object: `meta.ts`, `documentation.ts`, `completion.ts`, `lint/` (`allowed-fields`, `--type`, `--required`, `--equals`, `--format-*`); objects without fields get `meta`, `documentation` and an empty `allowed-fields` rule. Bindings live in `config/{spec}/bindings/{protocol}/{kind}-binding/` with one `lint/` and `completion/` directory per binding version plus `latest` (conditions `bindingVersion` equals the version / `missingField bindingVersion`) and a root `binding-version--type.ts`, as Pulsar's; an empty binding's allowed-fields message quotes that object's own README sentence (the ROS 2 message binding's differs from its channel binding's)
- [ ] Container objects of a new key (`server-bindings`, `channel-bindings`, `operation-bindings`, `message-bindings` for a binding): `{key}--type.ts`, completion item and documentation row scoped to the new version (`AsyncAPI310`); split the shared object-level documentation entry as well, so the older version's hover docs don't list the key its lint rejects
- [ ] Register new metas in `src/config/{spec}/config.ts`
- [ ] Every `NEW` field on existing objects: completion item, documentation entry, lint rules
- [ ] Version-ranged rule files: rename when the range just extends (`allowed-fields-2-4--2-5.ts` to `allowed-fields-2-4--2-6.ts`, `allowed-fields-3-0.ts` to `allowed-fields-3-0--3-1.ts`), together with their identifiers and the `lint/index.ts` imports; a name that gains underscores needs `// eslint-disable-next-line @typescript-eslint/naming-convention`. Split when the new version accepts something the older ones must not (e.g. `ros2` in 3.1 bindings, not in 3.0)
- [ ] Documentation and completion that follow the latest version: bump spec URLs and versions. First check that every anchor the links use exists in the new version's markdown (compare the `<a name>` sets of both versions); afterwards update the tests that assert hover or completion text, which hardcode the URLs (AsyncAPI 3.1: `test/asyncapi-{json,yaml}.ts`, `info.ts`, `channel.ts`, `components.ts`, `server.ts`). Then apply the `CHANGED-TEXT` rows to the wording
- [ ] Version-specific completion values: split per version instead of extending (`multi-format-schema` schema format items: 3.0.0 media types `AsyncAPI300`, 3.1.0 media types `AsyncAPI310`), and add values the version introduces (Server `protocol`: `ros2` for 3.1.0)
- [ ] `grep -rn "version: '{previous}'" src/config/{spec}`: single-version `targetSpecs` that may need the new version; empty placeholder rules pinned to the previous version are follow-ups (`.claude/skills/FOLLOW-UPS.md`), not wiring
- [ ] `src/config/codes.ts`: new unique codes
- [ ] `src/services/completion/completion-service.ts`: the version inserted into empty documents (`asyncapi: '2.6.0$1'`). Moving it changes every new document's default, so ask the user; AsyncAPI 3.0 and 3.1 kept 2.6.0
- [ ] JSON Schema validation, only where the family has it (AsyncAPI 2.x, OpenAPI 3.1+; AsyncAPI 3 has none): `src/services/validation/json-schema/{spec-dir}-{xy}/` (e.g. `async-api-26`, `open-api-32`) (downloaded from a verified URL), `src/services/validation/providers/{spec}-{xy}-json-schema-validation-provider.ts`, export in `src/index.ts`
- [ ] Tests: `test/{spec}-json.ts`, `test/{spec}-yaml.ts`, `test/complete.ts`, completion fixtures for the family, tests for new objects with full `Diagnostic` objects via `assert.deepEqual` (one fixture per rule and binding version, as `test/asyncapi-ros2-bindings.ts` in #5264), and a test that an older-version document gets the allowed-fields diagnostic for the new key and no completion for it

### New (`/update-ls-config` plus the LS items in `integration-points.md`)

- [ ] `/update-ls-config` with the field map
- [ ] `parser-factory.ts`, `utils/utils.ts` detection, `linter-functions.ts` `rootElementTypes`, JSON Schema validation, `package.json`
- [ ] Parent-version rules that also apply: extend `targetSpecs` and rename instead of duplicating

### Both

- [ ] `check-ls-coverage.mjs` reports 0 problems (`--ignore` only `INTERNAL` elements)
- [ ] `verify-urls.mjs --diff {PR base} --new-only`: 0 `BROKEN`; links already broken on rewritten lines fixed in a separate commit or listed as known gaps
- [ ] `/review-ls-changes` in a fresh subagent on committed work; every finding fixed, rejected with evidence, or decided by the user
- [ ] apidom-playground wiring (new variant only; see `integration-points.md`)
- [ ] `find-unwired.sh {parent-id} {new-id}` (new variant) or `grep -rn "{previous version}"` over `packages/apidom-ls/src` (extend variant): every hit wired or justified
