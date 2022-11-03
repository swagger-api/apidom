const documentation = [
  {
    target: 'bindingVersion',
    docs: 'The current version is 0.1.0',
  },
  {
    target: 'attributes',
    docs: '`Object`\n\\\n\\\nAttributes for this message (If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription.)',
  },
  {
    target: 'orderingKey',
    docs: 'If non-empty, identifies related messages for which publish order should be respected _(For more information, see [ordering messages](https://cloud.google.com/pubsub/docs/ordering).)_',
  },
  {
    target: 'schema',
    docs: '[Schema Definition Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub/README.md#schema-definition-object)\n\\\n\\\nDescribes the schema used to validate the payload of this message.',
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub#message)\n\nThe `Message Binding Object` is used to describe the Google Cloud Pub/Sub specific\n[PubsubMessage](https://cloud.google.com/pubsub/docs/reference/rest/v1/PubsubMessage) details, alongside with pertintent\nparts of the Google Cloud Pub/Sub\n[Schema](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.schemas#Schema)\nObject, with AsyncAPI.\n\nField Name | Type | Description\n---|---|---\n`bindingVersion`|String|The current version is `0.1.0`\n`attributes`|Object|Attributes for this message _(If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription.)_\n`orderingKey`|String|If non-empty, identifies related messages for which publish order should be respected _(For more information, see [ordering messages](https://cloud.google.com/pubsub/docs/ordering).)_\n`schema`|[Schema Definition Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub/README.md#schema-definition-object)|Describes the schema used to validate the payload of this message.',
  },
];
export default documentation;
