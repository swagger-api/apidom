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
    docs: 'A reference to an Channel Bindings',
  },
  {
    docs: '#### [Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelBindingsObject)\n\nMap describing protocol-specific definitions for a channel.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`http` | [HTTP Channel Binding](https://github.com/asyncapi/bindings/blob/master/http/README.md#channel) | Protocol-specific information for an HTTP channel.\n`ws` | [WebSockets Channel Binding](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#channel) | Protocol-specific information for a WebSockets channel.\n`kafka` | [Kafka Channel Binding](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#channel) | Protocol-specific information for a Kafka channel.\n`anypointmq` | [Anypoint MQ Channel Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#channel) | Protocol-specific information for an Anypoint MQ channel.\n`amqp` | [AMQP Channel Binding](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#channel) | Protocol-specific information for an AMQP 0-9-1 channel.\n`amqp1` | [AMQP 1.0 Channel Binding](https://github.com/asyncapi/bindings/blob/master/amqp1/README.md#channel) | Protocol-specific information for an AMQP 1.0 channel.\n`mqtt` | [MQTT Channel Binding](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#channel) | Protocol-specific information for an MQTT channel.\n`mqtt5` | [MQTT 5 Channel Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#channel) | Protocol-specific information for an MQTT 5 channel.\n`nats` | [NATS Channel Binding](https://github.com/asyncapi/bindings/blob/master/nats/README.md#channel) | Protocol-specific information for a NATS channel.\n`jms` | [JMS Channel Binding](https://github.com/asyncapi/bindings/blob/master/jms/README.md#channel) | Protocol-specific information for a JMS channel.\n`sns` | [SNS Channel Binding](https://github.com/asyncapi/bindings/blob/master/sns/README.md#channel) | Protocol-specific information for an SNS channel.\n`solace` | [Solace Channel Binding](https://github.com/asyncapi/bindings/blob/master/solace#channel) | Protocol-specific information for a Solace channel.\n`sqs` | [SQS Channel Binding](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#channel) | Protocol-specific information for an SQS channel.\n`stomp` | [STOMP Channel Binding](https://github.com/asyncapi/bindings/blob/master/stomp/README.md#channel) | Protocol-specific information for a STOMP channel.\n`redis` | [Redis Channel Binding](https://github.com/asyncapi/bindings/blob/master/redis#channel) | Protocol-specific information for a Redis channel.\n`mercure` | [Mercure Channel Binding](https://github.com/asyncapi/bindings/blob/master/mercure#channel) | Protocol-specific information for a Mercure channel.\n`ibmmq` | [IBM MQ Channel Binding](https://github.com/asyncapi/bindings/tree/master/ibmmq#channel-binding-object) | Protocol-specific information for an IBM MQ channel.\n`googlepubsub` | [Google Cloud Pub/Sub Channel Binding](https://github.com/asyncapi/bindings/tree/master/googlepubsub#channel) | Protocol-specific information for a Google Cloud Pub/Sub channel.\n`pulsar` | [Pulsar Channel Binding](https://github.com/asyncapi/bindings/tree/master/pulsar#channel-binding-object) | Protocol-specific information for a Pulsar channel.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).',
  },
];
export default documentation;
