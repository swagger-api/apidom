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
    docs: '**REQUIRED.** The title of the application.',
  },
  {
    target: 'version',
    docs: '**REQUIRED.** Provides the version of the application API (not to be confused with the specification version).',
  },
  {
    target: 'description',
    docs: 'A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'termsOfService',
    docs: 'A URL to the Terms of Service for the API. This MUST be in the form of an absolute URL.',
  },
  {
    docs: '#### [Info Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#infoObject)\n\nThe object provides metadata about the API.\nThe metadata can be used by the clients if needed.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | **REQUIRED.** The title of the application.\nversion | `string` | **REQUIRED** Provides the version of the application API (not to be confused with the specification version).\ndescription | `string` | A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\ntermsOfService | `string` | A URL to the Terms of Service for the API. This MUST be in the form of an absolute URL.\ncontact | [Contact Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#contactObject) | The contact information for the exposed API.\nlicense | [License Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#licenseObject) | The license information for the exposed API.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\n##### Info Object Example:\n\n\n\\\nJSON\n\n\\\nJSON\n```json\n{\n  "title": "AsyncAPI Sample App",\n  "description": "This is a sample server.",\n  "termsOfService": "https://asyncapi.org/terms/",\n  "contact": {\n    "name": "API Support",\n    "url": "https://www.asyncapi.org/support",\n    "email": "support@asyncapi.org"\n  },\n  "license": {\n    "name": "Apache 2.0",\n    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n  },\n  "version": "1.0.1"\n}\n```\n\n\n\\\nYAML\n\n\\\nYAML\n```yaml\ntitle: AsyncAPI Sample App\ndescription: This is a sample server.\ntermsOfService: https://asyncapi.org/terms/\ncontact:\n  name: API Support\n  url: https://www.asyncapi.org/support\n  email: support@asyncapi.org\nlicense:\n  name: Apache 2.0\n  url: https://www.apache.org/licenses/LICENSE-2.0.html\nversion: 1.0.1\n```',
  },
];
export default documentation;
