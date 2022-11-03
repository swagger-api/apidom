/**
 * Omitted fixed fields:
 *  - externalDocs
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: 'name',
    docs: '**REQUIRED.** The name of the tag.',
  },
  {
    target: 'description',
    docs: 'A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    docs: '#### [Tag Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#tagObject)\n\nAllows adding meta data to a single tag.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED.** The name of the tag.\ndescription | `string` | A short description for the tag. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#externalDocumentationObject) | Additional external documentation for this tag.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).\n\n##### Tag Object Example\n\n\n\\\nJSON\n```json\n{\n\t"name": "user",\n\t"description": "User-related messages"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: user\ndescription: User-related messages\n```',
  },
];
export default documentation;
