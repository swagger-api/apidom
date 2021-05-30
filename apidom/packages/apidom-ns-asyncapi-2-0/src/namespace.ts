import { NamespacePluginOptions } from 'minim';

/**
 * AsyncApi 2.0.0 specification elements.
 */
import AsyncApi2_0Element from './elements/AsyncApi2-0';
import AsyncApiVersionElement from './elements/AsyncApiVersion';
import ChannelBindingsElement from './elements/ChannelBindings';
import ChannelItemElement from './elements/ChannelItem';
import ChannelsElement from './elements/Channels';
import ComponentsElement from './elements/Components';
import ContactElement from './elements/Contact';
import CorrelationIDElement from './elements/CorrelationID';
import DefaultContentTypeElement from './elements/DefaultContentType';
import ExternalDocumentationElement from './elements/ExternalDocumentation';
import IdentifierElement from './elements/Identifier';
import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import MessageBindingsElement from './elements/MessageBindings';
import OAuthFlowElement from './elements/OAuthFlow';
import OAuthFlowsElement from './elements/OAuthFlows';
import OperationElement from './elements/Operation';
import ParameterElement from './elements/Parameter';
import ParametersElement from './elements/Parameters';
import ReferenceElement from './elements/Reference';
import SchemaElement from './elements/Schema';
import SecurityRequirementElement from './elements/SecurityRequirement';
import ServerElement from './elements/Server';
import ServerBindingsElement from './elements/ServerBindings';
import ServersElement from './elements/Servers';
import ServerVariableElement from './elements/ServerVariable';
import TagElement from './elements/Tag';
import TagsElement from './elements/Tags';
/**
 * Binding elements.
 */
// AMQP 0-9-1
import AmqpChannelBindingElement from './elements/bindings/amqp/AmqpChannelBinding';
import AmqpMessageBindingElement from './elements/bindings/amqp/AmqpMessageBinding';
import AmqpOperationBindingElement from './elements/bindings/amqp/AmqpOperationBinding';
import AmqpServerBindingElement from './elements/bindings/amqp/AmqpServerBinding';
// AMQP 1.0
import Amqp1ChannelBindingElement from './elements/bindings/amqp1/Amqp1ChannelBinding';
import Amqp1MessageBindingElement from './elements/bindings/amqp1/Amqp1MessageBinding';
import Amqp1OperationBindingElement from './elements/bindings/amqp1/Amqp1OperationBinding';
import Amqp1ServerBindingElement from './elements/bindings/amqp1/Amqp1ServerBinding';
// HTTP
import HttpChannelBindingElement from './elements/bindings/http/HttpChannelBinding';
import HttpMessageBindingElement from './elements/bindings/http/HttpMessageBinding';
import HttpOperationBindingElement from './elements/bindings/http/HttpOperationBinding';
import HttpServerBindingElement from './elements/bindings/http/HttpServerBinding';
// JMS
import JmsChannelBindingElement from './elements/bindings/jms/JmsChannelBinding';
import JmsMessageBindingElement from './elements/bindings/jms/JmsMessageBinding';
import JmsOperationBindingElement from './elements/bindings/jms/JmsOperationBinding';
import JmsServerBindingElement from './elements/bindings/jms/JmsServerBinding';
// Kafka
import KafkaChannelBindingElement from './elements/bindings/kafka/KafkaChannelBinding';
import KafkaMessageBindingElement from './elements/bindings/kafka/KafkaMessageBinding';
import KafkaOperationBindingElement from './elements/bindings/kafka/KafkaOperationBinding';
import KafkaServerBindingElement from './elements/bindings/kafka/KafkaServerBinding';
// Mercure
import MercureChannelBindingElement from './elements/bindings/mercure/MercureChannelBinding';
import MercureMessageBindingElement from './elements/bindings/mercure/MercureMessageBinding';
import MercureOperationBindingElement from './elements/bindings/mercure/MercureOperationBinding';
import MercureServerBindingElement from './elements/bindings/mercure/MercureServerBinding';
// MQTT
import MqttChannelBindingElement from './elements/bindings/mqtt/MqttChannelBinding';
import MqttMessageBindingElement from './elements/bindings/mqtt/MqttMessageBinding';
import MqttOperationBindingElement from './elements/bindings/mqtt/MqttOperationBinding';
import MqttServerBindingElement from './elements/bindings/mqtt/MqttServerBinding';
// MQTT 5
import Mqtt5ChannelBindingElement from './elements/bindings/mqtt5/Mqtt5ChannelBinding';
import Mqtt5MessageBindingElement from './elements/bindings/mqtt5/Mqtt5MessageBinding';
import Mqtt5OperationBindingElement from './elements/bindings/mqtt5/Mqtt5OperationBinding';
import Mqtt5ServerBindingElement from './elements/bindings/mqtt5/Mqtt5ServerBinding';
// NATS
import NatsChannelBindingElement from './elements/bindings/nats/NatsChannelBinding';
import NatsMessageBindingElement from './elements/bindings/nats/NatsMessageBinding';
import NatsOperationBindingElement from './elements/bindings/nats/NatsOperationBinding';
import NatsServerBindingElement from './elements/bindings/nats/NatsServerBinding';
// Redis
import RedisChannelBindingElement from './elements/bindings/redis/RedisChannelBinding';
import RedisMessageBindingElement from './elements/bindings/redis/RedisMessageBinding';
import RedisOperationBindingElement from './elements/bindings/redis/RedisOperationBinding';
import RedisServerBindingElement from './elements/bindings/redis/RedisServerBinding';
// SNS
import SnsChannelBindingElement from './elements/bindings/sns/SnsChannelBinding';
import SnsMessageBindingElement from './elements/bindings/sns/SnsMessageBinding';
import SnsOperationBindingElement from './elements/bindings/sns/SnsOperationBinding';
import SnsServerBindingElement from './elements/bindings/sns/SnsServerBinding';
// SQS
import SqsChannelBindingElement from './elements/bindings/sqs/SqsChannelBinding';
import SqsMessageBindingElement from './elements/bindings/sqs/SqsMessageBinding';
import SqsOperationBindingElement from './elements/bindings/sqs/SqsOperationBinding';
import SqsServerBindingElement from './elements/bindings/sqs/SqsServerBinding';
// STOMP
import StompChannelBindingElement from './elements/bindings/stomp/StompChannelBinding';
import StompMessageBindingElement from './elements/bindings/stomp/StompMessageBinding';
import StompOperationBindingElement from './elements/bindings/stomp/StompOperationBinding';
import StompServerBindingElement from './elements/bindings/stomp/StompServerBinding';
// WebSocket
import WebSocketChannelBindingElement from './elements/bindings/ws/WebSocketChannelBinding';
import WebSocketMessageBindingElement from './elements/bindings/ws/WebSocketMessageBinding';
import WebSocketOperationBindingElement from './elements/bindings/ws/WebSocketOperationBinding';
import WebSocketServerBindingElement from './elements/bindings/ws/WebSocketServerBinding';

const asyncApi2_0 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    /**
     * AsyncApi 2.0.0 specification elements.
     */
    base.register('asyncApi2_0', AsyncApi2_0Element);
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
    base.register('messageBindings', MessageBindingsElement);
    base.register('oAuthFlow', OAuthFlowElement);
    base.register('oAuthFlows', OAuthFlowsElement);
    base.register('operation', OperationElement);
    base.register('parameter', ParameterElement);
    base.register('parameters', ParametersElement);
    base.register('reference', ReferenceElement);
    base.register('schema', SchemaElement);
    base.register('securityRequirement', SecurityRequirementElement);
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
    // HTTP
    base.register('httpChannelBinding', HttpChannelBindingElement);
    base.register('httpMessageBinding', HttpMessageBindingElement);
    base.register('httpOperationBinding', HttpOperationBindingElement);
    base.register('httpServerBinding', HttpServerBindingElement);
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

export default asyncApi2_0;
