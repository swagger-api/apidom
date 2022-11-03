const documentation = [
  {
    target: '$ref',
    docs: 'A reference to a Message Bindings',
  },
  {
    target: 'http',
    docs: "#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#message-binding-object)\n\nThis object contains information about the message representation in HTTP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`headers` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | A Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.\n</a>`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\n\\\nYAML\n```yaml\nchannels:\n  test:\n    publish:\n      message:\n        bindings:\n          http:\n            headers:\n              type: object\n              properties:\n                Content-Type:\n                  type: string\n                  enum: ['application/json']\n            bindingVersion: '0.1.0'\n```",
  },
  {
    target: 'ws',
    docs: '[WebSockets Message Binding](https://github.com/asyncapi/bindings/blob/master/websockets#message)\n\\\n\\\nProtocol-specific information for a WebSockets message.',
  },
  {
    target: 'kafka',
    docs: "#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#message-binding-object)\n\nThis object contains information about the message representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`key` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) \\| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html) | The message key. **NOTE**: You can also use the [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject) way.\n`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\n\\\nYAML\n```yaml\nchannels:\n  test:\n    publish:\n      message:\n        bindings:\n          kafka:\n            key:\n              type: string\n              enum: ['myKey']\n            bindingVersion: '0.1.0'\n```",
  },
  {
    target: 'anypointmq',
    docs: "#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#message-binding-object)\n\nThe Anypoint MQ [Message Binding Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#message-bindings-object) is defined by a [JSON Schema](https://github.com/asyncapi/bindings/blob/master/anypointmq/json_schemas/message.json), which defines these fields:\n\nField Name | Type | Description\n---|:---:|---\n`headers`               | [Schema Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject) | **Optional**. A Schema object containing the definitions for Anypoint MQ-specific headers (so-called protocol headers). This schema MUST be of type `object` and have a `properties` key. Examples of Anypoint MQ protocol headers are `messageId` and `messageGroupId`.\n`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.\n\nNote that application headers must be specified in the [`headers` field of the standard Message Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#messageObjectHeaders) and are transmitted in the [`properties` section of the Anypoint MQ message](https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/f1e97bc6-315a-4490-82a7-23abe036327a.anypoint-platform/anypoint-mq-broker/).\nIn contrast, protocol headers such as `messageId` must be specified in the [`headers` field of the message binding object](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#messageBindingObjectHeaders) and are transmitted in the [`headers` section of the Anypoint MQ message](https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/f1e97bc6-315a-4490-82a7-23abe036327a.anypoint-platform/anypoint-mq-broker/).\n\n### Examples\n\nThe following example shows a `channels` object with two channels, each having one operation (`subscribe` or `publish`) with one message. Only the message of the `subscribe` operation has a message binding object for `anypointmq`:\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        #...\n  user/signedup:\n    subscribe:\n      message:\n        headers:\n          type: object\n          properties:\n            correlationId:\n              description: Correlation ID set by application\n              type: string\n        payload:\n          type: object\n          properties:\n            #...\n        correlationId:\n          description: Correlation ID is specified as a header and transmitted in the Anypoint MQ message properties section\n          location:    $message.header#/correlationId\n        bindings:\n          anypointmq:\n            headers:\n              type: object\n              properties:\n                messageId:\n                  type: string\n            bindingVersion: '0.0.1'\n```",
  },
  {
    target: 'amqp',
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#message-binding-object)\n\nThis object contains information about the message representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`contentEncoding` | string | A MIME encoding for the message content.\n`messageType` | string | Application-specific message type.\n`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          amqp:\n            contentEncoding: gzip\n            messageType: \'user.signup\'\n            bindingVersion: 0.2.0\n```',
  },
  {
    target: 'amqp1',
    docs: '[AMQP 1.0 Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#message)\n\\\n\\\nProtocol-specific information for an AMQP 1.0 message.',
  },
  {
    target: 'mqtt',
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#message-binding-object)\n\nThis object contains information about the message representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          mqtt:\n            bindingVersion: 0.1.0\n```',
  },
  {
    target: 'mqtt5',
    docs: '[MQTT 5 Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#message)\n\\\n\\\nProtocol-specific information for an MQTT 5 message.',
  },
  {
    target: 'nats',
    docs: '[NATS Message Binding](https://github.com/asyncapi/bindings/blob/master/nats#message)\n\\\n\\\nProtocol-specific information for a NATS message.',
  },
  {
    target: 'jms',
    docs: '[JMS Message Binding](https://github.com/asyncapi/bindings/blob/master/jms#message)\n\\\n\\\nProtocol-specific information for a JMS message.',
  },
  {
    target: 'sns',
    docs: '[SNS Message Binding](https://github.com/asyncapi/bindings/blob/master/sns#message)\n\\\n\\\nProtocol-specific information for an SNS message.',
  },
  {
    target: 'solace',
    docs: '[Solace Message Binding](https://github.com/asyncapi/bindings/blob/master/solace#message)\n\\\n\\\nProtocol-specific information for a Solace message.',
  },
  {
    target: 'sqs',
    docs: '[SQS Message Binding](https://github.com/asyncapi/bindings/blob/master/sqs#message)\n\\\n\\\nProtocol-specific information for an SQS message.',
  },
  {
    target: 'stomp',
    docs: '[STOMP Message Binding](https://github.com/asyncapi/bindings/blob/master/stomp#message)\n\\\n\\\nProtocol-specific information for a STOMP message.',
  },
  {
    target: 'redis',
    docs: '[Redis Message Binding](https://github.com/asyncapi/bindings/blob/master/redis#message)\n\\\n\\\nProtocol-specific information for a Redis message.',
  },
  {
    target: 'mercure',
    docs: '[Mercure Message Binding](https://github.com/asyncapi/bindings/blob/master/mercure#message)\n\\\n\\\nProtocol-specific information for a Mercure message.',
  },
  {
    target: 'ibmmq',
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/ibmmq/README.md#message-binding-object)\n\nThis object contains information about the message representation in IBM MQ.\n\n##### Fixed Fields\n\nField Name | Type  | Description | Applicability [default] | Constraints\n---|:---:|---|:---|:---\n`type` | string |  The type of the message. | OPTIONAL [`string`] | MUST be either `string`, `jms` or `binary`\n`headers` | string | Defines the IBM MQ message headers to include with this message. More than one header can be specified as a comma separated list. Supporting information on IBM MQ message formats can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q097520_.html) in the IBM MQ Knowledge Center. | OPTIONAL if `type` = `binary` | `headers` MUST NOT be specified if `type` = `string` or `jms`\n`description` | string | Provides additional information for application developers: describes the message type or format. | OPTIONAL | -\n`expiry` |  integer | The recommended setting the client should use for the TTL (Time-To-Live) of the message. This is a period of time expressed in milliseconds and set by the application that puts the message. `expiry` values are API dependant e.g., MQI and JMS use different units of time and default values for *`unlimited`*. General information on IBM MQ message expiry can be found on this [page](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q097490_.html) in the IBM MQ Knowledge Center. | OPTIONAL [*`unlimited`*] | `expiry` value MUST be either `zero` (*`unlimited`*) or greater than zero.\n`bindingVersion` | string | The version of this binding. | OPTIONAL [`latest`] | -\n\nThis object MUST contain only the properties defined above.\n\n### Rich Text Formatting\n\nThe `description` field of the IBM MQ message binding object MAY include CommonMark markdown formatting. A minimum markdown syntax as described by [CommonMark 0.27](https://spec.commonmark.org/0.27/) is assumed.\n\n##### Example for plain text message\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          ibmmq:\n            type: string\n            bindingVersion: 0.1.0\n```\n\n##### Example for IBM MQ message using JMS\n\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          ibmmq:\n            type: jms\n            description: JMS stream message\n            bindingVersion: 0.1.0\n```',
  },
  {
    docs: '#### [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#messageBindingsObject)\n\nMap describing protocol-specific definitions for a message.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`http` | [HTTP Message Binding](https://github.com/asyncapi/bindings/blob/master/http/README.md#message) | Protocol-specific information for an HTTP message, i.e., a request or a response.\n`ws` | [WebSockets Message Binding](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#message) | Protocol-specific information for a WebSockets message.\n`kafka` | [Kafka Message Binding](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#message) | Protocol-specific information for a Kafka message.\n`anypointmq` | [Anypoint MQ Message Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#message) | Protocol-specific information for an Anypoint MQ message.\n`amqp` | [AMQP Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#message) | Protocol-specific information for an AMQP 0-9-1 message.\n`amqp1` | [AMQP 1.0 Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp1/README.md#message) | Protocol-specific information for an AMQP 1.0 message.\n`mqtt` | [MQTT Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#message) | Protocol-specific information for an MQTT message.\n`mqtt5` | [MQTT 5 Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5/README.md#message) | Protocol-specific information for an MQTT 5 message.\n`nats` | [NATS Message Binding](https://github.com/asyncapi/bindings/blob/master/nats/README.md#message) | Protocol-specific information for a NATS message.\n`jms` | [JMS Message Binding](https://github.com/asyncapi/bindings/blob/master/jms/README.md#message) | Protocol-specific information for a JMS message.\n`sns` | [SNS Message Binding](https://github.com/asyncapi/bindings/blob/master/sns/README.md#message) | Protocol-specific information for an SNS message.\n`solace` | [Solace Server Binding](https://github.com/asyncapi/bindings/blob/master/solace#message) | Protocol-specific information for a Solace message.\n`sqs` | [SQS Message Binding](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#message) | Protocol-specific information for an SQS message.\n`stomp` | [STOMP Message Binding](https://github.com/asyncapi/bindings/blob/master/stomp/README.md#message) | Protocol-specific information for a STOMP message.\n`redis` | [Redis Message Binding](https://github.com/asyncapi/bindings/blob/master/redis#message) | Protocol-specific information for a Redis message.\n`mercure` | [Mercure Message Binding](https://github.com/asyncapi/bindings/blob/master/mercure#message) | Protocol-specific information for a Mercure message.\n`ibmmq` | [IBM MQ Message Binding](https://github.com/asyncapi/bindings/tree/master/ibmmq#message-binding-object) | Protocol-specific information for an IBM MQ message.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).',
  },
];
export default documentation;
