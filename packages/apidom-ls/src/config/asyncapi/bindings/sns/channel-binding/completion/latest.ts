import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\n\\\n**Required.** The name of the topic. Can be different from the channel name to allow flexibility around AWS resource naming limitations.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
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
        '[ordering](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#ordering)\n\\\n\\\n**Optional.** By default, we assume an unordered SNS topic. This field allows configuration of a FIFO SNS Topic.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
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
    targetSpecs: AsyncAPI3,
    documentation: {
      kind: 'markdown',
      value:
        '[ordering](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#ordering)\n\\\n\\\n**Optional.** By default, we assume an unordered SNS topic. This field allows configuration of a FIFO SNS Topic.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
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
        '[policy](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#policy)\n\\\n\\\n**Optional.** The security policy for the SNS Topic.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
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
    targetSpecs: AsyncAPI3,
    documentation: {
      kind: 'markdown',
      value:
        '[policy](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#policy)\n\\\n\\\n**Optional.** The security policy for the SNS Topic.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
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
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
    documentation: {
      kind: 'markdown',
      value:
        '`object`\n\\\n\\\n**Optional.** Key-value pairs that represent AWS tags on the topic.',
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
