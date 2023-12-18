import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

/**
 * Omitted fixed fields:
 *  - contact
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
    docs: '**Required.** The title of the application.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'title',
    docs: '**REQUIRED.** The title of the API.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'summary',
    docs: 'A short summary of the API.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'description',
    docs: 'A short description of the application. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'description',
    docs: 'A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'termsOfService',
    docs: 'The Terms of Service for the API.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'termsOfService',
    docs: 'A URL to the Terms of Service for the API. This MUST be in the form of a URL.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'version',
    docs: '**Required** Provides the version of the application API (not to be confused with the specification version).',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'version',
    docs: '**REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasVersion) or the API implementation version).',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'version',
    docs: '**REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasVersion) or the API implementation version).',
    targetSpecs: OpenAPI31,
  },
  {
    docs: '#### [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#info-object)\n\nThe object provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | **Required.** The title of the application.\ndescription | `string` | A short description of the application. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.\ntermsOfService | `string` | The Terms of Service for the API.\ncontact | [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#contactObject) | The contact information for the exposed API.\nlicense | [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#licenseObject) | The license information for the exposed API.\nversion | `string` | **Required** Provides the version of the application API (not to be confused with the specification version).\n\n##### Patterned Objects\n\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### Info Object Example:\n\n```js\n{\n  "title": "Swagger Sample App",\n  "description": "This is a sample server Petstore server.",\n  "termsOfService": "http://swagger.io/terms/",\n  "contact": {\n    "name": "API Support",\n    "url": "http://www.swagger.io/support",\n    "email": "support@swagger.io"\n  },\n  "license": {\n    "name": "Apache 2.0",\n    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"\n  },\n  "version": "1.0.1"\n}\n```\n\n\n\\\nYAML\n```yaml\ntitle: Swagger Sample App\ndescription: This is a sample server Petstore server.\ntermsOfService: http://swagger.io/terms/\ncontact:\n  name: API Support\n  url: http://www.swagger.io/support\n  email: support@swagger.io\nlicense:\n  name: Apache 2.0\n  url: http://www.apache.org/licenses/LICENSE-2.0.html\nversion: 1.0.1\n```',
    targetSpecs: OpenAPI2,
  },
  {
    docs: '#### [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#infoObject)\n\nThe object provides metadata about the API.\nThe metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | **REQUIRED**. The title of the API.\ndescription | `string` | A short description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\ntermsOfService | `string` | A URL to the Terms of Service for the API. MUST be in the format of a URL.\ncontact | [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#contactObject) | The contact information for the exposed API.\nlicense | [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#licenseObject) | The license information for the exposed API.\nversion | `string` | **REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasVersion) or the API implementation version).\n\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### Info Object Example\n\n\n\\\nJSON\n```json\n{\n  "title": "Sample Pet Store App",\n  "description": "This is a sample server for a pet store.",\n  "termsOfService": "http://example.com/terms/",\n  "contact": {\n    "name": "API Support",\n    "url": "http://www.example.com/support",\n    "email": "support@example.com"\n  },\n  "license": {\n    "name": "Apache 2.0",\n    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n  },\n  "version": "1.0.1"\n}\n```\n\n\n\\\nYAML\n```yaml\ntitle: Sample Pet Store App\ndescription: This is a sample server for a pet store.\ntermsOfService: http://example.com/terms/\ncontact:\n  name: API Support\n  url: http://www.example.com/support\n  email: support@example.com\nlicense:\n  name: Apache 2.0\n  url: https://www.apache.org/licenses/LICENSE-2.0.html\nversion: 1.0.1\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#infoObject)\n\nThe object provides metadata about the API.\nThe metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | **REQUIRED**. The title of the API.\nsummary | `string` | A short summary of the API.\ndescription | `string` | A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\ntermsOfService | `string` | A URL to the Terms of Service for the API. This MUST be in the form of a URL.\ncontact | [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contactObject) | The contact information for the exposed API.\nlicense | [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#licenseObject) | The license information for the exposed API.\nversion | `string` | **REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasVersion) or the API implementation version).\n\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Info Object Example\n\n\n\\\nJSON\n```json\n{\n  "title": "Sample Pet Store App",\n  "summary": "A pet store manager.",\n  "description": "This is a sample server for a pet store.",\n  "termsOfService": "https://example.com/terms/",\n  "contact": {\n    "name": "API Support",\n    "url": "https://www.example.com/support",\n    "email": "support@example.com"\n  },\n  "license": {\n    "name": "Apache 2.0",\n    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n  },\n  "version": "1.0.1"\n}\n```\n\n\n\\\nYAML\n```yaml\ntitle: Sample Pet Store App\nsummary: A pet store manager.\ndescription: This is a sample server for a pet store.\ntermsOfService: https://example.com/terms/\ncontact:\n  name: API Support\n  url: https://www.example.com/support\n  email: support@example.com\nlicense:\n  name: Apache 2.0\n  url: https://www.apache.org/licenses/LICENSE-2.0.html\nversion: 1.0.1\n```',
    targetSpecs: OpenAPI31,
  },
];
export default documentation;
