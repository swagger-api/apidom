import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'namespace',
    insertText: 'namespace',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The namespace the channel is associated with.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'persistence',
    insertText: 'persistence',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Persistence of the topic in Pulsar. It MUST be either `persistent` or `non-persistent`.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'compaction',
    insertText: 'compaction',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`Integer`\n\\\n\\\nTopic compaction threshold given in Megabytes.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'geo-replication',
    insertText: 'geo-replication',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`String[]`\n\\\n\\\nA list of clusters the topic is replicated to.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'retention',
    insertText: 'retention',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Retention Definition Object](https://github.com/asyncapi/bindings/blob/master/pulsar/README.md#retention-definition-object)`\n\\\n\\\nTopic retention policy.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'ttl',
    insertText: 'ttl',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`Integer`\n\\\n\\\nMessage time-to-live in seconds.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'deduplication',
    insertText: 'deduplication',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`Boolean`\n\\\n\\\nMessage deduplication. When true, it ensures that each message produced on Pulsar topics is persisted to disk only once.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'persistence',
    label: 'persistent',
    insertText: 'persistent',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'persistence',
    label: 'non-persistent',
    insertText: 'non-persistent',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
