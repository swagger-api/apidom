import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

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
        'Applies to `oauth2` (`"implicit"`, `"authorizationCode"`). **REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of a URL.',
    },
    targetSpecs: OpenAPI30,
  },
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
        'Applies to `oauth2` (`"implicit"`, `"authorizationCode"`). **REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
    },
    targetSpecs: OpenAPI31,
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
        'Applies to `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`). **REQUIRED**. The token URL to be used for this flow. This MUST be in the form of a URL.',
    },
    targetSpecs: OpenAPI30,
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
        'Applies to `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`). **REQUIRED**. The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
    },
    targetSpecs: OpenAPI31,
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
        'Applies to `oauth2`. The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL.',
    },
    targetSpecs: OpenAPI30,
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
        'Applies to `oauth2`. The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
    },
    targetSpecs: OpenAPI31,
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
        '**REQUIRED**. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty.',
    },
    targetSpecs: OpenAPI3,
  },
];

export default completion;
