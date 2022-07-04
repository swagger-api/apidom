import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'clientId',
    insertText: 'clientId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The client identifier.',
    },
  },
  {
    label: 'cleanSession',
    insertText: 'cleanSession',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Whether to create a persistent connection or not. When `false`, the connection will be persistent.',
    },
  },
  {
    label: 'lastWill',
    insertText: 'lastWill',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Last Will and Testament configuration.',
    },
  },
  {
    label: 'keepAlive',
    insertText: 'keepAlive',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Interval in seconds of the longest period of time the broker and the client can endure without sending a message.',
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
