import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

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
  { target: 'name', docs: '**REQUIRED**. The name of the tag.', targetSpecs: OpenAPI3 },
  {
    target: 'description',
    docs: 'A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    docs: '#### [Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#tagObject)\n\nAdds metadata to a single tag that is used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject).\nIt is not mandatory to have a Tag Object per tag defined in the Operation Object instances.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The name of the tag.\ndescription | `string` | A short description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexternalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#externalDocumentationObject) | Additional external documentation for this tag.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### Tag Object Example\n\n\n\\\nJSON\n```json\n{\n\t"name": "pet",\n\t"description": "Pets operations"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: pet\ndescription: Pets operations\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#tag-object)\n\nAdds metadata to a single tag that is used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject). It is not mandatory to have a Tag Object per tag defined in the Operation Object instances.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The name of the tag.\ndescription | `string` | A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexternalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject) | Additional external documentation for this tag.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Tag Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "pet",\n  "description": "Pets operations"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: pet\ndescription: Pets operations\n```\n',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
