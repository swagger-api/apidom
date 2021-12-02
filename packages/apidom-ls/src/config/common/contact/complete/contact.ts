import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const contactComplete: ApidomCompletionItem[] = [
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The identifying name of the contact person/organization.',
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
      value: 'The URL pointing to the contact information. **MUST** be in the format of a URL.',
    },
  },
  {
    label: 'email',
    insertText: 'email',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The email address of the contact person/organization. **MUST** be in the format of an email address.',
    },
  },
];

export default contactComplete;
