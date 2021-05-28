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

## Implementation progress

Only fully implemented specification objects should be checked here.

### Specification Objects

- [ ] [AsyncAPI Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#A2SObject) (partial)
- [x] [AsyncAPI Version String](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#A2SVersionString)
- [x] [Identifier](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#A2SIdString)
- [x] [Info Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#A2SIdString)
- [x] [Contact Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#contactObject)
- [x] [License Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#license-object)
- [x] [Servers Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#serversObject)
- [x] [Server Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#serverObject)
- [x] [Server Variable Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#serverVariableObject)
- [x] [Default Content Type](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#defaultContentTypeString)
- [x] [Channels Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#channelsObject)
- [x] [Channel Item Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#channelItemObject)
- [ ] [Operation Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#operationObject) (partial)
- [ ] [Operation Trait Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#operationTraitObject)
- [ ] [Message Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#messageObject)
- [ ] [Message Trait Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#messageTraitObject)
- [x] [Tags Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#tagsObject)
- [x] [Tag Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#tag-object)
- [x] [External Documentation Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#externalDocumentationObject)
- [ ] [Components Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#componentsObject) (partial)
- [x] [Reference Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#referenceObject)
- [ ] [Schema Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject) (partial)
- [ ] [Security Scheme Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#securitySchemeObject) (partial)
- [x] [Security Requirement Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#security-requirement-object) (partial)
- [x] [OAuth Flows Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#oauth-flows-object)
- [x] [OAuth Flow Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#oauth-flow-object)
- [ ] [Server Bindings Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#serverBindingsObject) (partial)
- [x] [Parameters Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#parametersObject)
- [x] [Parameter Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#parameterObject)
- [ ] [Channel Bindings Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#channel-bindings-object) (partial)
- [ ] [Operation Bindings Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#operation-bindings-object)
- [ ] [Message Bindings Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#messageBindingsObject)
- [x] [Correlation ID Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#correlationIdObject)
- [x] [Specification Extension](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#specificationExtensions)

### Binding Objects

#### HTTP Bindings

- [ ] [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#server-binding-object) (reserved for future)
- [ ] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#channel-binding-object) (reserved for future)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#message-binding-object)

#### WebSockets Bindings

- [ ] [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#server-binding-object) (reserved for future)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#channel-binding-object)
- [ ] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#operation-binding-object) (reserved for future)
- [ ] [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#message-binding-object) (reserved for future)

#### Kafka Bindings

- [ ] [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#server-binding-object) (reserved for future)
- [ ] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#channel-binding-object) (reserved for future)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#message-binding-object)

#### AMQP 0-9-1 Bindings

- [ ] [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#server-binding-object) (reserved for future)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#message-binding-object)

#### MQTT Bindings

- [ ] [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#server-binding-object) (partial)
- [ ] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#channel-binding-object) (reserved for future)
- [ ] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#operation-binding-object) (partial)
- [ ] [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#message-binding-object) (partial)

