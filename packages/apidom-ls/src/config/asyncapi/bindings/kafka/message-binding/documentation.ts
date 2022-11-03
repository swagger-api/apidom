const documentation = [
  {
    target: 'key',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) \\| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html)\n\\\n\\\n The message key. **NOTE**: You can also use the [reference object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject) way.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.3.0" MUST be assumed.',
  },
  {
    docs: "#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#message-binding-object)\n\nThis object contains information about the message representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`key` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) \\| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html) | The message key. **NOTE**: You can also use the [reference object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject) way.\n`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\n\\\nYAML\n```yaml\nchannels:\n  test:\n    publish:\n      message:\n        bindings:\n          kafka:\n            key:\n              type: string\n              enum: ['myKey']\n            bindingVersion: '0.1.0'\n```",
  },
];
export default documentation;
