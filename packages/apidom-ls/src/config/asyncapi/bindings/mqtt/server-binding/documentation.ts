import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'clientId',
    docs: 'MQTT Version `3`, `5`. The client identifier.',
  },
  {
    target: 'cleanSession',
    docs: 'MQTT Version `3`, `5`. `boolean`\n\\\n\\\nWhether to create a persistent connection or not. When `false`, the connection will be persistent. This is called **clean start** in MQTTv5.',
  },
  {
    target: 'lastWill',
    docs: 'MQTT Version `3`, `5`. `object`\n\\\n\\\nLast Will and Testament configuration. `topic`, `qos`, `message` and `retain` are properties of this object as shown below.',
  },
  {
    target: 'keepAlive',
    docs: 'MQTT Version `3`, `5`. `integer`\n\\\n\\\nInterval in seconds of the longest period of time the broker and the client can endure without sending a message.',
  },
  {
    target: 'sessionExpiryInterval',
    docs: 'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nInterval in seconds or a *Schema Object* containing the definition of the interval. The broker maintains a session for a disconnected client until this interval expires.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'sessionExpiryInterval',
    docs: 'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nInterval in seconds or a *Schema Object* containing the definition of the interval. The broker maintains a session for a disconnected client until this interval expires.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'maximumPacketSize',
    docs: 'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nNumber of bytes or a *Schema Object* representing the maximum packet size the client is willing to accept.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'maximumPacketSize',
    docs: 'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nNumber of bytes or a *Schema Object* representing the maximum packet size the client is willing to accept.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.2.0" MUST be assumed.',
  },
  {
    docs: '#### [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#server-binding-object)\n\nThis object contains information about the server representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | MQTT Version | Description\n---|:---:|:---:|---\n`clientId` | string | `3`, `5` | The client identifier.\n`cleanSession` | boolean | `3`, `5` | Whether to create a persistent connection or not. When `false`, the connection will be persistent. This is called **clean start** in MQTTv5.\n`lastWill` | object | `3`, `5` | Last Will and Testament configuration. `topic`, `qos`, `message` and `retain` are properties of this object as shown below.\n`lastWill.topic` | string | `3`, `5` | The topic where the Last Will and Testament message will be sent.\n`lastWill.qos` | integer | `3`, `5` | Defines how hard the broker/client will try to ensure that the Last Will and Testament message is received. Its value MUST be either 0, 1 or 2.\n`lastWill.message` | string | `3`, `5` | Last Will message.\n`lastWill.retain` | boolean | `3`, `5` | Whether the broker should retain the Last Will and Testament message or not.\n`keepAlive` | integer | `3`, `5` | Interval in seconds of the longest period of time the broker and the client can endure without sending a message.\n`sessionExpiryInterval` | integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | `5` | Interval in seconds or a *Schema Object* containing the definition of the interval. The broker maintains a session for a disconnected client until this interval expires.\n`maximumPacketSize` | integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | `5` | Number of bytes or a *Schema Object* representing the maximum packet size the client is willing to accept.\n`bindingVersion` | string | - | The version of this binding. If omitted, "0.2.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nservers:\n  production:\n    bindings:\n      mqtt:\n        clientId: guest\n        cleanSession: true\n        lastWill:\n          topic: /last-wills\n          qos: 2\n          message: Guest gone offline.\n          retain: false\n        keepAlive: 60\n        sessionExpiryInterval: 300\n        maximumPacketSize: 1024\n        bindingVersion: 0.2.0\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#server-binding-object)\n\nThis object contains information about the server representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | MQTT Version | Description\n---|:---:|:---:|---\n`clientId` | string | `3`, `5` | The client identifier.\n`cleanSession` | boolean | `3`, `5` | Whether to create a persistent connection or not. When `false`, the connection will be persistent. This is called **clean start** in MQTTv5.\n`lastWill` | object | `3`, `5` | Last Will and Testament configuration. `topic`, `qos`, `message` and `retain` are properties of this object as shown below.\n`lastWill.topic` | string | `3`, `5` | The topic where the Last Will and Testament message will be sent.\n`lastWill.qos` | integer | `3`, `5` | Defines how hard the broker/client will try to ensure that the Last Will and Testament message is received. Its value MUST be either 0, 1 or 2.\n`lastWill.message` | string | `3`, `5` | Last Will message.\n`lastWill.retain` | boolean | `3`, `5` | Whether the broker should retain the Last Will and Testament message or not.\n`keepAlive` | integer | `3`, `5` | Interval in seconds of the longest period of time the broker and the client can endure without sending a message.\n`sessionExpiryInterval` | integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | `5` | Interval in seconds or a *Schema Object* containing the definition of the interval. The broker maintains a session for a disconnected client until this interval expires.\n`maximumPacketSize` | integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | `5` | Number of bytes or a *Schema Object* representing the maximum packet size the client is willing to accept.\n`bindingVersion` | string | - | The version of this binding. If omitted, "0.2.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nservers:\n  production:\n    bindings:\n      mqtt:\n        clientId: guest\n        cleanSession: true\n        lastWill:\n          topic: /last-wills\n          qos: 2\n          message: Guest gone offline.\n          retain: false\n        keepAlive: 60\n        sessionExpiryInterval: 300\n        maximumPacketSize: 1024\n        bindingVersion: 0.2.0\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
