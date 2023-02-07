import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
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
        '**REQUIRED**. The type of the security scheme. Valid values are `"userPassword"`, `"apiKey"`, `"X509"`, `"symmetricEncryption"`, `"asymmetricEncryption"`, `"httpApiKey"`, `"http"`, `"oauth2"`, `"openIdConnect"`, `"plain"`, `"scramSha256"`, `"scramSha512"`, and `"gssapi"`.',
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
        'A short description for security scheme. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
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
        'Applies to `httpApiKey` type. **REQUIRED**. The name of the header, query or cookie parameter to be used.',
    },
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
        'Applies to `apiKey` or `httpApiKey` type. **REQUIRED**. The location of the API key. Valid values are `"user"` and `"password"` for `apiKey` and `"query"`, `"header"` or `"cookie"` for `httpApiKey`.',
    },
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
        'Applies to `http` type. **REQUIRED**. The name of the HTTP Authorization scheme to be used in the [Authorization header as defined in RFC7235](https://tools.ietf.org/html/rfc7235#section-5.1).',
    },
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
        'Applies to `http` (`"bearer"`) type. A hint to the client to identify how the bearer token is formatted. Bearer tokens are usually generated by an authorization server, so this information is primarily for documentation purposes.',
    },
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
        '[OAuth Flows Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#oauthFlowsObject)\n\\\n\\\nApplies to `oauth2` type. **REQUIRED**. An object containing configuration information for the flow types supported.',
    },
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
        'Applies to `openIdConnect` type. **REQUIRED**. OpenId Connect URL to discover OAuth2 configuration values. This MUST be in the form of a URL.',
    },
  },
  {
    target: 'type',
    label: 'userPassword',
    insertText: 'userPassword',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'apiKey',
    insertText: 'apiKey',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'X509',
    insertText: 'X509',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'symmetricEncryption',
    insertText: 'symmetricEncryption',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'asymmetricEncryption',
    insertText: 'asymmetricEncryption',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'httpApiKey',
    insertText: 'httpApiKey',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'http',
    insertText: 'http',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'oauth2',
    insertText: 'oauth2',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'openIdConnect',
    insertText: 'openIdConnect',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'type',
    label: 'plain',
    insertText: 'plain',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
    ],
  },
  {
    target: 'type',
    label: 'scramSha256',
    insertText: 'scramSha256',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
    ],
  },
  {
    target: 'type',
    label: 'scramSha512',
    insertText: 'scramSha512',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
    ],
  },
  {
    target: 'type',
    label: 'gssapi',
    insertText: 'gssapi',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
    ],
  },
  {
    target: 'in',
    label: 'user',
    insertText: 'user',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['apiKey'],
      },
    ],
  },
  {
    target: 'in',
    label: 'password',
    insertText: 'password',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['apiKey'],
      },
    ],
  },
  {
    target: 'in',
    label: 'query',
    insertText: 'query',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['httpApiKey'],
      },
    ],
  },
  {
    target: 'in',
    label: 'header',
    insertText: 'header',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['httpApiKey'],
      },
    ],
  },
  {
    target: 'in',
    label: 'cookie',
    insertText: 'cookie',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['httpApiKey'],
      },
    ],
  },
];

export default completion;
