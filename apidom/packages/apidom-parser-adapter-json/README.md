# apidom-parser-adapter-json

`apidom-parser-adapter-json` is a parser adapter for the [JSON format](https://www.json.org/json-en.html).
This parser adapter uses [tree-sitter](https://www.npmjs.com/package/tree-sitter) / [web-tree-sitter](https://www.npmjs.com/package/web-tree-sitter) as an underlying parser.
Tree-sitter uses [tree-sitter-json grammar](https://www.npmjs.com/package/tree-sitter-json) to produce [CST](https://tree-sitter.github.io/tree-sitter/using-parsers#syntax-nodes) from a source string.

[CST](https://tree-sitter.github.io/tree-sitter/using-parsers#syntax-nodes) produced by tree-sitter parser is [syntactically analyzed](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-parser-adapter-json/src/parser/syntactic-analysis.ts) and [JSON AST](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-ast#json-ast-nodes) is produced.
JSON AST is then transformed into generic ApiDOM structure using [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom#base-namespace).

## Parser adapter API

This parser adapter is fully compatible with parser adapter interface required by [apidom-parser](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser#mounting-parser-adapters)
and implements all required properties.

### mediaTypes

Defines list of media types that this parser adapter recognizes.

```js
['application/json']
```

### detect

[Detection](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-parser-adapter-json/src/adapter.ts#L3) is based on using [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) to indicate whether the provided source string is or isn't JSON string.

### namespace

This adapter exposes an instance of [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom#base-namespace).

### parse

`parse` function consumes various options as a second argument. Here is a list of these options:

Option | Type | Default | Description
--- | --- | --- | ---
<a name="specObj"></a>`specObj` | `Object` | [Specification Object](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-parser-adapter-json/src/parser/specification.ts) | This specification object drives the JSON AST transformation to base ApiDOM namespace.
<a name="sourceMap"></a>`sourceMap` | `Boolean` | `false` | Indicate whether to generate source maps.

All unrecognized arbitrary options will be ignored.

## Usage

This parser adapter can be used directly or indirectly via [apidom-parser](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser).

### Direct usage

During direct usage you don't need to provide `mediaType` and the `parse` function is already pre-bound
with [supported media types](#mediaTypes).

```js
import { parse, detect } from 'apidom-parser-adapter-json';

// detecting
await detect('{"prop": "value"}'); // => true
await detect('test'); // => false

// parsing
const parseResult = await parse('{"prop": "value"}', { sourceMap: true });
```

### Indirect usage

You can omit the `mediaType` option here, but please read [Word on detect vs mediaTypes](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser#word-on-detect-vs-mediatypes) before you do so.

```js
import ApiDOMParser from 'apidom-parser';
import * as jsonParserAdapter from 'apidom-parser-adapter-json';

const parser = ApiDOMParser();

parser.use(jsonParserAdapter);

const parseResult = await parser.parse('{"prop", "value"}', { mediaType: jsonParserAdapter.mediaTypes[0] });
```
