import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'payloadFormatIndicator',
    docs: 'MQTT Version `5`. `integer`\n\\\n\\\nEither: **0** (zero): Indicates that the payload is unspecified bytes, or **1**: Indicates that the payload is UTF-8 encoded character data.',
  },
  {
    target: 'correlationData',
    docs: 'MQTT Version `5`. [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nCorrelation Data is used by the sender of the request message to identify which request the response message is for when it is received.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'correlationData',
    docs: 'MQTT Version `5`. [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nCorrelation Data is used by the sender of the request message to identify which request the response message is for when it is received.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'contentType',
    docs: 'MQTT Version `5`. `string`\n\\\n\\\nString describing the content type of the message payload. This should not conflict with the `contentType` field of the associated AsyncAPI Message object.',
  },
  {
    target: 'responseTopic',
    docs: 'MQTT Version `5`. `URI string` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nThe topic (channel URI) for a response message.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'responseTopic',
    docs: 'MQTT Version `5`. `URI string` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nThe topic (channel URI) for a response message.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.2.0" MUST be assumed.',
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#message-binding-object)\n\nThis object contains information about the message representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | MQTT Version | Description\n---|:---:|:---:|---\n`payloadFormatIndicator` | integer | `5` | Either: **0** (zero): Indicates that the payload is unspecified bytes, or **1**: Indicates that the payload is UTF-8 encoded character data.\n`correlationData` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | `5` | Correlation Data is used by the sender of the request message to identify which request the response message is for when it is received.\n`contentType` | string | `5` | String describing the content type of the message payload. This should not conflict with the `contentType` field of the associated AsyncAPI Message object.\n`responseTopic` | URI string \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | `5` | The topic (channel URI) for a response message.\n`bindingVersion` | string | - | The version of this binding. If omitted, "0.2.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    subscribe:\n      message:\n        bindings:\n          mqtt:\n            contentType: "application/json"\n            correlationData:\n              type: string\n              format: uuid\n            bindingVersion: 0.2.0\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#message-binding-object)\n\nThis object contains information about the message representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | MQTT Version | Description\n---|:---:|:---:|---\n`payloadFormatIndicator` | integer | `5` | Either: **0** (zero): Indicates that the payload is unspecified bytes, or **1**: Indicates that the payload is UTF-8 encoded character data.\n`correlationData` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | `5` | Correlation Data is used by the sender of the request message to identify which request the response message is for when it is received.\n`contentType` | string | `5` | String describing the content type of the message payload. This should not conflict with the `contentType` field of the associated AsyncAPI Message object.\n`responseTopic` | URI string \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | `5` | The topic (channel URI) for a response message.\n`bindingVersion` | string | - | The version of this binding. If omitted, "0.2.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\\\nYAML\n```yaml\nchannels:\n  userSignup:\n    address: user/signup\n    messages:\n      userSignup:\n        bindings:\n          mqtt:\n            payloadFormatIndicator: 1\n            contentType: "application/json"\n            correlationData:\n              type: string\n              format: uuid\n            responseTopic:\n              type: string\n              pattern: "response/client/([a-z1-9]+)"\n            bindingVersion: 0.2.0\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
