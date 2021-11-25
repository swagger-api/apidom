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
    documentation:
      '**Required**. The URL for the target documentation. Value **MUST** be in the format of a URL.',
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation:
      'A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
];

export default externalDocsCompleteJson;
