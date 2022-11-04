import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'msgVpn',
    insertText: 'msgVpn',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The Virtual Private Network name on the Solace broker.',
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
