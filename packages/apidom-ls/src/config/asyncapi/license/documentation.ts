const documentation = [
  {
    target: 'name',
    docs: '**REQUIRED.** The license name used for the API.',
  },
  {
    target: 'url',
    docs: 'A URL to the license used for the API. This MUST be in the form of an absolute URL.',
  },
  {
    docs: '#### [License Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#licenseObject)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED.** The license name used for the API.\nurl | `string` | A URL to the license used for the API. This MUST be in the form of an absolute URL.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\n##### License Object Example:\n\n\n\\\nJSON\n\n\\\nJSON\n```json\n{\n  "name": "Apache 2.0",\n  "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n}\n```\n\n\n\\\nYAML\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nurl: https://www.apache.org/licenses/LICENSE-2.0.html\n```',
  },
];
export default documentation;
