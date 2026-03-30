import completion0_0_1Items from './0-0-1.ts';
import completionLatestItems from './latest.ts';
import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  ...completion0_0_1Items,
  ...completionLatestItems,
  {
    label: 'bindingVersion',
    insertText: 'bindingVersion',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.0.1" MUST be assumed.',
    },
  },
  {
    target: 'bindingVersion',
    label: '0.0.1',
    insertText: '0.0.1',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
];

export default completion;
