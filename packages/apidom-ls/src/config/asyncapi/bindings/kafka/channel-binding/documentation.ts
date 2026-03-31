const documentation = [
  {
    target: 'topic',
    docs: '`string`\n\\\n\\\nKafka topic name if different from channel name.',
  },
  {
    target: 'partitions',
    docs: '`integer`\n\\\n\\\nNumber of partitions configured on this topic (useful to know how many parallel consumers you may run).',
  },
  {
    target: 'replicas',
    docs: '`integer`\n\\\n\\\nNumber of replicas configured on this topic.',
  },
  {
    target: 'topicConfiguration',
    docs: '[Topic Configuration Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#topicConfiguration-object)\n\\\n\\\nTopic configuration properties that are relevant for the API.\n\n##### Fixed Fields\n\nField Name | Type | Description | Applicability [default] | Constraints\n---|:---:|:---:|:---:|---\n`cleanup.policy` | array | The [`cleanup.policy`](https://kafka.apache.org/documentation/#topicconfigs_cleanup.policy) configuration option. | OPTIONAL | array may only contain `delete` and/or `compact`\n`retention.ms` | long | The [`retention.ms`](https://kafka.apache.org/documentation/#topicconfigs_retention.ms) configuration option. | OPTIONAL | see kafka documentation\n`retention.bytes` | long | The [`retention.bytes`](https://kafka.apache.org/documentation/#topicconfigs_retention.bytes) configuration option. | OPTIONAL | see kafka documentation\n`delete.retention.ms` | long | The [`delete.retention.ms`](https://kafka.apache.org/documentation/#topicconfigs_delete.retention.ms) configuration option. | OPTIONAL | see kafka documentation\n`max.message.bytes` | integer | The [`max.message.bytes`](https://kafka.apache.org/documentation/#topicconfigs_max.message.bytes) configuration option. | OPTIONAL | see kafka documentation\n`confluent.key.schema.validation` | boolean | It shows whether the schema validation for the message key is enabled. Vendor specific config. | OPTIONAL | -\n`confluent.key.subject.name.strategy` | string | The name of the schema lookup strategy for the message key. Vendor specific config. | OPTIONAL | Clients should default to the vendor default if not supplied.\n`confluent.value.schema.validation` | boolean | It shows whether the schema validation for the message value is enabled. Vendor specific config. | OPTIONAL | -\n`confluent.value.subject.name.strategy` | string | The name of the schema lookup strategy for the message value. Vendor specific config. | OPTIONAL | Clients should default to the vendor default if not supplied.',
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.5.0" MUST be assumed.',
  },
  {
    docs: "#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka#channel)\n\nThis object contains information about the channel representation in Kafka (eg. a Kafka topic).\n\n##### Fixed Fields\n\nField Name | Type | Description | Applicability [default] | Constraints\n---|:---:|:---:|:---:|---\n`topic` | string | Kafka topic name if different from channel name. | OPTIONAL | -\n`partitions` | integer | Number of partitions configured on this topic (useful to know how many parallel consumers you may run). | OPTIONAL | Must be positive\n`replicas` | integer | Number of replicas configured on this topic. | OPTIONAL | MUST be positive\n`topicConfiguration` | [Topic Configuration Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#topicConfiguration-object) | Topic configuration properties that are relevant for the API. | OPTIONAL | -\n`bindingVersion` | string | The version of this binding. If omitted, \"0.5.0\" MUST be assumed. | OPTIONAL [`0.5.0`] | -\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user-signedup:\n    bindings:\n      kafka:\n        topic: 'my-specific-topic-name'\n        partitions: 20\n        replicas: 3\n        topicConfiguration:\n          cleanup.policy: ['delete', 'compact']\n          retention.ms: 604800000\n          retention.bytes: 1000000000\n          delete.retention.ms: 86400000\n          max.message.bytes: 1048588\n        bindingVersion: '0.5.0'\n```",
  },
];
export default documentation;
