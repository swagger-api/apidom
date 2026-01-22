import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'operationId',
    insertText: 'operationId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'summary',
    insertText: 'summary',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A short summary of what the operation is about.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A verbose explanation of the operation. [CommonMark syntax](http://spec.commonmark.org/) can be used for rich text representation.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    label: 'security',
    insertText: 'security',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Security Requirement Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms are associated with this operation. Only one of the security requirement objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
    ],
  },
  {
    label: 'security',
    insertText: 'security',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nA declaration of which security schemes are associated with this operation. Only one of the security scheme objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'security',
    label: 'security',
    insertText: '?',
    arrayMember: true,
    kind: 12,
    format: CompletionFormat.ARRAY_OBJECT,
    type: CompletionType.PROPERTY,
    function: 'apicompleteSecurity',
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'tags',
    insertText: 'tags',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Tags Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject#tagsObject)\n\\\n\\\nA list of tags for logical grouping and categorization of operations.',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'tags',
    insertText: 'tags',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Tags Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagsObject)\n\\\n\\\nA list of tags for logical grouping and categorization of servers.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this operation.',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nAdditional external documentation for this operation.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'bindings',
    insertText: 'bindings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'bindings',
    insertText: 'bindings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'traits',
    insertText: 'traits',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) ]\n\\\n\\\nA list of traits to apply to the operation object. Traits MUST be merged into the operation object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here.',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'traits',
    insertText: 'traits',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nA list of traits to apply to the operation object. Traits MUST be merged using [traits merge mechanism](https://www.asyncapi.com/docs/reference/specification/v3.0.0#traits-merge-mechanism). The resulting object MUST be a valid [Operation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject).',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'message',
    insertText: 'message',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) &#124; Map["oneOf", [[Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]]\n\\\n\\\nA definition of the message that will be published or received by this operation. Map containing a single `oneOf` key is allowed here to specify multiple messages. However, **a message MUST be valid only against one of the message objects.**',
    },
    targetSpecs: AsyncAPI2,
  },
];

export default completion;
