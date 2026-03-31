const documentation = [
  {
    target: 'bindingVersion',
    docs: '`String`\n\\\n\\\nThe current version is `0.2.0`',
  },
  {
    target: 'labels',
    docs: '`Object`\n\\\n\\\nAn object of key-value pairs _(These are used to categorize Cloud Resources like Cloud Pub/Sub Topics.)_',
  },
  {
    target: 'messageRetentionDuration',
    docs: '`String`\n\\\n\\\nIndicates the minimum duration to retain a message after it is published to the topic _(Must be a valid [Duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration).)_',
  },
  {
    target: 'messageStoragePolicy',
    docs: '[Message Storage Policy Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub/README.md#message-storage-policy-object)\n\\\n\\\nPolicy constraining the set of Google Cloud Platform regions where messages published to the topic may be stored.',
  },
  {
    target: 'schemaSettings',
    docs: '[Schema Settings Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub/README.md#schema-settings-object)\n\\\n\\\nSettings for validating messages published against a schema.',
  },
  {
    target: 'topic',
    docs: '`String`\n\\\n\\\nThe Google Cloud Pub/Sub Topic name.',
  },
  {
    docs: '#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub/README.md#channel)\n\nThe Channel Bindings Object is used to describe the Google Cloud Pub/Sub specific [Topic](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics/create) details with AsyncAPI.\n\nField Name | Type | Description\n---|:---:|---\n`bindingVersion` | String | The current version is `0.2.0`\n`labels` | Object | An object of key-value pairs _(These are used to categorize Cloud Resources like Cloud Pub/Sub Topics.)_\n`messageRetentionDuration` | String | Indicates the minimum duration to retain a message after it is published to the topic _(Must be a valid [Duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration).)_\n`messageStoragePolicy` | [Message Storage Policy Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub/README.md#message-storage-policy-object) | Policy constraining the set of Google Cloud Platform regions where messages published to the topic may be stored\n`schemaSettings` | [Schema Settings Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub/README.md#schema-settings-object) | Settings for validating messages published against a schema',
  },
];
export default documentation;
