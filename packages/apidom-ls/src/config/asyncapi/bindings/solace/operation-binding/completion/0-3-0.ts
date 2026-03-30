import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'destinations',
    insertText: 'destinations',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'List of [Destination Objects](https://github.com/asyncapi/bindings/blob/37cdb1db7f1377d4b9f347dd68cf2fcb9b8b58cc/solace/README.md#destination-object).',
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
