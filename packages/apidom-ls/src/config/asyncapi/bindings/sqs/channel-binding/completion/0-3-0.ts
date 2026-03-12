import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'queue',
    insertText: 'queue',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Queue](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#queue)\n\\\n\\\nA definition of the queue that will be used as the channel.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
      },
    ],
  },
  {
    label: 'deadLetterQueue',
    insertText: 'deadLetterQueue',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Queue](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#queue)\n\\\n\\\nA definition of the queue that will be used for un-processable messages.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.3.0']],
      },
    ],
  },
];

export default completion;
