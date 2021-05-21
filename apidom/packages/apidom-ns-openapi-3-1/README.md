# apidom-ns-openapi-3-1

`apidom-ns-openapi-3-1` contains ApiDOM namespace specific to [OpenApi 3.1.0 specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md).

## OpenApi 3.1.0 namespace

OpenApi 3.1.0 namespace consists of [number of elements](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-ns-openapi-3-1/src/elements) implemented on top
of [primitive ones](https://github.com/refractproject/minim/tree/master/lib/primitives).

```js
import { createNamespace } from 'apidom';
import openApi3_1Namespace from 'apidom-ns-openapi-3-1';

const namespace = createNamespace(openApi3_1Namespace);

const objectElement = new namespace.elements.Object();
const openApiElement = new namespace.elements.OpenApi3_1();
```

When namespace instance is created in this way, it will extend the base namespace
with the namespace provided as an argument.

Elements from the namespace can also be used directly by importing them.

```js
import { OpenApi3_1Element, InfoElement } from 'apidom-ns-openapi-3-1';

const infoElement = new InfoElement();
const openApiElement = new OpenApi3_1Element();
```

## Predicates

This package exposes [predicates](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-ns-openapi-3-1/src/predicates.ts)
for all higher order elements that are part of this namespace.

```js
import { isOpenApi3_1Element, OpenApi3_1Element } from 'apidom-ns-openapi-3-1';

const openApiElement = new OpenApi3_1Element();

isOpenApi3_1Element(openApiElement); // => true
```

## Traversal

Traversing ApiDOM in this namespace is possible by using `visit` function from `apidom` package.
This package comes with its own [keyMap](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-ns-openapi-3-1/src/traversal/visitor.ts#L11) and  and [nodeTypeGetter](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-ns-openapi-3-1/src/traversal/visitor.ts#L4).
To learn more about these `visit` configuration options please refer to [apidom-ast documentation](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-ast/README.md#visit).

```js
import { visit } from 'apidom';
import { OpenApi3_1Element, keyMap, getNodeType } from 'apidom-ns-openapi-3-1';

const element = new OpenApi3_1Element();

const visitor = {
  OpenApi3_1Element(openApiElement) {
    console.dir(openApiElement);
  },
};

visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType });
```

## Refractors

Refractor is a special layer inside the namespace that can transform either JavaScript structures
or generic ApiDOM structures into structures built from elements of this namespace.

**Refracting JavaScript structures**:

```js
import { InfoElement } from 'apidom-ns-openapi-3-1';

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
import { InfoElement } from 'apidom-ns-openapi-3-1';

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
import { InfoElement } from 'apidom-ns-openapi-3-1';

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

## Implementation progress

Only fully implemented specification objects should be checked here.

- [ ] [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasObject) (partial)
- [x] [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#infoObject)
- [x] [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#contactObject)
- [x] [License Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#licenseObject)
- [x] [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverObject)
- [x] [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverVariableObject)
- [ ] [Components](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsObject) (partial)
- [x] [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathsObject)
- [x] [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathItemObject)
- [x] [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationObject)
- [x] [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#externalDocumentationObject)
- [x] [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterObject)
- [ ] [Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#requestBodyObject) (partial)
- [ ] [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#mediaTypeObject) (partial)
- [ ] [Encoding Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#encodingObject)
- [x] [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#responsesObject)
- [ ] [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#callbackObject) (partial)
- [x] [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#exampleObject)
- [x] [Link Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#linkObject)
- [x] [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#headerObject)
- [x] [Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#tagObject)
- [x] [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject)
- [x] [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#schemaObject)
- [x] [Discriminator Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#discriminatorObject)
- [x] [XML Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#xmlObject)
- [x] [Security Scheme Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#securitySchemeObject)
- [x] [OAuth Flows Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oauthFlowsObject)
- [x] [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oauthFlowObject)
- [x] [Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#securityRequirementObject)
- [x] [Specification extensions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions)
