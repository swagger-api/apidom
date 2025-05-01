# @swagger-api/apidom-json-pointer

`apidom-json-pointer` is a package that evaluates [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) against ApiDOM.

## Installation

You can install this package via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-json-pointer
```

## Modern API

This is the recommended API for use in new projects. It is fully compliant with [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901) and supports all aspects of JSON Pointer.
Uses [@swaggerexpert/json-pointer](https://www.npmjs.com/package/@swaggerexpert/json-pointer) under the hood and fully reflects its API.

Evaluation is contextual to [ApiDOM realm](https://github.com/swaggerexpert/json-pointer?tab=readme-ov-file#apidom-evaluation-realm) - meaning `evaluate` function
expects only ApiDOM as the first argument.

```js
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
```



## Legacy API

This is a legacy API not recommended for use in new projects. It is provided for backward compatibility only.
The legacy API implementation is not RFC 6901 compliant, nor does it support all features of JSON Pointer.

Importing legacy API from `@swagger-api/apidom-json-pointer` is equivalent to importing from `@swagger-api/apidom-json-pointer/legacy`.

```js
import { evaluate } from '@swagger-api/apidom-json-pointer';
```
or
```js
import { evaluate } from '@swagger-api/apidom-json-pointer/legacy';
```

### Evaluating

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer';

const apidom = new ObjectElement({ a: { b: 'c' } });
const result =  evaluate('/a/b', apidom);
// => StringElement('c')
```

### Parsing

Parses JSON Pointer into list of tokens.

```js
import { parse } from '@swagger-api/apidom-json-pointer';

const tokens = parse('/a/b'); // => ['a', 'b']
```

### Compiling

Compiles list of tokens into JSON Pointer.

```js
import { compile } from '@swagger-api/apidom-json-pointer';

const jsonPointer = compile(['a', 'b']); // => '/a/b'
```

### Escaping

Escapes/unescapes tokens of JSON Pointer.

```js
import { escape, unescape } from '@swagger-api/apidom-json-pointer';

escape('~a/'); // => '~0a~1'
unescape('~0a~1'); // => '~a/'
```

### Transforming URI to JSON Pointer

Handles case of [URI Fragment Identifier Representation](https://datatracker.ietf.org/doc/html/rfc6901#section-6).

```js
import { uriToPointer } from '@swagger-api/apidom-json-pointer';

uriToPointer('https://example.com/path/#/a/b'); // => '/a/b'
```

### Invalid JSON Pointers

If invalid JSON Pointer is supplied to `parse` or `evaluate` functions, `InvalidJsonPointerError`
is thrown.

```js
import { InvalidJsonPointerError } from '@swagger-api/apidom-json-pointer';
```

If valid JSON Pointer is supplied to `evaluate` function and the pointer cannot be evaluated against
ApiDOM fragment, `EvaluationJsonPointerError` is thrown.

```js
import { EvaluationJsonPointerError } from '@swagger-api/apidom-json-pointer';
```

