const documentation = [
  {
    target: 'authorizationUrl',
    docs: '**REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of an absolute URL.',
  },
  {
    target: 'tokenUrl',
    docs: '**REQUIRED**. The token URL to be used for this flow. This MUST be in the form of an absolute URL.',
  },
  {
    target: 'refreshUrl',
    docs: 'The URL to be used for obtaining refresh tokens. This MUST be in the form of an absolute URL.',
  },
  {
    target: 'scopes',
    docs: '**REQUIRED.** The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it.',
  },
  {
    docs: '#### [OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject)\n\nConfiguration details for a supported OAuth Flow\n\n##### Fixed Fields\nField Name | Type | Applies To | Description\n---|:---:|---|---\nauthorizationUrl | `string` | `oauth2` (`"implicit"`, `"authorizationCode"`) | **REQUIRED**. The authorization URL to be used for this flow. This MUST be in the form of an absolute URL.\ntokenUrl | `string` | `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`) | **REQUIRED**. The token URL to be used for this flow. This MUST be in the form of an absolute URL.\nrefreshUrl | `string` | `oauth2` | The URL to be used for obtaining refresh tokens. This MUST be in the form of an absolute URL.\nscopes | Map[`string`, `string`] | `oauth2` | **REQUIRED**. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).\n\n##### OAuth Flow Object Examples\n\n```JSON\n{\n  "type": "oauth2",\n  "flows": {\n    "implicit": {\n      "authorizationUrl": "https://example.com/api/oauth/dialog",\n      "scopes": {\n        "write:pets": "modify pets in your account",\n        "read:pets": "read your pets"\n      }\n    },\n    "authorizationCode": {\n      "authorizationUrl": "https://example.com/api/oauth/dialog",\n      "tokenUrl": "https://example.com/api/oauth/token",\n      "scopes": {\n        "write:pets": "modify pets in your account",\n        "read:pets": "read your pets"\n      }\n    }\n  }\n}\n```\n\n```YAML\ntype: oauth2\nflows:\n  implicit:\n    authorizationUrl: https://example.com/api/oauth/dialog\n    scopes:\n      write:pets: modify pets in your account\n      read:pets: read your pets\n  authorizationCode:\n    authorizationUrl: https://example.com/api/oauth/dialog\n    tokenUrl: https://example.com/api/oauth/token\n    scopes:\n      write:pets: modify pets in your account\n      read:pets: read your pets\n```',
  },
];
export default documentation;
