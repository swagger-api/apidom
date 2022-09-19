const documentation = [
  /**
   * The following Fixed Fields are provided as reference, but are more
   * comprehensively described by parent OAuth Flow Object meta documentation
   */
  // {
  //   target: 'implicit',
  //   docs: 'Configuration for the OAuth Implicit flow',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'password',
  //   docs: 'Configuration for the OAuth Resource Owner Password flow',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'clientCredentials',
  //   docs: 'Configuration for the OAuth Client Credentials flow. Previously called `application` in OpenAPI 2.0.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'authorizationCode',
  //   docs: 'Configuration for the OAuth Authorization Code flow. Previously called `accessCode` in OpenAPI 2.0.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  {
    docs: '#### [OAuth Flows Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowsObject)\nAllows configuration of the supported OAuth Flows.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nimplicit | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject) | Configuration for the OAuth Implicit flow\npassword | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject) | Configuration for the OAuth Resource Owner Password flow\nclientCredentials | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject) | Configuration for the OAuth Client Credentials flow. Previously called `application` in OpenAPI 2.0.\nauthorizationCode | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject) | Configuration for the OAuth Authorization Code flow. Previously called `accessCode` in OpenAPI 2.0.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
