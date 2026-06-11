import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

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
      value: 'An optional description for the security scheme (string).',
    },
    targetSpecs: A2A1,
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
        'The location of the API key. Valid values are "query", "header", or "cookie" (string, required).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The name of the header, query, or cookie parameter to be used (string, required).',
    },
    targetSpecs: A2A1,
  },
];

export default completion;
