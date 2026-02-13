import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI30, OpenAPI31, OpenAPI32, OpenAPI3 } from '../target-specs.ts';

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
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
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
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
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
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
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
  {
    label: 'deviceAuthorizationUrl',
    insertText: 'deviceAuthorizationUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#oauthFlowObject)\n\\\n\\\nThe authorization URL to be used for the device authorization grant type. This MUST be in the form of a URL.',
    },
    targetSpecs: OpenAPI32,
  },
];

export default completion;
