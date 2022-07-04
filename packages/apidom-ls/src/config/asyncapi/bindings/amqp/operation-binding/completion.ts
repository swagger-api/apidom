import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'expiration',
    insertText: 'expiration',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'TTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.',
    },
  },
  {
    label: 'userId',
    insertText: 'userId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Identifies the user who has sent the message.',
    },
  },
  {
    label: 'cc',
    insertText: 'cc',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The routing keys the message should be routed to at the time of publishing.',
    },
  },
  {
    label: 'priority',
    insertText: 'priority',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A priority for the message.',
    },
  },
  {
    label: 'deliveryMode',
    insertText: 'deliveryMode',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Delivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).',
    },
  },
  {
    label: 'mandatory',
    insertText: 'mandatory',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Whether the message is mandatory or not.',
    },
  },
  {
    label: 'bcc',
    insertText: 'bcc',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Like cc but consumers will not receive this information.',
    },
  },
  {
    label: 'replyTo',
    insertText: 'replyTo',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Name of the queue where the consumer should send the response.',
    },
  },
  {
    label: 'timestamp',
    insertText: 'timestamp',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Whether the message should include a timestamp or not.',
    },
  },
  {
    label: 'ack',
    insertText: 'ack',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Whether the consumer should ack the message or not.',
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
  {
    target: 'deliveryMode',
    label: '1',
    insertText: '1',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'deliveryMode',
    label: '2',
    insertText: '2',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
];

export default completion;
