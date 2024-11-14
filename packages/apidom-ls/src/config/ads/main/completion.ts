import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'info',
    insertText: 'info',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Info (object)',
    },
  },
  {
    label: 'version',
    insertText: 'version',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'current version of the specification.\n\n',
    },
  },
  {
    label: 'principles',
    insertText: 'principles',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '(array[[Principle](https://apidesign.systems/specification/#principle)]) - requirements for API principles',
    },
  },
  {
    label: 'standards',
    insertText: 'standards',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '(array[[Standard](https://apidesign.systems/specification/#standard)]) - requirements for API standards',
    },
  },
  {
    label: 'scenarios',
    insertText: 'scenarios',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '(array[[Scenarios](https://apidesign.systems/specification/#scenario)]) - requirements for API scenarios',
    },
  },
  {
    target: 'version',
    label: '2021-05-07',
    insertText: '2021-05-07',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
];

export default completion;
