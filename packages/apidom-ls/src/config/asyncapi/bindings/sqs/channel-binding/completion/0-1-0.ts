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
        '[Queue](https://github.com/asyncapi/bindings/blob/85b00377193b8ffd3c8f565db25981bbd2e4dde9/sqs/README.md#queue)\n\\\n\\\nA definition of the queue that will be used as the channel.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
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
        '[Queue](https://github.com/asyncapi/bindings/blob/85b00377193b8ffd3c8f565db25981bbd2e4dde9/sqs/README.md#queue)\n\\\n\\\nA definition of the queue that will be used for un-processable messages.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
];

export default completion;
