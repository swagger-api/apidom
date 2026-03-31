import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'clientId',
    insertText: 'clientId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'MQTT Version `3`, `5`. The client identifier.',
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
    label: 'cleanSession',
    insertText: 'cleanSession',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `3`, `5`. `boolean`\n\\\n\\\nWhether to create a persistent connection or not. When `false`, the connection will be persistent. This is called **clean start** in MQTTv5.',
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
    label: 'lastWill',
    insertText: 'lastWill',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'MQTT Version `3`, `5`. `object`\n\\\n\\\nLast Will and Testament configuration.',
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
    label: 'keepAlive',
    insertText: 'keepAlive',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `3`, `5`. `integer`\n\\\n\\\nInterval in seconds of the longest period of time the broker and the client can endure without sending a message.',
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
    label: 'sessionExpiryInterval',
    insertText: 'sessionExpiryInterval',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nInterval in seconds or a *Schema Object* containing the definition of the interval. The broker maintains a session for a disconnected client until this interval expires.',
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
    label: 'sessionExpiryInterval',
    insertText: 'sessionExpiryInterval',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nInterval in seconds or a *Schema Object* containing the definition of the interval. The broker maintains a session for a disconnected client until this interval expires.',
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
    label: 'maximumPacketSize',
    insertText: 'maximumPacketSize',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nNumber of bytes or a *Schema Object* representing the maximum packet size the client is willing to accept.',
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
    label: 'maximumPacketSize',
    insertText: 'maximumPacketSize',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MQTT Version `5`. `integer` \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nNumber of bytes or a *Schema Object* representing the maximum packet size the client is willing to accept.',
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
];

export default completion;
