import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'schemaRegistryUrl',
    insertText: 'schemaRegistryUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`string (url)`\n\\\n\\\nAPI URL for the Schema Registry used when producing Kafka messages (if a Schema Registry was used).',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'schemaRegistryVendor',
    insertText: 'schemaRegistryVendor',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\n\\\nThe vendor of Schema Registry and Kafka serdes library that should be used (e.g. `apicurio`, `confluent`, `ibm`, or `karapace`). MUST NOT be specified if `schemaRegistryUrl` is not specified.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
