/**
 * Omitted fixed fields:
 *  - tags
 *  - externalDocs
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'title',
    docs: '`string`\n\\\n\\\nA human-friendly title for the operation.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'operationId',
    docs: 'Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'summary',
    docs: 'A short summary of what the operation is about.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'description',
    docs: 'A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'security',
    docs: '[[Security Requirement Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms are associated with this operation. Only one of the security requirement objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'security',
    docs: '[[Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nA declaration of which security schemes are associated with this operation. Only one of the security scheme objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'externalDocs',
    docs: '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nAdditional external documentation for this operation.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindings',
    docs: '[Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'bindings',
    docs: '[Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.',
    targetSpecs: AsyncAPI3,
  },
  {
    docs: "#### [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject)\n\nDescribes a trait that MAY be applied to an [Operation Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationObject). This object MAY contain any property from the [Operation Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationObject), except `message` and `traits`.\n\\\n\\\nIf you're looking to apply traits to a message, see the [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageTraitObject).\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\noperationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\nsummary | `string` | A short summary of what the operation is about.\ndescription | `string` | A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nsecurity | [[Security Requirement Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securityRequirementObject)]| A declaration of which security mechanisms are associated with this operation. Only one of the security requirement objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.\ntags | [Tags Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#tagsObject) | A list of tags for logical grouping and categorization of operations.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#externalDocumentationObject) | Additional external documentation for this operation.\nbindings | [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.\n\nThis object MAY be extendeded with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).",
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject)\n\nDescribes a trait that MAY be applied to an [Operation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject). This object MAY contain any property from the [Operation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject), except the `action`, `channel`, `messages` and `traits` ones.\n\\\n\\\nIf you\'re looking to apply traits to a message, see the [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject).\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntitle | `string` | A human-friendly title for the operation.\nsummary | `string` | A short summary of what the operation is about.\ndescription | `string` | A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nsecurity | [[Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | A declaration of which security schemes are associated with this operation. Only one of the security scheme objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.\ntags | Array of [Tag Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject) | A list of tags for logical grouping and categorization of operations.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | Additional external documentation for this operation.\nbindings | [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#specificationExtensions).\n\n##### Operation Trait Object Example\n\n\n\\\nJSON\n```json\n{\n  "bindings": {\n    "amqp": {\n      "ack": false\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nbindings:\n  amqp:\n    ack: false\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
