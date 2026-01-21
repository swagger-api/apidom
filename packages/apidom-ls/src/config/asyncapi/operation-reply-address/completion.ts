import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
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
        '**REQUIRED.** A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v3.0.0#runtimeExpression) that specifies the location of the reply address.',
    },
    targetSpecs: AsyncAPI3,
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
        'An optional description of the address. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    },
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
