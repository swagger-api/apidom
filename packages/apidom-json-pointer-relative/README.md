# @swagger-api/apidom-json-pointer

`apidom-json-pointer-relative` is a package that evaluates [Relative JSON Pointer](https://datatracker.ietf.org/doc/html/draft-bhutton-relative-json-pointer-00) against ApiDOM.

## Installation

You can install this package via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-json-pointer-relative
```
## Evaluating

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer-relative';

const root = new ObjectElement({ a: { b: 'c' } });
const current = root.get('a').get('b');
const result =  evaluate('0#', current, root);
// => StringElement('b')
```

## Parsing

Parses Relative JSON Pointer into AST (Abstract Syntax Tree).

```js
import { parse } from '@swagger-api/apidom-json-pointer-relative';

const tokens = parse('2/foo/0');
// => { nonNegativeIntegerPrefix: 2, indexManipulation: undefined, jsonPointerTokens: ['foo', '0'], hashCharacter: false }
```

## Compiling

Compiles AST into Relative JSON Pointer.

```js
import { compile } from '@swagger-api/apidom-json-pointer-relative';

const relativeJsonPointer = compile({
  nonNegativeIntegerPrefix: 2,
  indexManipulation: undefined,
  jsonPointerTokens: ['highly', 'nested', 'objects'],
  hashCharacter: false,
}); // => '2/highly/nested/objects'
```

## Invalid Relative JSON Pointers

If invalid Relative JSON Pointer is supplied to `parse` or `evaluate` functions, `InvalidRelativeJsonPointerError`
is thrown.

```js
import { InvalidRelativeJsonPointerError } from '@swagger-api/apidom-json-pointer-relative';
```

If valid JSON Pointer is supplied to `evaluate` function and the relative pointer cannot be evaluated against
ApiDOM fragment, `EvaluationRelativeJsonPointerError` is thrown.

```js
import { EvaluationRelativeJsonPointerError } from '@swagger-api/apidom-json-pointer-relative';
```
