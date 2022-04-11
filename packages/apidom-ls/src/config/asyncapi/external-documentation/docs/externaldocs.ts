const externalDocsDocs = [
  {
    docs: '#### External Documentation Object\n\\\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nurl | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions).\n\n##### External Documentation Object Example\n\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
  },
  {
    target: 'url',
    docs: '**Required.** The URL for the target documentation. Value MUST be in the format of a URL.',
  },
  {
    target: 'description',
    docs: 'A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
];
export default externalDocsDocs;
