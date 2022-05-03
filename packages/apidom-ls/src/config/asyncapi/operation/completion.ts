import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

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
        'A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    },
  },
  {
    label: 'security',
    insertText: 'security',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Security Requirement Object](https://www.asyncapi.com/docs/specifications/v2.4.0#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms are associated with this operation. Only one of the security requirement objects MUST be satisfied to authorize an operation. In cases where Server Security also applies, it MUST also be satisfied.',
    },
    targetSpecs: [{ namespace: 'asyncapi', version: '2.4.0' }],
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
        '[Tags Object](https://www.asyncapi.com/docs/specifications/v2.4.0#messageBindingsObject#tagsObject)\n\\\n\\\nA list of tags for API documentation control. Tags can be used for logical grouping of operations.',
    },
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
        '[External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.4.0#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this operation.',
    },
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
        '[Operation Bindings Object](https://www.asyncapi.com/docs/specifications/v2.4.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.4.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.',
    },
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
        '[[Operation Trait Object](https://www.asyncapi.com/docs/specifications/v2.4.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.4.0#referenceObject) ]\n\\\n\\\nA list of traits to apply to the operation object. Traits MUST be merged into the operation object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here.',
    },
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
        '[Message Object](https://www.asyncapi.com/docs/specifications/v2.4.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.4.0#referenceObject) &#124; Map["oneOf", [[Message Object](https://www.asyncapi.com/docs/specifications/v2.4.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.4.0#referenceObject)]]\n\\\n\\\nA definition of the message that will be published or received by this operation. Map containing a single `oneOf` key is allowed here to specify multiple messages. However, **a message MUST be valid only against one of the message objects.**',
    },
  },
];

export default completion;
