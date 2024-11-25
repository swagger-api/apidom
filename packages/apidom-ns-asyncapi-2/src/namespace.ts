import { NamespacePluginOptions } from '@swagger-api/apidom-core';

/**
 * AsyncApi >= 2.0.0 <=2.6.0 specification elements.
 */
import AsyncApi2Element from './elements/AsyncApi2.ts';
import AsyncApiVersionElement from './elements/AsyncApiVersion.ts';
import ChannelBindingsElement from './elements/ChannelBindings.ts';
import ChannelItemElement from './elements/ChannelItem.ts';
import ChannelsElement from './elements/Channels.ts';
import ComponentsElement from './elements/Components.ts';
import ContactElement from './elements/Contact.ts';
import CorrelationIDElement from './elements/CorrelationID.ts';
import DefaultContentTypeElement from './elements/DefaultContentType.ts';
import ExternalDocumentationElement from './elements/ExternalDocumentation.ts';
import IdentifierElement from './elements/Identifier.ts';
import InfoElement from './elements/Info.ts';
import LicenseElement from './elements/License.ts';
import MessageElement from './elements/Message.ts';
import MessageBindingsElement from './elements/MessageBindings.ts';
import MessageExampleElement from './elements/MessageExample.ts';
import MessageTraitElement from './elements/MessageTrait.ts';
import OAuthFlowElement from './elements/OAuthFlow.ts';
import OAuthFlowsElement from './elements/OAuthFlows.ts';
import OperationElement from './elements/Operation.ts';
import OperationBindingsElement from './elements/OperationBindings.ts';
import OperationTraitElement from './elements/OperationTrait.ts';
import ParameterElement from './elements/Parameter.ts';
import ParametersElement from './elements/Parameters.ts';
import ReferenceElement from './elements/Reference.ts';
import SchemaElement from './elements/Schema.ts';
import SecurityRequirementElement from './elements/SecurityRequirement.ts';
import SecuritySchemeElement from './elements/SecurityScheme.ts';
import ServerElement from './elements/Server.ts';
import ServerBindingsElement from './elements/ServerBindings.ts';
import ServersElement from './elements/Servers.ts';
import ServerVariableElement from './elements/ServerVariable.ts';
import TagElement from './elements/Tag.ts';
import TagsElement from './elements/Tags.ts';
/**
 * Binding elements.
 */
// AMQP 0-9-1
import AmqpChannelBindingElement from './elements/bindings/amqp/AmqpChannelBinding.ts';
import AmqpMessageBindingElement from './elements/bindings/amqp/AmqpMessageBinding.ts';
import AmqpOperationBindingElement from './elements/bindings/amqp/AmqpOperationBinding.ts';
import AmqpServerBindingElement from './elements/bindings/amqp/AmqpServerBinding.ts';
// AMQP 1.0
import Amqp1ChannelBindingElement from './elements/bindings/amqp1/Amqp1ChannelBinding.ts';
import Amqp1MessageBindingElement from './elements/bindings/amqp1/Amqp1MessageBinding.ts';
import Amqp1OperationBindingElement from './elements/bindings/amqp1/Amqp1OperationBinding.ts';
import Amqp1ServerBindingElement from './elements/bindings/amqp1/Amqp1ServerBinding.ts';
// Anypoint MQ
import AnypointmqChannelBindingElement from './elements/bindings/anypointmq/AnypointmqChannelBinding.ts';
import AnypointmqMessageBindingElement from './elements/bindings/anypointmq/AnypointmqMessageBinding.ts';
import AnypointmqOperationBindingElement from './elements/bindings/anypointmq/AnypointmqOperationBinding.ts';
import AnypointmqServerBindingElement from './elements/bindings/anypointmq/AnypointmqServerBinding.ts';
// Google Cloud Pub/Sub
import GooglepubsubChannelBindingElement from './elements/bindings/googlepubsub/GooglepubsubChannelBinding.ts';
import GooglepubsubMessageBindingElement from './elements/bindings/googlepubsub/GooglepubsubMessageBinding.ts';
import GooglepubsubOperationBindingElement from './elements/bindings/googlepubsub/GooglepubsubOperationBinding.ts';
import GooglepubsubServerBindingElement from './elements/bindings/googlepubsub/GooglepubsubServerBinding.ts';
// HTTP
import HttpChannelBindingElement from './elements/bindings/http/HttpChannelBinding.ts';
import HttpMessageBindingElement from './elements/bindings/http/HttpMessageBinding.ts';
import HttpOperationBindingElement from './elements/bindings/http/HttpOperationBinding.ts';
import HttpServerBindingElement from './elements/bindings/http/HttpServerBinding.ts';
// IBM MQ
import IbmmqChannelBindingElement from './elements/bindings/ibmmq/IbmmqChannelBinding.ts';
import IbmmqMessageBindingElement from './elements/bindings/ibmmq/IbmmqMessageBinding.ts';
import IbmmqOperationBindingElement from './elements/bindings/ibmmq/IbmmqOperationBinding.ts';
import IbmmqServerBindingElement from './elements/bindings/ibmmq/IbmmqServerBinding.ts';
// JMS
import JmsChannelBindingElement from './elements/bindings/jms/JmsChannelBinding.ts';
import JmsMessageBindingElement from './elements/bindings/jms/JmsMessageBinding.ts';
import JmsOperationBindingElement from './elements/bindings/jms/JmsOperationBinding.ts';
import JmsServerBindingElement from './elements/bindings/jms/JmsServerBinding.ts';
// Kafka
import KafkaChannelBindingElement from './elements/bindings/kafka/KafkaChannelBinding.ts';
import KafkaMessageBindingElement from './elements/bindings/kafka/KafkaMessageBinding.ts';
import KafkaOperationBindingElement from './elements/bindings/kafka/KafkaOperationBinding.ts';
import KafkaServerBindingElement from './elements/bindings/kafka/KafkaServerBinding.ts';
// Mercure
import MercureChannelBindingElement from './elements/bindings/mercure/MercureChannelBinding.ts';
import MercureMessageBindingElement from './elements/bindings/mercure/MercureMessageBinding.ts';
import MercureOperationBindingElement from './elements/bindings/mercure/MercureOperationBinding.ts';
import MercureServerBindingElement from './elements/bindings/mercure/MercureServerBinding.ts';
// MQTT
import MqttChannelBindingElement from './elements/bindings/mqtt/MqttChannelBinding.ts';
import MqttMessageBindingElement from './elements/bindings/mqtt/MqttMessageBinding.ts';
import MqttOperationBindingElement from './elements/bindings/mqtt/MqttOperationBinding.ts';
import MqttServerBindingElement from './elements/bindings/mqtt/MqttServerBinding.ts';
// MQTT 5
import Mqtt5ChannelBindingElement from './elements/bindings/mqtt5/Mqtt5ChannelBinding.ts';
import Mqtt5MessageBindingElement from './elements/bindings/mqtt5/Mqtt5MessageBinding.ts';
import Mqtt5OperationBindingElement from './elements/bindings/mqtt5/Mqtt5OperationBinding.ts';
import Mqtt5ServerBindingElement from './elements/bindings/mqtt5/Mqtt5ServerBinding.ts';
// NATS
import NatsChannelBindingElement from './elements/bindings/nats/NatsChannelBinding.ts';
import NatsMessageBindingElement from './elements/bindings/nats/NatsMessageBinding.ts';
import NatsOperationBindingElement from './elements/bindings/nats/NatsOperationBinding.ts';
import NatsServerBindingElement from './elements/bindings/nats/NatsServerBinding.ts';
// Pulsar
import PulsarChannelBindingElement from './elements/bindings/pulsar/PulsarChannelBinding.ts';
import PulsarMessageBindingElement from './elements/bindings/pulsar/PulsarMessageBinding.ts';
import PulsarOperationBindingElement from './elements/bindings/pulsar/PulsarOperationBinding.ts';
import PulsarServerBindingElement from './elements/bindings/pulsar/PulsarServerBinding.ts';
// Redis
import RedisChannelBindingElement from './elements/bindings/redis/RedisChannelBinding.ts';
import RedisMessageBindingElement from './elements/bindings/redis/RedisMessageBinding.ts';
import RedisOperationBindingElement from './elements/bindings/redis/RedisOperationBinding.ts';
import RedisServerBindingElement from './elements/bindings/redis/RedisServerBinding.ts';
// SNS
import SnsChannelBindingElement from './elements/bindings/sns/SnsChannelBinding.ts';
import SnsMessageBindingElement from './elements/bindings/sns/SnsMessageBinding.ts';
import SnsOperationBindingElement from './elements/bindings/sns/SnsOperationBinding.ts';
import SnsServerBindingElement from './elements/bindings/sns/SnsServerBinding.ts';
// Solace
import SolaceChannelBindingElement from './elements/bindings/solace/SolaceChannelBinding.ts';
import SolaceMessageBindingElement from './elements/bindings/solace/SolaceMessageBinding.ts';
import SolaceOperationBindingElement from './elements/bindings/solace/SolaceOperationBinding.ts';
import SolaceServerBindingElement from './elements/bindings/solace/SolaceServerBinding.ts';
// SQS
import SqsChannelBindingElement from './elements/bindings/sqs/SqsChannelBinding.ts';
import SqsMessageBindingElement from './elements/bindings/sqs/SqsMessageBinding.ts';
import SqsOperationBindingElement from './elements/bindings/sqs/SqsOperationBinding.ts';
import SqsServerBindingElement from './elements/bindings/sqs/SqsServerBinding.ts';
// STOMP
import StompChannelBindingElement from './elements/bindings/stomp/StompChannelBinding.ts';
import StompMessageBindingElement from './elements/bindings/stomp/StompMessageBinding.ts';
import StompOperationBindingElement from './elements/bindings/stomp/StompOperationBinding.ts';
import StompServerBindingElement from './elements/bindings/stomp/StompServerBinding.ts';
// WebSocket
import WebSocketChannelBindingElement from './elements/bindings/ws/WebSocketChannelBinding.ts';
import WebSocketMessageBindingElement from './elements/bindings/ws/WebSocketMessageBinding.ts';
import WebSocketOperationBindingElement from './elements/bindings/ws/WebSocketOperationBinding.ts';
import WebSocketServerBindingElement from './elements/bindings/ws/WebSocketServerBinding.ts';

/**
 * @public
 */
const asyncApi2 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    /**
     * AsyncApi >= 2.0.0 <=2.6.0 specification elements.
     */
    base.register('asyncApi2', AsyncApi2Element);
    base.register('asyncApiVersion', AsyncApiVersionElement);
    base.register('channelBindings', ChannelBindingsElement);
    base.register('channelItem', ChannelItemElement);
    base.register('channels', ChannelsElement);
    base.register('components', ComponentsElement);
    base.register('contact', ContactElement);
    base.register('correlationID', CorrelationIDElement);
    base.register('defaultContentType', DefaultContentTypeElement);
    base.register('externalDocumentation', ExternalDocumentationElement);
    base.register('identifier', IdentifierElement);
    base.register('info', InfoElement);
    base.register('license', LicenseElement);
    base.register('message', MessageElement);
    base.register('messageBindings', MessageBindingsElement);
    base.register('messageExample', MessageExampleElement);
    base.register('messageTrait', MessageTraitElement);
    base.register('oAuthFlow', OAuthFlowElement);
    base.register('oAuthFlows', OAuthFlowsElement);
    base.register('operation', OperationElement);
    base.register('operationBindings', OperationBindingsElement);
    base.register('operationTrait', OperationTraitElement);
    base.register('parameter', ParameterElement);
    base.register('parameters', ParametersElement);
    base.register('reference', ReferenceElement);
    base.register('schema', SchemaElement);
    base.register('securityRequirement', SecurityRequirementElement);
    base.register('securityScheme', SecuritySchemeElement);
    base.register('server', ServerElement);
    base.register('serverBindings', ServerBindingsElement);
    base.register('servers', ServersElement);
    base.register('serverVariable', ServerVariableElement);
    base.register('tag', TagElement);
    base.register('tags', TagsElement);

    /**
     * Binding elements.
     */
    // AMQP 0-9-1
    base.register('amqpChannelBinding', AmqpChannelBindingElement);
    base.register('amqpMessageBinding', AmqpMessageBindingElement);
    base.register('amqpOperationBinding', AmqpOperationBindingElement);
    base.register('amqpServerBinding', AmqpServerBindingElement);
    // AMQP 1.0
    base.register('amqp1ChannelBinding', Amqp1ChannelBindingElement);
    base.register('amqp1MessageBinding', Amqp1MessageBindingElement);
    base.register('amqp1OperationBinding', Amqp1OperationBindingElement);
    base.register('amqp1ServerBinding', Amqp1ServerBindingElement);
    // Anypoint MQ
    base.register('anypointmqChannelBinding', AnypointmqChannelBindingElement);
    base.register('anypointmqMessageBinding', AnypointmqMessageBindingElement);
    base.register('anypointmqOperationBinding', AnypointmqOperationBindingElement);
    base.register('anypointmqServerBinding', AnypointmqServerBindingElement);
    // Google Cloud Pub/Sub
    base.register('googlepubsubChannelBinding', GooglepubsubChannelBindingElement);
    base.register('googlepubsubMessageBinding', GooglepubsubMessageBindingElement);
    base.register('googlepubsubOperationBinding', GooglepubsubOperationBindingElement);
    base.register('googlepubsubServerBinding', GooglepubsubServerBindingElement);
    // HTTP
    base.register('httpChannelBinding', HttpChannelBindingElement);
    base.register('httpMessageBinding', HttpMessageBindingElement);
    base.register('httpOperationBinding', HttpOperationBindingElement);
    base.register('httpServerBinding', HttpServerBindingElement);
    // IBM MQ
    base.register('ibmmqChannelBinding', IbmmqChannelBindingElement);
    base.register('ibmmqMessageBinding', IbmmqMessageBindingElement);
    base.register('ibmmqOperationBinding', IbmmqOperationBindingElement);
    base.register('ibmmqServerBinding', IbmmqServerBindingElement);
    // JMS
    base.register('jmsChannelBinding', JmsChannelBindingElement);
    base.register('jmsMessageBinding', JmsMessageBindingElement);
    base.register('jmsOperationBinding', JmsOperationBindingElement);
    base.register('jmsServerBinding', JmsServerBindingElement);
    // Kafka
    base.register('kafkaChannelBinding', KafkaChannelBindingElement);
    base.register('kafkaMessageBinding', KafkaMessageBindingElement);
    base.register('kafkaOperationBinding', KafkaOperationBindingElement);
    base.register('kafkaServerBinding', KafkaServerBindingElement);
    // Mercure
    base.register('mercureChannelBinding', MercureChannelBindingElement);
    base.register('mercureMessageBinding', MercureMessageBindingElement);
    base.register('mercureOperationBinding', MercureOperationBindingElement);
    base.register('mercureServerBinding', MercureServerBindingElement);
    // MQTT
    base.register('mqttChannelBinding', MqttChannelBindingElement);
    base.register('mqttMessageBinding', MqttMessageBindingElement);
    base.register('mqttOperationBinding', MqttOperationBindingElement);
    base.register('mqttServerBinding', MqttServerBindingElement);
    // MQTT 5
    base.register('mqtt5ChannelBinding', Mqtt5ChannelBindingElement);
    base.register('mqtt5MessageBinding', Mqtt5MessageBindingElement);
    base.register('mqtt5OperationBinding', Mqtt5OperationBindingElement);
    base.register('mqtt5ServerBinding', Mqtt5ServerBindingElement);
    // NATS
    base.register('natsChannelBinding', NatsChannelBindingElement);
    base.register('natsMessageBinding', NatsMessageBindingElement);
    base.register('natsOperationBinding', NatsOperationBindingElement);
    base.register('natsServerBinding', NatsServerBindingElement);
    // Pulsar
    base.register('pulsarChannelBinding', PulsarChannelBindingElement);
    base.register('pulsarMessageBinding', PulsarMessageBindingElement);
    base.register('pulsarOperationBinding', PulsarOperationBindingElement);
    base.register('pulsarServerBinding', PulsarServerBindingElement);
    // Redis
    base.register('redisChannelBinding', RedisChannelBindingElement);
    base.register('redisMessageBinding', RedisMessageBindingElement);
    base.register('redisOperationBinding', RedisOperationBindingElement);
    base.register('redisServerBinding', RedisServerBindingElement);
    // SNS
    base.register('snsChannelBinding', SnsChannelBindingElement);
    base.register('snsMessageBinding', SnsMessageBindingElement);
    base.register('snsOperationBinding', SnsOperationBindingElement);
    base.register('snsServerBinding', SnsServerBindingElement);
    // Solace
    base.register('solaceChannelBinding', SolaceChannelBindingElement);
    base.register('solaceMessageBinding', SolaceMessageBindingElement);
    base.register('solaceOperationBinding', SolaceOperationBindingElement);
    base.register('solaceServerBinding', SolaceServerBindingElement);
    // SQS
    base.register('sqsChannelBinding', SqsChannelBindingElement);
    base.register('sqsMessageBinding', SqsMessageBindingElement);
    base.register('sqsOperationBinding', SqsOperationBindingElement);
    base.register('sqsServerBinding', SqsServerBindingElement);
    // STOMP
    base.register('stompChannelBinding', StompChannelBindingElement);
    base.register('stompMessageBinding', StompMessageBindingElement);
    base.register('stompOperationBinding', StompOperationBindingElement);
    base.register('stompServerBinding', StompServerBindingElement);
    // WebSocket
    base.register('webSocketChannelBinding', WebSocketChannelBindingElement);
    base.register('webSocketMessageBinding', WebSocketMessageBindingElement);
    base.register('webSocketOperationBinding', WebSocketOperationBindingElement);
    base.register('webSocketServerBinding', WebSocketServerBindingElement);

    return base;
  },
};

export default asyncApi2;
