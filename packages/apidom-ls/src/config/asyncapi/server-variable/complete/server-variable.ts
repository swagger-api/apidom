import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const serverVariableComplete: ApidomCompletionItem[] = [
  {
    label: 'enum',
    insertText: 'enum',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'An enumeration of string values to be used if the substitution options are from a limited set.',
    },
  },
  {
    label: 'default',
    insertText: 'default',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The default value to use for substitution, and to send, if an alternate value is not supplied.',
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
        'An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) **MAY** be used for rich text representation.',
    },
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'An array of examples of the server variable.\n\n ---- \n\nThis object **MAY** be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
    },
  },
];

export default serverVariableComplete;
