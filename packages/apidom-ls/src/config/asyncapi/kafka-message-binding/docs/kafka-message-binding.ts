const kafkaMessageBindingDocs = [
  {
    target: 'key',
    docs: '[Schema Object](https://www.asyncapi.com/docs/specifications/v2.3.0#schemaObject) \\| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html)\n\\\n\\\n The message key. **NOTE**: You can also use the [reference object](https://asyncapi.io/docs/specifications/v2.3.0#referenceObject) way.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "latest" MUST be assumed.',
  },
  {
    docs: 'This object contains information about the message representation in Kafka.',
  },
];
export default kafkaMessageBindingDocs;
