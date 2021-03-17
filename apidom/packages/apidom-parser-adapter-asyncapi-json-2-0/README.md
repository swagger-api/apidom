# apidom-parser-adapter-asyncapi-json-2-0

`apidom-parser-adapter-asyncapi-json-2-0` is a parser adapter for the [AsyncApi 2.0.0 specification](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md) in [JSON format](https://www.json.org/json-en.html).
Under the hood this adapter uses [apidom-parser-adapter-json](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser-adapter-json)
to parse a source string into generic ApiDOM in [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom#base-namespace)
which is then refracted with [AsyncApi 2.0.0 Refractors](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-ns-asyncapi-2-0#refractors).

## Parser adapter API

This parser adapter is fully compatible with parser adapter interface required by [apidom-parser](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser#mounting-parser-adapters)
and implements all required properties.

### mediaTypes

Defines list of media types that this parser adapter recognizes.

```js
[
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
]
```

### detect

[Detection](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-parser-adapter-asyncapi-json-2-0/src/adapter.ts#L13) is based on a regular expression matching required AsyncApi 2.0.0 specification symbols in JSON format.

### namespace

This adapter exposes an instance of [AsyncApi 2.0.0 ApiDOM namespace](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-ns-asyncapi-2-0#asyncapi-200-namespace).

### parse

`parse` function consumes various options as a second argument. Here is a list of these options:

Option | Type | Default | Description
--- | --- | --- | ---
<a name="specObj"></a>`specObj` | `Object` | [Specification Object](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-parser-adapter-json/src/parser/specification.ts) | This specification object drives the JSON AST transformation to base ApiDOM namespace.
<a name="sourceMap"></a>`sourceMap` | `Boolean` | `false` | Indicate whether to generate source maps.
<a name="refractorOpts"></a>`refractorOpts` | `Object` | `{}` | Refractor options are [passed to refractors](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-ns-asyncapi-2-0#refractor-plugins) during refracting phase.

All unrecognized arbitrary options will be ignored.

## Usage

This parser adapter can be used directly or indirectly via [apidom-parser](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser).

### Direct usage

During direct usage you don't need to provide `mediaType` as the `parse` function is already pre-bound
with [supported media types](#mediatypes).

```js
import { parse, detect } from 'apidom-parser-adapter-json';

// detecting
await detect('{"asyncapi": "2.0.0"}'); // => true
await detect('test'); // => false

// parsing
const parseResult = await parse('{"asyncapi": "2.0.0"}', { sourceMap: true });
```

### Indirect usage

You can omit the `mediaType` option here, but please read [Word on detect vs mediaTypes](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser#word-on-detect-vs-mediatypes) before you do so.

```js
import ApiDOMParser from 'apidom-parser';
import * as asyncApiJsonAdapter from 'apidom-parser-adapter-asyncapi-json-2-0';

const parser = ApiDOMParser();

parser.use(asyncApiJsonAdapter);

const parseResult = await parser.parse('{"asyncapi": "2.0.0"}', { mediaType: asyncApiJsonAdapter.mediaTypes[0] });
```
