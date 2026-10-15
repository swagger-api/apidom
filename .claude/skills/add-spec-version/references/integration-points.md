# Integration Points Outside the New Packages

Worked example: OAS 3.2 support, commit `ef97b5c32` (PR #5110). Inspect any item with
`git show ef97b5c32 -- <path>` and mirror the change for the new version.

## apidom-reference (Stage 2, covered by /add-parser-adapter)

- [ ] `src/parse/parsers/{spec}-json-{version}/index.ts` and `{spec}-yaml-{version}/index.ts`
- [ ] `src/resolve/strategies/{spec}-{version}/index.ts`
- [ ] `src/dereference/strategies/{spec}-{version}/` (`index.ts`, `visitor.ts`, `util.ts`, `selectors/`)
- [ ] `src/bundle/strategies/{spec}-{version}/index.ts`
- [ ] `src/configuration/saturated.ts`: parser, resolve, dereference and bundle registrations; new parsers go before the parent version's parsers
- [ ] `package.json`: dependencies on the new namespace and adapters, plus `exports` entries for every new parser and strategy path
- [ ] Tests and fixtures for parse, resolve, dereference and bundle

## apidom-ls (Stage 3; only the config directories are covered by /update-ls-config)

- [ ] `src/config/{spec}/**`: completion, documentation, lint, `meta.ts`, `target-specs.ts`
- [ ] `src/config/codes.ts`: new unique diagnostic codes
- [ ] `src/parser-factory.ts`: import the new adapters and add JSON and YAML branches for the new version (YAML branch registers the namespace's `refractorPluginReplaceEmptyElement`)
- [ ] `src/utils/utils.ts`: content-language detection using the new adapters' `detect` and `detectionRegExp`, placed before the parent version's check
- [ ] `src/services/validation/json-schema/{spec}-{version}/`: official JSON Schema, dialect and meta-schema files (download from verified URLs, don't hand-write)
- [ ] `src/services/validation/providers/{spec}-{version}-json-schema-validation-provider.ts`, registered in tests the same way as the parent's provider
- [ ] `src/services/validation/linter-functions.ts`: add the new root element name (e.g. `'openApi3_2'`) to `rootElementTypes`, plus any new linter functions. Main currently lists only `swagger`, `openApi3_0`, `openApi3_1`, `asyncApi2`
- [ ] Existing rules scoped to the parent version (e.g. `*-3-1.ts` with `targetSpecs`) that also apply to the new version: extend their `targetSpecs` and rename (e.g. `identifier--mutually-exclusive-3-1--3-2.ts`) rather than duplicating
- [ ] `package.json`: dependencies on the new namespace and adapters
- [ ] Tests: JSON and YAML fixtures for valid documents (expect no apilint diagnostics) and each new lint rule (full `Diagnostic` objects via `assert.deepEqual`)

## apidom-playground (Stage 5)

- [ ] `package.json`: dependencies on the new namespace and adapters
- [ ] `src/playground/apidom.worker.js`: `.use()` the new JSON and YAML adapters
- [ ] `src/playground/selectors.js`: import the namespace plugin and media types, add the media-type branch and the media types to the list

## Repository root (Stage 5)

- [ ] `package.json` `unlink` script: add every new package name (this list was not updated for OAS 3.2 or A2A, so check it against `ls packages`)
- [ ] `package-lock.json`: regenerate with `npm i`
- [ ] `README.md` package lists and any package READMEs that enumerate supported specs (apidom-reference README lists parsers and strategies)

## Quick audit

List every file that mentions the parent version but not the new one, which is where wiring is usually forgotten:

```bash
.claude/skills/add-spec-version/scripts/find-unwired.sh openapi-3-1 openapi-3-2
```

Each listed file either needs the new version added or has a reason not to (e.g. `apidom-converter`'s 3.1-to-3.0 strategy, ADS validators that only target 3.1). Record the reason in the tracking doc.
