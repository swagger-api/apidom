import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI32, OpenAPI3 } from '../target-specs.ts';

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
  { target: 'name', docs: '**Required.** The name of the tag.', targetSpecs: OpenAPI2 },
  { target: 'name', docs: '**REQUIRED**. The name of the tag.', targetSpecs: OpenAPI3 },
  {
    target: 'description',
    docs: 'A short description for the tag. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'description',
    docs: 'A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'summary',
    docs: 'A short summary of the tag.',
    targetSpecs: OpenAPI32,
  },
  {
    target: 'parent',
    docs: 'The name of the parent tag for hierarchical organization.',
    targetSpecs: OpenAPI32,
  },
  {
    target: 'kind',
    docs: 'A kind classification for the tag (e.g., "group", "resource").',
    targetSpecs: OpenAPI32,
  },
  {
    docs: '#### [Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#tagObject)\n\nAllows adding meta data to a single tag that is used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject). It is not mandatory to have a Tag Object per tag used there.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | **Required.** The name of the tag.\ndescription | `string` | A short description for the tag. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.\nexternalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#externalDocumentationObject) | Additional external documentation for this tag.\n\n##### Patterned Fields\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### Tag Object Example\n\n```js\n{\n\t"name": "pet",\n\t"description": "Pets operations"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: pet\ndescription: Pets operations\n```',
    targetSpecs: OpenAPI2,
  },
  {
    docs: '#### [Tag Object](https://spec.openapis.org/oas/v3.0.4.html#tag-object)\n\nAdds metadata to a single tag that is used by the [Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object).\nIt is not mandatory to have a Tag Object per tag defined in the Operation Object instances.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The name of the tag.\ndescription | `string` | A short description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexternalDocs | [External Documentation Object](https://spec.openapis.org/oas/v3.0.4.html#external-documentation-object) | Additional external documentation for this tag.\n\nThis object MAY be extended with [Specification Extensions](https://spec.openapis.org/oas/v3.0.4.html#specification-extensions).\n\n##### Tag Object Example\n\n\n\\\nJSON\n```json\n{\n\t"name": "pet",\n\t"description": "Pets operations"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: pet\ndescription: Pets operations\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#tag-object)\n\nAdds metadata to a single tag that is used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject). It is not mandatory to have a Tag Object per tag defined in the Operation Object instances.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The name of the tag.\ndescription | `string` | A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexternalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject) | Additional external documentation for this tag.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Tag Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "pet",\n  "description": "Pets operations"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: pet\ndescription: Pets operations\n```\n',
    targetSpecs: OpenAPI31,
  },
  {
    docs: '#### [Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#tag-object)\n\nAdds metadata to a single tag that is used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject). It is not mandatory to have a Tag Object per tag defined in the Operation Object instances.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The name of the tag.\nsummary | `string` | A short summary of the tag.\ndescription | `string` | A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexternalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#externalDocumentationObject) | Additional external documentation for this tag.\nparent | `string` | The name of the parent tag for hierarchical organization.\nkind | `string` | A kind classification for the tag.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#specificationExtensions).\n\n##### Tag Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "pet",\n  "summary": "Pet operations",\n  "description": "Operations related to pets in the store",\n  "parent": "animals",\n  "kind": "resource"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: pet\nsummary: Pet operations\ndescription: Operations related to pets in the store\nparent: animals\nkind: resource\n```\n\n##### Hierarchical Tags Example\n\n\n\\\nJSON\n```json\n[\n  {\n    "name": "animals",\n    "summary": "Animal management",\n    "kind": "group"\n  },\n  {\n    "name": "pet",\n    "summary": "Pet operations",\n    "parent": "animals",\n    "kind": "resource"\n  },\n  {\n    "name": "livestock",\n    "summary": "Livestock operations",\n    "parent": "animals",\n    "kind": "resource"\n  }\n]\n```\n\n\n\\\nYAML\n```yaml\n- name: animals\n  summary: Animal management\n  kind: group\n- name: pet\n  summary: Pet operations\n  parent: animals\n  kind: resource\n- name: livestock\n  summary: Livestock operations\n  parent: animals\n  kind: resource\n```\n',
    targetSpecs: OpenAPI32,
  },
];

export default documentation;
