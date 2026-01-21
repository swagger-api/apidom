import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

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
      value: 'A reference to a Server Bindings',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[HTTP Server Binding](https://github.com/asyncapi/bindings/blob/master/http#server)\n\\\n\\\nProtocol-specific information for an HTTP server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[WebSockets Server Binding](https://github.com/asyncapi/bindings/blob/master/websockets#server)\n\\\n\\\nProtocol-specific information for a WebSockets server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[Kafka Server Binding](https://github.com/asyncapi/bindings/blob/master/kafka#server)\n\\\n\\\nProtocol-specific information for a Kafka server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[Anypoint MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#server)\n\\\n\\\nProtocol-specific information for an Anypoint MQ server.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
      ...AsyncAPI3,
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
        '[AMQP Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp#server)\n\\\n\\\nProtocol-specific information for an AMQP 0-9-1 server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[AMQP 1.0 Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#server)\n\\\n\\\nProtocol-specific information for an AMQP 1.0 server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[MQTT Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt#server)\n\\\n\\\nProtocol-specific information for an MQTT server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[MQTT 5 Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#server)\n\\\n\\\nProtocol-specific information for an MQTT 5 server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[NATS Server Binding](https://github.com/asyncapi/bindings/blob/master/nats#server)\n\\\n\\\nProtocol-specific information for a NATS server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[JMS Server Binding](https://github.com/asyncapi/bindings/blob/master/jms#server)\n\\\n\\\nProtocol-specific information for a JMS server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[SNS Server Binding](https://github.com/asyncapi/bindings/blob/master/sns#server)\n\\\n\\\nProtocol-specific information for an SNS server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[Solace Server Binding](https://github.com/asyncapi/bindings/tree/master/solace#server-binding-object)\n\\\n\\\nProtocol-specific information for a Solace server.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
      ...AsyncAPI3,
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
        '[SQS Server Binding](https://github.com/asyncapi/bindings/blob/master/sqs#server)\n\\\n\\\nProtocol-specific information for an SQS server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[STOMP Server Binding](https://github.com/asyncapi/bindings/blob/master/stomp#server)\n\\\n\\\nProtocol-specific information for a STOMP server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[Redis Server Binding](https://github.com/asyncapi/bindings/blob/master/redis#server)\n\\\n\\\nProtocol-specific information for a Redis server.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[Mercure Server Binding](https://github.com/asyncapi/bindings/blob/master/mercure#server)\n\\\n\\\nProtocol-specific information for a Mercure server.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
      ...AsyncAPI3,
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
        '[IBM MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/ibmmq#server-binding-object)\n\\\n\\\nProtocol-specific information for an IBM MQ server.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
      ...AsyncAPI3,
    ],
  },
  {
    label: 'googlepubsub',
    insertText: 'googlepubsub',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Google Cloud Pub/Sub Server Binding](https://github.com/asyncapi/bindings/blob/master/googlepubsub#server)\n\\\n\\\nProtocol-specific information for a Google Cloud Pub/Sub server.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
      ...AsyncAPI3,
    ],
  },
  {
    label: 'pulsar',
    insertText: 'pulsar',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Pulsar Server Binding](https://github.com/asyncapi/bindings/tree/master/pulsar#server-binding-object)\n\\\n\\\nProtocol-specific information for a Pulsar server.',
    },
    targetSpecs: [{ namespace: 'asyncapi', version: '2.6.0' }, ...AsyncAPI3],
  },
];

export default completion;
