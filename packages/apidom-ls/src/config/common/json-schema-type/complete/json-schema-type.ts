import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const jsonSchemaTypeComplete: ApidomCompletionItem[] = [
  {
    label: 'null',
    insertText: 'null',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: 'boolean',
    insertText: 'boolean',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: 'object',
    insertText: 'object',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: 'array',
    insertText: 'array',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: 'number',
    insertText: 'number',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: 'string',
    insertText: 'string',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: 'integer',
    insertText: 'integer',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
];

export default jsonSchemaTypeComplete;
