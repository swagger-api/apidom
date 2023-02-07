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
      value: 'A reference to an Channel Bindings',
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
        '[HTTP Channel Binding](https://github.com/asyncapi/bindings/blob/master/http/#channel)\n\\\n\\\nProtocol-specific information for an HTTP channel.',
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
        '[WebSockets Channel Binding](https://github.com/asyncapi/bindings/blob/master/websockets#channel)\n\\\n\\\nProtocol-specific information for a WebSockets channel.',
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
        '[Kafka Channel Binding](https://github.com/asyncapi/bindings/blob/master/kafka#channel)\n\\\n\\\nProtocol-specific information for a Kafka channel.',
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
        '[Anypoint MQ Channel Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#channel)\n\\\n\\\nProtocol-specific information for an Anypoint MQ channel.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
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
        '[AMQP Channel Binding](https://github.com/asyncapi/bindings/blob/master/amqp#channel)\n\\\n\\\nProtocol-specific information for an AMQP 0-9-1 channel.',
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
        '[AMQP 1.0 Channel Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#channel)\n\\\n\\\nProtocol-specific information for an AMQP 1.0 channel.',
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
        '[MQTT Channel Binding](https://github.com/asyncapi/bindings/blob/master/mqtt#channel)\n\\\n\\\nProtocol-specific information for an MQTT channel.',
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
        '[MQTT 5 Channel Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#channel)\n\\\n\\\nProtocol-specific information for an MQTT 5 channel.',
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
        '[NATS Channel Binding](https://github.com/asyncapi/bindings/blob/master/nats#channel)\n\\\n\\\nProtocol-specific information for a NATS channel.',
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
        '[JMS Channel Binding](https://github.com/asyncapi/bindings/blob/master/jms#channel)\n\\\n\\\nProtocol-specific information for a JMS channel.',
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
        '[SNS Channel Binding](https://github.com/asyncapi/bindings/blob/master/sns#channel)\n\\\n\\\nProtocol-specific information for an SNS channel.',
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
        '[Solace Channel Binding](https://github.com/asyncapi/bindings/tree/master/solace#channel)\n\\\n\\\nProtocol-specific information for a Solace channel.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
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
        '[SQS Channel Binding](https://github.com/asyncapi/bindings/blob/master/sqs#channel)\n\\\n\\\nProtocol-specific information for an SQS channel.',
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
        '[STOMP Channel Binding](https://github.com/asyncapi/bindings/blob/master/stomp#channel)\n\\\n\\\nProtocol-specific information for a STOMP channel.',
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
        '[Redis Channel Binding](https://github.com/asyncapi/bindings/blob/master/redis#channel)\n\\\n\\\nProtocol-specific information for a Redis channel.',
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
        '[Mercure Channel Binding](https://github.com/asyncapi/bindings/blob/master/mercure#channel)\n\\\n\\\nProtocol-specific information for a Mercure channel.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
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
        '[IBM MQ Channel Binding](https://github.com/asyncapi/bindings/tree/master/ibmmq#channel)\n\\\n\\\nProtocol-specific information for an IBM MQ channel.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
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
        '[Google Cloud Pub/Sub Channel Binding](https://github.com/asyncapi/bindings/blob/master/googlepubsub/#channel)\n\\\n\\\nProtocol-specific information for a Google Cloud Pub/Sub channel.',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
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
        '[Pulsar Channel Binding](https://github.com/asyncapi/bindings/tree/master/pulsar#channel-binding-object)\n\\\n\\\n\tProtocol-specific information for a Pulsar channel.',
    },
    targetSpecs: [{ namespace: 'asyncapi', version: '2.6.0' }],
  },
];

export default completion;
