import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const licenseComplete: ApidomCompletionItem[] = [
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '**Required.** The license name used for the API.',
    },
  },
  {
    label: 'url',
    insertText: 'url',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A URL to the license used for the API. **MUST** be in the format of a URL.',
    },
  },
];

export default licenseComplete;
