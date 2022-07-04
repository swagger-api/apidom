const documentation = [
  {
    target: 'expiration',
    docs: 'TTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.',
  },
  {
    target: 'userId',
    docs: 'Identifies the user who has sent the message.',
  },
  {
    target: 'cc',
    docs: 'The routing keys the message should be routed to at the time of publishing.',
  },
  {
    target: 'priority',
    docs: 'A priority for the message.',
  },
  {
    target: 'deliveryMode',
    docs: 'Delivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).',
  },
  {
    target: 'mandatory',
    docs: 'Whether the message is mandatory or not.',
  },
  {
    target: 'bcc',
    docs: 'Like cc but consumers will not receive this information.',
  },
  {
    target: 'replyTo',
    docs: 'Name of the queue where the consumer should send the response.',
  },
  {
    target: 'timestamp',
    docs: 'Whether the message should include a timestamp or not.',
  },
  {
    target: 'ack',
    docs: 'Whether the consumer should ack the message or not.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "latest" MUST be assumed.',
  },
  {
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#operation-binding-object)\n\nThis object contains information about the operation representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Applies To | Description\n---|:---:|:---:|---\n`expiration` | integer | Publish, Subscribe | TTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.\n`userId` | string | Publish, Subscribe | Identifies the user who has sent the message.\n`cc` | [string] | Publish, Subscribe | The routing keys the message should be routed to at the time of publishing.\n`priority` | integer | Publish, Subscribe | A priority for the message.\n`deliveryMode` | integer | Publish, Subscribe | Delivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).\n`mandatory` | boolean | Publish | Whether the message is mandatory or not.\n`bcc` | [string] | Publish | Like [cc](#operationBindingObjectCC) but consumers will not receive this information.\n`replyTo` | string | Publish, Subscribe | Name of the queue where the consumer should send the response.\n`timestamp` | boolean | Publish, Subscribe | Whether the message should include a timestamp or not.\n`ack` | boolean | Subscribe | Whether the consumer should ack the message or not.\n`bindingVersion` | string | Publish, Subscribe | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      bindings:\n        amqp:\n          expiration: 100000\n          userId: guest\n          cc: ['user.logs']\n          priority: 10\n          deliveryMode: 2\n          mandatory: false\n          bcc: ['external.audit']\n          replyTo: user.signedup\n          timestamp: true\n          ack: false\n          bindingVersion: 0.2.0\n```",
  },
];
export default documentation;
