import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const documentation = [
  {
    target: 'authorizationUrl',
    docs: 'Applies to `oauth2` (`"implicit"`, `"authorizationCode"`). **REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of a URL.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'authorizationUrl',
    docs: 'Applies to `oauth2` (`"implicit"`, `"authorizationCode"`). **REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'tokenUrl',
    docs: 'Applies to `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`). **REQUIRED**. The token URL to be used for this flow. This MUST be in the form of a URL.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'tokenUrl',
    docs: 'Applies to `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`). **REQUIRED**. The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'refreshUrl',
    docs: 'Applies to `oauth2`. The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'refreshUrl',
    docs: 'Applies to `oauth2`. The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'scopes',
    docs: 'Map[`string`, `string`]\n\\\n\\\nApplies to `oauth2`. **REQUIRED**. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty.',
    targetSpecs: OpenAPI3,
  },
  {
    docs: '#### [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauth-flow-object)\n\nConfiguration details for a supported OAuth Flow\n\n##### Fixed Fields\nField Name | Type | Applies To | Description\n---|:---:|---|---\nauthorizationUrl | `string` | `oauth2` (`"implicit"`, `"authorizationCode"`) | **REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of a URL.\ntokenUrl | `string` | `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`) | **REQUIRED**. The token URL to be used for this flow. This MUST be in the form of a URL.\nrefreshUrl | `string` | `oauth2` | The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL.\nscopes | Map[`string`, `string`] | `oauth2` | **REQUIRED**. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### OAuth Flow Object Examples\n\n```JSON\n{\n  "type": "oauth2",\n  "flows": {\n    "implicit": {\n      "authorizationUrl": "https://example.com/api/oauth/dialog",\n      "scopes": {\n        "write:pets": "modify pets in your account",\n        "read:pets": "read your pets"\n      }\n    },\n    "authorizationCode": {\n      "authorizationUrl": "https://example.com/api/oauth/dialog",\n      "tokenUrl": "https://example.com/api/oauth/token",\n      "scopes": {\n        "write:pets": "modify pets in your account",\n        "read:pets": "read your pets"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\ntype: oauth2\nflows:\n  implicit:\n    authorizationUrl: https://example.com/api/oauth/dialog\n    scopes:\n      write:pets: modify pets in your account\n      read:pets: read your pets\n  authorizationCode:\n    authorizationUrl: https://example.com/api/oauth/dialog\n    tokenUrl: https://example.com/api/oauth/token\n    scopes:\n      write:pets: modify pets in your account\n      read:pets: read your pets\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject)\n\nConfiguration details for a supported OAuth Flow\n##### Fixed Fields\nField Name | Type | Applies To | Description\n---|:---:|---|:---\nauthorizationUrl | `string` | `oauth2` (`"implicit"`, `"authorizationCode"`) | **REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.\ntokenUrl | `string` | `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`) | **REQUIRED**. The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.\nrefreshUrl | `string` | `oauth2` | The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.\nscopes | Map[`string`, `string`] | `oauth2` | **REQUIRED**. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n##### OAuth Flow Object Examples\n\n\\\nJSON\n```json\n{\n  "type": "oauth2",\n  "flows": {\n    "implicit": {\n      "authorizationUrl": "https://example.com/api/oauth/dialog",\n      "scopes": {\n        "write:pets": "modify pets in your account",\n        "read:pets": "read your pets"\n      }\n    },\n    "authorizationCode": {\n      "authorizationUrl": "https://example.com/api/oauth/dialog",\n      "tokenUrl": "https://example.com/api/oauth/token",\n      "scopes": {\n        "write:pets": "modify pets in your account",\n        "read:pets": "read your pets"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\ntype: oauth2\nflows: \n  implicit:\n    authorizationUrl: https://example.com/api/oauth/dialog\n    scopes:\n      write:pets: modify pets in your account\n      read:pets: read your pets\n  authorizationCode:\n    authorizationUrl: https://example.com/api/oauth/dialog\n    tokenUrl: https://example.com/api/oauth/token\n    scopes:\n      write:pets: modify pets in your account\n      read:pets: read your pets\n```\n',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
