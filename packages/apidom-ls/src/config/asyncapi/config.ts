import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../codes.ts';
import asyncapi2Meta from './asyncapi2/meta.ts';
import asyncapi3Meta from './asyncapi3/meta.ts';
import asyncapiVersionMeta from './async-api-version/meta.ts';
import meta from '../common/schema/meta.ts';
import identifierMeta from './identifier/meta.ts';
import defaultContentTypeMeta from './default-content-type/meta.ts';
import securitySchemeMeta from './security-scheme/meta.ts';
import infoMeta from './info/meta.ts';
import contactMeta from './contact/meta.ts';
import channelMeta from './channel/meta.ts';
import channelItemMeta from './channel-item/meta.ts';
import channelBindingsMeta from './channel-bindings/meta.ts';
import serversMeta from './servers/meta.ts';
import externalDocsMeta from './external-documentation/meta.ts';
import licenseMeta from './license/meta.ts';
import serverMeta from './server/meta.ts';
import securityRequirementMeta from './security-requirement/meta.ts';
import serverVariableMeta from './server-variable/meta.ts';
import channelsMeta from './channels/meta.ts';
import parametersMeta from './parameters/meta.ts';
import parameterMeta from './parameter/meta.ts';
import operationMeta from './operation/meta.ts';
import operationBindingsMeta from './operation-bindings/meta.ts';
import operationTraitMeta from './operation-trait/meta.ts';
import serverBindingsMeta from './server-bindings/meta.ts';
import messageBindingsMeta from './message-bindings/meta.ts';
import messageMeta from './message/meta.ts';
import messageTraitMeta from './message-trait/meta.ts';
import messageExampleMeta from './message-example/meta.ts';
import componentsMeta from './components/meta.ts';
import tagsMeta from './tags/meta.ts';
import tagMeta from './tag/meta.ts';
import correlationIDMeta from './correlation-ID/meta.ts';
import oAuthFlowsMeta from './oauth-flows/meta.ts';
import oAuthFlowMeta from './oauth-flow/meta.ts';
import messagesMeta from './messages/meta.ts';
import operationsMeta from './operations/meta.ts';
import operationReplyMeta from './operation-reply/meta.ts';
import operationReplyAddressMeta from './operation-reply-address/meta.ts';
import multiFormatSchemaMeta from './multi-format-schema/meta.ts';
/**
 * Binding metas.
 */
// AMQP 0-9-1
import amqpChannelBindingMeta from './bindings/amqp/channel-binding/meta.ts';
import amqpMessageBindingMeta from './bindings/amqp/message-binding/meta.ts';
import amqpOperationBindingMeta from './bindings/amqp/operation-binding/meta.ts';
import amqpServerBindingMeta from './bindings/amqp/server-binding/meta.ts';
// AMQP 1.0
import amqp1ChannelBindingMeta from './bindings/amqp1/channel-binding/meta.ts';
import amqp1MessageBindingMeta from './bindings/amqp1/message-binding/meta.ts';
import amqp1OperationBindingMeta from './bindings/amqp1/operation-binding/meta.ts';
import amqp1ServerBindingMeta from './bindings/amqp1/server-binding/meta.ts';
// Anypoint MQ
import anypointmqChannelBindingMeta from './bindings/anypointmq/channel-binding/meta.ts';
import anypointmqMessageBindingMeta from './bindings/anypointmq/message-binding/meta.ts';
import anypointmqOperationBindingMeta from './bindings/anypointmq/operation-binding/meta.ts';
import anypointmqServerBidingMeta from './bindings/anypointmq/server-binding/meta.ts';
// Google Cloud Pub/Sub
import googlepubsubChannelBindingMeta from './bindings/googlepubsub/channel-binding/meta.ts';
import googlepubsubMessageBindingMeta from './bindings/googlepubsub/message-binding/meta.ts';
import googlepubsubOperationBindingMeta from './bindings/googlepubsub/operation-binding/meta.ts';
import googlepubsubServerBindingMeta from './bindings/googlepubsub/server-binding/meta.ts';
// HTTP
import httpChannelBindingMeta from './bindings/http/channel-binding/meta.ts';
import httpMessageBindingMeta from './bindings/http/message-binding/meta.ts';
import httpOperationBindingMeta from './bindings/http/operation-binding/meta.ts';
import httpServerBindingMeta from './bindings/http/server-binding/meta.ts';
// IBM MQ
import ibmmqChannelBindingMeta from './bindings/ibmmq/channel-binding/meta.ts';
import ibmmqMessageBindingMeta from './bindings/ibmmq/message-binding/meta.ts';
import ibmmqOperationBindingMeta from './bindings/ibmmq/operation-binding/meta.ts';
import ibmmqServerBindingMeta from './bindings/ibmmq/server-binding/meta.ts';
// JMS
import jmsChannelBindingMeta from './bindings/jms/channel-binding/meta.ts';
import jmsMessageBindingMeta from './bindings/jms/message-binding/meta.ts';
import jmsOperationBindingMeta from './bindings/jms/operation-binding/meta.ts';
import jmsServerBindingMeta from './bindings/jms/server-binding/meta.ts';
// Kafka
import kafkaChannelBindingMeta from './bindings/kafka/channel-binding/meta.ts';
import kafkaMessageBindingMeta from './bindings/kafka/message-binding/meta.ts';
import kafkaOperationBindingMeta from './bindings/kafka/operation-binding/meta.ts';
import kafkaServerBindingMeta from './bindings/kafka/server-binding/meta.ts';
// Mercure
import mercureChannelBindingMeta from './bindings/mercure/channel-binding/meta.ts';
import mercureMessageBindingMeta from './bindings/mercure/message-binding/meta.ts';
import mercureOperationBindingMeta from './bindings/mercure/operation-binding/meta.ts';
import mercureServerBindingMeta from './bindings/mercure/server-binding/meta.ts';
// MQTT
import mqttChannelBindingMeta from './bindings/mqtt/channel-binding/meta.ts';
import mqttMessageBindingMeta from './bindings/mqtt/message-binding/meta.ts';
import mqttOperationBindingMeta from './bindings/mqtt/operation-binding/meta.ts';
import mqttServerBindingMeta from './bindings/mqtt/server-binding/meta.ts';
// MQTT 5
import mqtt5ChannelBindingMeta from './bindings/mqtt5/channel-binding/meta.ts';
import mqtt5MessageBindingMeta from './bindings/mqtt5/message-binding/meta.ts';
import mqtt5OperationBindingMeta from './bindings/mqtt5/operation-binding/meta.ts';
import mqtt5ServerBindingMeta from './bindings/mqtt5/server-binding/meta.ts';
// NATS
import natsChannelBindingMeta from './bindings/nats/channel-binding/meta.ts';
import natsMessageBindingMeta from './bindings/nats/message-binding/meta.ts';
import natsOperationBindingMeta from './bindings/nats/operation-binding/meta.ts';
import natsServerBindingMeta from './bindings/nats/server-binding/meta.ts';
// Pulsar
import pulsarChannelBindingMeta from './bindings/pulsar/channel-binding/meta.ts';
import pulsarMessageBindingMeta from './bindings/pulsar/message-binding/meta.ts';
import pulsarOperationBindingMeta from './bindings/pulsar/operation-binding/meta.ts';
import pulsarServerBindingMeta from './bindings/pulsar/server-binding/meta.ts';
// Redis
import redisChannelBindingMeta from './bindings/redis/channel-binding/meta.ts';
import redisMessageBindingMeta from './bindings/redis/message-binding/meta.ts';
import redisOperationBindingMeta from './bindings/redis/operation-binding/meta.ts';
import redisServerBindingMeta from './bindings/redis/server-binding/meta.ts';
// SNS
import snsChannelBindingMeta from './bindings/sns/channel-binding/meta.ts';
import snsMessageBindingMeta from './bindings/sns/message-binding/meta.ts';
import snsOperationBindingMeta from './bindings/sns/operation-binding/meta.ts';
import snsServerBindingMeta from './bindings/sns/server-binding/meta.ts';
// Solace
import solaceChannelBindingMeta from './bindings/solace/channel-binding/meta.ts';
import solaceMessageBindingMeta from './bindings/solace/message-binding/meta.ts';
import solaceOperationBindingMeta from './bindings/solace/operation-binding/meta.ts';
import solaceServerBindingMeta from './bindings/solace/server-binding/meta.ts';
// SQS
import sqsChannelBindingMeta from './bindings/sqs/channel-binding/meta.ts';
import sqsMessageBindingMeta from './bindings/sqs/message-binding/meta.ts';
import sqsOperationBindingMeta from './bindings/sqs/operation-binding/meta.ts';
import sqsServerBindingMeta from './bindings/sqs/server-binding/meta.ts';
// STOMP
import stompChannelBindingMeta from './bindings/stomp/channel-binding/meta.ts';
import stompMessageBindingMeta from './bindings/stomp/message-binding/meta.ts';
import stompOperationBindingMeta from './bindings/stomp/operation-binding/meta.ts';
import stompServerBindingMeta from './bindings/stomp/server-binding/meta.ts';
// WebSocket
import webSocketChannelBindingMeta from './bindings/ws/channel-binding/meta.ts';
import webSocketMessageBindingMeta from './bindings/ws/message-binding/meta.ts';
import webSocketOperationBindingMeta from './bindings/ws/operation-binding/meta.ts';
import webSocketServerBindingMeta from './bindings/ws/server-binding/meta.ts';

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
        severity: DiagnosticSeverity.Error,
        linterFunction: 'apilintNoDuplicateKeys',
        marker: 'key',
      },
    ],
  },
  identifier: identifierMeta,
  defaultContentType: defaultContentTypeMeta,
  info: infoMeta,
  contact: contactMeta,
  license: licenseMeta,
  operation: operationMeta,
  operationBindings: operationBindingsMeta,
  operationTrait: operationTraitMeta,
  channel: channelMeta,
  channelItem: channelItemMeta,
  channelBindings: channelBindingsMeta,
  channels: channelsMeta,
  asyncApi2: asyncapi2Meta,
  asyncApi3: asyncapi3Meta,
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
  messages: messagesMeta,
  operations: operationsMeta,
  operationReply: operationReplyMeta,
  operationReplyAddress: operationReplyAddressMeta,
  multiFormatSchema: multiFormatSchemaMeta,
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
  googlepubsubServerBinding: googlepubsubServerBindingMeta,
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
  // Pulsar
  pulsarChannelBinding: pulsarChannelBindingMeta,
  pulsarMessageBinding: pulsarMessageBindingMeta,
  pulsarOperationBinding: pulsarOperationBindingMeta,
  pulsarServerBinding: pulsarServerBindingMeta,
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
