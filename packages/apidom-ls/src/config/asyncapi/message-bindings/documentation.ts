/**
 * Omitted fixed fields:
 *  - http
 *  - ws
 *  - kafka
 *  - anypointmq
 *  - amqp
 *  - amqp1
 *  - mqtt
 *  - mqtt5
 *  - nats
 *  - jms
 *  - sns
 *  - solace
 *  - sqs
 *  - stomp
 *  - redis
 *  - mercure
 *  - ibmmq
 *  - googlepubsub
 *  - pulsar
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: '$ref',
    docs: 'A reference to a Message Bindings',
  },
  {
    docs: '#### [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject)\n\nMap describing protocol-specific definitions for a message.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`http` | [HTTP Message Binding](https://github.com/asyncapi/bindings/blob/master/http/README.md#message) | Protocol-specific information for an HTTP message, i.e., a request or a response.\n`ws` | [WebSockets Message Binding](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#message) | Protocol-specific information for a WebSockets message.\n`kafka` | [Kafka Message Binding](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#message) | Protocol-specific information for a Kafka message.\n`anypointmq` | [Anypoint MQ Message Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#message) | Protocol-specific information for an Anypoint MQ message.\n`amqp` | [AMQP Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#message) | Protocol-specific information for an AMQP 0-9-1 message.\n`amqp1` | [AMQP 1.0 Message Binding](https://github.com/asyncapi/bindings/blob/master/amqp1/README.md#message) | Protocol-specific information for an AMQP 1.0 message.\n`mqtt` | [MQTT Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#message) | Protocol-specific information for an MQTT message.\n`mqtt5` | [MQTT 5 Message Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5/README.md#message) | Protocol-specific information for an MQTT 5 message.\n`nats` | [NATS Message Binding](https://github.com/asyncapi/bindings/blob/master/nats/README.md#message) | Protocol-specific information for a NATS message.\n`jms` | [JMS Message Binding](https://github.com/asyncapi/bindings/blob/master/jms/README.md#message) | Protocol-specific information for a JMS message.\n`sns` | [SNS Message Binding](https://github.com/asyncapi/bindings/blob/master/sns/README.md#message) | Protocol-specific information for an SNS message.\n`solace` | [Solace Server Binding](https://github.com/asyncapi/bindings/blob/master/solace#message) | Protocol-specific information for a Solace message.\n`sqs` | [SQS Message Binding](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#message) | Protocol-specific information for an SQS message.\n`stomp` | [STOMP Message Binding](https://github.com/asyncapi/bindings/blob/master/stomp/README.md#message) | Protocol-specific information for a STOMP message.\n`redis` | [Redis Message Binding](https://github.com/asyncapi/bindings/blob/master/redis#message) | Protocol-specific information for a Redis message.\n`mercure` | [Mercure Message Binding](https://github.com/asyncapi/bindings/blob/master/mercure#message) | Protocol-specific information for a Mercure message.\n`ibmmq` | [IBM MQ Message Binding](https://github.com/asyncapi/bindings/tree/master/ibmmq#message-binding-object) | Protocol-specific information for an IBM MQ message.\n`googlepubsub` | [Google Cloud Pub/Sub Message Binding](https://github.com/asyncapi/bindings/tree/master/googlepubsub#message) | Protocol-specific information for a Google Cloud Pub/Sub message.\n`pulsar` | [Pulsar Message Binding](https://github.com/asyncapi/bindings/tree/master/pulsar#message-binding-fields) | Protocol-specific information for a Pulsar message.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).',
  },
];
export default documentation;
