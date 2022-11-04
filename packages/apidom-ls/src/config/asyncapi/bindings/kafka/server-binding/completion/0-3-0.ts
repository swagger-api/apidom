import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

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
        'API URL for the Schema Registry used when producing Kafka messages (if a Schema Registry was used).',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
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
        'The vendor of Schema Registry and Kafka serdes library that should be used (e.g. `apicurio`, `confluent`, `ibm`, or `karapace`). MUST NOT be specified if `schemaRegistryUrl` is not specified.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
      },
    ],
  },
  {
    target: 'schemaRegistryVendor',
    label: 'apicurio',
    insertText: 'apicurio',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
      },
    ],
  },
  {
    target: 'schemaRegistryVendor',
    label: 'confluent',
    insertText: 'confluent',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
      },
    ],
  },
  {
    target: 'schemaRegistryVendor',
    label: 'ibm',
    insertText: 'ibm',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
      },
    ],
  },
  {
    target: 'schemaRegistryVendor',
    label: 'karapace',
    insertText: 'karapace',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
      },
    ],
  },
];

export default completion;
