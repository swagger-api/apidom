# @swagger-api/apidom-json-path

`apidom-json-path` is a package that evaluates [JSONPath](https://support.smartbear.com/alertsite/docs/monitors/api/endpoint/jsonpath.html) expressions against ApiDOM.

## Installation

`@swagger-api/apidom-json-path` is currently hosted on [GitHub packages registry](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages).
For installing `@swagger-api/apidom-json-path` from GitHub packages registry, create `.npmrc` file in your current directory and add
the following line to it:

```
@swagger-api:registry=https://npm.pkg.github.com
```

You can now install the package using `npm`:

```sh
 $ npm install @swagger-api/apidom-json-path
```

## Evaluating

Package contains JSONPath evaluation functions for evaluating single or multiple JSONPath expression.

### Evaluating single JSONPath expression

Suited for evaluating single JSONPath expression against ApiDOM.

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-path';

const apidom = new ObjectElement({
  a: {
    b: [100, 1, 2],
  },
});
const result = evaluate('$.a.b[?(@ < 10)]', apidom);
// =>
// [
//   NumberElement(1),
//   NumberElement(2),
// ]
```
### Evaluating multiple JSONPath expressions

Suited for evaluating multiple JSONPath expression against the same ApiDOM.
Use this function in cases when you have multiple JSONPath expressions that need
to be evaluated against single ApiDOM fragment.

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { evaluateMulti } from '@swagger-api/apidom-json-path';

const apidom = new ObjectElement({
  a: {
    b: [100, 1, 2],
  },
});
const resultMulti = evaluateMulti(['$.a.b[?(@ < 10)]', '$.a.b[?(@ > 10)]'], apidom);
// => returns list of tuples which represents mappings between paths and end point values
// [
//   ['$.a.b[?(@ < 10)]', [NumberElement(1), NumberElement(2)]],
//   ['$.a.b[?(@ > 10)]', [NUmberElement(100)]],
// ]
```

## Invalid JSONPath expression

If either `evaluate` or `evaluateMulti` functions are provided with invalid JSONPath expressions,
they don't throw errors, but they rather return empty list of end point values.

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { evaluate, evaluateMulti } from '@swagger-api/apidom-json-path';

const apidom = new ObjectElement({
  a: {
    b: [100, 1, 2],
  },
});
const result = evaluate('%~!@U@IU$@', apidom); // => []
const resultMulti = evaluateMulti(['%~!@U@IU$@', 'd*AS&*)(&YR3R'], apidom); // => []
```
