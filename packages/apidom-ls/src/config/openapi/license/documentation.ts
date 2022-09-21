const documentation = [
  {
    target: 'name',
    docs: '**REQUIRED**. The license name used for the API.',
  },
  {
    target: 'identifier',
    docs: 'An [SPDX](https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60) license expression for the API. The `identifier` field is mutually exclusive of the `url` field.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'url',
    docs: 'A URL to the license used for the API. MUST be in the format of a URL.',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'url',
    docs: 'A URL to the license used for the API. This MUST be in the form of a URL. The `url` field is mutually exclusive of the `identifier` field.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: '#### [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#licenseObject)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The license name used for the API.\nurl | `string` | A URL to the license used for the API. MUST be in the format of a URL.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### License Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "Apache 2.0",\n  "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nurl: https://www.apache.org/licenses/LICENSE-2.0.html\n```',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    docs: '#### [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#licenseObject)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The license name used for the API.\nidentifier | `string` | An [SPDX](https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60) license expression for the API. The `identifier` field is mutually exclusive of the `url` field.\nurl | `string` | A URL to the license used for the API. This MUST be in the form of a URL. The `url` field is mutually exclusive of the `identifier` field.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### License Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "Apache 2.0",\n  "identifier": "Apache-2.0"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nidentifier: Apache-2.0\n```',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
