# @swagger-api/apidom-parser-adapter-json-schema-json-2020-12

`@swagger-api/apidom-parser-adapter-json-schema-json-2020-12` is a parser adapter for the [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01) in [JSON format](https://www.json.org/json-en.html).
Under the hood this adapter uses [apidom-parser-adapter-json](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-json)
to parse a source string into generic ApiDOM in [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/main/packages/apidom#base-namespace)
which is then refracted with [JSON Schema 2020-12 Refractors](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-json-schema-2020-12#refractors).

## Installation

After [prerequisites](https://github.com/swagger-api/apidom/blob/main/README.md#prerequisites) for installing this package are satisfied, you can install it
via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-parser-adapter-json-schema-json-2020-12
```

## Parser adapter API

This parser adapter is fully compatible with parser adapter interface required by [@swagger-api/apidom-parser](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser#mounting-parser-adapters)
and implements all required properties.

### mediaTypes

Defines list of media types that this parser adapter recognizes.

```js
[
  'application/schema;version=2020-12',
  'application/schema+json;version=2020-12',
]
```

### detect

[Detection](https://github.com/swagger-api/apidom/blob/main/packages/apidom-parser-adapter-json-schema-json-2020-12/src/adapter.ts#L13) is based on a regular expression matching required JSON Schema 2020-12 symbols in JSON format.

### namespace

This adapter exposes an instance of [JSON Schema 2020-12 ApiDOM namespace](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-json-schema-2020-12#json-schema-2020-12-namespace).

### parse

`parse` function consumes various options as a second argument. Here is a list of these options:

Option | Type | Default | Description
--- | --- | --- | ---
<a name="specObj"></a>`specObj` | `Object` | [Specification Object](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-json-schema-2020-12/src/refractor/specification.ts) | This specification object drives the JSON AST transformation to JSON Schema 2020-12 ApiDOM namespace.
<a name="sourceMap"></a>`sourceMap` | `Boolean` | `false` | Indicate whether to generate source maps.
<a name="refractorOpts"></a>`refractorOpts` | `Object` | `{}` | Refractor options are [passed to refractors](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-json-schema-2020-12#refractor-plugins) during refracting phase.

All unrecognized arbitrary options will be ignored.

## Usage

This parser adapter can be used directly or indirectly via [@swagger-api/apidom-parser](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser).

### Direct usage

During direct usage you don't need to provide `mediaType` as the `parse` function is already pre-bound
with [supported media types](#mediatypes).

```js
import { parse, detect } from '@swagger-api/apidom-parser-adapter-json-schema-json-2020-12';

// detecting
await detect('{"$schema": "https://json-schema.org/draft/2020-12/schema"}'); // => true
await detect('test'); // => false

// parsing
const parseResult = await parse('{"$schema": "https://json-schema.org/draft/2020-12/schema"}', {
  sourceMap: true,
});
```

### Indirect usage

You can omit the `mediaType` option here, but please read [Word on detect vs mediaTypes](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser#word-on-detect-vs-mediatypes) before you do so.

```js
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as jsonSchemaJsonAdapter from '@swagger-api/apidom-parser-adapter-json-schema-json-2020-12';

const parser = new ApiDOMParser();

parser.use(jsonSchemaJsonAdapter);

const parseResult = await parser.parse(
  '{"$schema": "https://json-schema.org/draft/2020-12/schema"}',
  { mediaType: jsonSchemaJsonAdapter.mediaTypes.latest('json') },
);
```
