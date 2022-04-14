const messageBindingsDocs = [
  {
    target: '$ref',
    docs: 'A reference to a Message Bindings',
  },
  {
    target: 'http',
    docs: '[HTTP Message Binding](https://github.com/asyncapi/bindings/blob/master/http#message)\n\\\n\\\nProtocol-specific information for an HTTP message.',
  },
  {
    target: 'ws',
    docs: '[WebSockets Message Binding](https://github.com/asyncapi/bindings/blob/master/websockets#message)\n\\\n\\\nProtocol-specific information for a WebSockets message.',
  },
  {
    target: 'kafka',
    docs: '[Kafka Message Binding](https://github.com/asyncapi/bindings/blob/master/kafka#message)\n\\\n\\\nProtocol-specific information for a Kafka message.',
  },
  {
    target: 'anypointmq',
    docs: '[Anypoint MQ Message Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#message)\n\\\n\\\nProtocol-specific information for an Anypoint MQ message.',
  },
  {
    target: 'amqp',
    docs: '[AMQP Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp#message)\n\\\n\\\nProtocol-specific information for an AMQP 0-9-1 message.',
  },
  {
    target: 'amqp1',
    docs: '[AMQP 1.0 Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#message)\n\\\n\\\nProtocol-specific information for an AMQP 1.0 message.',
  },
  {
    target: 'mqtt',
    docs: '[MQTT Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt#message)\n\\\n\\\nProtocol-specific information for an MQTT message.',
  },
  {
    target: 'mqtt5',
    docs: '[MQTT 5 Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#message)\n\\\n\\\nProtocol-specific information for an MQTT 5 message.',
  },
  {
    target: 'nats',
    docs: '[NATS Message Binding](https://github.com/asyncapi/bindings/blob/master/nats#message)\n\\\n\\\nProtocol-specific information for a NATS message.',
  },
  {
    target: 'jms',
    docs: '[JMS Message Binding](https://github.com/asyncapi/bindings/blob/master/jms#message)\n\\\n\\\nProtocol-specific information for a JMS message.',
  },
  {
    target: 'sns',
    docs: '[SNS Message Binding](https://github.com/asyncapi/bindings/blob/master/sns#message)\n\\\n\\\nProtocol-specific information for an SNS message.',
  },
  {
    target: 'solace',
    docs: '[Solace Message Binding](https://github.com/asyncapi/bindings/blob/master/solace#message)\n\\\n\\\nProtocol-specific information for a Solace message.',
  },
  {
    target: 'sqs',
    docs: '[SQS Message Binding](https://github.com/asyncapi/bindings/blob/master/sqs#message)\n\\\n\\\nProtocol-specific information for an SQS message.',
  },
  {
    target: 'stomp',
    docs: '[STOMP Message Binding](https://github.com/asyncapi/bindings/blob/master/stomp#message)\n\\\n\\\nProtocol-specific information for a STOMP message.',
  },
  {
    target: 'redis',
    docs: '[Redis Message Binding](https://github.com/asyncapi/bindings/blob/master/redis#message)\n\\\n\\\nProtocol-specific information for a Redis message.',
  },
  {
    target: 'mercure',
    docs: '[Mercure Message Binding](https://github.com/asyncapi/bindings/blob/master/mercure#message)\n\\\n\\\nProtocol-specific information for a Mercure message.',
  },
  {
    target: 'ibmmq',
    docs: '[IBM MQ Message Binding](https://github.com/asyncapi/bindings/blob/master/ibmmq#message-binding-object)\n\\\n\\\nProtocol-specific information for an IBM MQ message.',
  },
  {
    docs: '#### [Message Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageBindingsObject)\n\nMap describing protocol-specific definitions for a message.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`http` | [HTTP Message Binding](https://github.com/asyncapi/bindings/blob/master/http/README.md#message) | Protocol-specific information for an HTTP message, i.e., a request or a response.\n`ws` | [WebSockets Message Binding](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#message) | Protocol-specific information for a WebSockets message.\n`kafka` | [Kafka Message Binding](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#message) | Protocol-specific information for a Kafka message.\n`anypointmq` | [Anypoint MQ Message Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#message) | Protocol-specific information for an Anypoint MQ message.\n`amqp` | [AMQP Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#message) | Protocol-specific information for an AMQP 0-9-1 message.\n`amqp1` | [AMQP 1.0 Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp1/README.md#message) | Protocol-specific information for an AMQP 1.0 message.\n`mqtt` | [MQTT Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#message) | Protocol-specific information for an MQTT message.\n`mqtt5` | [MQTT 5 Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5/README.md#message) | Protocol-specific information for an MQTT 5 message.\n`nats` | [NATS Message Binding](https://github.com/asyncapi/bindings/blob/master/nats/README.md#message) | Protocol-specific information for a NATS message.\n`jms` | [JMS Message Binding](https://github.com/asyncapi/bindings/blob/master/jms/README.md#message) | Protocol-specific information for a JMS message.\n`sns` | [SNS Message Binding](https://github.com/asyncapi/bindings/blob/master/sns/README.md#message) | Protocol-specific information for an SNS message.\n`solace` | [Solace Server Binding](https://github.com/asyncapi/bindings/blob/master/solace#message) | Protocol-specific information for a Solace message.\n`sqs` | [SQS Message Binding](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#message) | Protocol-specific information for an SQS message.\n`stomp` | [STOMP Message Binding](https://github.com/asyncapi/bindings/blob/master/stomp/README.md#message) | Protocol-specific information for a STOMP message.\n`redis` | [Redis Message Binding](https://github.com/asyncapi/bindings/blob/master/redis#message) | Protocol-specific information for a Redis message.\n`mercure` | [Mercure Message Binding](https://github.com/asyncapi/bindings/blob/master/mercure#message) | Protocol-specific information for a Mercure message.\n`ibmmq` | [IBM MQ Message Binding](https://github.com/asyncapi/bindings/tree/master/ibmmq#message-binding-object) | Protocol-specific information for an IBM MQ message.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions).',
  },
];
export default messageBindingsDocs;
