const documentation = [
  {
    target: 'url',
    docs: '**REQUIRED**. The URL for the target documentation. This MUST be in the form of a URL.',
  },
  {
    target: 'description',
    docs: 'A description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    docs: '#### [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#external-documentation-object)\n\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nurl | `string` | **REQUIRED**. The URL for the target documentation. This MUST be in the form of a URL.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### External Documentation Object Example\n\n\n\\\nJSON\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
