import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'qos',
    insertText: 'qos',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `3`, `5`. `integer`\n\\\n\\\nDefines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'retain',
    insertText: 'retain',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `3`, `5`. `boolean`\n\\\n\\\nWhether the broker should retain the message or not.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'messageExpiryInterval',
    insertText: 'messageExpiryInterval',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nInterval in seconds or a *Schema Object* containing the definition of the lifetime of the message.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'messageExpiryInterval',
    insertText: 'messageExpiryInterval',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nInterval in seconds or a *Schema Object* containing the definition of the lifetime of the message.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'qos',
    label: '0',
    insertText: '0',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'qos',
    label: '1',
    insertText: '1',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'qos',
    label: '2',
    insertText: '2',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
