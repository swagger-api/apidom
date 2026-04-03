import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'topic',
    insertText: 'topic',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`string`\n\\\n\\\nKafka topic name if different from channel name.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.5.0']],
      },
    ],
  },
  {
    label: 'partitions',
    insertText: 'partitions',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nNumber of partitions configured on this topic (useful to know how many parallel consumers you may run).',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.5.0']],
      },
    ],
  },
  {
    label: 'replicas',
    insertText: 'replicas',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`integer`\n\\\n\\\nNumber of replicas configured on this topic.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.5.0']],
      },
    ],
  },
  {
    label: 'topicConfiguration',
    insertText: 'topicConfiguration',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Topic Configuration Object](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#topicConfiguration-object)\n\\\n\\\nTopic configuration properties that are relevant for the API.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.5.0']],
      },
    ],
  },
];

export default completion;
