const documentation = [
  {
    target: 'title',
    docs: '**REQUIRED.** The title of the API.',
  },
  {
    target: 'title',
    docs: 'A short summary of the API.',
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
    target: 'contact',
    docs: '#### [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contactObject)\n\nContact information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | The identifying name of the contact person/organization.\nurl | `string` | The URL pointing to the contact information. This MUST be in the form of a URL.\nemail | `string` | The email address of the contact person/organization. This MUST be in the form of an email address.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Contact Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "API Support",\n  "url": "https://www.example.com/support",\n  "email": "support@example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: API Support\nurl: https://www.example.com/support\nemail: support@example.com\n```',
  },
  {
    target: 'license',
    docs: '#### [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#licenseObject)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The license name used for the API.\nidentifier | `string` | An [SPDX](https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60) license expression for the API. The `identifier` field is mutually exclusive of the `url` field.\nurl | `string` | A URL to the license used for the API. This MUST be in the form of a URL. The `url` field is mutually exclusive of the `identifier` field.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### License Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "Apache 2.0",\n  "identifier": "Apache-2.0"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nidentifier: Apache-2.0\n```',
  },
  {
    target: 'version',
    docs: '**REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasVersion) or the API implementation version).',
  },
  {
    docs: '#### [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#infoObject)\n\nThe object provides metadata about the API.\nThe metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | **REQUIRED**. The title of the API.\nsummary | `string` | A short summary of the API.\ndescription | `string` | A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\ntermsOfService | `string` | A URL to the Terms of Service for the API. This MUST be in the form of a URL.\ncontact | [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contactObject) | The contact information for the exposed API.\nlicense | [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#licenseObject) | The license information for the exposed API.\nversion | `string` | **REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasVersion) or the API implementation version).\n\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Info Object Example\n\n\n\\\nJSON\n```json\n{\n  "title": "Sample Pet Store App",\n  "summary": "A pet store manager.",\n  "description": "This is a sample server for a pet store.",\n  "termsOfService": "https://example.com/terms/",\n  "contact": {\n    "name": "API Support",\n    "url": "https://www.example.com/support",\n    "email": "support@example.com"\n  },\n  "license": {\n    "name": "Apache 2.0",\n    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n  },\n  "version": "1.0.1"\n}\n```\n\n\n\\\nYAML\n```yaml\ntitle: Sample Pet Store App\nsummary: A pet store manager.\ndescription: This is a sample server for a pet store.\ntermsOfService: https://example.com/terms/\ncontact:\n  name: API Support\n  url: https://www.example.com/support\n  email: support@example.com\nlicense:\n  name: Apache 2.0\n  url: https://www.apache.org/licenses/LICENSE-2.0.html\nversion: 1.0.1\n```',
  },
];
export default documentation;
