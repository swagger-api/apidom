import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to a Security Scheme.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'type',
    insertText: 'type',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required.** The type of the security scheme. Valid values are `"basic"`, `"apiKey"` or `"oauth2"`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'type',
    insertText: 'type',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. The type of the security scheme. Valid values are `"apiKey"`, `"http"`, `"oauth2"`, `"openIdConnect"`.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'type',
    insertText: 'type',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. The type of the security scheme. Valid values are `"apiKey"`, `"http"`, `"mutualTLS"`, `"oauth2"`, `"openIdConnect"`.',
    },
    targetSpecs: OpenAPI31,
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
      value: 'A short description for security scheme.',
    },
    targetSpecs: OpenAPI2,
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
        'A description for security scheme. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Valid for `apiKey`. **Required**. The name of the header or query parameter to be used.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Applies to `apiKey`. **REQUIRED**. The name of the header, query or cookie parameter to be used.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'in',
    insertText: 'in',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Valid for `apiKey`. **Required**. The location of the API key. Valid values are `"query"` or `"header"`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'in',
    insertText: 'in',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Applies to `apiKey`. **REQUIRED**. The location of the API key. Valid values are `"query"`, `"header"` or `"cookie"`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'scheme',
    insertText: 'scheme',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. Applies to `http`. **REQUIRED**. The name of the HTTP Authorization scheme to be used in the [Authorization header as defined in RFC7235](https://tools.ietf.org/html/rfc7235#section-5.1). The values used SHOULD be registered in the [IANA Authentication Scheme registry](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml).',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'bearerFormat',
    insertText: 'bearerFormat',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Applies to `http` (`"bearer"`). A hint to the client to identify how the bearer token is formatted. Bearer tokens are usually generated by an authorization server, so this information is primarily for documentation purposes.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'flow',
    insertText: 'flow',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Valid for `oauth2`. **Required**. The flow used by the OAuth2 security scheme. Valid values are `"implicit"`, `"password"`, `"application"` or `"accessCode"`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'flows',
    insertText: 'flows',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flows Object](https://spec.openapis.org/oas/v3.0.4.html#oauth-flows-object)\n\\\nnApplies to `oauth2`. **REQUIRED**. An object containing configuration information for the flow types supported.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'flows',
    insertText: 'flows',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flows Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowsObject)\n\\\nApplies to `oauth2`. **REQUIRED**. An object containing configuration information for the flow types supported.',
    },
    targetSpecs: OpenAPI31,
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
        'Valid for oauth2 (`"implicit"`, `"accessCode"`). **Required**. The authorization URL to be used for this flow. This SHOULD be in the form of a URL.',
    },
    targetSpecs: OpenAPI2,
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
        'Valid for oauth2 (`"password"`, `"application"`, `"accessCode"`). **Required**. The token URL to be used for this flow. This SHOULD be in the form of a URL.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'openIdConnectUrl',
    insertText: 'openIdConnectUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Applies to `openIdConnect`. **REQUIRED**. OpenId Connect URL to discover OAuth2 configuration values. This MUST be in the form of a URL.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'openIdConnectUrl',
    insertText: 'openIdConnectUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Applies to `openIdConnect`. **REQUIRED**. OpenId Connect URL to discover OAuth2 configuration values. This MUST be in the form of a URL. The OpenID Connect standard requires the use of TLS.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'scopes',
    insertText: 'scopes',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Scopes Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#scopes-object)\n\\\n\\\nValid for `oauth2`. **Required**. The available scopes for the OAuth2 security scheme.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'basic',
    insertText: 'basic',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'apiKey',
    insertText: 'apiKey',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'type',
    label: 'http',
    insertText: 'http',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    target: 'type',
    label: 'oauth2',
    insertText: 'oauth2',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'type',
    label: 'openIdConnect',
    insertText: 'openIdConnect',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    target: 'in',
    label: 'query',
    insertText: 'query',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'in',
    label: 'header',
    insertText: 'header',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'in',
    label: 'cookie',
    insertText: 'cookie',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    target: 'flow',
    label: 'implicit',
    insertText: 'implicit',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'flow',
    label: 'password',
    insertText: 'password',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'flow',
    label: 'application',
    insertText: 'application',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'flow',
    label: 'accessCode',
    insertText: 'accessCode',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
];

export default completion;
