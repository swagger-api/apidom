import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'authorizationUrl',
    insertText: 'authorizationUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of an absolute URL.',
    },
  },
  {
    label: 'tokenUrl',
    insertText: 'tokenUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. The token URL to be used for this flow. This MUST be in the form of an absolute URL.',
    },
  },
  {
    label: 'refreshUrl',
    insertText: 'refreshUrl ',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The URL to be used for obtaining refresh tokens. This MUST be in the form of an absolute URL.',
    },
  },
  {
    label: 'scopes',
    insertText: 'scopes ',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED.** The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it.',
    },
  },
];

export default completion;
