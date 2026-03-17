import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'topic',
    insertText: 'topic',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '[identifier](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#identifier)\n\\\nApplies to `Publish`, `Subscribe`.\n\\\n**Optional.** Often we can assume that the SNS Topic is the channel name-we provide this field in case you need to supply the ARN, or the Topic name is not the channel name in the AsyncAPI document.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'topic',
    insertText: 'topic',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI3,
    documentation: {
      kind: 'markdown',
      value:
        '[identifier](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#identifier)\n\\\nApplies to `send`, `receive`.\n\\\n**Optional.** Often we can assume that the SNS Topic is the channel name-we provide this field in case you need to supply the ARN, or the Topic name is not the channel name in the AsyncAPI document.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'consumers',
    insertText: 'consumers',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '[[consumer](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#consumer)]\n\\\nApplies to `Publish`.\n\\\n**Required.** The protocols that listen to this topic and their endpoints.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'consumers',
    insertText: 'consumers',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI3,
    documentation: {
      kind: 'markdown',
      value:
        '[[consumer](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#consumer)]\n\\\nApplies to `receive`.\n\\\n**Required.** The protocols that listen to this topic and their endpoints.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'deliveryPolicy',
    insertText: 'deliveryPolicy',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '[deliveryPolicy](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#delivery-policy)\n\\\nApplies to `Subscribe`.\n\\\n**Optional.** Policy for retries to HTTP. The field is the default for HTTP receivers of the SNS Topic which may be overridden by a specific consumer.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'deliveryPolicy',
    insertText: 'deliveryPolicy',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI3,
    documentation: {
      kind: 'markdown',
      value:
        '[deliveryPolicy](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#delivery-policy)\n\\\nApplies to `send`.\n\\\n**Optional.** Policy for retries to HTTP. The field is the default for HTTP receivers of the SNS Topic which may be overridden by a specific consumer.',
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
