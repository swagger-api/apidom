const documentation = [
  {
    target: 'operationId',
    docs: 'Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.',
  },
  {
    target: 'summary',
    docs: 'A short summary of what the operation is about.',
  },
  {
    target: 'description',
    docs: 'A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'security',
    docs: '[[Security Requirement Object](https://www.asyncapi.com/docs/specifications/v2.4.0#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms are associated with this operation. Only one of the security requirement objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.',
  },
  {
    target: 'tags',
    docs: '#### [Tags Object](https://www.asyncapi.com/docs/specifications/v2.4.0#tagsObject)\n\nA Tags object is a list of Tag Objects.',
  },
  {
    target: 'externalDocs',
    docs: '#### [External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.4.0#externalDocumentationObject)\n\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nurl | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.4.0#specificationExtensions).\n\n##### External Documentation Object Example\n\n\n\\\nJSON\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
  },
  {
    target: 'bindings',
    docs: '[Operation Bindings Object](https://www.asyncapi.com/docs/specifications/v2.4.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.4.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.',
  },
  {
    target: 'traits',
    docs: '[[Operation Trait Object](https://www.asyncapi.com/docs/specifications/v2.4.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.4.0#referenceObject) ]\n\\\n\\\nA list of traits to apply to the operation object. Traits MUST be merged into the operation object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here.',
  },
  {
    docs: "#### [Operation Trait Object](https://www.asyncapi.com/docs/specifications/v2.4.0#operationTraitObject)\n\nDescribes a trait that MAY be applied to an [Operation Object](https://www.asyncapi.com/docs/specifications/v2.4.0#operationObject). This object MAY contain any property from the [Operation Object](https://www.asyncapi.com/docs/specifications/v2.4.0#operationObject), except `message` and `traits`.\n\\\n\\\nIf you're looking to apply traits to a message, see the [Message Trait Object](https://www.asyncapi.com/docs/specifications/v2.4.0#messageTraitObject).\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\noperationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\nsummary | `string` | A short summary of what the operation is about.\ndescription | `string` | A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nsecurity | [[Security Requirement Object](https://www.asyncapi.com/docs/specifications/v2.4.0#securityRequirementObject)]| A declaration of which security mechanisms are associated with this operation. Only one of the security requirement objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.\ntags | [Tags Object](https://www.asyncapi.com/docs/specifications/v2.4.0#tagsObject) | A list of tags for API documentation control. Tags can be used for logical grouping of operations.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.4.0#externalDocumentationObject) | Additional external documentation for this operation.\nbindings | [Operation Bindings Object](https://www.asyncapi.com/docs/specifications/v2.4.0#operationBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/specifications/v2.4.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.4.0#specificationExtensions).",
  },
];
export default documentation;
