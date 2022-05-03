const documentation = [
  {
    target: 'name',
    docs: '**Required.** The license name used for the API.',
  },
  {
    target: 'url',
    docs: 'A URL to the license used for the API. **MUST** be in the format of a URL.',
  },
  {
    docs: '#### [License Object](https://www.asyncapi.com/docs/specifications/v2.4.0#licenseObject)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **Required.** The license name used for the API.\nurl | `string` | A URL to the license used for the API. MUST be in the format of a URL.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.4.0#specificationExtensions).\n\n##### License Object Example:\n\n\n\\\nJSON\n```json\n{\n  "name": "Apache 2.0",\n  "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nurl: https://www.apache.org/licenses/LICENSE-2.0.html\n```',
  },
];
export default documentation;
