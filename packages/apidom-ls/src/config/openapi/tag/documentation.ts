const documentation = [
  { target: 'name', docs: '**REQUIRED**. The name of the tag.' },
  {
    target: 'description',
    docs: 'A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  /**
   * The following Fixed Field is provided as reference, but is more
   * comprehensively described by parent External Documentation Object meta documentation
   */
  // {
  //   target: 'externalDocs',
  //   docs: '#### [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject)\n\nAdditional external documentation for this operation.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  {
    docs: '#### [Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#tag-object)\n\nAdds metadata to a single tag that is used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject). It is not mandatory to have a Tag Object per tag defined in the Operation Object instances.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The name of the tag.\ndescription | `string` | A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexternalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject) | Additional external documentation for this tag.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Tag Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "pet",\n  "description": "Pets operations"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: pet\ndescription: Pets operations\n```\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
