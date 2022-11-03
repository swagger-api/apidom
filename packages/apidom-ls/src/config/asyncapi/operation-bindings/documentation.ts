const documentation = [
  {
    target: '$ref',
    docs: 'A reference to an Operation Bindings',
  },
  {
    target: 'http',
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#operation-binding-object)\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`type` | string | **Required**. Type of operation. Its value MUST be either `request` or `response`.\n`method` | string | When `type` is `request`, this is the HTTP method, otherwise it MUST be ignored. Its value MUST be one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `CONNECT`, and `TRACE`.\n`query` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | A Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.\n`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  /employees:\n    subscribe:\n      bindings:\n        http:\n          type: request\n          method: GET\n          query:\n            type: object\n            required:\n              - companyId\n            properties:\n              companyId:\n                type: number\n                minimum: 1\n                description: The Id of the company.\n            additionalProperties: false\n          bindingVersion: \'0.1.0\'\n```',
  },
  {
    target: 'ws',
    docs: '[WebSockets Operation Binding](https://github.com/asyncapi/bindings/blob/master/websockets#operation)\n\\\n\\\nProtocol-specific information for a WebSockets operation.',
  },
  {
    target: 'kafka',
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`groupId` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | Id of the consumer group.\n`clientId` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | Id of the consumer inside a consumer group.\n`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user-signedup:\n    publish:\n      bindings:\n        kafka:\n          groupId:\n            type: string\n            enum: ['myGroupId']\n          clientId:\n            type: string\n            enum: ['myClientId']\n          bindingVersion: '0.1.0'\n```",
  },
  {
    target: 'anypointmq',
    docs: '[Anypoint MQ Operation Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#operation)\n\\\n\\\nProtocol-specific information for an Anypoint MQ operation.',
  },
  {
    target: 'amqp',
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Applies To | Description\n---|:---:|:---:|---\n`expiration` | integer | Publish, Subscribe | TTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.\n`userId` | string | Publish, Subscribe | Identifies the user who has sent the message.\n`cc` | [string] | Publish, Subscribe | The routing keys the message should be routed to at the time of publishing.\n`priority` | integer | Publish, Subscribe | A priority for the message.\n`deliveryMode` | integer | Publish, Subscribe | Delivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).\n`mandatory` | boolean | Publish | Whether the message is mandatory or not.\n`bcc` | [string] | Publish | Like [cc](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#operationBindingObjectCC) but consumers will not receive this information.\n`replyTo` | string | Publish, Subscribe | Name of the queue where the consumer should send the response.\n`timestamp` | boolean | Publish, Subscribe | Whether the message should include a timestamp or not.\n`ack` | boolean | Subscribe | Whether the consumer should ack the message or not.\n`bindingVersion` | string | Publish, Subscribe | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      bindings:\n        amqp:\n          expiration: 100000\n          userId: guest\n          cc: ['user.logs']\n          priority: 10\n          deliveryMode: 2\n          mandatory: false\n          bcc: ['external.audit']\n          replyTo: user.signedup\n          timestamp: true\n          ack: false\n          bindingVersion: 0.2.0\n```",
  },
  {
    target: 'amqp1',
    docs: '[AMQP 1.0 Operation Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#operation)\n\\\n\\\nProtocol-specific information for an AMQP 1.0 operation.',
  },
  {
    target: 'mqtt',
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | Applies To | Description\n---|:---:|:---:|---\n`qos` | integer | Publish, Subscribe | Defines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).\n`retain` | boolean | Publish, Subscribe | Whether the broker should retain the message or not.\n`bindingVersion` | string | Publish, Subscribe | The version of this binding. If omitted, "latest" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      bindings:\n        mqtt:\n          qos: 2\n          retain: true\n          bindingVersion: 0.1.0\n```',
  },
  {
    target: 'mqtt5',
    docs: '[MQTT 5 Operation Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#operation)\n\\\n\\\nProtocol-specific information for an MQTT 5 operation.',
  },
  {
    target: 'nats',
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/nats/README.md#operation-binding-object)\n\nField Name | Type | Description\n---|:---:|---\n| `queue` | string | Defines the name of the queue to use. It MUST NOT exceed 255 characters. |\n| `bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed. |',
  },
  {
    target: 'jms',
    docs: '[JMS Operation Binding](https://github.com/asyncapi/bindings/blob/master/jms#operation)\n\\\n\\\nProtocol-specific information for a JMS operation.',
  },
  {
    target: 'sns',
    docs: '[SNS Operation Binding](https://github.com/asyncapi/bindings/blob/master/sns#operation)\n\\\n\\\nProtocol-specific information for an SNS operation.',
  },
  {
    target: 'solace',
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/solace/README.md#operation-binding-object)\n\nWe need the ability to support several bindings for each operation, see the [Example](https://github.com/asyncapi/bindings/blob/master/solace/README.md#example) section below for details.\n\nField Name | Type | Description\n---|---|---\n`bindingVersion`|String|The current version is 0.2.0\n`destinations`|List of Destination Objects|Destination Objects are described next.\n\n#### Destination Object\n\nEach destination has the following structure. Note that bindings under a 'subscribe' operation define the behaviour of publishers, and those under a 'publish' operation define how subscribers are configured.\n\nField Name | Type | Description | Applicable Operation\n---|---|---|---\n`destinationType`|Enum|'queue' or 'topic'. If the type is queue, then the subscriber can bind to the queue, which in turn will subscribe to the topic as represented by the channel name or to the provided topicSubscriptions.|publish\n`deliveryMode`|Enum|'direct' or 'persistent'. This determines the quality of service for publishing messages as documented [here.](https://docs.solace.com/PubSub-Basics/Core-Concepts-Message-Delivery-Modes.htm) Default is 'persistent'.|subscribe\n`queue.name`|String|The name of the queue, only applicable when destinationType is 'queue'.|publish\n`queue.topicSubscriptions`|List of String|A list of topics that the queue subscribes to, only applicable when destinationType is 'queue'. If none is given, the queue subscribes to the topic as represented by the channel name.|publish\n`queue.accessType`|Enum|'exclusive' or 'nonexclusive'. This is documented [here.](https://docs.solace.com/PubSub-Basics/Endpoints.htm) Only applicable when destinationType is 'queue'.|publish\n`topic.topicSubscriptions`|List of String|A list of topics that the client subscribes to, only applicable when destinationType is 'topic'. If none is given, the client subscribes to the topic as represented by the channel name.|publish",
  },
  {
    target: 'sqs',
    docs: '[SQS Operation Binding](https://github.com/asyncapi/bindings/blob/master/sqs#operation)\n\\\n\\\nProtocol-specific information for an SQS operation.',
  },
  {
    target: 'stomp',
    docs: '[STOMP Operation Binding](https://github.com/asyncapi/bindings/blob/master/stomp#operation)\n\\\n\\\nProtocol-specific information for a STOMP operation.',
  },
  {
    target: 'redis',
    docs: '[Redis Operation Binding](https://github.com/asyncapi/bindings/blob/master/redis#operation)\n\\\n\\\nProtocol-specific information for a Redis operation.',
  },
  {
    target: 'mercure',
    docs: '[Mercure Operation Binding](https://github.com/asyncapi/bindings/blob/master/mercure#operation)\n\\\n\\\nProtocol-specific information for a Mercure operation.',
  },
  {
    docs: '#### [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#operationBindingsObject)\n\nMap describing protocol-specific definitions for an operation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`http` | [HTTP Operation Binding](https://github.com/asyncapi/bindings/blob/master/http/README.md#operation) | Protocol-specific information for an HTTP operation.\n`ws` | [WebSockets Operation Binding](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#operation) | Protocol-specific information for a WebSockets operation.\n`kafka` | [Kafka Operation Binding](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#operation) | Protocol-specific information for a Kafka operation.\n`anypointmq` | [Anypoint MQ Operation Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#operation) | Protocol-specific information for an Anypoint MQ operation.\n`amqp` | [AMQP Operation Binding](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#operation) | Protocol-specific information for an AMQP 0-9-1 operation.\n`amqp1` | [AMQP 1.0 Operation Binding](https://github.com/asyncapi/bindings/blob/master/amqp1/README.md#operation) | Protocol-specific information for an AMQP 1.0 operation.\n`mqtt` | [MQTT Operation Binding](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#operation) | Protocol-specific information for an MQTT operation.\n`mqtt5` | [MQTT 5 Operation Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5/README.md#operation) | Protocol-specific information for an MQTT 5 operation.\n`nats` | [NATS Operation Binding](https://github.com/asyncapi/bindings/blob/master/nats/README.md#operation) | Protocol-specific information for a NATS operation.\n`jms` | [JMS Operation Binding](https://github.com/asyncapi/bindings/blob/master/jms/README.md#operation) | Protocol-specific information for a JMS operation.\n`sns` | [SNS Operation Binding](https://github.com/asyncapi/bindings/blob/master/sns/README.md#operation) | Protocol-specific information for an SNS operation.\n`solace` | [Solace Operation Binding](https://github.com/asyncapi/bindings/blob/master/solace#operation) | Protocol-specific information for a Solace operation.\n`sqs` | [SQS Operation Binding](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#operation) | Protocol-specific information for an SQS operation.\n`stomp` | [STOMP Operation Binding](https://github.com/asyncapi/bindings/blob/master/stomp/README.md#operation) | Protocol-specific information for a STOMP operation.\n`redis` | [Redis Operation Binding](https://github.com/asyncapi/bindings/blob/master/redis#operation) | Protocol-specific information for a Redis operation.\n`mercure` | [Mercure Operation Binding](https://github.com/asyncapi/bindings/blob/master/mercure#operation) | Protocol-specific information for a Mercure operation.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).',
  },
];
export default documentation;
