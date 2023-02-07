const documentation = [
  {
    target: 'namespace',
    docs: 'The namespace the channel is associated with.',
  },
  {
    target: 'persistence',
    docs: 'Persistence of the topic in Pulsar. It MUST be either `persistent` or `non-persistent`.',
  },
  {
    target: 'compaction',
    docs: '`Integer`\n\\\n\\\nTopic compaction threshold given in Megabytes.',
  },
  {
    target: 'geo-replication',
    docs: '`String[]`\n\\\n\\\nA list of clusters the topic is replicated to.',
  },
  {
    target: 'retention',
    docs: '[Retention Definition Object](https://github.com/asyncapi/bindings/blob/master/pulsar/README.md#retention-definition-object)\n\\\n\\\nTopic retention policy.',
  },
  {
    target: 'ttl',
    docs: '`Integer`\n\\\n\\\nMessage time-to-live in seconds.',
  },
  {
    target: 'deduplication',
    docs: '`Boolean`\n\\\n\\\nMessage deduplication. When true, it ensures that each message produced on Pulsar topics is persisted to disk only once.',
  },
  {
    target: 'deduplication',
    docs: '`Boolean`\n\\\n\\\nMessage deduplication. When true, it ensures that each message produced on Pulsar topics is persisted to disk only once.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.1.0" MUST be assumed.',
  },
  {
    docs: "### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/pulsar/README.md#channel-binding-object)\n\nThis object contains information about the channel representation in Pulsar\n\n##### Fixed Fields\n\nField Name | Type | Required | Description | Default value |\n---|:---:|:---:|:---|:---|\n`namespace` | String | Yes |  The namespace the channel is associated with. | N/A |\n`persistence` | String | Yes | Persistence of the topic in Pulsar. It MUST be either `persistent` or `non-persistent`. | N/A |\n`compaction`| Integer | No | Topic compaction threshold given in Megabytes. | N/A |\n`geo-replication` | String[] | No | A list of clusters the topic is replicated to. | N/A |\n`retention` | [Retention Definition Object](https://github.com/asyncapi/bindings/blob/master/pulsar/README.md#retention-definition-object) | No | Topic retention policy.  | N/A |\n`ttl` | Integer | No |  Message time-to-live in seconds. | N/A |\n`deduplication` | Boolean | No | Message deduplication. When true, it ensures that each message produced on Pulsar topics is persisted to disk only once. | N/A |\n`bindingVersion` | String | No | The version of this binding. If omitted, \"0.1.0\" MUST be assumed. | `0.1.0` |\n\n### Retention Definition Object\nThe `Retention Definition Object` is used to describe the Pulsar [Retention](https://pulsar.apache.org/docs/cookbooks-retention-expiry/) policy.\n\nField Name | Type | Required | Description | Default value |\n---|:---:|:---:|:---|:---|\n`time`|Integer| No | Time given in Minutes. | `0` |\n`size`|Integer| No |Size given in MegaBytes. | `0` |\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user-signedup:\n    bindings:\n      pulsar:\n        namespace: 'staging'\n        persistence: 'persistent'\n        compaction: 1000\n        geo-replication:\n          - 'us-east1'\n          - 'us-west1'\n        retention:\n          time: 7\n          size: 1000\n        ttl: 360\n        deduplication: false\n        bindingVersion: '0.1.0'\n```",
  },
];
export default documentation;
