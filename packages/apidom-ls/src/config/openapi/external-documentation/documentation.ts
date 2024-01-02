import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const documentation = [
  {
    target: 'description',
    docs: 'A short description of the target documentation. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'description',
    docs: 'A description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'url',
    docs: '**Required.** The URL for the target documentation. Value MUST be in the format of a URL.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'url',
    docs: '**REQUIRED**. The URL for the target documentation. This MUST be in the form of a URL.',
    targetSpecs: OpenAPI3,
  },
  {
    docs: '#### [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#external-documentation-object)\n\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the target documentation. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.\nurl | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\n##### Patterned Objects\n\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### External Documentation Object Example\n\n```js\n{\n  "description": "Find more info here",\n  "url": "https://swagger.io"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://swagger.io\n```',
    targetSpecs: OpenAPI2,
  },
  {
    docs: '#### [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#externalDocumentationObject)\n\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nurl | `string` | **REQUIRED**. The URL for the target documentation. Value MUST be in the format of a URL.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### External Documentation Object Example\n\n\n\\\nJSON\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#external-documentation-object)\n\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nurl | `string` | **REQUIRED**. The URL for the target documentation. This MUST be in the form of a URL.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### External Documentation Object Example\n\n\n\\\nJSON\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
