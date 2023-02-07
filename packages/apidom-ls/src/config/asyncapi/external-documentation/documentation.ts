const documentation = [
  {
    target: 'url',
    docs: '**REQUIRED.** The URL for the target documentation. This MUST be in the form of an absolute URL.',
  },
  {
    target: 'description',
    docs: 'A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    docs: '#### [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#externalDocumentationObject)\n\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nurl | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\n##### External Documentation Object Example\n\n\n\\\nJSON\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
  },
];
export default documentation;
