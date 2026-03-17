import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../../target-specs.ts';

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
        '[identifier](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#identifier)\n\\\nApplies to `Publish`, `Subscribe`.\n\\\n**Optional.** Often we can assume that the SNS Topic is the channel name-we provide this field in case you need to supply the ARN, or the Topic name is not the channel name in the AsyncAPI document.',
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
        '[[consumer](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#consumer)]\n\\\nApplies to `Publish`.\n\\\n**Required.** The protocols that listen to this topic and their endpoints.',
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
        '[deliveryPolicy](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#delivery-policy)\n\\\nApplies to `Subscribe`.\n\\\n**Optional.** Policy for retries to HTTP. The field is the default for HTTP receivers of the [SNS Topic](https://docs.aws.amazon.com/sns/latest/api/API_CreateTopic.html) which may be overridden by a specific consumer.',
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
