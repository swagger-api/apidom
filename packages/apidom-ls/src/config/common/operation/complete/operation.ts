import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const operationComplete: ApidomCompletionItem[] = [
  {
    label: 'operationId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertText: 'operationId',
    insertTextFormat: 2,
    documentation: 'Add `operationId` property',
  },
];

export default operationComplete;
