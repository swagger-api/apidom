import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'groupId',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\nId of the consumer group.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'groupId',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject)\n\\\n\\\nId of the consumer group.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'clientId',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\nId of the consumer inside a consumer group.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'clientId',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject)\n\\\n\\\nId of the consumer inside a consumer group.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.5.0" MUST be assumed.',
  },
  {
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`groupId` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | Id of the consumer group.\n`clientId` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | Id of the consumer inside a consumer group.\n`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user-signedup:\n    publish:\n      bindings:\n        kafka:\n          groupId:\n            type: string\n            enum: ['myGroupId']\n          clientId:\n            type: string\n            enum: ['myClientId']\n          bindingVersion: '0.1.0'\n```",
    targetSpecs: AsyncAPI2,
  },
  {
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`groupId` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) | Id of the consumer group.\n`clientId` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) | Id of the consumer inside a consumer group.\n`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user-signedup:\n    publish:\n      bindings:\n        kafka:\n          groupId:\n            type: string\n            enum: ['myGroupId']\n          clientId:\n            type: string\n            enum: ['myClientId']\n          bindingVersion: '0.1.0'\n```",
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
