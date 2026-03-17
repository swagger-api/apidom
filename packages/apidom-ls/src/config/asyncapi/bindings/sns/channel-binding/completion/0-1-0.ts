import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\n\\\n**Required.** The name of the topic. Can be different from the channel name to allow flexibility around AWS resource naming limitations.',
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
    label: 'ordering',
    insertText: 'ordering',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '[ordering](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#ordering)\n\\\n\\\n**Optional.** By default, we assume an unordered SNS topic. This field allows configuration of a FIFO SNS Topic.\n\nField Name | Type | Description\n---|:---:|---\n`type` | string | **Required.** Defines the type of SNS Topic. Can be either standard or FIFO.\n`contentBasedDeduplication` | boolean | **Optional.** Whether the de-duplication of messages should be turned on. Defaults to `false`',
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
    label: 'policy',
    insertText: 'policy',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '[policy](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#policy)\n\\\n\\\n**Optional.** The security policy for the SNS Topic.\n\nField Name | Type | Description\n---|:---:|---\n`statements` | [[Statement](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#statement)] | **Required.** An array of Statement objects, each of which controls a permission for this topic',
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
    label: 'tags',
    insertText: 'tags',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '`object`\n\\\n\\\n**Optional.** Key-value pairs that represent AWS tags on the topic.',
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
