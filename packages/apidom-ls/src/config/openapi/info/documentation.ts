/**
 * Omitted fixed fields:
 *  - context
 *  - license
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: 'title',
    docs: '**REQUIRED.** The title of the API.',
  },
  {
    target: 'summary',
    docs: 'A short summary of the API.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'description',
    docs: 'A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'termsOfService',
    docs: 'A URL to the Terms of Service for the API. This MUST be in the form of a URL.',
  },
  {
    target: 'version',
    docs: '**REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasVersion) or the API implementation version).',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'version',
    docs: '**REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasVersion) or the API implementation version).',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: '#### [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#infoObject)\n\nThe object provides metadata about the API.\nThe metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | **REQUIRED**. The title of the API.\ndescription | `string` | A short description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\ntermsOfService | `string` | A URL to the Terms of Service for the API. MUST be in the format of a URL.\ncontact | [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#contactObject) | The contact information for the exposed API.\nlicense | [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#licenseObject) | The license information for the exposed API.\nversion | `string` | **REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasVersion) or the API implementation version).\n\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### Info Object Example\n\n\n\\\nJSON\n```json\n{\n  "title": "Sample Pet Store App",\n  "description": "This is a sample server for a pet store.",\n  "termsOfService": "http://example.com/terms/",\n  "contact": {\n    "name": "API Support",\n    "url": "http://www.example.com/support",\n    "email": "support@example.com"\n  },\n  "license": {\n    "name": "Apache 2.0",\n    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n  },\n  "version": "1.0.1"\n}\n```\n\n\n\\\nYAML\n```yaml\ntitle: Sample Pet Store App\ndescription: This is a sample server for a pet store.\ntermsOfService: http://example.com/terms/\ncontact:\n  name: API Support\n  url: http://www.example.com/support\n  email: support@example.com\nlicense:\n  name: Apache 2.0\n  url: https://www.apache.org/licenses/LICENSE-2.0.html\nversion: 1.0.1\n```',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    docs: '#### [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#infoObject)\n\nThe object provides metadata about the API.\nThe metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | **REQUIRED**. The title of the API.\nsummary | `string` | A short summary of the API.\ndescription | `string` | A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\ntermsOfService | `string` | A URL to the Terms of Service for the API. This MUST be in the form of a URL.\ncontact | [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contactObject) | The contact information for the exposed API.\nlicense | [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#licenseObject) | The license information for the exposed API.\nversion | `string` | **REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasVersion) or the API implementation version).\n\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Info Object Example\n\n\n\\\nJSON\n```json\n{\n  "title": "Sample Pet Store App",\n  "summary": "A pet store manager.",\n  "description": "This is a sample server for a pet store.",\n  "termsOfService": "https://example.com/terms/",\n  "contact": {\n    "name": "API Support",\n    "url": "https://www.example.com/support",\n    "email": "support@example.com"\n  },\n  "license": {\n    "name": "Apache 2.0",\n    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n  },\n  "version": "1.0.1"\n}\n```\n\n\n\\\nYAML\n```yaml\ntitle: Sample Pet Store App\nsummary: A pet store manager.\ndescription: This is a sample server for a pet store.\ntermsOfService: https://example.com/terms/\ncontact:\n  name: API Support\n  url: https://www.example.com/support\n  email: support@example.com\nlicense:\n  name: Apache 2.0\n  url: https://www.apache.org/licenses/LICENSE-2.0.html\nversion: 1.0.1\n```',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];
export default documentation;
