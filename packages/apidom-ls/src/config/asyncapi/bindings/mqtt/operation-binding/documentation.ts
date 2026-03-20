import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'qos',
    docs: 'MQTT Version `3`, `5`. `integer`\n\\\n\\\nDefines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).',
  },
  {
    target: 'retain',
    docs: 'MQTT Version `3`, `5`. `boolean`\n\\\n\\\nWhether the broker should retain the message or not.',
  },
  {
    target: 'messageExpiryInterval',
    docs: 'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nInterval in seconds or a *Schema Object* containing the definition of the lifetime of the message.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'messageExpiryInterval',
    docs: 'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nInterval in seconds or a *Schema Object* containing the definition of the lifetime of the message.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.2.0" MUST be assumed.',
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | Applies To | MQTT Version | Description\n---|:---:|:---:|:---:|---\n`qos` | integer | Publish, Subscribe | `3`, `5` | Defines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).\n`retain` | boolean | Publish | `3`, `5` | Whether the broker should retain the message or not.\n`messageExpiryInterval` | integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | Publish | `5` | Interval in seconds or a *Schema Object* containing the definition of the lifetime of the message.\n`bindingVersion` | string | Publish, Subscribe | - | The version of this binding. If omitted, "0.2.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      bindings:\n        mqtt:\n          qos: 2\n          retain: true\n          messageExpiryInterval: 60\n          bindingVersion: 0.2.0\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | Applies To | MQTT Version | Description\n---|:---:|:---:|:---:|---\n`qos` | integer | Publish, Subscribe | `3`, `5` | Defines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).\n`retain` | boolean | Publish | `3`, `5` | Whether the broker should retain the message or not.\n`messageExpiryInterval` | integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | Publish | `5` | Interval in seconds or a *Schema Object* containing the definition of the lifetime of the message.\n`bindingVersion` | string | Publish, Subscribe | - | The version of this binding. If omitted, "0.2.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      bindings:\n        mqtt:\n          qos: 2\n          retain: true\n          messageExpiryInterval: 60\n          bindingVersion: 0.2.0\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
