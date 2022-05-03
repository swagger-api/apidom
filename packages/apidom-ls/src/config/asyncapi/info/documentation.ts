const documentation = [
  {
    target: 'title',
    docs: '**Required.** The title of the application.',
  },
  {
    target: 'version',
    docs: '**Required.** Provides the version of the application API (not to be confused with the specification version).',
  },
  {
    target: 'description',
    docs: 'A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'termsOfService',
    docs: 'A URL to the Terms of Service for the API. MUST be in the format of a URL.',
  },
  {
    target: 'contact',
    docs: '#### [Contact Object](https://www.asyncapi.com/docs/specifications/v2.4.0#contactObject)\n\nContact information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | The identifying name of the contact person/organization.\nurl | `string` | The URL pointing to the contact information. MUST be in the format of a URL.\nemail | `string` | The email address of the contact person/organization. MUST be in the format of an email address.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.4.0#specificationExtensions).\n\n##### Contact Object Example:\n\n\n\\\nJSON\n```json\n{\n  "name": "API Support",\n  "url": "https://www.example.com/support",\n  "email": "support@example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: API Support\nurl: https://www.example.com/support\nemail: support@example.com\n```',
  },
  {
    target: 'license',
    docs: '#### [License Object](https://www.asyncapi.com/docs/specifications/v2.4.0#licenseObject)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **Required.** The license name used for the API.\nurl | `string` | A URL to the license used for the API. MUST be in the format of a URL.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.4.0#specificationExtensions).\n\n##### License Object Example:\n\n\n\\\nJSON\n```json\n{\n  "name": "Apache 2.0",\n  "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nurl: https://www.apache.org/licenses/LICENSE-2.0.html\n```',
  },
  {
    docs: '#### [Info Object](https://www.asyncapi.com/docs/specifications/v2.4.0#infoObject)\n\nThe object provides metadata about the API.\nThe metadata can be used by the clients if needed.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | **Required.** The title of the application.\nversion | `string` | **Required** Provides the version of the application API (not to be confused with the specification version).\ndescription | `string` | A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\ntermsOfService | `string` | A URL to the Terms of Service for the API. MUST be in the format of a URL.\ncontact | [Contact Object](https://www.asyncapi.com/docs/specifications/v2.4.0#contactObject) | The contact information for the exposed API.\nlicense | [License Object](https://www.asyncapi.com/docs/specifications/v2.4.0#licenseObject) | The license information for the exposed API.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.4.0#specificationExtensions).\n\n##### Info Object Example:\n\n\n\\\nJSON\n```json\n{\n  "title": "AsyncAPI Sample App",\n  "description": "This is a sample server.",\n  "termsOfService": "https://asyncapi.org/terms/",\n  "contact": {\n    "name": "API Support",\n    "url": "https://www.asyncapi.org/support",\n    "email": "support@asyncapi.org"\n  },\n  "license": {\n    "name": "Apache 2.0",\n    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n  },\n  "version": "1.0.1"\n}\n```\n\n\n\\\nYAML\n```yaml\ntitle: AsyncAPI Sample App\ndescription: This is a sample server.\ntermsOfService: https://asyncapi.org/terms/\ncontact:\n  name: API Support\n  url: https://www.asyncapi.org/support\n  email: support@asyncapi.org\nlicense:\n  name: Apache 2.0\n  url: https://www.apache.org/licenses/LICENSE-2.0.html\nversion: 1.0.1\n```',
  },
];
export default documentation;
