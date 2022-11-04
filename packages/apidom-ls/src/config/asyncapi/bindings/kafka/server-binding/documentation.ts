const documentation = [
  {
    target: 'schemaRegistryUrl',
    docs: 'API URL for the Schema Registry used when producing Kafka messages (if a Schema Registry was used).',
  },
  {
    target: 'schemaRegistryVendor',
    docs: 'The vendor of Schema Registry and Kafka serdes library that should be used (e.g. `apicurio`, `confluent`, `ibm`, or `karapace`). MUST NOT be specified if `schemaRegistryUrl` is not specified.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding.',
  },
  {
    docs: "#### [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka#server)\n\nThis object contains information about the server representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description | Applicability [default] | Constraints\n---|:---:|:---:|:---:|---\n`schemaRegistryUrl` | string (url) | API URL for the Schema Registry used when producing Kafka messages (if a Schema Registry was used) | OPTIONAL | -\n`schemaRegistryVendor` | string | The vendor of Schema Registry and Kafka serdes library that should be used (e.g. `apicurio`, `confluent`, `ibm`, or `karapace`) | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified\n`bindingVersion` | string | The version of this binding. | OPTIONAL [`0.3.0`]\n\n##### Example\n\n\n\\\nYAML\n```yaml\nservers:\n  production:\n    bindings:\n      kafka:\n        schemaRegistryUrl: 'https://my-schema-registry.com'\n        schemaRegistryVendor: 'confluent'\n        bindingVersion: '0.3.0'\n```",
  },
];
export default documentation;
