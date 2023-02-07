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
    docs: 'A reference to a Server Bindings',
  },
  {
    docs: '#### [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject)\n\nMap describing protocol-specific definitions for a server.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`http` | [HTTP Server Binding](https://github.com/asyncapi/bindings/blob/master/http#server) | Protocol-specific information for an HTTP server.\n`ws` | [WebSockets Server Binding](https://github.com/asyncapi/bindings/blob/master/websockets#server) | Protocol-specific information for a WebSockets server.\n`kafka` | [Kafka Server Binding](https://github.com/asyncapi/bindings/blob/master/kafka#server) | Protocol-specific information for a Kafka server.\n`anypointmq` | [Anypoint MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#server) | Protocol-specific information for an Anypoint MQ server.\n`amqp` | [AMQP Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp#server) | Protocol-specific information for an AMQP 0-9-1 server.\n`amqp1` | [AMQP 1.0 Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#server) | Protocol-specific information for an AMQP 1.0 server.\n`mqtt` | [MQTT Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt#server) | Protocol-specific information for an MQTT server.\n`mqtt5` | [MQTT 5 Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#server) | Protocol-specific information for an MQTT 5 server.\n`nats` | [NATS Server Binding](https://github.com/asyncapi/bindings/blob/master/nats#server) | Protocol-specific information for a NATS server.\n`jms` | [JMS Server Binding](https://github.com/asyncapi/bindings/blob/master/jms#server) | Protocol-specific information for a JMS server.\n`sns` | [SNS Server Binding](https://github.com/asyncapi/bindings/blob/master/sns#server) | Protocol-specific information for an SNS server.\n`solace` | [Solace Server Binding](https://github.com/asyncapi/bindings/blob/master/solace#server) | Protocol-specific information for a Solace server.\n`sqs` | [SQS Server Binding](https://github.com/asyncapi/bindings/blob/master/sqs#server) | Protocol-specific information for an SQS server.\n`stomp` | [STOMP Server Binding](https://github.com/asyncapi/bindings/blob/master/stomp#server) | Protocol-specific information for a STOMP server.\n`redis` | [Redis Server Binding](https://github.com/asyncapi/bindings/blob/master/redis#server) | Protocol-specific information for a Redis server.\n`mercure` | [Mercure Server Binding](https://github.com/asyncapi/bindings/blob/master/mercure#server) | Protocol-specific information for a Mercure server.\n`ibmmq` | [IBM MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/ibmmq#server-binding-object) | Protocol-specific information for an IBM MQ server.\n`googlepubsub` | [Google Cloud Pub/Sub Server Binding](https://github.com/asyncapi/bindings/blob/master/googlepubsub#server) | Protocol-specific information for a Google Cloud Pub/Sub server.\n`pulsar` | [Pulsar Server Binding](https://github.com/asyncapi/bindings/tree/master/pulsar#server-binding-object) | Protocol-specific information for a Pulsar server.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).',
  },
];
export default documentation;
