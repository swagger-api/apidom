const documentation = [
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.1.0" MUST be assumed.',
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#message-binding-object)\n\nThis object contains information about the message representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`bindingVersion` | string | The version of this binding. If omitted, "0.1.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          mqtt:\n            bindingVersion: 0.1.0\n```',
  },
];
export default documentation;
