# @swagger-api/apidom-parser

`@swagger-api/apidom-parser` consumes parser adapters and provides unified API for parsing.

## Installation

You can install this package via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-parser
```

## Mounting parser adapters

ApiDOM parser can consume any parser adapter as long as its shape is compatible.
In order for parsing adapter to be compatible it must be a [JavaScript Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
containing following 4 properties (2 required, 2 optional):

Property | Type | Default | Description
--- | --- | --- | ---
<a name="detect"></a>`detect` | `(source: String) => Boolean` | `undefined` | This method is called from a parser with a single argument of string that is going to be parsed. Returns a boolean value indicating if the source string was recognized by the parser adapter. It can be defined either as [synchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#synchronous_javascript) or [asynchronous function](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#asynchronous_javascript).
<a name="mediaTypes"></a>`mediaTypes` | `String[]` | `undefined` | This is a property of parser adapter that contains list of supported [media types](https://www.iana.org/assignments/media-types/media-types.xhtml) by this parser adapter. Note that other media types that are not officially registered by [iana](https://www.iana.org/) can be used as well.
<a name="namespace"></a>`namespace` | `Namespace` | | **REQUIRED** An ApiDOM namespace instance.
<a name="parse"></a>`parse` | `(source: String, options = {}) => ParseResult` |  | **REQUIRED** This method should contain logic of actual parsing and should return instance of [ParseResult Element](https://github.com/swagger-api/apidom/blob/main/packages/apidom/src/elements/ParseResult.ts).

Now, let's mount some adapters:

```js
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as jsonParserAdapter from '@swagger-api/apidom-parser-adapter-json';
import * as yamlParserAdapter from '@swagger-api/apidom-parser-adapter-yaml';

const parser = ApiDOMParser();

parser.use(jsonParserAdapter);
parser.use(yamlParserAdapter);
```

## Finding an appropriate ApiDOM namespace

ApiDOM parser contains logic of mapping a `source string` + `mediaType` to appropriate ApiDOM namespace.
It will return either [base namespace instance](https://github.com/swagger-api/apidom/tree/main/packages/apidom#base-namespace) or a specific one like [OpenApi 3.1.0](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-openapi-3-1#openapi-310-namespace) or [AsyncApi 2.6.0](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-asyncapi-2#asyncapi-2xy-namespace).

```js
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as jsonParserAdapter from '@swagger-api/apidom-parser-adapter-json';
import * as yamlParserAdapter from '@swagger-api/apidom-parser-adapter-yaml';

const parser = ApiDOMParser();

parser.use(jsonParserAdapter);
parser.use(yamlParserAdapter);

const namespace = await parser.findNamespace('{"prop", "value"}', { mediaType: 'application/json' });
```

## Finding an appropriate media type

ApiDOM parser contains logic of mapping a `source string` to appropriate media type.

```js
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as jsonParserAdapter from '@swagger-api/apidom-parser-adapter-json';
import * as yamlParserAdapter from '@swagger-api/apidom-parser-adapter-yaml';

const parser = ApiDOMParser();

parser.use(jsonParserAdapter);
parser.use(yamlParserAdapter);

await parser.findMediaType('{"prop", "value"}'); // => 'application/json'
await parser.findMediaType('key: value'); // => 'application/yaml'
```


## Parsing

ApiDOM parser doesn't contain any parsing logic. It uses parser adapter to provide the parsing logic for it.

```js
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as jsonParserAdapter from '@swagger-api/apidom-parser-adapter-json';
import * as yamlParserAdapter from '@swagger-api/apidom-parser-adapter-yaml';

const parser = ApiDOMParser();

parser.use(jsonParserAdapter);
parser.use(yamlParserAdapter);

const parseResult = await parser.parse('{"prop", "value"}', { mediaType: 'application/json' });
```

`parse` method consumes various options as a second argument. Here is a list of options recognized by all parser adapters:

Option | Type | Default | Description
--- | --- | --- | ---
<a name="mediaType"></a>`mediaType` | `String` | `undefined` | Indicate to parser that the source string should be understood and parsed as provided by this option.
<a name="sourceMap"></a>`sourceMap` | `Boolean` | `false` | Indicate to parser whether to generate source maps.

All unrecognized arbitrary options will be further passed to underlying parser adapter.

#### Parsing errors

If no parser adapter was mounted before the parsing, calling `parse` method will result in Error.

```js
import ApiDOMParser from '@swagger-api/apidom-parser';

const parser = ApiDOMParser();
const parseResult = await parser.parse('{"prop", "value"}', { mediaType: 'application/json' });
// => Error('Document did not match any registered parsers')
```

Along with this, if underlying parser adapter produces an error, this error is propagated to ApiDOM
parser.

#### Word on detect vs mediaTypes

We strongly encourage users of this package to use explicit `mediaType` option when calling
`parse` method. If `mediaType` is not provided the parser will fallback to calling `detect` method
on parser adapter to indicate if the source string can be parsed by a parser adapter. As there are
ambiguities and common forms in different formats like JSON vs YAML, it's not always possible to
detect the format correctly and choose appropriate parser adapter.

Here is an example of YAML fragment:

```yaml
{"prop": "value"}
```

This is a valid YAML, but it's also a valid JSON. It's not possible for parser adapter to properly
detect which format was intended by the author.

#### Word on ordering

If multiple parser adapters contain identical `mediaTypes` or `detect` logic then for the purposes
of [parsing](#parsing) or [finding an appropriate namespace](#finding-an-appropriate-apidom-namespace)
the order of [mounting the parser adapters](#mounting-parser-adapters) matter. The first parser adapter that matches its `mediaTypes`
or returns `true` from a `detect` is used.
