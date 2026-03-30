import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

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
      value: '`string`\n\\\n\\\nThe Virtual Private Network name on the Solace broker.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'clientName',
    insertText: 'clientName',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\n\\\nA unique client name to use to register to the appliance. If specified, it must be a valid Topic name, and a maximum of 160 bytes in length when encoded as UTF-8.',
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
