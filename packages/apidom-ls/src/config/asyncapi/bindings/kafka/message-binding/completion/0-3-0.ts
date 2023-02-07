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
        '[Schema Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject) \\| [Reference object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nThe message key.',
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
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
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
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
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
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
      },
    ],
  },
];

export default completion;
