const documentation = [
  {
    target: 'name',
    docs: '**Required.** The name of the tag.',
  },
  {
    target: 'description',
    docs: 'A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'externalDocs',
    docs: '#### [External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.4.0#externalDocumentationObject)\n\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nurl | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.4.0#specificationExtensions).\n\n##### External Documentation Object Example\n\n\n\\\nJSON\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
  },
  {
    docs: '#### [Tag Object](https://www.asyncapi.com/docs/reference/specification/v2.4.0#tagObject)\n\nAllows adding meta data to a single tag.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | **Required.** The name of the tag.\ndescription | `string` | A short description for the tag. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.4.0#externalDocumentationObject) | Additional external documentation for this tag.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.4.0#specificationExtensions).\n\n##### Tag Object Example\n\n\n\\\nJSON\n```json\n{\n\t"name": "user",\n\t"description": "User-related messages"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: user\ndescription: User-related messages\n```',
  },
];
export default documentation;
