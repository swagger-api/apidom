const documentation = [
  {
    target: 'qos',
    docs: '`integer`\n\\\n\\\nDefines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).',
  },
  {
    target: 'retain',
    docs: '`boolean`\n\\\n\\\nWhether the broker should retain the message or not.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.1.0" MUST be assumed.',
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | Applies To | Description\n---|:---:|:---:|---\n`qos` | integer | Publish, Subscribe | Defines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).\n`retain` | boolean | Publish, Subscribe | Whether the broker should retain the message or not.\n`bindingVersion` | string | Publish, Subscribe | The version of this binding. If omitted, "0.1.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      bindings:\n        mqtt:\n          qos: 2\n          retain: true\n          bindingVersion: 0.1.0\n```',
  },
];
export default documentation;
