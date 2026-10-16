# Extending apidom-reference for a Version Inside an Existing Namespace

Use this when the new version lives in an existing namespace and existing adapters (e.g. AsyncAPI 2.6 in `apidom-ns-asyncapi-2`, AsyncAPI 3.1 in `apidom-ns-asyncapi-3`). The parsers and strategies already exist and pick the version up through the namespace's media types, so the work is documentation, tests and any new referenceable fields.

Worked examples: AsyncAPI 2.6.0, PR #2537 (commit `36cbf2f73`; inspect with `git show 36cbf2f73 --stat` and `git show 36cbf2f73 -- <path>`), and AsyncAPI 3.1.0, PR #5263.

## 1. README media type lists

`packages/apidom-reference/README.md` lists supported media types per parser and per strategy. Add the new version's media types to every list for the spec family:

- parse parsers `{spec}-json-{major}` and `{spec}-yaml-{major}` (generic + format-specific media types)
- resolve strategy `{spec}-{major}`
- dereference strategy `{spec}-{major}`
- bundle strategy `{spec}-{major}` (when the README lists it)

Keep the existing order (ascending version, generic then `+json`/`+yaml`). Get the exact strings from the namespace's `src/media-types.ts`; never type them by hand.

If the family has no section yet, add one per parser and strategy, shaped like its sibling family's: the AsyncAPI 3 parsers and dereference strategy were missing from the README (only the execution order examples mentioned them) until #5263. Parsers list their generic media types first, then the format ones (`new AsyncAPIMediaTypes(...filterByFormat('generic'), ...filterByFormat('json'))`); strategies list every media type per version.

```bash
grep -n "version={previous}" packages/apidom-reference/README.md   # every list that needs the new version
```

## 2. Bump test fixtures to the new version

#2537 bumped the version field in ~160 dereference fixtures (`root.json`, `dereferenced.json`, `ex.json`) from 2.5.0 to 2.6.0, so the strategy tests run against the latest version of the family.

```bash
grep -rl '"asyncapi": "2.5.0"' packages/apidom-reference/test/dereference/strategies/asyncapi-2 \
  | xargs sed -i '' 's/"asyncapi": "2.5.0"/"asyncapi": "2.6.0"/'
```

Bump only fixtures that represent the latest version. Leave fixtures that deliberately test an older version.

## 3. Parser tests

- `test/parse/parsers/{spec}-json-{major}/index.ts` and `{spec}-yaml-{major}/index.ts`: update the `context(...)` titles and the detection samples to the new version. `mediaTypes.latest()` now returns the new version, so add an explicit `canParse` check for the previous version's media type (`mediaTypes.findBy('{previous}', 'json')`).
- Parsers of **other** specs that assert they reject this spec's media type (e.g. `openapi-json-3-1` with `mediaType: 'application/vnd.aai.asyncapi+json;version=2.6.0'`): leave them as they are. #2537 bumped them; for AsyncAPI 3.1 the user rejected swapping their versions.

```bash
grep -rn "version={previous}" packages/apidom-reference/test/parse
```

## 4. New referenceable fields

For every `NEW` field in the field map that can hold a Reference Object or `$ref` (new elements such as binding objects, new map-of-reference fields):

- Check that the dereference visitor (`src/dereference/strategies/{spec}-{major}/visitor.ts`) reaches it. Element-type based visitors (`ReferenceElement`, `ChannelItemElement`, ...) usually do; a field whose value is a new element type with its own `$ref` semantics needs a new visitor hook.
- Add fixtures under `test/dereference/strategies/{spec}-{major}/{object}/fixtures/` covering internal, external and circular references for the new field, following the existing fixture directories.

Do not add reference handling to fields that can't hold references (PR #5110 added it to `additionalOperations`, which was wrong). New objects that can't hold references but sit in a referenceable container can still get a fixture that reaches them through `components` (#5263: ROS 2 server and operation bindings via `components/serverBindings` and `components/operationBindings`), documenting that they are transcluded unchanged.

## 5. Bundle

If the bundle strategy has per-element handling, check that new referenceable fields are bundled too, and add a bundle fixture.
