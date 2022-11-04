import ApilintCodes from '../codes';
/**
 * AsyncApi >= 2.0.0 <=2.5.0 specification metas.
 */
import asyncapi2Meta from './asyncapi2/meta';
import asyncapiVersionMeta from './async-api-version/meta';
import meta from '../common/schema/meta';
import identifierMeta from './identifier/meta';
import defaultContentTypeMeta from './default-content-type/meta';
import securitySchemeMeta from './security-scheme/meta';
import infoMeta from './info/meta';
import contactMeta from './contact/meta';
import channelItemMeta from './channel-item/meta';
import channelBindingsMeta from './channel-bindings/meta';
import serversMeta from './servers/meta';
import externalDocsMeta from './external-documentation/meta';
import licenseMeta from './license/meta';
import serverMeta from './server/meta';
import securityRequirementMeta from './security-requirement/meta';
import serverVariableMeta from './server-variable/meta';
import channelsMeta from './channels/meta';
import parametersMeta from './parameters/meta';
import parameterMeta from './parameter/meta';
import operationMeta from './operation/meta';
import operationBindingsMeta from './operation-bindings/meta';
import operationTraitMeta from './operation-trait/meta';
import serverBindingsMeta from './server-bindings/meta';
import messageBindingsMeta from './message-bindings/meta';
import messageMeta from './message/meta';
import messageTraitMeta from './message-trait/meta';
import messageExampleMeta from './message-example/meta';
import componentsMeta from './components/meta';
import tagsMeta from './tags/meta';
import tagMeta from './tag/meta';
import correlationIDMeta from './correlation-ID/meta';
import oAuthFlowsMeta from './oauth-flows/meta';
import oAuthFlowMeta from './oauth-flow/meta';
/**
 * Binding metas.
 */
// AMQP 0-9-1
import amqpChannelBindingMeta from './bindings/amqp/channel-binding/meta';
import amqpMessageBindingMeta from './bindings/amqp/message-binding/meta';
import amqpOperationBindingMeta from './bindings/amqp/operation-binding/meta';
import amqpServerBindingMeta from './bindings/amqp/server-binding/meta';
// AMQP 1.0
import amqp1ChannelBindingMeta from './bindings/amqp1/channel-binding/meta';
import amqp1MessageBindingMeta from './bindings/amqp1/message-binding/meta';
import amqp1OperationBindingMeta from './bindings/amqp1/operation-binding/meta';
import amqp1ServerBindingMeta from './bindings/amqp1/server-binding/meta';
// Anypoint MQ
import anypointmqChannelBindingMeta from './bindings/anypointmq/channel-binding/meta';
import anypointmqMessageBindingMeta from './bindings/anypointmq/message-binding/meta';
import anypointmqOperationBindingMeta from './bindings/anypointmq/operation-binding/meta';
import anypointmqServerBidingMeta from './bindings/anypointmq/server-binding/meta';
// Google Cloud Pub/Sub
import googlepubsubChannelBindingMeta from './bindings/googlepubsub/channel-binding/meta';
import googlepubsubMessageBindingMeta from './bindings/googlepubsub/message-binding/meta';
import googlepubsubOperationBindingMeta from './bindings/googlepubsub/operation-binding/meta';
// HTTP
import httpChannelBindingMeta from './bindings/http/channel-binding/meta';
import httpMessageBindingMeta from './bindings/http/message-binding/meta';
import httpOperationBindingMeta from './bindings/http/operation-binding/meta';
import httpServerBindingMeta from './bindings/http/server-binding/meta';
// IBM MQ
import ibmmqChannelBindingMeta from './bindings/ibmmq/channel-binding/meta';
import ibmmqMessageBindingMeta from './bindings/ibmmq/message-binding/meta';
import ibmmqOperationBindingMeta from './bindings/ibmmq/operation-binding/meta';
import ibmmqServerBindingMeta from './bindings/ibmmq/server-binding/meta';
// JMS
import jmsChannelBindingMeta from './bindings/jms/channel-binding/meta';
import jmsMessageBindingMeta from './bindings/jms/message-binding/meta';
import jmsOperationBindingMeta from './bindings/jms/operation-binding/meta';
import jmsServerBindingMeta from './bindings/jms/server-binding/meta';
// Kafka
import kafkaChannelBindingMeta from './bindings/kafka/channel-binding/meta';
import kafkaMessageBindingMeta from './bindings/kafka/message-binding/meta';
import kafkaOperationBindingMeta from './bindings/kafka/operation-binding/meta';
import kafkaServerBindingMeta from './bindings/kafka/server-binding/meta';
// Mercure
import mercureChannelBindingMeta from './bindings/mercure/channel-binding/meta';
import mercureMessageBindingMeta from './bindings/mercure/message-binding/meta';
import mercureOperationBindingMeta from './bindings/mercure/operation-binding/meta';
import mercureServerBindingMeta from './bindings/mercure/server-binding/meta';
// MQTT
import mqttChannelBindingMeta from './bindings/mqtt/channel-binding/meta';
import mqttMessageBindingMeta from './bindings/mqtt/message-binding/meta';
import mqttOperationBindingMeta from './bindings/mqtt/operation-binding/meta';
import mqttServerBindingMeta from './bindings/mqtt/server-binding/meta';
// MQTT 5
import mqtt5ChannelBindingMeta from './bindings/mqtt5/channel-binding/meta';
import mqtt5MessageBindingMeta from './bindings/mqtt5/message-binding/meta';
import mqtt5OperationBindingMeta from './bindings/mqtt5/operation-binding/meta';
import mqtt5ServerBindingMeta from './bindings/mqtt5/server-binding/meta';
// NATS
import natsChannelBindingMeta from './bindings/nats/channel-binding/meta';
import natsMessageBindingMeta from './bindings/nats/message-binding/meta';
import natsOperationBindingMeta from './bindings/nats/operation-binding/meta';
import natsServerBindingMeta from './bindings/nats/server-binding/meta';
// Redis
import redisChannelBindingMeta from './bindings/redis/channel-binding/meta';
import redisMessageBindingMeta from './bindings/redis/message-binding/meta';
import redisOperationBindingMeta from './bindings/redis/operation-binding/meta';
import redisServerBindingMeta from './bindings/redis/server-binding/meta';
// SNS
import snsChannelBindingMeta from './bindings/sns/channel-binding/meta';
import snsMessageBindingMeta from './bindings/sns/message-binding/meta';
import snsOperationBindingMeta from './bindings/sns/operation-binding/meta';
import snsServerBindingMeta from './bindings/sns/server-binding/meta';
// Solace
import solaceChannelBindingMeta from './bindings/solace/channel-binding/meta';
import solaceMessageBindingMeta from './bindings/solace/message-binding/meta';
import solaceOperationBindingMeta from './bindings/solace/operation-binding/meta';
import solaceServerBindingMeta from './bindings/solace/server-binding/meta';
// SQS
import sqsChannelBindingMeta from './bindings/sqs/channel-binding/meta';
import sqsMessageBindingMeta from './bindings/sqs/message-binding/meta';
import sqsOperationBindingMeta from './bindings/sqs/operation-binding/meta';
import sqsServerBindingMeta from './bindings/sqs/server-binding/meta';
// STOMP
import stompChannelBindingMeta from './bindings/stomp/channel-binding/meta';
import stompMessageBindingMeta from './bindings/stomp/message-binding/meta';
import stompOperationBindingMeta from './bindings/stomp/operation-binding/meta';
import stompServerBindingMeta from './bindings/stomp/server-binding/meta';
// WebSocket
import webSocketChannelBindingMeta from './bindings/ws/channel-binding/meta';
import webSocketMessageBindingMeta from './bindings/ws/message-binding/meta';
import webSocketOperationBindingMeta from './bindings/ws/operation-binding/meta';
import webSocketServerBindingMeta from './bindings/ws/server-binding/meta';

/**
 * Keys in this object represents either element type names
 * or value of one of the meta classes.
 */

export default {
  '*': {
    lint: [
      {
        code: ApilintCodes.DUPLICATE_KEYS,
        source: 'apilint',
        message: 'an object cannot contain duplicate keys',
        severity: 1,
        linterFunction: 'apilintNoDuplicateKeys',
        marker: 'key',
      },
    ],
  },
  /**
   * AsyncApi >= 2.0.0 <=2.5.0 specification metas.
   */
  identifier: identifierMeta,
  defaultContentType: defaultContentTypeMeta,
  info: infoMeta,
  contact: contactMeta,
  license: licenseMeta,
  operation: operationMeta,
  operationBindings: operationBindingsMeta,
  operationTrait: operationTraitMeta,
  channelItem: channelItemMeta,
  channelBindings: channelBindingsMeta,
  channels: channelsMeta,
  asyncApi2: asyncapi2Meta,
  asyncApiVersion: asyncapiVersionMeta,
  parameters: parametersMeta,
  parameter: parameterMeta,
  schema: meta,
  securityScheme: securitySchemeMeta,
  securityRequirement: securityRequirementMeta,
  servers: serversMeta,
  server: serverMeta,
  serverVariable: serverVariableMeta,
  externalDocumentation: externalDocsMeta,
  serverBindings: serverBindingsMeta,
  messageBindings: messageBindingsMeta,
  message: messageMeta,
  messageTrait: messageTraitMeta,
  messageExample: messageExampleMeta,
  components: componentsMeta,
  tags: tagsMeta,
  tag: tagMeta,
  correlationID: correlationIDMeta,
  oAuthFlows: oAuthFlowsMeta,
  oAuthFlow: oAuthFlowMeta,
  /**
   * Binding metas.
   */
  // AMQP 0-9-1
  amqpChannelBinding: amqpChannelBindingMeta,
  amqpMessageBinding: amqpMessageBindingMeta,
  amqpOperationBinding: amqpOperationBindingMeta,
  amqpServerBinding: amqpServerBindingMeta,
  // AMQP 1.0
  amqp1ChannelBinding: amqp1ChannelBindingMeta,
  amqp1MessageBinding: amqp1MessageBindingMeta,
  amqp1OperationBinding: amqp1OperationBindingMeta,
  amqp1ServerBinding: amqp1ServerBindingMeta,
  // Anypoint MQ
  anypointmqChannelBinding: anypointmqChannelBindingMeta,
  anypointmqMessageBinding: anypointmqMessageBindingMeta,
  anypointmqOperationBinding: anypointmqOperationBindingMeta,
  anypointmqServerBiding: anypointmqServerBidingMeta,
  // Google Cloud Pub/Sub
  googlepubsubChannelBinding: googlepubsubChannelBindingMeta,
  googlepubsubMessageBinding: googlepubsubMessageBindingMeta,
  googlepubsubOperationBinding: googlepubsubOperationBindingMeta,
  // HTTP
  httpChannelBinding: httpChannelBindingMeta,
  httpMessageBinding: httpMessageBindingMeta,
  httpOperationBinding: httpOperationBindingMeta,
  httpServerBinding: httpServerBindingMeta,
  // IMB MQ
  ibmmqChannelBinding: ibmmqChannelBindingMeta,
  ibmmqMessageBinding: ibmmqMessageBindingMeta,
  ibmmqOperationBinding: ibmmqOperationBindingMeta,
  ibmmqServerBinding: ibmmqServerBindingMeta,
  // JMS
  jmsChannelBinding: jmsChannelBindingMeta,
  jmsMessageBinding: jmsMessageBindingMeta,
  jmsOperationBinding: jmsOperationBindingMeta,
  jmsServerBinding: jmsServerBindingMeta,
  // Kafka
  kafkaChannelBinding: kafkaChannelBindingMeta,
  kafkaMessageBinding: kafkaMessageBindingMeta,
  kafkaOperationBinding: kafkaOperationBindingMeta,
  kafkaServerBinding: kafkaServerBindingMeta,
  // Mercure
  mercureChannelBinding: mercureChannelBindingMeta,
  mercureMessageBinding: mercureMessageBindingMeta,
  mercureOperationBinding: mercureOperationBindingMeta,
  mercureServerBinding: mercureServerBindingMeta,
  // MQTT
  mqttChannelBinding: mqttChannelBindingMeta,
  mqttMessageBinding: mqttMessageBindingMeta,
  mqttOperationBinding: mqttOperationBindingMeta,
  mqttServerBinding: mqttServerBindingMeta,
  // MQTT 5
  mqtt5ChannelBinding: mqtt5ChannelBindingMeta,
  mqtt5MessageBinding: mqtt5MessageBindingMeta,
  mqtt5OperationBinding: mqtt5OperationBindingMeta,
  mqtt5ServerBinding: mqtt5ServerBindingMeta,
  // NATS
  natsChannelBinding: natsChannelBindingMeta,
  natsMessageBinding: natsMessageBindingMeta,
  natsOperationBinding: natsOperationBindingMeta,
  natsServerBinding: natsServerBindingMeta,
  // Redis
  redisChannelBinding: redisChannelBindingMeta,
  redisMessageBinding: redisMessageBindingMeta,
  redisOperationBinding: redisOperationBindingMeta,
  redisServerBinding: redisServerBindingMeta,
  // SNS
  snsChannelBinding: snsChannelBindingMeta,
  snsMessageBinding: snsMessageBindingMeta,
  snsOperationBinding: snsOperationBindingMeta,
  snsServerBinding: snsServerBindingMeta,
  // Solace
  solaceChannelBinding: solaceChannelBindingMeta,
  solaceMessageBinding: solaceMessageBindingMeta,
  solaceOperationBinding: solaceOperationBindingMeta,
  solaceServerBinding: solaceServerBindingMeta,
  // SQS
  sqsChannelBinding: sqsChannelBindingMeta,
  sqsMessageBinding: sqsMessageBindingMeta,
  sqsOperationBinding: sqsOperationBindingMeta,
  sqsServerBinding: sqsServerBindingMeta,
  // STOMP
  stompChannelBinding: stompChannelBindingMeta,
  stompMessageBinding: stompMessageBindingMeta,
  stompOperationBinding: stompOperationBindingMeta,
  stompServerBinding: stompServerBindingMeta,
  // WebSocket
  webSocketChannelBinding: webSocketChannelBindingMeta,
  webSocketMessageBinding: webSocketMessageBindingMeta,
  webSocketOperationBinding: webSocketOperationBindingMeta,
  webSocketServerBinding: webSocketServerBindingMeta,
};
