import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const documentation = [
  {
    target: 'name',
    docs: '**Required.** The license name used for the API.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'name',
    docs: '**REQUIRED**. The license name used for the API.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'identifier',
    docs: 'An [SPDX](https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60) license expression for the API. The `identifier` field is mutually exclusive of the `url` field.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'url',
    docs: 'A URL to the license used for the API. MUST be in the format of a URL.',
    targetSpecs: [...OpenAPI2, ...OpenAPI30],
  },
  {
    target: 'url',
    docs: 'A URL to the license used for the API. This MUST be in the form of a URL. The `url` field is mutually exclusive of the `identifier` field.',
    targetSpecs: OpenAPI31,
  },
  {
    docs: '#### [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#license-object)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **Required.** The license name used for the API.\nurl | `string` | A URL to the license used for the API. MUST be in the format of a URL.\n\n##### Patterned Objects\n\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### License Object Example:\n\n```js\n{\n  "name": "Apache 2.0",\n  "url": "http://www.apache.org/licenses/LICENSE-2.0.html"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nurl: http://www.apache.org/licenses/LICENSE-2.0.html\n```',
    targetSpecs: OpenAPI2,
  },
  {
    docs: '#### [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#licenseObject)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The license name used for the API.\nurl | `string` | A URL to the license used for the API. MUST be in the format of a URL.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### License Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "Apache 2.0",\n  "url": "https://www.apache.org/licenses/LICENSE-2.0.html"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nurl: https://www.apache.org/licenses/LICENSE-2.0.html\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#licenseObject)\n\nLicense information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The license name used for the API.\nidentifier | `string` | An [SPDX](https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60) license expression for the API. The `identifier` field is mutually exclusive of the `url` field.\nurl | `string` | A URL to the license used for the API. This MUST be in the form of a URL. The `url` field is mutually exclusive of the `identifier` field.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### License Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "Apache 2.0",\n  "identifier": "Apache-2.0"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: Apache 2.0\nidentifier: Apache-2.0\n```',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
