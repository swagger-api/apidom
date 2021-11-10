# @swagger-api/apidom-ns-asyncapi-2

`@swagger-api/apidom-ns-asyncapi-2` contains ApiDOM namespace supports following AsyncAPI specification versions:

- [AsyncAPI 2.0.0 specification](https://github.com/asyncapi/spec/blob/2.0.0/versions/2.0.0/asyncapi.md)
- [AsyncAPI 2.1.0 specification](https://github.com/asyncapi/spec/blob/v2.1.0/spec/asyncapi.md)
- [AsyncAPI 2.2.0 specification](https://github.com/asyncapi/spec/blob/v2.2.0/spec/asyncapi.md)


## AsyncApi 2.x.y namespace

AsyncApi 2.x.y namespace consists of [number of elements](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-asyncapi-2/src/elements) implemented on top
of [primitive ones](https://github.com/refractproject/minim/tree/main/lib/primitives).

```js
import { createNamespace } from '@swagger-api/apidom-core';
import asyncApi2Namespace from '@swagger-api/apidom-ns-asyncapi-2';

const namespace = createNamespace(asyncApi2Namespace);

const objectElement = new namespace.elements.Object();
const asyncApiElement = new namespace.elements.AsyncApi2();
```

When namespace instance is created in this way, it will extend the base namespace
with the namespace provided as an argument.

Elements from the namespace can also be used directly by importing them.

```js
import { AsyncApi2Element, InfoElement } from '@swagger-api/apidom-ns-asyncapi-2';

const infoElement = new InfoElement();
const asyncApiElement = new AsyncApi2Element();
```

## Predicates

This package exposes [predicates](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-asyncapi-2/src/predicates.ts)
for all higher order elements that are part of this namespace.

```js
import { isAsyncApi2Element, AsyncApi2Element } from '@swagger-api/apidom-ns-asyncapi-2';

const asyncApiElement = new AsyncApi2Element();

isAsyncApi2Element(asyncApiElement); // => true
```

## Traversal

Traversing ApiDOM in this namespace is possible by using `visit` function from `apidom` package.
This package comes with its own [keyMap](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-asyncapi-2/src/traversal/visitor.ts#L11) and [nodeTypeGetter](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-asyncapi-2/src/traversal/visitor.ts#L4).
To learn more about these `visit` configuration options please refer to [@swagger-api/apidom-ast documentation](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ast/README.md#visit).

```js
import { visit } from '@swagger-api/apidom-core';
import { AsyncApi2Element, keyMap, getNodeType } from '@swagger-api/apidom-ns-asyncapi-2';

const element = new AsyncApi2Element();

const visitor = {
  AsyncApi2Element(asyncApiElement) {
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
import { InfoElement } from '@swagger-api/apidom-ns-asyncapi-2';

const object = {
    title: 'my title',
    description: 'my description',
    version: '0.1.0',
};

InfoElement.refract(object); // => InfoElement({ title, description, version })
```

**Refracting generic ApiDOM structures**:

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-asyncapi-2';

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
import { ObjectElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-asyncapi-2';

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
      infoElement.version = '2.2.0';
    },
  },
  post() {
      console.dir('runs after traversal');
  },
});

InfoElement.refract(objectElement, { plugins: [plugin] }); // => InfoElement({ title = 'my title', description = 'my description', version = '2.2.0' })
```

You can define as many plugins as needed to enhance the resulting namespaced ApiDOM structure.
If multiple plugins with the same visitor method are defined, they run in parallel (just like in Babel).

#### Replace Empty Element plugin

This plugin is specific to YAML 1.2 format, which allows defining key-value pairs with empty key,
empty value, or both. If the value is not provided in YAML format, this plugin compensates for
this missing value with the most appropriate semantic element type.

```js
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import { refractorPluginReplaceEmptyElement, AsyncApi2Element } from '@swagger-api/apidom-ns-asyncapi-2';

const yamlDefinition = `
asyncapi: 2.2.0
info:
`;
const apiDOM = await parse(yamlDefinition);
const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
  plugins: [refractorPluginReplaceEmptyElement()],
});

// =>
// (AsyncApi2Element
//   (MemberElement
//     (StringElement)
//     (AsyncApiVersionElement))
//   (MemberElement
//     (StringElement)
//     (InfoElement)))

// => without the plugin the result would be
// (AsyncApi2Element
//   (MemberElement
//     (StringElement)
//     (AsyncApiVersionElement))
//   (MemberElement
//     (StringElement)
//     (StringElement)))
```

## Implementation progress

Only fully implemented specification objects should be checked here.

### Specification Objects

- [x] [AsyncAPI Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#A2SObject)
- [x] [AsyncAPI Version String](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#A2SVersionString)
- [x] [Identifier](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#A2SIdString)
- [x] [Info Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#A2SIdString)
- [x] [Contact Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#contactObject)
- [x] [License Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#license-object)
- [x] [Servers Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#serversObject)
- [x] [Server Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#serverObject)
- [x] [Server Variable Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#serverVariableObject)
- [x] [Default Content Type](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#defaultContentTypeString)
- [x] [Channels Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#channelsObject)
- [x] [Channel Item Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#channelItemObject)
- [x] [Operation Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#operationObject)
- [x] [Operation Trait Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#operationTraitObject)
- [x] [Message Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#messageObject)
- [x] [Message Trait Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#messageTraitObject)
- [x] [Tags Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#tagsObject)
- [x] [Tag Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#tag-object)
- [x] [External Documentation Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#externalDocumentationObject)
- [x] [Components Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#componentsObject)
- [x] [Reference Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#referenceObject)
- [x] [Schema Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#schemaObject)
- [x] [Security Scheme Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#securitySchemeObject)
- [x] [Security Requirement Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#security-requirement-object)
- [x] [OAuth Flows Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#oauth-flows-object)
- [x] [OAuth Flow Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#oauth-flow-object)
- [x] [Server Bindings Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#serverBindingsObject)
- [x] [Parameters Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#parametersObject)
- [x] [Parameter Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#parameterObject)
- [x] [Channel Bindings Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#channel-bindings-object)
- [x] [Operation Bindings Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#operation-bindings-object)
- [x] [Message Bindings Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#messageBindingsObject)
- [x] [Correlation ID Object](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#correlationIdObject)
- [x] [Specification Extension](https://github.com/asyncapi/spec/blob/main/spec/asyncapi.md#specificationExtensions)

### Binding Objects

#### HTTP Bindings

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/http/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/http/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/http/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/http/README.md#message-binding-object)

#### WebSockets Bindings

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/websockets/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/websockets/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/websockets/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/websockets/README.md#message-binding-object)

#### Kafka Bindings

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/kafka/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/kafka/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/kafka/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/kafka/README.md#message-binding-object)

#### Anypoint MQ Bindings

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/tree/main/anypointmq#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/tree/main/anypointmq#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/tree/main/anypointmq#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/tree/main/anypointmq#message-binding-object)

#### AMQP 0-9-1 Bindings

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/amqp/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/amqp/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/amqp/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/amqp/README.md#message-binding-object)

#### AMQP 1.0 Bindings

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/amqp1/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/amqp1/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/amqp1/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/amqp1/README.md#message-binding-object)

#### MQTT Bindings

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/mqtt/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/mqtt/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/mqtt/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/mqtt/README.md#message-binding-object)

#### MQTT 5 Bindings

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/mqtt5/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/mqtt5/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/mqtt5/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/mqtt5/README.md#message-binding-object)

#### NATS

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/nats/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/nats/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/nats/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/nats/README.md#message-binding-object)

#### JMS

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/jms/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/jms/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/jms/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/jms/README.md#message-binding-object)

#### SNS

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/sns/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/sns/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/sns/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/sns/README.md#message-binding-object)

#### SQS

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/sqs/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/sqs/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/sqs/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/sqs/README.md#message-binding-object)

#### STOMP

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/blob/main/stomp/README.md#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/blob/main/stomp/README.md#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/blob/main/stomp/README.md#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/blob/main/stomp/README.md#message-binding-object)

#### Redis

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/tree/main/redis#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/tree/main/redis#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/tree/main/redis#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/tree/main/redis#message-binding-object)

#### Mercure

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/tree/main/mercure#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/tree/main/mercure#channel-binding-object)
- [x] [Operation Binding Object](https://github.com/asyncapi/bindings/tree/main/mercure#operation-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/tree/main/mercure#message-binding-object)

#### IBM MQ

- [x] [Server Binding Object](https://github.com/asyncapi/bindings/tree/main/ibmmq#server-binding-object)
- [x] [Channel Binding Object](https://github.com/asyncapi/bindings/tree/main/ibmmq#channel-binding-object)
- [x] [Message Binding Object](https://github.com/asyncapi/bindings/tree/main/ibmmq#message-binding-object)
