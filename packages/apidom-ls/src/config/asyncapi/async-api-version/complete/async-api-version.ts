import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const asyncapiVersionComplete: ApidomCompletionItem[] = [
  {
    label: '2.0.0',
    insertText: '2.0.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: '2.1.0',
    insertText: '2.1.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: '2.2.0',
    insertText: '2.2.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    label: '2.3.0',
    insertText: '2.3.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
];

export default asyncapiVersionComplete;
