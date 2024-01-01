import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../target-specs';

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
        'A short description of the target documentation. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.',
    },
    targetSpecs: OpenAPI2,
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
        'A description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
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
        '**Required.** The URL for the target documentation. Value MUST be in the format of a URL.',
    },
    targetSpecs: OpenAPI2,
  },
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
        '**REQUIRED**. The URL for the target documentation. This MUST be in the form of a URL.',
    },
    targetSpecs: OpenAPI3,
  },
];

export default completion;
