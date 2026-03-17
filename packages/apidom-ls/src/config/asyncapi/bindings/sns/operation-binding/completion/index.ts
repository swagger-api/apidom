import completion0_1_0Items from './0-1-0.ts';
import completion0_2_0Items from './0-2-0.ts';
import completion1_0_0Items from './1-0-0.ts';
import completionLatestItems from './latest.ts';
import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  ...completion0_1_0Items,
  ...completion0_2_0Items,
  ...completion1_0_0Items,
  ...completionLatestItems,
  {
    label: 'bindingVersion',
    insertText: 'bindingVersion',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\nApplies to `Publish`, `Subscribe`.\n\\\n**Optional**, defaults to `latest`. The version of this binding.',
    },
  },
  {
    label: 'bindingVersion',
    insertText: 'bindingVersion',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI3,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\nApplies to `send`, `receive`.\n\\\n**Optional**, defaults to `latest`. The version of this binding.',
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
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'bindingVersion',
    label: '0.2.0',
    insertText: '0.2.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'bindingVersion',
    label: '1.0.0',
    insertText: '1.0.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
