import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to an Operation Bindings',
    },
  },
  {
    label: 'http',
    insertText: 'http',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[HTTP Operation Binding](https://github.com/asyncapi/bindings/blob/master/http#operation)\n\\\n\\\nProtocol-specific information for an HTTP operation.',
    },
  },
  {
    label: 'ws',
    insertText: 'ws',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[WebSockets Operation Binding](https://github.com/asyncapi/bindings/blob/master/websockets#operation)\n\\\n\\\nProtocol-specific information for a WebSockets operation.',
    },
  },
  {
    label: 'kafka',
    insertText: 'kafka',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Kafka Operation Binding](https://github.com/asyncapi/bindings/blob/master/kafka#operation)\n\\\n\\\nProtocol-specific information for a Kafka operation.',
    },
  },
  {
    label: 'anypointmq',
    insertText: 'anypointmq',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Anypoint MQ Operation Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#operation)\n\\\n\\\nProtocol-specific information for an Anypoint MQ operation.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
    ],
  },
  {
    label: 'amqp',
    insertText: 'amqp',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[AMQP Operation Binding](https://github.com/asyncapi/bindings/blob/master/amqp#operation)\n\\\n\\\nProtocol-specific information for an AMQP 0-9-1 operation.',
    },
  },
  {
    label: 'amqp1',
    insertText: 'amqp1',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[AMQP 1.0 Operation Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#operation)\n\\\n\\\nProtocol-specific information for an AMQP 1.0 operation.',
    },
  },
  {
    label: 'mqtt',
    insertText: 'mqtt',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[MQTT Operation Binding](https://github.com/asyncapi/bindings/blob/master/mqtt#operation)\n\\\n\\\nProtocol-specific information for an MQTT operation.',
    },
  },
  {
    label: 'mqtt5',
    insertText: 'mqtt5',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[MQTT 5 Operation Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#operation)\n\\\n\\\nProtocol-specific information for an MQTT 5 operation.',
    },
  },
  {
    label: 'nats',
    insertText: 'nats',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[NATS Operation Binding](https://github.com/asyncapi/bindings/blob/master/nats#operation)\n\\\n\\\nProtocol-specific information for a NATS operation.',
    },
  },
  {
    label: 'jms',
    insertText: 'jms',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[JMS Operation Binding](https://github.com/asyncapi/bindings/blob/master/jms#operation)\n\\\n\\\nProtocol-specific information for a JMS operation.',
    },
  },
  {
    label: 'sns',
    insertText: 'sns',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[SNS Operation Binding](https://github.com/asyncapi/bindings/blob/master/sns#operation)\n\\\n\\\nProtocol-specific information for an SNS operation.',
    },
  },
  {
    label: 'solace',
    insertText: 'solace',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Solace Operation Binding](https://github.com/asyncapi/bindings/tree/master/solace#operation-binding-object)\n\\\n\\\nProtocol-specific information for a Solace operation.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
    ],
  },
  {
    label: 'sqs',
    insertText: 'sqs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[SQS Operation Binding](https://github.com/asyncapi/bindings/blob/master/sqs#operation)\n\\\n\\\nProtocol-specific information for an SQS operation.',
    },
  },
  {
    label: 'stomp',
    insertText: 'stomp',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[STOMP Operation Binding](https://github.com/asyncapi/bindings/blob/master/stomp#operation)\n\\\n\\\nProtocol-specific information for a STOMP operation.',
    },
  },
  {
    label: 'redis',
    insertText: 'redis',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Redis Operation Binding](https://github.com/asyncapi/bindings/blob/master/redis#operation)\n\\\n\\\nProtocol-specific information for a Redis operation.',
    },
  },
  {
    label: 'mercure',
    insertText: 'mercure',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Mercure Operation Binding](https://github.com/asyncapi/bindings/blob/master/mercure#operation)\n\\\n\\\nProtocol-specific information for a Mercure operation.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
    ],
  },
];

export default completion;
