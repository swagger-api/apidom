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
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: '$ref',
    docs: 'A reference to an Operation Bindings',
  },
  {
    docs: '#### [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#operationBindingsObject)\n\nMap describing protocol-specific definitions for an operation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`http` | [HTTP Operation Binding](https://github.com/asyncapi/bindings/blob/master/http/README.md#operation) | Protocol-specific information for an HTTP operation.\n`ws` | [WebSockets Operation Binding](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#operation) | Protocol-specific information for a WebSockets operation.\n`kafka` | [Kafka Operation Binding](https://github.com/asyncapi/bindings/blob/master/kafka/README.md#operation) | Protocol-specific information for a Kafka operation.\n`anypointmq` | [Anypoint MQ Operation Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#operation) | Protocol-specific information for an Anypoint MQ operation.\n`amqp` | [AMQP Operation Binding](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#operation) | Protocol-specific information for an AMQP 0-9-1 operation.\n`amqp1` | [AMQP 1.0 Operation Binding](https://github.com/asyncapi/bindings/blob/master/amqp1/README.md#operation) | Protocol-specific information for an AMQP 1.0 operation.\n`mqtt` | [MQTT Operation Binding](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#operation) | Protocol-specific information for an MQTT operation.\n`mqtt5` | [MQTT 5 Operation Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5/README.md#operation) | Protocol-specific information for an MQTT 5 operation.\n`nats` | [NATS Operation Binding](https://github.com/asyncapi/bindings/blob/master/nats/README.md#operation) | Protocol-specific information for a NATS operation.\n`jms` | [JMS Operation Binding](https://github.com/asyncapi/bindings/blob/master/jms/README.md#operation) | Protocol-specific information for a JMS operation.\n`sns` | [SNS Operation Binding](https://github.com/asyncapi/bindings/blob/master/sns/README.md#operation) | Protocol-specific information for an SNS operation.\n`solace` | [Solace Operation Binding](https://github.com/asyncapi/bindings/blob/master/solace#operation) | Protocol-specific information for a Solace operation.\n`sqs` | [SQS Operation Binding](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#operation) | Protocol-specific information for an SQS operation.\n`stomp` | [STOMP Operation Binding](https://github.com/asyncapi/bindings/blob/master/stomp/README.md#operation) | Protocol-specific information for a STOMP operation.\n`redis` | [Redis Operation Binding](https://github.com/asyncapi/bindings/blob/master/redis#operation) | Protocol-specific information for a Redis operation.\n`mercure` | [Mercure Operation Binding](https://github.com/asyncapi/bindings/blob/master/mercure#operation) | Protocol-specific information for a Mercure operation.\n`googlepubsub` | [Google Cloud Pub/Sub Operation Binding](https://github.com/asyncapi/bindings/blob/master/googlepubsub#operation) | Protocol-specific information for a Google Cloud Pub/Sub operation.\n`ibmmq` | [IBM MQ Operation Binding](https://github.com/asyncapi/bindings/blob/master/ibmmq#operation-binding-object) | Protocol-specific information for an IBM MQ operation.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).',
  },
];
export default documentation;
