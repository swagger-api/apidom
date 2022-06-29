import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'queue',
    insertText: 'queue',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Defines the name of the queue to use. It MUST NOT exceed 255 characters.',
    },
  },
  {
    label: 'bindingVersion',
    insertText: 'bindingVersion',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The version of this binding. If omitted, "latest" MUST be assumed.',
    },
  },
];

export default completion;
