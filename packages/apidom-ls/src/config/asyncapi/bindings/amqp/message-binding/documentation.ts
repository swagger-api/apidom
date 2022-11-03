const documentation = [
  {
    target: 'contentEncoding',
    docs: 'A MIME encoding for the message content.',
  },
  {
    target: 'messageType',
    docs: 'Application-specific message type.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.2.0" MUST be assumed.',
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp#message)\n\nThis object contains information about the message representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`contentEncoding` | string | A MIME encoding for the message content.\n`messageType` | string | Application-specific message type.\n`bindingVersion` | string | The version of this binding. If omitted, "0.2.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          amqp:\n            contentEncoding: gzip\n            messageType: \'user.signup\'\n            bindingVersion: 0.2.0\n```',
  },
];
export default documentation;
