# apidom-parser-adapter-yaml-1-2

`apidom-parser-adapter-yaml-1-2` is a parser adapter for the [YAML 1.2 format](https://yaml.org/spec/1.2/spec.html).
This parser adapter uses [tree-sitter](https://www.npmjs.com/package/tree-sitter) / [web-tree-sitter](https://www.npmjs.com/package/web-tree-sitter) as an underlying parser.
Tree-sitter uses [tree-sitter-yaml grammar](https://www.npmjs.com/package/tree-sitter-yaml) to produce [CST](https://tree-sitter.github.io/tree-sitter/using-parsers#syntax-nodes) from a source string.

[CST](https://tree-sitter.github.io/tree-sitter/using-parsers#syntax-nodes) produced by tree-sitter parser is [syntactically analyzed](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-parser-adapter-yaml-1-2/src/parser/syntactic-analysis.ts) and [YAML AST](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-ast#yaml-ast-nodes) is produced.
YAML AST is then transformed into generic ApiDOM structure using [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom#base-namespace).

## Parser adapter API

This parser adapter is fully compatible with parser adapter interface required by [apidom-parser](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser#mounting-parser-adapters)
and implements all required properties.

### mediaTypes

Defines list of media types that this parser adapter recognizes.

```js
['text/yaml', 'application/yaml']
```

### detect

[Detection](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-parser-adapter-yaml-1-2/src/adapter.ts#L3) of this parser adapter
always returns `false`. The reason is that it's almost impossible to detect if a source string is YAML without actually parsing it.
Don't rely on this function, rather use `mediaType` instead and please read [Word on detect vs mediaTypes](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser#word-on-detect-vs-mediatypes).

### namespace

This adapter exposes an instance of [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom#base-namespace).

### parse

`parse` function consumes various options as a second argument. Here is a list of these options:

Option | Type | Default | Description
--- | --- | --- | ---
<a name="specObj"></a>`specObj` | `Object` | [Specification Object](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-parser-adapter-yaml-1-2/src/parser/specification.ts) | This specification object drives the YAML AST transformation to base ApiDOM namespace.
<a name="sourceMap"></a>`sourceMap` | `Boolean` | `false` | Indicate whether to generate source maps.

All unrecognized arbitrary options will be ignored.

## Usage

This parser adapter can be used directly or indirectly via [apidom-parser](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser).

### Direct usage

During direct usage you don't need to provide `mediaType` as the `parse` function is already pre-bound
with [supported media types](#mediatypes).

```js
import { parse, detect } from 'apidom-parser-adapter-yaml-1-2';

// always detecting false in this parser adapter
await detect('prop: value'); // => false
await detect('test'); // => false

// parsing
const parseResult = await parse('prop: value', { sourceMap: true });
```

### Indirect usage

```js
import ApiDOMParser from 'apidom-parser';
import * as yamlParserAdapter from 'apidom-parser-adapter-yaml-1-2';

const parser = ApiDOMParser();

parser.use(yamlParserAdapter);

const parseResult = await parser.parse('prop: value', { mediaType: yamlParserAdapter.mediaTypes[0] });
```
