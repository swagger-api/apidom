import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'contentEncoding',
    docs: '`string`\n\\\n\\\nA MIME encoding for the message content.',
  },
  {
    target: 'messageType',
    docs: '`string`\n\\\n\\\nApplication-specific message type.',
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.3.0" MUST be assumed.',
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp#message)\n\nThis object contains information about the message representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`contentEncoding` | string | A MIME encoding for the message content.\n`messageType` | string | Application-specific message type.\n`bindingVersion` | string | The version of this binding. If omitted, "0.3.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          amqp:\n            contentEncoding: gzip\n            messageType: \'user.signup\'\n            bindingVersion: 0.3.0\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: "#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp#message)\n\nThis object contains information about the message representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`contentEncoding` | string | A MIME encoding for the message content.\n`messageType` | string | Application-specific message type.\n`bindingVersion` | string | The version of this binding. If omitted, \"0.3.0\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\\\nYAML\n```yaml\nchannels:\n  userSignup:\n    address: 'user/signup'\n    messages:\n      userSignupMessage:\n        bindings:\n          amqp:\n            contentEncoding: gzip\n            messageType: 'user.signup'\n            bindingVersion: 0.3.0\n```",
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
