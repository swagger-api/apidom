# @swagger-api/apidom-json-pointer

`apidom-json-pointer` is a package that evaluates [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) against ApiDOM.

## Installation

`@swagger-api/apidom-json-pointer` is currently hosted on [GitHub packages registry](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages).
For installing `@swagger-api/apidom-json-pointer` from GitHub packages registry, create `.npmrc` file in your current directory and add
the following line to it:

```
@swagger-api:registry=https://npm.pkg.github.com
```

You can now install the package using `npm`:

```sh
 $ npm install @swagger-api/apidom-json-pointer
```
## Evaluating

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer';

const apidom = new ObjectElement({ a: { b: 'c' } });
const result =  evaluate('/a/b', apidom);
// => StringElement('c')
```

## Parsing

Parses JSON Pointer into list of tokens.

```js
import { parse } from '@swagger-api/apidom-json-pointer';

const tokens = parse('/a/b'); // => ['a', 'b']
```

## Compiling

Compiles list of tokens into JSON Pointer.

```js
import { compile } from '@swagger-api/apidom-json-pointer';

const jsonPointer = compile(['a', 'b']); // => '/a/b'
```

## Escaping

Escapes/unescapes tokens of JSON Pointer.

```js
import { escape, unescape } from '@swagger-api/apidom-json-pointer';

escape('~a/'); // => '~0a~1'
unescape('~0a~1'); // => '~a/'
```

## Invalid JSON Pointers

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
