import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
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
        'A verbose explanation of the parameter. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    },
  },
  {
    label: 'schema',
    insertText: 'schema',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nDefinition of the parameter.',
    },
  },
  {
    label: 'location',
    insertText: 'location',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v2.6.0#runtimeExpression) that specifies the location of the parameter value. Even when a definition for the target field exists, it MUST NOT be used to validate this parameter but, instead, the `schema` property MUST be used.',
    },
  },
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to a parameter',
    },
  },
];

export default completion;
