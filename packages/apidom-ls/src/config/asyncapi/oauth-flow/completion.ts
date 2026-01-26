import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

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
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'availableScopes',
    insertText: 'availableScopes ',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED.** The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it.',
    },
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
