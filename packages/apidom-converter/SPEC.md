---
id: apidom-converter
type: module-design
status: draft
title: apidom-converter
parent: apidom-architecture
depends-on: [apidom-reference, apidom-core]
---

## Responsibility

Convert API descriptions between specification versions. `convert(uri)` / `convertApiDOM(parseResult)` pick a strategy from the source and target media types, and return a `ParseResultElement` whose `api` is the converted document. Every change that loses or moves information is reported as a warning annotation (`AnnotationElement` with class `warning` and a `code`).

Strategies:

- `openapi-3-1-to-openapi-3-0-3`: OpenAPI 3.1.x to 3.0.3 (non-schema objects; schemas are left as they are).
- `json-schema-2020-12-to-openapi-3-0`: an OpenAPI 3.0.x document whose schemas use JSON Schema 2020-12 (or Draft 6/7, 2019-09) into one whose schemas are valid OpenAPI 3.0 Schema Objects.

## Boundary

- Depends on apidom-reference (loading, bundling, dereferencing), core, the OpenAPI 3.0/3.1 namespaces and the JSON Schema 2020-12 namespace. Nothing in the monorepo depends on the converter.
- Strategy-specific logic stays in the strategy; generic reference handling (internal scope, fragment transformation, URL allow-lists) lives in apidom-reference as opt-in options.
- Errors from any strategy reach the caller as `ConvertError` (original in `cause`). `convert(uri)` uses `uri` as `resolve.baseURI` unless the caller sets one.

## `json-schema-2020-12-to-openapi-3-0`

**Contract**

- Output schemas are valid against the official OpenAPI 3.0 schema. `openapi` is set to the target media type's version.
- External references (every object type, not only schemas) are inlined at each use and their schemas converted; the result is self-contained except for circular references and external `discriminator.mapping` targets.
- Schemas without any construct that OpenAPI 3.0 forbids are left unchanged. Detection works per schema, so plain OpenAPI 3.0 such as `{ $ref, description }` is untouched.
- Example `externalValue` and Link `operationRef` are neither fetched nor changed.
- The output is never stricter than the input: rewrites are lossless; keywords without an equivalent move to `x-conversion-<keyword>` (together with companions whose meaning depends on them: `prefixItems` + `items`, `patternProperties` + `additionalProperties`, tuple `items` + `additionalItems`) or are dropped, each with a warning.

**Pipeline**

1. Root pre-pass: outermost schemas of the document that need conversion are converted; internal refs whose targets moved are rewritten to the first final location of the target.
2. apidom-reference's OpenAPI 3.0 dereference with `internalScope: 'entry'` (entry-document refs kept), `fragmentTransformer` (every external fragment converted once, before inlining), Examples/Links skipped, `resolverOpts.urlAllowList` from `convert.httpAllowList`, and no binary parser (external content must be a JSON/YAML object).
3. Post-pass: URIs that came with inlined content are rebased (refs back to the entry document become `#/…`), and warnings are emitted for `discriminator`s that depended on external refs, circular references left in memory, and internal refs that don't resolve.

**Decisions**

- Inlining, not hoisting into `components`, is a requirement. Shared external schemas are therefore duplicated.
- Cycles follow apidom-reference's `dereference.circular` / `circularReplacer` with its defaults (`'ignore'`). Under `'ignore'` the result can't be serialized and a warning says so; callers choose `'replace'` or `'error'`.
- `convert.httpAllowList` defaults to any HTTPS URL; plain HTTP is not allowed. Callers narrow it as needed.
- Schemas are traversed by one keyword-aware walk over schema positions (Draft 4 to 2020-12 plus OpenAPI keywords), which also builds the `$anchor`/`$id` → JSON Pointer index. Data positions (`example`, `default`, `enum`, `const`, `x-*`) are never treated as schemas.
- Departures from the source transformation rules (SmartBear Confluence, "JSON Schema 2020-12 - Draft 4/5 Downgrader"), approved:
  - External references are inlined and converted (the rules assume a bundled input).
  - Every `format` value is kept; the rules' format folds would make validation stricter.
  - A null-only schema becomes `{type: "string", nullable: true, enum: [null]}` (Ajv rejects `nullable` without `type`).
  - A type split copies only type-specific keywords into its `anyOf` branches.
  - Stash content is itself converted, and companion keywords move together.
  - Dependency folds use `{not: {type: "object", required: [p]}}`; the rules' form rejects non-object values.
  - Rewritten refs are full document pointers. Boolean subschemas become `{}` / `{not: {}}`.

**Known gaps**

- `discriminator`s that rely on external schemas lose their meaning once those are inlined.
- Relative non-fragment refs resolve against the retrieval URI, not `$id` (a warning is emitted when `$id` would resolve them differently).
- Cross-file `$anchor`/`$id` refs and refs from external files back into keywords moved in the entry document fail the conversion.
