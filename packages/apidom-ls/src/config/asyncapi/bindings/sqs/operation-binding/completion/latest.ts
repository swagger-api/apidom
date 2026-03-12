import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'queues',
    insertText: 'queues',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Queue](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#queue)]\n\\\n\\\nQueue objects that are either the endpoint for an SNS Operation Binding Object, or the deadLetterQueue of the SQS Operation Binding Object.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
