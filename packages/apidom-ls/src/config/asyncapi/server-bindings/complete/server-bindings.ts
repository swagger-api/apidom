import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const serverBindingsComplete: ApidomCompletionItem[] = [
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to a Server Bindings',
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
        '[HTTP Server Binding](https://github.com/asyncapi/bindings/blob/master/http#server)\n\n ---- \n\nProtocol-specific information for an HTTP server.',
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
        '[WebSockets Server Binding](https://github.com/asyncapi/bindings/blob/master/websockets#server)\n\n ---- \n\nProtocol-specific information for a WebSockets server.',
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
        '[Kafka Server Binding](https://github.com/asyncapi/bindings/blob/master/kafka#server)\n\n ---- \n\nProtocol-specific information for a Kafka server.',
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
        '[Anypoint MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#server)\n\n ---- \n\nProtocol-specific information for an Anypoint MQ server.\n',
    },
    targetSpecs: [{ namespace: 'asyncapi', version: '2.2.0' }],
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
        '[AMQP Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp#server)\n\n ---- \n\nProtocol-specific information for an AMQP 0-9-1 server.',
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
        '[AMQP 1.0 Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#server)\n\n ---- \n\nProtocol-specific information for an AMQP 1.0 server.',
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
        '[MQTT Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt#server)\n\n ---- \n\nProtocol-specific information for an MQTT server.',
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
        '[MQTT 5 Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#server)\n\n ---- \n\nProtocol-specific information for an MQTT 5 server.',
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
        '[NATS Server Binding](https://github.com/asyncapi/bindings/blob/master/nats#server)\n\n ---- \n\nProtocol-specific information for a NATS server.',
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
        '[JMS Server Binding](https://github.com/asyncapi/bindings/blob/master/jms#server)\n\n ---- \n\nProtocol-specific information for a JMS server.',
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
        '[SNS Server Binding](https://github.com/asyncapi/bindings/blob/master/sns#server)\n\n ---- \n\nProtocol-specific information for an SNS server.',
    },
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
        '[SQS Server Binding](https://github.com/asyncapi/bindings/blob/master/sqs#server)\n\n ---- \n\nProtocol-specific information for an SQS server.',
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
        '[STOMP Server Binding](https://github.com/asyncapi/bindings/blob/master/stomp#server)\n\n ---- \n\nProtocol-specific information for a STOMP server.',
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
        '[Redis Server Binding](https://github.com/asyncapi/bindings/blob/master/redis#server)\n\n ---- \n\nProtocol-specific information for a Redis server.',
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
        '[Mercure Server Binding](https://github.com/asyncapi/bindings/blob/master/mercure#server)\n\n ---- \n\nProtocol-specific information for a Mercure server.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
    ],
  },
  {
    label: 'ibmmq',
    insertText: 'ibmmq',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[IBM MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/ibmmq#server-binding-object)\n\n ---- \n\nProtocol-specific information for an IBM MQ server.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
    ],
  },
];

export default serverBindingsComplete;
