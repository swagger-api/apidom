import { OpenAPI30, OpenAPI31 } from '../target-specs';

/**
 * Omitted fixed fields:
 *  - implicit
 *  - password
 *  - clientCredentials
 *  - authorizationCode
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    docs: '#### [OAuth Flows Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowsObject)\nAllows configuration of the supported OAuth Flows.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nimplicit | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowObject) | Configuration for the OAuth Implicit flow\npassword | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowObject) | Configuration for the OAuth Resource Owner Password flow\nclientCredentials | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowObject) | Configuration for the OAuth Client Credentials flow. Previously called `application` in OpenAPI 2.0.\nauthorizationCode | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowObject) | Configuration for the OAuth Authorization Code flow. Previously called `accessCode` in OpenAPI 2.0.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [OAuth Flows Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowsObject)\nAllows configuration of the supported OAuth Flows.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nimplicit | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject) | Configuration for the OAuth Implicit flow\npassword | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject) | Configuration for the OAuth Resource Owner Password flow\nclientCredentials | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject) | Configuration for the OAuth Client Credentials flow. Previously called `application` in OpenAPI 2.0.\nauthorizationCode | [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject) | Configuration for the OAuth Authorization Code flow. Previously called `accessCode` in OpenAPI 2.0.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
