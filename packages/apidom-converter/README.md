# @swagger-api/apidom-converter

`apidom-converter` is a package that facilitates conversion of API specifications.

## Installation

You can install this package via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-converter
```

## Usage

```js
import convert, { convertApiDOM } from '@swagger-api/apidom-converter';
import { parse } from '@swagger-api/apidom-reference';

// convert a document by URI
const parseResult = await convert('/home/user/openapi.yaml', {
  convert: {
    targetMediaType: 'application/vnd.oai.openapi+json;version=3.0.3',
  },
});

// or convert an already parsed document
const converted = await convertApiDOM(await parse('/home/user/openapi.yaml'), {
  resolve: { baseURI: '/home/user/openapi.yaml' },
  convert: {
    targetMediaType: 'application/vnd.oai.openapi+json;version=3.0.3',
  },
});
```

Both functions return a `ParseResultElement`. The converted document is its `api`. Changes that lose or move
information are reported as annotations (see [Warnings](#warnings)).

When no strategy can convert the document, `UnmatchedConvertStrategyError` is thrown. Errors raised during
the conversion are wrapped in `ConvertError` (the original error is available as `cause`).

## Strategies

The strategy is selected from the source and target media types (`convert.sourceMediaType`,
`convert.targetMediaType`); when the source media type is not given, it is detected from the document.

### openapi-3-1-to-openapi-3-0-3

Converts an OpenAPI 3.1.x document to OpenAPI 3.0.3.

### json-schema-2020-12-to-openapi-3-0

Converts an OpenAPI 3.0.x document (3.0.0 to 3.0.4) whose schemas use JSON Schema 2020-12 (or another JSON Schema
dialect, such as Draft 7 or 2019-09) into a document whose schemas are valid OpenAPI 3.0 Schema Objects. The target
is any OpenAPI 3.0.x media type; the output's `openapi` field is set to the target version.

- Schemas in the document and in externally referenced files are converted. External references are inlined at
  each use, so the converted document is self-contained (apart from circular references, see below).
- Constructs with an OpenAPI 3.0 equivalent are rewritten, for example `const` to `enum`, `type` arrays to
  `nullable` or `anyOf`, numeric `exclusiveMinimum`/`exclusiveMaximum` to their boolean form, `examples` to
  `example`, `if`/`then`/`else` and `dependentRequired`/`dependentSchemas` to `anyOf`/`oneOf`/`allOf`, and
  `$ref` to an `$anchor` or `$id` to a JSON Pointer reference.
- Keywords without an OpenAPI 3.0 equivalent that hold schemas (for example `$defs`, `prefixItems`,
  `patternProperties`, `unevaluatedProperties`) are moved to `x-conversion-<keyword>` extensions. Other
  unsupported keywords (for example `$schema`, `$comment`, `contentEncoding`) are removed.
- Schemas that are already valid OpenAPI 3.0 Schema Objects are left unchanged.
- Example Object `externalValue` and Link Object `operationRef` are left unchanged and are not fetched.

```js
import convert from '@swagger-api/apidom-converter';

const parseResult = await convert('/home/user/openapi.yaml', {
  convert: {
    sourceMediaType: 'application/vnd.oai.openapi+yaml;version=3.0.3',
    targetMediaType: 'application/vnd.oai.openapi+json;version=3.0.3',
  },
});
```

#### External references

External references are fetched with the resolvers configured in `resolve.resolvers`. HTTP(S) URLs are
restricted by the `convert.httpAllowList` option: a list of RegExps or minimatch globs matched against each URL,
including every redirect (in Node.js). The default allows any HTTPS URL and no plain HTTP URL. Local files follow
`FileResolver`'s `fileAllowList`. An external reference that cannot be resolved fails the conversion with
`ConvertError`. Referenced content must be a JSON or YAML object.

```js
await convert('/home/user/openapi.yaml', {
  convert: {
    targetMediaType: 'application/vnd.oai.openapi+json;version=3.0.3',
    httpAllowList: ['https://schemas.example.com/**'],
  },
});
```

#### Circular references

Circular references are handled by the `dereference.circular` option, with the same meaning and default as
in [apidom-reference](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference):

- `'ignore'` (default) - the cycle is kept in memory. The converted element cannot be serialized to JSON or YAML;
  a `circular-reference` warning is reported.
- `'replace'` - every circular occurrence is replaced by the result of `dereference.circularReplacer`, for
  example a `$ref` to the original location.
- `'error'` - the conversion fails with `ConvertError`.

```js
import { ObjectElement, toValue } from '@swagger-api/apidom-core';

await convert('/home/user/openapi.yaml', {
  convert: { targetMediaType: 'application/vnd.oai.openapi+json;version=3.0.3' },
  dereference: {
    circular: 'replace',
    circularReplacer: (refElement) => {
      const ref = toValue(refElement.meta.get('$ref'));
      const uri = toValue(refElement.meta.get('uri'));
      return new ObjectElement({ $ref: `${uri}${ref.slice(ref.indexOf('#'))}` });
    },
  },
});
```

## Warnings

Warnings are `AnnotationElement`s with the `warning` class, appended to the returned `ParseResultElement`. Each
has a `code` attribute. The `json-schema-2020-12-to-openapi-3-0` strategy reports these codes:

| Code | Meaning |
|---|---|
| `dropped-keyword` | A keyword without an OpenAPI 3.0 equivalent was removed. |
| `moved-keyword` | A keyword was moved to an `x-conversion-<keyword>` extension. |
| `examples-truncated` | `examples` had several entries; only the first was kept as `example`. |
| `discriminator-inlined` | A schema used with `discriminator` came from an external file and was inlined. |
| `discriminator-mapping-external` | A `discriminator.mapping` target is external and was not converted. |
| `circular-reference` | The converted document contains circular references (`dereference.circular: 'ignore'`). |
| `unresolved-reference` | An internal `$ref` of the converted document does not resolve. |
| `id-base-mismatch` | A relative `$ref` is resolved against its document's location, but its `$id` base would resolve it to another URI. |

Warnings about content of external files name the reference URI in their message.

```js
import { toValue } from '@swagger-api/apidom-core';

const warnings = parseResult.annotations.filter((annotation) => annotation.classes.includes('warning'));
const codes = warnings.map((warning) => toValue(warning.attributes.get('code')));
```
