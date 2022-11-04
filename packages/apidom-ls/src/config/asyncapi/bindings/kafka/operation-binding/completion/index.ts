import completion0_1_0Items from './0-1-0';
import completion0_2_0Items from './0-2-0';
import completion0_3_0Items from './0-3-0';
import completionLatestItems from './latest';
import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  ...completion0_1_0Items,
  ...completion0_2_0Items,
  ...completion0_3_0Items,
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
      value: 'The version of this binding. If omitted, "0.3.0" MUST be assumed.',
    },
  },
  {
    target: 'bindingVersion',
    label: '0.1.0',
    insertText: '0.1.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'bindingVersion',
    label: '0.2.0',
    insertText: '0.2.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'bindingVersion',
    label: '0.3.0',
    insertText: '0.3.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
];

export default completion;
