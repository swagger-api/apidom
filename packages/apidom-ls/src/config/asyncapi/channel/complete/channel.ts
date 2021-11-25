import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const channelCompleteJson: ApidomCompletionItem[] = [
  {
    label: 'subscribe',
    insertText: 'subscribe',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: 'Add `subscribe` section',
  },
];

export default channelCompleteJson;
