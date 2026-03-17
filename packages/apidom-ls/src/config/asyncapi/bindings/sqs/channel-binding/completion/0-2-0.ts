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
        '[Queue](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sqs/README.md#queue)\n\\\n\\\n**Required.** A definition of the queue that will be used as the channel.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
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
        '[Queue](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sqs/README.md#queue)\n\\\n\\\n**Optional.** A definition of the queue that will be used for un-processable messages.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
];

export default completion;
