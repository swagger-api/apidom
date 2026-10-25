# JSON Schema Dialects

Standalone JSON Schema (a document that is only a schema, identified by its root `$schema`) goes
through the same four phases as any spec, with `--spec json-schema` and the dialect id as version.
This file replaces the parts of the workflow that assume Fixed Fields tables and `x.y.z`
versions. Read it at Step 0 whenever the spec is JSON Schema.

## Contents

1. Identifiers
2. Keyword map (instead of the field map)
3. Specifications
4. Integration points
5. Phase 4 exit check
6. Gates

## 1. Identifiers

Each dialect has its own namespace and adapter packages (the **new** variant). Its parent is the
previous dialect: the namespace patches the parent's `specificationObj` (`/add-namespace`,
"Patching the parent").

| Dialect id (packages, `--version`) | Media type version | Root `$schema` | Parent |
|---|---|---|---|
| `2020-12` | `2020-12` | `https://json-schema.org/draft/2020-12/schema` | `2019-09` |
| `2019-09` | `2019-09` | `https://json-schema.org/draft/2019-09/schema` | `draft-7` |
| `draft-7` | `draft-07` | `http://json-schema.org/draft-07/schema#` | `draft-6` |
| `draft-6` | `draft-06` | `http://json-schema.org/draft-06/schema#` | `draft-4` |
| `draft-4` | `draft-04` | `http://json-schema.org/draft-04/schema#` | none |

Packages are `apidom-ns-json-schema-{dialect}` and `apidom-parser-adapter-json-schema-{json,yaml}-{dialect}`,
branches `feat/json-schema-{dialect}/phase-{n}`. `phase-status.mjs --spec json-schema --version {dialect}`
checks dialect-specific evidence (its `--help` lists it), including the parser wiring of phase 4.

## 2. Keyword Map (instead of the Field Map)

JSON Schema has no Fixed Fields tables. The tracking doc's field map gets one row per keyword of
each namespace object (`JSONSchema`, `LinkDescription`), built like this:

1. **Keywords.** From 2019-09 on: the `properties` of each vocabulary meta-schema that the dialect
   meta-schema lists in `allOf` (2020-12: `meta/core`, `meta/applicator`, `meta/unevaluated`,
   `meta/validation`, `meta/meta-data`, `meta/format-annotation`, `meta/content`). Draft 4-7: the
   single meta-schema's `properties`. Fetch them; never list keywords from memory.
2. **Compatibility entries aren't keywords.** The 2020-12 dialect meta-schema's own `properties`
   keep `definitions`, `dependencies`, `$recursiveAnchor` and `$recursiveRef` with
   `deprecated: true`, "to prevent incompatible extensions". They are `REMOVED` rows, as in the
   namespace (throwing getter or refractor `dissocPath`).
3. **Type.** From the property's schema, following its `$ref` into `$defs` (`uriReferenceString`,
   `uriString`, `anchorString`, `schemaArray`, ...). A `$dynamicRef: "#meta"` (or, before 2019-09,
   a `$ref` to the meta-schema) means the value is a schema; from Draft 6 on a schema can also be
   `true` or `false`.
4. **Shape and meaning.** The keyword's section in the dialect's core or validation specification
   (section 3). Read it for every keyword the parent dialect also has: a keyword can keep its name
   and change its shape. `items` takes a schema or an array of schemas up to 2019-09 and only a
   schema in 2020-12, where `prefixItems` took over the array form.
5. **Status** against the parent dialect: `NEW`, `CHANGED-TYPE`, `REMOVED`, `INHERITED`, cross-checked
   with the change appendix at the end of the core specification.
6. **Required: none.** `{}` is a valid schema, so no keyword gets a `--required` rule.
7. **Unknown keywords are allowed.** 2020-12 collects them as annotations, earlier drafts ignore
   them. A schema object therefore gets no error-level allowed-fields rule, and
   `check-ls-coverage.mjs` reporting `NOT-ALLOWED` for it is expected.

## 3. Specifications

Keywords are defined in prose sections of these documents. LS documentation links point at a
keyword's section; copy the anchor from the page and check it with `verify-urls.mjs` (existing
2020-12 docs link to the core page without `.html`, e.g. `draft-bhutton-json-schema-01#initial-base`).

| Dialect | Core | Validation |
|---|---|---|
| 2020-12 | https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html | https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html |
| 2019-09 | https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02.html | https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02.html |
| Draft 7 | https://json-schema.org/draft-07/draft-handrews-json-schema-01.html | https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01.html |
| Draft 6 | https://json-schema.org/draft-06/draft-wright-json-schema-01.html | https://json-schema.org/draft-06/draft-wright-json-schema-validation-01.html |
| Draft 4 | https://json-schema.org/draft-04/draft-zyp-json-schema-04.html | https://json-schema.org/draft-04/draft-fge-json-schema-validation-00.html |

## 4. Integration Points

In addition to `integration-points.md` (new variant):

### Phase 3: apidom-reference

- [ ] Parsers `src/parse/parsers/json-schema-{json,yaml}-{dialect}/` wrapping the adapters,
      registered in `src/configuration/saturated.ts`, with `package.json` dependencies and
      `exports`, and the dialect's media types in the README.
- [ ] Resolve, dereference and bundle strategies `json-schema-{dialect}`, built per
      `/add-reference-support` `references/reference-strategies.md` 3.8: the schema part of the
      OAS 3.1 strategy (references resolve against `$id` base URIs and `$anchor`s), `$dynamicRef`
      left in place as OAS 3.1 does, and compound-document bundling assembled from the resolve
      strategy's `ReferenceSet` (the OAS bundle strategies don't embed anything). Register the
      dereference strategy in `saturated.ts` and let its `canDereference` accept a parsed
      element without a media type (`isJSONSchemaElement`): apidom-ls's `doDeref`, behind
      SwaggerEditor's Download Resolved, calls `dereferenceApiDOM` from the package root, which
      exports the saturated configuration.
- [ ] Tests: a standalone document with an internal (`#/$defs/...`), an `$anchor` and an external
      file reference dereferences and bundles.

### Phase 4: apidom-ls

- [ ] `src/utils/utils.ts`: detection with the dialect's adapters, after the OpenAPI, AsyncAPI
      and A2A checks. The adapters' `detectionRegExp` matches `$schema` anywhere in the text, and
      OpenAPI 3.1+ Schema Objects can carry `$schema`, so confirm the match is at the root.
- [ ] `src/parser-factory.ts`: JSON and YAML branches using the adapters; `package.json`
      dependencies on both adapters.
- [ ] **One namespace key everywhere.** The namespace that detection returns selects
      `metadataMaps[namespace]` (`setMetadataMap` in `parser-factory.ts`) and is compared with every
      rule's `targetSpecs` namespace (validation, completion and hover services). The
      `config/config.ts` key, detection and `target-specs.ts` must agree, or no rule ever applies
      (`FOLLOW-UPS.md` 2.24 has the current mismatch).
- [ ] `config/json-schema/{dialect}/`: per keyword a completion item, a documentation entry and a
      type rule (`--format-uri` where the meta-schema's type is a URI string), registered under the
      element name (`this.element`: `JSONSchema202012`, not the registry key `jSONSchema202012`).
- [ ] Semantic tokens follow the OpenAPI pattern (decided 2026-10-25): every key is a `key`
      token and every string or number value a `value` token. `semantic-tokens-service.ts`
      emits those for anything that isn't a semantic token type, and both SwaggerEditor themes
      already colour them. So add no `config/json-schema/tokens.ts` and no JSON Schema element,
      class or keyword to `config/tokens.ts`: each would get a colour of its own. `$ref` keeps
      the `reference-element`/`reference-value` classes the 2019-09 refractor sets, coloured as
      in OpenAPI 3.1 Schema Objects.
- [ ] `src/services/validation/linter-functions.ts` `rootElementTypes`: add the dialect's root
      element name if root-walking linter functions should stop at it.

## 5. Phase 4 Exit Check

Phase 4 is complete when a test in `packages/apidom-ls/test/` (shaped like `test/a2a.ts`) shows,
for a standalone document of the dialect in JSON and in YAML:

- `doValidation` reports an invalid keyword value (full `Diagnostic` objects) and nothing for a
  valid document;
- with `referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL`, `doValidation`
  reports an unresolvable internal `$ref` (e.g. to a missing `$defs` key) and an unresolvable
  external one as `Reference Error` diagnostics, and none for resolvable ones. Shape it like
  `test/validate-references.ts`, which serves the external files over HTTP from
  `test/fixtures/deref`. Reference validation is what the design doc wants apidom-reference
  support for;
- `doCompletion` offers keywords inside a schema, nested schemas included;
- `doHover` returns a keyword's documentation;
- `computeSemanticTokens` returns a `key` token for every key, nested schemas and keywords with
  object or array values included, a `value` token for string and number values, and no other
  token type except the reference ones on `$ref` (section 4);
- `doDeref` returns the dereferenced document in JSON and in YAML (shaped like "should dereference
  into JSON" in `test/openapi-json.ts`): SwaggerEditor's Download Resolved calls it, for OpenAPI
  and for JSON Schema alike;

and a phase 3 test dereferences such a document. Swagger UI and SwaggerEditor take the ApiDOM
release as given, so a gap that this check misses only shows up when they integrate it.

## 6. Gates

- **Gate 1:** `check-redefined-fields.mjs` works as for any spec (the parent is the previous
  dialect). A `REMOVED` keyword gets a throwing getter or a refractor `dissocPath`.
- **Gate 4:** `check-ls-coverage.mjs packages/apidom-ns-json-schema-{dialect} packages/apidom-ls/src/config/json-schema/{dialect} --inherited --orphans`.
  Each dialect has its own config directory, so inherited keywords are checked too; keywords the
  dialect removes (throwing getter or `dissocPath`, here or in a parent) are skipped. `NOT-ALLOWED`
  for the schema object is expected (section 2, item 7).
- **`/review-ls-changes`** reviews against the keyword map: no `--required` rules, type rules from
  the meta-schema, documentation from the keyword sections.
