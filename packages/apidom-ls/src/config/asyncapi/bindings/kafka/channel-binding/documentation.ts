const documentation = [
  {
    target: 'topic',
    docs: 'Kafka topic name if different from channel name.',
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
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.3.0" MUST be assumed.',
  },
  {
    docs: "#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka#channel)\n\nThis object contains information about the channel representation in Kafka (eg. a Kafka topic).\n\n##### Fixed Fields\n\nField Name | Type | Description | Applicability [default] | Constraints\n---|:---:|:---:|:---:|---\n`topic` | string | Kafka topic name if different from channel name. | OPTIONAL | -\n`partitions` | integer | Number of partitions configured on this topic (useful to know how many parallel consumers you may run). | OPTIONAL | Must be positive\n`replicas` | integer | Number of replicas configured on this topic. | OPTIONAL | MUST be positive\n`bindingVersion` | string | The version of this binding. If omitted, \"0.3.0\" MUST be assumed. | OPTIONAL [`0.3.0`] | -\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\nThis example is valid for any Confluent compatible schema registry. Here we describe the implementation using the first 4 bytes in payload to store schema identifier.\n\n\n\\\nYAML\n```yaml\nchannels:\n  user-signedup:\n    bindings:\n      kafka:\n        topic: 'my-specific-topic-name'\n        partitions: 20\n        replicas: 3\n        bindingVersion: '0.3.0'\n```",
  },
];
export default documentation;
