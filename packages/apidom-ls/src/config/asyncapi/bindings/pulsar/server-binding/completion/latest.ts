import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'tenant',
    insertText: 'tenant',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The pulsar tenant. If omitted, "public" MUST be assumed.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'tenant',
    label: 'public',
    insertText: 'public',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
