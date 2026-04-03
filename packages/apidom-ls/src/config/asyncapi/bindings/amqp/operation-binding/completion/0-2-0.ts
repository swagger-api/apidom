import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'expiration',
    insertText: 'expiration',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\nApplies to `publish, subscribe`.\n\\\nTTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'expiration',
    insertText: 'expiration',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\nApplies to `receive, send`.\n\\\nTTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'userId',
    insertText: 'userId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\nApplies to `publish, subscribe`.\n\\\nIdentifies the user who has sent the message.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'userId',
    insertText: 'userId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\nApplies to `receive, send`.\n\\\nIdentifies the user who has sent the message.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'cc',
    insertText: 'cc',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`[string]`\n\\\nApplies to `publish, subscribe`.\n\\\nThe routing keys the message should be routed to at the time of publishing.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'cc',
    insertText: 'cc',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`[string]`\n\\\nApplies to `receive, send`.\n\\\nThe routing keys the message should be routed to at the time of publishing.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'priority',
    insertText: 'priority',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`integer`\n\\\nApplies to `publish, subscribe`.\n\\\nA priority for the message.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'priority',
    insertText: 'priority',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`integer`\n\\\nApplies to `receive, send`.\n\\\nA priority for the message.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'deliveryMode',
    insertText: 'deliveryMode',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\nApplies to `publish, subscribe`.\n\\\nDelivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'deliveryMode',
    insertText: 'deliveryMode',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\nApplies to `receive, send`.\n\\\nDelivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'mandatory',
    insertText: 'mandatory',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`boolean`\n\\\nApplies to `publish`.\n\\\nWhether the message is mandatory or not.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'mandatory',
    insertText: 'mandatory',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`boolean`\n\\\nApplies to `receive`.\n\\\nWhether the message is mandatory or not.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'bcc',
    insertText: 'bcc',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`[string]`\n\\\nApplies to `publish`.\n\\\nLike cc but consumers will not receive this information.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'bcc',
    insertText: 'bcc',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`[string]`\n\\\nApplies to `receive`.\n\\\nLike cc but consumers will not receive this information.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'replyTo',
    insertText: 'replyTo',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\nApplies to `publish, subscribe`.\n\\\nName of the queue where the consumer should send the response.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'replyTo',
    insertText: 'replyTo',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\nApplies to `receive, send`.\n\\\nName of the queue where the consumer should send the response.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'timestamp',
    insertText: 'timestamp',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\nApplies to `publish, subscribe`.\n\\\nWhether the message should include a timestamp or not.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'timestamp',
    insertText: 'timestamp',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\nApplies to `receive, send`.\n\\\nWhether the message should include a timestamp or not.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'ack',
    insertText: 'ack',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\nApplies to `subscribe`.\n\\\nWhether the consumer should ack the message or not.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'ack',
    insertText: 'ack',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\nApplies to `send`.\n\\\nWhether the consumer should ack the message or not.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'bindingVersion',
    insertText: 'bindingVersion',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.3.0" MUST be assumed.',
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
    target: 'deliveryMode',
    label: '1',
    insertText: '1',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    target: 'deliveryMode',
    label: '2',
    insertText: '2',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
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
