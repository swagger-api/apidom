import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'expiration',
    docs: '`integer`\n\\\n\\\nTTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.',
  },
  {
    target: 'userId',
    docs: '`string`\n\\\n\\\nIdentifies the user who has sent the message.',
  },
  {
    target: 'cc',
    docs: '`[string]`\n\\\n\\\nThe routing keys the message should be routed to at the time of publishing.',
  },
  {
    target: 'priority',
    docs: '`integer`\n\\\n\\\nA priority for the message.',
  },
  {
    target: 'deliveryMode',
    docs: '`integer`\n\\\n\\\nDelivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).',
  },
  {
    target: 'mandatory',
    docs: '`boolean`\n\\\n\\\nWhether the message is mandatory or not.',
  },
  {
    target: 'bcc',
    docs: '`[string]`\n\\\n\\\nLike cc but consumers will not receive this information.',
  },
  {
    target: 'replyTo',
    docs: '`string`\n\\\n\\\nName of the queue where the consumer should send the response.',
  },
  {
    target: 'timestamp',
    docs: '`boolean`\n\\\n\\\nWhether the message should include a timestamp or not.',
  },
  {
    target: 'ack',
    docs: '`boolean`\n\\\n\\\nWhether the consumer should ack the message or not.',
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.3.0" MUST be assumed.',
  },
  {
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Applies To | Description\n---|:---:|:---:|---\n`expiration` | integer | Publish, Subscribe | TTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.\n`userId` | string | Publish, Subscribe | Identifies the user who has sent the message.\n`cc` | [string] | Publish, Subscribe | The routing keys the message should be routed to at the time of publishing.\n`priority` | integer | Publish, Subscribe | A priority for the message.\n`deliveryMode` | integer | Publish, Subscribe | Delivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).\n`mandatory` | boolean | Publish | Whether the message is mandatory or not.\n`bcc` | [string] | Publish | Like [cc](#operationBindingObjectCC) but consumers will not receive this information.\n`timestamp` | boolean | Publish, Subscribe | Whether the message should include a timestamp or not.\n`ack` | boolean | Subscribe | Whether the consumer should ack the message or not.\n`bindingVersion` | string | Publish, Subscribe | The version of this binding. If omitted, \"0.3.0\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      bindings:\n        amqp:\n          expiration: 100000\n          userId: guest\n          cc: ['user.logs']\n          priority: 10\n          deliveryMode: 2\n          mandatory: false\n          bcc: ['external.audit']\n          timestamp: true\n          ack: false\n          bindingVersion: 0.3.0\n```",
    targetSpecs: AsyncAPI2,
  },
  {
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Applies To Action | Description\n---|:---:|:---:|---\n`expiration` | integer | receive, send | TTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.\n`userId` | string | receive, send | Identifies the user who has sent the message.\n`cc` | [string] | receive, send | The routing keys the message should be routed to at the time of publishing.\n`priority` | integer | receive, send | A priority for the message.\n`deliveryMode` | integer | receive, send | Delivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).\n`mandatory` | boolean | receive | Whether the message is mandatory or not.\n`bcc` | [string] | receive | Like [cc](#operationBindingObjectCC) but consumers will not receive this information.\n`timestamp` | boolean | receive, send | Whether the message should include a timestamp or not.\n`ack` | boolean | send | Whether the consumer should ack the message or not.\n`bindingVersion` | string | receive, send | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\noperations:\n  userSignup:\n    action: receive\n    bindings:\n      amqp:\n        expiration: 100000\n        userId: guest\n        cc: ['user.logs']\n        priority: 10\n        deliveryMode: 2\n        mandatory: false\n        bcc: ['external.audit']\n        timestamp: true\n        ack: false\n        bindingVersion: 0.3.0\n```",
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
