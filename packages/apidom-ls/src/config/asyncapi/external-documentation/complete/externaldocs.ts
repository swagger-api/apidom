import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const externalDocsCompleteJson: ApidomCompletionItem[] = [
  {
    label: 'url',
    insertText: 'url',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required**. The URL for the target documentation. Value **MUST** be in the format of a URL.',
    },
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required**. The URL for the target documentation. Value **MUST** be in the format of a URL.',
    },
  },
];

export default externalDocsCompleteJson;
