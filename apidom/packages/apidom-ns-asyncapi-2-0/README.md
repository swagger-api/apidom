# apidom-ns-asyncapi-2-0

`apidom-ns-asyncapi-2-0` contains ApiDOM namespace specific to [AsyncApi 2.0.0 specification](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md).

## AsyncApi 2.0.0 namespace

AsyncApi 2.0.0 namespace consists of [number of elements](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-ns-asyncapi-2-0/src/elements) implemented on top
of [primitive ones](https://github.com/refractproject/minim/tree/master/lib/primitives).

```js
import { createNamespace } from 'apidom';
import asyncApi2_0Namespace from 'apidom-ns-asyncapi-2-0';

const namespace = createNamespace(asyncApi2_0Namespace);

const objectElement = new namespace.elements.Object();
const asyncApiElement = new namespace.elements.AsyncApi2_0();
```

When namespace instance is created in this way, it will extend the base namespace
with the namespace provided as an argument.

Elements from the namespace can also be used directly by importing them.

```js
import { AsyncApi2_0Element, InfoElement } from 'apidom-ns-asyncapi-2-0';

const infoElement = new InfoElement();
const asyncApiElement = new AsyncApi2_0Element();
```

## Predicates

This package exposes [predicates](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-ns-asyncapi-2-0/src/predicates.ts)
for all higher order elements that are part of this namespace.

```js
import { isAsyncApi2_0Element, AsyncApi2_0Element } from 'apidom-ns-asyncapi-2-0';

const asyncApiElement = new AsyncApi2_0Element();

isAsyncApi2_0Element(asyncApiElement); // => true
```

## Traversal

Traversing ApiDOM in this namespace is possible by using `visit` function from `apidom` package.
This package comes with its own [keyMap](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-ns-asyncapi-2-0/src/traversal/visitor.ts#L11) and [nodeTypeGetter](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-ns-asyncapi-2-0/src/traversal/visitor.ts#L4).
To learn more about these `visit` configuration options please refer to [apidom-ast documentation](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-ast/README.md#visit).

```js
import { visit } from 'apidom';
import { AsyncApi2_0Element, keyMap, getNodeType } from 'apidom-ns-asyncapi-2-0';

const element = new AsyncApi2_0Element();

const visitor = {
  AsyncApi2_0Element(asyncApiElement) {
    console.dir(asyncApiElement);
  },
};

visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType });
```

## Refractors

Refractor is a special layer inside the namespace that can transform either JavaScript structures
or generic ApiDOM structures into structures built from elements of this namespace.

**Refracting JavaScript structures**:

```js
import { InfoElement } from 'apidom-ns-asyncapi-2-0';

const object = {
    title: 'my title',
    description: 'my description',
    version: '0.1.0',
};

InfoElement.refract(object); // => InfoElement({ title, description, version })
```

**Refracting generic ApiDOM structures**:

```js
import { ObjectElement } from 'apidom';
import { InfoElement } from 'apidom-ns-asyncapi-2-0';

const objectElement = new ObjectElement({
    title: 'my title',
    description: 'my description',
    version: '0.1.0',
});

InfoElement.refract(objectElement); // => InfoElement({ title = 'my title', description = 'my description', version = '0.1.0' })
```

### Refractor plugins

Refractors can accept plugins as a second argument of refract static method.

```js
import { ObjectElement } from 'apidom';
import { InfoElement } from 'apidom-ns-asyncapi-2-0';

const objectElement = new ObjectElement({
    title: 'my title',
    description: 'my description',
    version: '0.1.0',
});

const plugin = ({ predicates, namespace }) => ({
  name: 'plugin',
  pre() {
      console.dir('runs before traversal');
  },
  visitor: {
    InfoElement(infoElement) {
      infoElement.version = '2.0.0';
    },
  },
  post() {
      console.dir('runs after traversal');
  },
});

InfoElement.refract(objectElement, { plugins: [plugin] }); // => InfoElement({ title = 'my title', description = 'my description', version = '2.0.0' })
```

You can define as many plugins as needed to enhance the resulting namespaced ApiDOM structure.
If multiple plugins with the same visitor method are defined, they run in parallel (just like in Babel).
