import { OpenAPI2 } from '../target-specs';

const documentation = [
  {
    docs: '#### [Security Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securityDefinitionsObject)\n\nA declaration of the security schemes available to be used in the specification. This does not enforce the security schemes on the operations and only serves to provide the relevant details for each scheme.\n\n##### Patterned Fields\nField Pattern | Type | Description\n---|:---:|---\n{name} | [Security Scheme Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securitySchemeObject) | A single security scheme definition, mapping a "name" to the scheme it defines.\n\n##### Security Definitions Object Example\n\n```js\n{\n  "api_key": {\n    "type": "apiKey",\n    "name": "api_key",\n    "in": "header"\n  },\n  "petstore_auth": {\n    "type": "oauth2",\n    "authorizationUrl": "http://swagger.io/api/oauth/dialog",\n    "flow": "implicit",\n    "scopes": {\n      "write:pets": "modify pets in your account",\n      "read:pets": "read your pets"\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\napi_key:\n  type: apiKey\n  name: api_key\n  in: header\npetstore_auth:\n  type: oauth2\n  authorizationUrl: http://swagger.io/api/oauth/dialog\n  flow: implicit\n  scopes:\n    write:pets: modify pets in your account\n    read:pets: read your pets\n```',
    targetSpecs: OpenAPI2,
  },
];

export default documentation;
