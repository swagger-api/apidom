import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'key',
    insertText: 'key',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject) \\| [Reference object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)\n\\\n\\\nThe message key.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'schemaIdLocation',
    insertText: 'schemaIdLocation',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'If a Schema Registry is used when performing this operation, tells where the id of schema is stored (e.g. `header` or `payload`).',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'schemaIdPayloadEncoding',
    insertText: 'schemaIdPayloadEncoding',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Number of bytes or vendor specific values when schema id is encoded in payload (e.g `confluent` / `apicurio-legacy` / `apicurio-new`).',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'schemaLookupStrategy',
    insertText: 'schemaLookupStrategy',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Freeform string for any naming strategy class to use. Clients should default to the vendor default if not supplied.',
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
