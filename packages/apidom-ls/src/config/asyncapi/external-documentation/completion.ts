import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'url',
    insertText: 'url',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED.** The URL for the target documentation. This MUST be in the form of an absolute URL.',
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
        'A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
];

export default completion;
