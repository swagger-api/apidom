---
name: add-reference-support
description: Adds support for a specification version to apidom-reference so documents of that version can be parsed, resolved, dereferenced and bundled. For a new namespace it creates the parse parsers wrapping the JSON/YAML parser adapters, the resolve/dereference/bundle strategies, `saturated.ts` registrations and `package.json` dependencies/exports; for a version added to an existing namespace (e.g. AsyncAPI 2.6, AsyncAPI 3.1) it updates README media types, test fixtures and dereference handling for new referenceable fields. Use after the namespace and parser adapters exist, as phase 3 of /add-spec-version, or whenever `$ref`s in a spec version aren't resolved or dereferenced, even if the user doesn't say "apidom-reference".
disable-model-invocation: false
user-invocable: true
---

# Add apidom-reference Support

apidom-reference turns a parsed document into a resolved, dereferenced or bundled one. Its parse parsers wrap the parser adapters, and its strategies wrap the namespace, so **this skill needs both the namespace and the JSON/YAML parser adapters for the version to exist and be built**.

## Reference Files

| File | Read during | Contents |
|------|-------------|----------|
| `references/extend-existing-version.md` | Phase 2 (extend mode) | README media types, fixture bumps, parser tests, new referenceable fields; worked example AsyncAPI 2.6 (PR #2537) |
| `references/reference-parsers.md` | Phase 2 (new mode) | Parser classes, parser tests, `saturated.ts` parser registration, `optionalDependencies`/`devDependencies`, `exports` |
| `references/reference-strategies.md` | Phase 3 (new mode) | Resolve/dereference/bundle strategies, dereference visitor, util and selectors, registration, `exports`, strategy tests |

## Phase 1: Gather Information and Choose Mode

1. Identify spec, version, namespace package and adapter packages. When run from `/add-spec-version`, read the tracking doc `ADD-{SPEC}-{VERSION}.md` for these and for the field map.
2. Check prerequisites, and stop if any is missing (run `/add-namespace` or `/add-parser-adapter` first):
   ```bash
   ls packages | grep -e "apidom-ns-{spec}" -e "apidom-parser-adapter-{spec}"
   grep -n "version={version}" packages/apidom-ns-{spec}-*/src/media-types.ts
   ls packages/apidom-parser-adapter-{spec}-{json,yaml}-*/src/adapter.ts
   ```
3. Choose the mode:
   - **Extend**: the version belongs to an existing namespace and its adapters already detect it, and `src/parse/parsers/{spec}-json-{major}/` plus `src/{resolve,dereference,bundle}/strategies/{spec}-{major}/` already exist. Example: AsyncAPI 2.6 (`asyncapi-2`).
   - **New**: new namespace package and new adapter packages. Example: OpenAPI 3.2 (`openapi-3-2`, commit `ef97b5c32`).

## Phase 2: Parse Integration

- **Extend mode**: read `references/extend-existing-version.md` and apply all sections. Phase 3 is then only the new-referenceable-field work described there.
- **New mode**: read `references/reference-parsers.md`, then:
  1. Create parser classes `src/parse/parsers/{spec}-json-{version}/index.ts` and `{spec}-yaml-{version}/index.ts` (2.1).
  2. Create parser tests and fixtures in `test/parse/parsers/{spec}-{json|yaml}-{version}/` (2.2).
  3. Register both parsers in `options.parse.parsers` in `src/configuration/saturated.ts` (2.3), following the registration order below.
  4. Add both adapters (and the namespace, if missing) to `optionalDependencies` (`^{currentVersion}`) and `devDependencies` (`"*"`) (2.4).
  5. Add `exports` entries `./parse/parsers/{spec}-json-{version}` and `./parse/parsers/{spec}-yaml-{version}` (2.5).

## Phase 3: Resolve, Dereference and Bundle Strategies (new mode)

Read `references/reference-strategies.md`, then create under `packages/apidom-reference/src/`:

1. Resolve strategy `resolve/strategies/{spec}-{version}/index.ts` (3.1).
2. Dereference strategy `dereference/strategies/{spec}-{version}/index.ts` (3.2) and visitor `visitor.ts`, copied from the parent version (3.3). Then adjust it to the field map: every `NEW` field that can hold a Reference Object or `$ref` is handled, and nothing else is.
3. `util.ts` and selectors `selectors/$anchor.ts`, `selectors/uri.ts` (3.4).
4. Bundle strategy `bundle/strategies/{spec}-{version}/index.ts` (3.5).
5. Register all three strategies in `saturated.ts` and add their `exports` entries (3.6).
6. Tests in `test/dereference/strategies/{spec}-{version}/` and `test/bundle/strategies/{spec}-{version}/` (optionally `test/resolve/`) (3.7).

All three strategies share the plain name `'{spec}-{version}'` (e.g. `'openapi-3-2'`); the resolve strategy finds the dereference strategy by that name.

## Phase 4: Documentation

Update `packages/apidom-reference/README.md`: new parsers and strategies (new mode) or new media types in existing lists (extend mode). The README is the place users check for supported versions; the OpenAPI 3.2 work skipped it, so check it explicitly:

```bash
grep -c "version={version}" packages/apidom-reference/README.md   # must be > 0
```

## Phase 5: Build and Verify

```bash
cd packages/apidom-reference
npm run build && npm run typescript:check-types && npm run lint && npm test
```

- All existing tests still pass (fixture bumps in extend mode must not change expected output beyond the version string).
- New mode: `grep -n "{spec}-{version}\|{Spec}.*{Version}" src/configuration/saturated.ts` shows the two parsers and three strategies.
- Detection order: a document of the parent version is still parsed by the parent's parser, and a document of the new version by the new parser (add a test in `test/parse/` if missing).
- New parser tests match the sibling parser's tests: `check-test-parity.mjs` reports no unjustified `MISSING` (see `references/reference-parsers.md`, 2.2).

## Troubleshooting

- **Parser not found**: parser imported in `saturated.ts`, added to `options.parse.parsers`, class name matches the import.
- **Wrong parser picks the document**: an earlier parser in `options.parse.parsers` detects the new version; check the parent's adapter `detectionRegExp` and the registration order.
- **Strategy not applied**: strategy name (`'{spec}-{version}'`) matches between resolve and dereference strategies; `canDereference`/`canResolve` accept the new media types.
- **Build can't resolve the adapter**: adapters must be built first (`npm run build` in both adapter packages) and listed in `devDependencies`.

## Critical Rules

- Always use `.ts` extensions in imports.
- Spec packages go to `optionalDependencies` and `devDependencies`, never `dependencies`.
- Never type media types by hand; take them from the namespace's `src/media-types.ts`.
- Dereference handling only for fields that can hold references, per the spec.

### Parser Registration Order

In `saturated.ts` (`options.parse.parsers`), keep the current order:

1. OpenAPI (2, 3.0, 3.1, 3.2, oldest to newest)
2. AsyncAPI (2, 3)
3. Arazzo (1)
4. A2A (1)
5. API Design Systems (after all versioned specs, not first)
6. Generic parsers at the end: ApiDOM JSON, JSON, YAML 1.2, Binary

Within a spec, the JSON parser precedes the YAML parser of the same version, and a new version goes directly after its parent version. A brand-new spec goes after the last versioned spec group and before API Design Systems. Strategy arrays follow the same version order, with `ApiDOMResolveStrategy` / `ApiDOMDereferenceStrategy` always last.

### Naming

- Parser classes: `{SpecName}{Format}{Version}Parser` with underscores in versions (`OpenAPIJSON3_2Parser`, `AsyncAPIYAML3Parser`, `JSONSchema2019_09Parser`).
- Directories: `{spec}-{format}-{version}` for parsers, `{spec}-{version}` for strategies.

## Checklist

New mode:
- [ ] `src/parse/parsers/{spec}-json-{version}/index.ts` and `{spec}-yaml-{version}/index.ts`
- [ ] `test/parse/parsers/{spec}-json-{version}/` and `{spec}-yaml-{version}/`
- [ ] `src/resolve/strategies/{spec}-{version}/index.ts`
- [ ] `src/dereference/strategies/{spec}-{version}/` (`index.ts`, `visitor.ts`, `util.ts`, `selectors/`)
- [ ] `src/bundle/strategies/{spec}-{version}/index.ts`
- [ ] `src/configuration/saturated.ts`: two parsers and three strategies, in order
- [ ] `package.json`: `optionalDependencies`, `devDependencies`, `exports`
- [ ] `test/dereference/strategies/{spec}-{version}/`, `test/bundle/strategies/{spec}-{version}/`
- [ ] `README.md`

Extend mode:
- [ ] `README.md` media type lists for parsers and strategies
- [ ] Fixtures for the latest version bumped
- [ ] Parser tests (own and other specs' negative tests) bumped
- [ ] Dereference visitor and fixtures for new referenceable fields

Both: build, types, lint and tests of `apidom-reference` pass.
