const documentation = [
  {
    target: 'authorizationUrl',
    docs: '#### Applies To\n`oauth2` (`"implicit"`, `"authorizationCode"`)\n\n\\\n**REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
  },
  {
    target: 'tokenUrl',
    docs: '#### Applies To\n`oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`)\n\n\\\n**REQUIRED**. The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
  },
  {
    target: 'refreshUrl',
    docs: '#### Applies To\n`oauth2`\n\n\\\nThe URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.',
  },
  {
    target: 'scopes',
    docs: 'Map[`string`, `string`]\n#### Applies To\noauth2\n\n\\\n**REQUIRED**. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty.',
  },
  {
    docs: '#### OAuth Flow Object\nConfiguration details for a supported OAuth Flow\n##### Fixed Fields\nField Name | Type | Applies To | Description\n---|:---:|---|:---\nauthorizationUrl | `string` | `oauth2` (`"implicit"`, `"authorizationCode"`) | **REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.\ntokenUrl | `string` | `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`) | **REQUIRED**. The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.\nrefreshUrl | `string` | `oauth2` | The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.\nscopes | Map[`string`, `string`] | `oauth2` | **REQUIRED**. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n##### OAuth Flow Object Examples\n\n\\\nJSON\n```json\n{\n  "type": "oauth2",\n  "flows": {\n    "implicit": {\n      "authorizationUrl": "https://example.com/api/oauth/dialog",\n      "scopes": {\n        "write:pets": "modify pets in your account",\n        "read:pets": "read your pets"\n      }\n    },\n    "authorizationCode": {\n      "authorizationUrl": "https://example.com/api/oauth/dialog",\n      "tokenUrl": "https://example.com/api/oauth/token",\n      "scopes": {\n        "write:pets": "modify pets in your account",\n        "read:pets": "read your pets"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\ntype: oauth2\nflows: \n  implicit:\n    authorizationUrl: https://example.com/api/oauth/dialog\n    scopes:\n      write:pets: modify pets in your account\n      read:pets: read your pets\n  authorizationCode:\n    authorizationUrl: https://example.com/api/oauth/dialog\n    tokenUrl: https://example.com/api/oauth/token\n    scopes:\n      write:pets: modify pets in your account\n      read:pets: read your pets\n```\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
