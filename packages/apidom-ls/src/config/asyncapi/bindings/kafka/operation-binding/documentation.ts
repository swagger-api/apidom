const documentation = [
  {
    target: 'groupId',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject)\n\\\n\\\nId of the consumer group.',
  },
  {
    target: 'clientId',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject)\n\\\n\\\nId of the consumer inside a consumer group.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.3.0" MUST be assumed.',
  },
  {
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`groupId` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | Id of the consumer group.\n`clientId` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | Id of the consumer inside a consumer group.\n`bindingVersion` | string | The version of this binding. If omitted, \"0.3.0\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user-signedup:\n    publish:\n      bindings:\n        kafka:\n          groupId:\n            type: string\n            enum: ['myGroupId']\n          clientId:\n            type: string\n            enum: ['myClientId']\n          bindingVersion: '0.1.0'\n```",
  },
];
export default documentation;
