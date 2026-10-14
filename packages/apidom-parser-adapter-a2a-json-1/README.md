# @swagger-api/apidom-parser-adapter-a2a-json-1

`@swagger-api/apidom-parser-adapter-a2a-json-1` is a parser adapter for [A2A (Agent-to-Agent) Protocol v1.0](https://a2a-protocol.org/latest/specification/) AgentCard documents in [JSON format](https://www.json.org/json-en.html).
Under the hood this adapter uses [apidom-parser-adapter-json](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-json)
to parse a source string into generic ApiDOM in [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/main/packages/apidom-core#base-namespace)
which is then refracted with [A2A 1.x.y Refractors](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-a2a-1#refractors).

## Installation

After [prerequisites](https://github.com/swagger-api/apidom/blob/main/README.md#prerequisites) for installing this package are satisfied, you can install it
via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-parser-adapter-a2a-json-1
```

## Parser adapter API

This parser adapter is fully compatible with parser adapter interface required by [@swagger-api/apidom-parser](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser#mounting-parser-adapters)
and implements all required properties.

### mediaTypes

Defines list of media types that this parser adapter recognizes.

```js
[
  'application/vnd.a2a;version=1.0.0',
  'application/vnd.a2a+json;version=1.0.0',
]
```

### detect

A2A AgentCard documents have **no version discriminator field** (unlike OpenAPI's `"openapi": "3.1.0"` or Arazzo's `"arazzo": "1.0.1"`). [Detection](https://github.com/swagger-api/apidom/blob/main/packages/apidom-parser-adapter-a2a-json-1/src/adapter.ts) is therefore **structural**: a JSON document is treated as an A2A AgentCard when it parses as JSON and contains both a `capabilities` object and a `skills` array. False positives are possible — set the `mediaType` on the `File` explicitly when the type is known.

### namespace

This adapter exposes an instance of [A2A 1.x.y ApiDOM namespace](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-a2a-1/README.md).

### parse

`parse` function consumes various options as a second argument. Here is a list of these options:

Option | Type | Default | Description
--- | --- | --- | ---
<a name="specObj"></a>`specObj` | `Object` | [Specification Object](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-a2a-1/src/refractor/specification.ts) | This specification object drives the JSON AST transformation to A2A 1.x.y ApiDOM namespace.
<a name="sourceMap"></a>`sourceMap` | `Boolean` | `false` | Indicate whether to generate source maps.
<a name="refractorOpts"></a>`refractorOpts` | `Object` | `{}` | Refractor options are passed to refractors during refracting phase.

All unrecognized arbitrary options will be ignored.

## Usage

This parser adapter can be used directly or indirectly via [@swagger-api/apidom-parser](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser).

### Direct usage

During direct usage you don't need to provide `mediaType` as the `parse` function is already pre-bound
with [supported media types](#mediatypes).

```js
import { parse, detect } from '@swagger-api/apidom-parser-adapter-a2a-json-1';

// detecting
await detect('{ "capabilities": {}, "skills": [] }'); // => true
await detect('test'); // => false

// parsing
const parseResult = await parse('{ "capabilities": {}, "skills": [] }', { sourceMap: true });
```

### Indirect usage

You can omit the `mediaType` option here, but please read [Word on detect vs mediaTypes](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser#word-on-detect-vs-mediatypes) before you do so.

```js
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as a2aJsonAdapter from '@swagger-api/apidom-parser-adapter-a2a-json-1';

const parser = new ApiDOMParser();

parser.use(a2aJsonAdapter);

const parseResult = await parser.parse(jsonSource, { mediaType: a2aJsonAdapter.mediaTypes.latest('json') });
```

## License

Apache-2.0
