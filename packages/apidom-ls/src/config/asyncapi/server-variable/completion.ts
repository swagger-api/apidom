import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
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
      value: 'An array of examples of the server variable.',
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
      value: 'A reference to a server variable',
    },
  },
];

export default completion;
