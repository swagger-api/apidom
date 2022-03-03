# @swagger-api/apidom-ns-api-design-systems

`@swagger-api/apidom-ns-api-design-systems` contains ApiDOM namespace specific to [API Design System Specification](https://apidesign.systems/specification/).

## Installation

`@swagger-api/apidom-ns-api-design-systems` is currently hosted on [GitHub packages registry](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages).
For installing `@swagger-api/apidom-ns-api-design-systems` from GitHub packages registry, create `.npmrc` file in your current directory and add
the following line to it:

```
@swagger-api:registry=https://npm.pkg.github.com
```

You can now install the package using `npm`:

```sh
 $ npm install apidom-ns-api-design-systems
```

## API Design Systems 2021-05-07 namespace

API Design Systems 2021-05-07 namespace consists of [number of elements](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-api-design-systems/src/elements) implemented on top
of [primitive ones](https://github.com/refractproject/minim/tree/master/lib/primitives).

```js
import { createNamespace } from '@swagger-api/apidom-core';
import apiDesignSystemsNamespace from '@swagger-api/apidom-ns-api-design-systems';

const namespace = createNamespace(apiDesignSystemsNamespace);

const objectElement = new namespace.elements.Object();
const mainElement = new namespace.elements.Main();
```

When namespace instance is created in this way, it will extend the base namespace
with the namespace provided as an argument.

Elements from the namespace can also be used directly by importing them.

```js
import { MainElement, InfoElement } from '@swagger-api/apidom-ns-api-design-systems';

const infoElement = new InfoElement();
const mainElement = new MainElement();
```

## Predicates

This package exposes [predicates](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-api-design-systems/src/predicates.ts)
for all higher order elements that are part of this namespace.

```js
import { isMainElement, MainElement } from '@swagger-api/apidom-ns-api-design-systems';

const mainElement = new MainElement();

isMainElement(mainElement); // => true
```

## Traversal

Traversing ApiDOM in this namespace is possible by using `visit` function from `apidom` package.
This package comes with its own [keyMap](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-api-design-systems/src/traversal/visitor.ts) and  and [nodeTypeGetter](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-api-design-systems/src/traversal/visitor.ts).
To learn more about these `visit` configuration options please refer to [@swagger-api/apidom-ast documentation](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ast/README.md#visit).

```js
import { visit } from '@swagger-api/apidom-core';
import { MainElement, keyMap, getNodeType } from '@swagger-api/apidom-ns-api-design-systems';

const element = new MainElement();

const visitor = {
  MainElement(mainElement) {
    console.dir(mainElement);
  },
};

visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType });
```

## Refractors

Refractor is a special layer inside the namespace that can transform either JavaScript structures
or generic ApiDOM structures into structures built from elements of this namespace.

**Refracting JavaScript structures**:

```js
import { InfoElement } from '@swagger-api/apidom-ns-api-design-systems';

const object = {
    title: 'my title',
    description: 'my description',
};

InfoElement.refract(object); // => InfoElement({ title, description })
```

**Refracting generic ApiDOM structures**:

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-api-design-systems';

const objectElement = new ObjectElement({
    title: 'my title',
    description: 'my description',
});

InfoElement.refract(objectElement); // => InfoElement({ title = 'my title', description = 'my description' })
```

### Refractor plugins

Refractors can accept plugins as a second argument of refract static method.

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-api-design-systems';

const objectElement = new ObjectElement({
    title: 'my title',
    description: 'my description',
});

const plugin = ({ predicates, namespace }) => ({
  name: 'plugin',
  pre() {
      console.dir('runs before traversal');
  },
  visitor: {
    InfoElement(infoElement) {
      infoElement.title = 'new title';
    },
  },
  post() {
      console.dir('runs after traversal');
  },
});

InfoElement.refract(objectElement, { plugins: [plugin] }); // => InfoElement({ title = 'new title', description = 'my description' })
```

You can define as many plugins as needed to enhance the resulting namespaced ApiDOM structure.
If multiple plugins with the same visitor method are defined, they run in parallel (just like in Babel).

#### OpenAPI 3.1 Standard Identifier Selectors plugin

This plugin is specific to OpenAPI 3.1 specification and decorates significant
OpenAPI 3.1 elements with [Standard Identifiers](https://apidesign.systems/standards/) used
for [Scenario.when](https://apidesign.systems/specification/#scenario) field.

```js
import { parse } from '@swagger-api/apidom-parser-adapter-json';
import { refractPluginOpenApi3_1StandardIdentifierSelectors } from '@swagger-api/apidom-ns-api-design-systems';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

const jsonDefinition = `
{
  "openapi": "3.1.0",
  "paths": {
    "/path1": {
      "get": {},
      "put": {
        "parameters": [
          {
            "name": "X-Header",
            "in": "header",
            "description": "parameter3 description",
            "required": false,
            "deprecated": false,
            "allowEmptyValue": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "content": {
              "application/json": {}
            }
          }
        }
      },
      "parameters": [
        {
          "name": "X-Header2",
          "in": "header",
          "description": "parameter1 description",
          "allowEmptyValue": true
        }
      ]
    }
  }
}
`;
const apiDOM = await parse(jsonDefinition);
const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
  plugins: [refractPluginOpenApi3_1StandardIdentifier()],
});
// => OperationElement now contains [['http', 'transaction']] under `ads-s-standard-identifier` key
// => other elements are decorated by different metadata as well
```

## Implementation progress

Only fully implemented specification objects should be checked here.

- [x] [Main](https://apidesign.systems/specification/#main)
- [x] [Info](https://apidesign.systems/specification/#info-object)
- [x] [Principle](https://apidesign.systems/specification/#principle)
- [x] [Standard](https://apidesign.systems/specification/#standard)
- [x] [Scenario](https://apidesign.systems/specification/#scenario)
- [x] [Requirement](https://apidesign.systems/specification/#requirement)
- [x] [Standard Identifier](https://apidesign.systems/specification/#standard-identifier-arraystring)
- [x] [Requirement Level](https://apidesign.systems/specification/#requirement-level-enum)
