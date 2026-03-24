import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'key',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nThe message key.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'key',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nThe message key.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'schemaIdLocation',
    docs: '`string`\n\\\n\\\nIf a Schema Registry is used when performing this operation, tells where the id of schema is stored (e.g. `header` or `payload`).',
  },
  {
    target: 'schemaIdPayloadEncoding',
    docs: '`string`\n\\\n\\\nNumber of bytes or vendor specific values when schema id is encoded in payload (e.g `confluent` / `apicurio-legacy` / `apicurio-new`).',
  },
  {
    target: 'schemaLookupStrategy',
    docs: '`string`\n\\\n\\\nFreeform string for any naming strategy class to use. Clients should default to the vendor default if not supplied.',
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.5.0" MUST be assumed.',
  },
  {
    docs: "#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/#message)\n\nThis object contains information about the message representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`key` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | The message key.\n`schemaIdLocation` | string | If a Schema Registry is used when performing this operation, tells where the id of schema is stored (e.g. `header` or `payload`). | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level\n`schemaIdPayloadEncoding` | string | Number of bytes or vendor specific values when schema id is encoded in payload (e.g `confluent`/ `apicurio-legacy` / `apicurio-new`). | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level\n`schemaLookupStrategy` | string | Freeform string for any naming strategy class to use. Clients should default to the vendor default if not supplied. | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level\n`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\nThis example is valid for any Confluent compatible schema registry. Here we describe the implementation using the first 4 bytes in payload to store schema identifier.\n\n\n\\\nYAML\n```yaml\nchannels:\n  test:\n    publish:\n      message:\n        bindings:\n          kafka:\n            key:\n              type: string\n              enum: ['myKey']\n            schemaIdLocation: 'payload'\n            schemaIdPayloadEncoding: '4'\n            bindingVersion: '0.5.0'\n```\n\nThis is another example that describes the use if Apicurio schema registry. We describe the `apicurio-new` way of serializing without details on how it's implemented. We reference a [specific lookup strategy](https://www.apicur.io/registry/docs/apicurio-registry/2.2.x/getting-started/assembly-using-kafka-client-serdes.html#registry-serdes-concepts-strategy_registry) that may be used to retrieve schema Id from registry during serialization.\n\n```yaml\nchannels:\n  test:\n    publish:\n      message:\n        bindings:\n          kafka:\n            key:\n              type: string\n              enum: ['myKey']\n            schemaIdLocation: 'payload'\n            schemaIdPayloadEncoding: 'apicurio-new'\n            schemaLookupStrategy: 'TopicIdStrategy'\n            bindingVersion: '0.5.0'\n```",
    targetSpecs: AsyncAPI2,
  },
  {
    docs: "#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/kafka/#message)\n\nThis object contains information about the message representation in Kafka.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`key` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | The message key.\n`schemaIdLocation` | string | If a Schema Registry is used when performing this operation, tells where the id of schema is stored (e.g. `header` or `payload`). | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level\n`schemaIdPayloadEncoding` | string | Number of bytes or vendor specific values when schema id is encoded in payload (e.g `confluent`/ `apicurio-legacy` / `apicurio-new`). | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level\n`schemaLookupStrategy` | string | Freeform string for any naming strategy class to use. Clients should default to the vendor default if not supplied. | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level\n`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\nThis example is valid for any Confluent compatible schema registry. Here we describe the implementation using the first 4 bytes in payload to store schema identifier.\n\n\n\\\nYAML\n```yaml\nchannels:\n  test:\n    address: test-topic\n    messages:\n      testMessage:\n        bindings:\n          kafka:\n            key:\n              type: string\n              enum: ['myKey']\n            schemaIdLocation: 'payload'\n            schemaIdPayloadEncoding: '4'\n            bindingVersion: '0.5.0'\n```\n\nThis is another example that describes the use if Apicurio schema registry. We describe the `apicurio-new` way of serializing without details on how it's implemented. We reference a [specific lookup strategy](https://www.apicur.io/registry/docs/apicurio-registry/2.2.x/getting-started/assembly-using-kafka-client-serdes.html#registry-serdes-concepts-strategy_registry) that may be used to retrieve schema Id from registry during serialization.\n\n```yaml\nchannels:\n  test:\n    address: test-topic\n    messages:\n      testMessage:\n        bindings:\n          kafka:\n            key:\n              type: string\n              enum: ['myKey']\n            schemaIdLocation: 'payload'\n            schemaIdPayloadEncoding: 'apicurio-new'\n            schemaLookupStrategy: 'TopicIdStrategy'\n            bindingVersion: '0.5.0'\n```",
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
