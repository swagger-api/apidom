import { createRefractor } from './index';
/**
 * AsyncApi >= 2.0.0 <=2.6.0 specification elements.
 */
import AsyncApi2Element from '../elements/AsyncApi2';
import AsyncApiVersionElement from '../elements/AsyncApiVersion';
import ChannelBindingsElement from '../elements/ChannelBindings';
import ChannelItemElement from '../elements/ChannelItem';
import ChannelsElement from '../elements/Channels';
import ComponentsElement from '../elements/Components';
import ContactElement from '../elements/Contact';
import CorrelationIDElement from '../elements/CorrelationID';
import DefaultContentTypeElement from '../elements/DefaultContentType';
import ExternalDocumentationElement from '../elements/ExternalDocumentation';
import IdentifierElement from '../elements/Identifier';
import InfoElement from '../elements/Info';
import LicenseElement from '../elements/License';
import MessageElement from '../elements/Message';
import MessageBindingsElement from '../elements/MessageBindings';
import MessageExampleElement from '../elements/MessageExample';
import MessageTraitElement from '../elements/MessageTrait';
import OAuthFlowElement from '../elements/OAuthFlow';
import OAuthFlowsElement from '../elements/OAuthFlows';
import OperationElement from '../elements/Operation';
import OperationBindingsElement from '../elements/OperationBindings';
import OperationTraitElement from '../elements/OperationTrait';
import ParameterElement from '../elements/Parameter';
import ParametersElement from '../elements/Parameters';
import ReferenceElement from '../elements/Reference';
import SchemaElement from '../elements/Schema';
import SecurityRequirementElement from '../elements/SecurityRequirement';
import SecuritySchemeElement from '../elements/SecurityScheme';
import ServerElement from '../elements/Server';
import ServerBindingsElement from '../elements/ServerBindings';
import ServersElement from '../elements/Servers';
import ServerVariableElement from '../elements/ServerVariable';
import TagElement from '../elements/Tag';
import TagsElement from '../elements/Tags';
/**
 * Binding elements.
 */
// AMQP 0-9-1
import AmqpChannelBindingElement from '../elements/bindings/amqp/AmqpChannelBinding';
import AmqpMessageBindingElement from '../elements/bindings/amqp/AmqpMessageBinding';
import AmqpOperationBindingElement from '../elements/bindings/amqp/AmqpOperationBinding';
import AmqpServerBindingElement from '../elements/bindings/amqp/AmqpServerBinding';
// AMQP 1.0
import Amqp1ChannelBindingElement from '../elements/bindings/amqp1/Amqp1ChannelBinding';
import Amqp1MessageBindingElement from '../elements/bindings/amqp1/Amqp1MessageBinding';
import Amqp1OperationBindingElement from '../elements/bindings/amqp1/Amqp1OperationBinding';
import Amqp1ServerBindingElement from '../elements/bindings/amqp1/Amqp1ServerBinding';
// Anypoint MQ
import AnypointmqChannelBindingElement from '../elements/bindings/anypointmq/AnypointmqChannelBinding';
import AnypointmqMessageBindingElement from '../elements/bindings/anypointmq/AnypointmqMessageBinding';
import AnypointmqOperationBindingElement from '../elements/bindings/anypointmq/AnypointmqOperationBinding';
import AnypointmqServerBindingElement from '../elements/bindings/anypointmq/AnypointmqServerBinding';
// HTTP
import HttpChannelBindingElement from '../elements/bindings/http/HttpChannelBinding';
import HttpMessageBindingElement from '../elements/bindings/http/HttpMessageBinding';
import HttpOperationBindingElement from '../elements/bindings/http/HttpOperationBinding';
import HttpServerBindingElement from '../elements/bindings/http/HttpServerBinding';
// Google Cloud Pub/Sub
import GooglepubsubChannelBindingElement from '../elements/bindings/googlepubsub/GooglepubsubChannelBinding';
import GooglepubsubMessageBindingElement from '../elements/bindings/googlepubsub/GooglepubsubMessageBinding';
import GooglepubsubOperationBindingElement from '../elements/bindings/googlepubsub/GooglepubsubOperationBinding';
import GooglepubsubServerBindingElement from '../elements/bindings/googlepubsub/GooglepubsubServerBinding';
// IBM MQ
import IbmmqChannelBindingElement from '../elements/bindings/ibmmq/IbmmqChannelBinding';
import IbmmqMessageBindingElement from '../elements/bindings/ibmmq/IbmmqMessageBinding';
import IbmmqOperationBindingElement from '../elements/bindings/ibmmq/IbmmqOperationBinding';
import IbmmqServerBindingElement from '../elements/bindings/ibmmq/IbmmqServerBinding';
// JMS
import JmsChannelBindingElement from '../elements/bindings/jms/JmsChannelBinding';
import JmsMessageBindingElement from '../elements/bindings/jms/JmsMessageBinding';
import JmsOperationBindingElement from '../elements/bindings/jms/JmsOperationBinding';
import JmsServerBindingElement from '../elements/bindings/jms/JmsServerBinding';
// Kafka
import KafkaChannelBindingElement from '../elements/bindings/kafka/KafkaChannelBinding';
import KafkaMessageBindingElement from '../elements/bindings/kafka/KafkaMessageBinding';
import KafkaOperationBindingElement from '../elements/bindings/kafka/KafkaOperationBinding';
import KafkaServerBindingElement from '../elements/bindings/kafka/KafkaServerBinding';
// Mercure
import MercureChannelBindingElement from '../elements/bindings/mercure/MercureChannelBinding';
import MercureMessageBindingElement from '../elements/bindings/mercure/MercureMessageBinding';
import MercureOperationBindingElement from '../elements/bindings/mercure/MercureOperationBinding';
import MercureServerBindingElement from '../elements/bindings/mercure/MercureServerBinding';
// MQTT
import MqttChannelBindingElement from '../elements/bindings/mqtt/MqttChannelBinding';
import MqttMessageBindingElement from '../elements/bindings/mqtt/MqttMessageBinding';
import MqttOperationBindingElement from '../elements/bindings/mqtt/MqttOperationBinding';
import MqttServerBindingElement from '../elements/bindings/mqtt/MqttServerBinding';
// MQTT 5
import Mqtt5ChannelBindingElement from '../elements/bindings/mqtt5/Mqtt5ChannelBinding';
import Mqtt5MessageBindingElement from '../elements/bindings/mqtt5/Mqtt5MessageBinding';
import Mqtt5OperationBindingElement from '../elements/bindings/mqtt5/Mqtt5OperationBinding';
import Mqtt5ServerBindingElement from '../elements/bindings/mqtt5/Mqtt5ServerBinding';
// NATS
import NatsChannelBindingElement from '../elements/bindings/nats/NatsChannelBinding';
import NatsMessageBindingElement from '../elements/bindings/nats/NatsMessageBinding';
import NatsOperationBindingElement from '../elements/bindings/nats/NatsOperationBinding';
import NatsServerBindingElement from '../elements/bindings/nats/NatsServerBinding';
// Pulsar
import PulsarChannelBindingElement from '../elements/bindings/pulsar/PulsarChannelBinding';
import PulsarMessageBindingElement from '../elements/bindings/pulsar/PulsarMessageBinding';
import PulsarOperationBindingElement from '../elements/bindings/pulsar/PulsarOperationBinding';
import PulsarServerBindingElement from '../elements/bindings/pulsar/PulsarServerBinding';
// Redis
import RedisChannelBindingElement from '../elements/bindings/redis/RedisChannelBinding';
import RedisMessageBindingElement from '../elements/bindings/redis/RedisMessageBinding';
import RedisOperationBindingElement from '../elements/bindings/redis/RedisOperationBinding';
import RedisServerBindingElement from '../elements/bindings/redis/RedisServerBinding';
// SNS
import SnsChannelBindingElement from '../elements/bindings/sns/SnsChannelBinding';
import SnsMessageBindingElement from '../elements/bindings/sns/SnsMessageBinding';
import SnsOperationBindingElement from '../elements/bindings/sns/SnsOperationBinding';
import SnsServerBindingElement from '../elements/bindings/sns/SnsServerBinding';
// Solace
import SolaceChannelBindingElement from '../elements/bindings/solace/SolaceChannelBinding';
import SolaceMessageBindingElement from '../elements/bindings/solace/SolaceMessageBinding';
import SolaceOperationBindingElement from '../elements/bindings/solace/SolaceOperationBinding';
import SolaceServerBindingElement from '../elements/bindings/solace/SolaceServerBinding';
// SQS
import SqsChannelBindingElement from '../elements/bindings/sqs/SqsChannelBinding';
import SqsMessageBindingElement from '../elements/bindings/sqs/SqsMessageBinding';
import SqsOperationBindingElement from '../elements/bindings/sqs/SqsOperationBinding';
import SqsServerBindingElement from '../elements/bindings/sqs/SqsServerBinding';
// STOMP
import StompChannelBindingElement from '../elements/bindings/stomp/StompChannelBinding';
import StompMessageBindingElement from '../elements/bindings/stomp/StompMessageBinding';
import StompOperationBindingElement from '../elements/bindings/stomp/StompOperationBinding';
import StompServerBindingElement from '../elements/bindings/stomp/StompServerBinding';
// WebSocket
import WebSocketChannelBindingElement from '../elements/bindings/ws/WebSocketChannelBinding';
import WebSocketMessageBindingElement from '../elements/bindings/ws/WebSocketMessageBinding';
import WebSocketOperationBindingElement from '../elements/bindings/ws/WebSocketOperationBinding';
import WebSocketServerBindingElement from '../elements/bindings/ws/WebSocketServerBinding';

/**
 * AsyncApi >= 2.0.0 <=2.6.0 specification elements.
 */
AsyncApi2Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AsyncApi',
  '$visitor',
]);
AsyncApiVersionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AsyncApiVersion',
  '$visitor',
]);
ChannelBindingsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ChannelBindings',
  '$visitor',
]);
ChannelItemElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ChannelItem',
  '$visitor',
]);
ChannelsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Channels',
  '$visitor',
]);
ComponentsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Components',
  '$visitor',
]);
ContactElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Contact',
  '$visitor',
]);
CorrelationIDElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'CorrelationID',
  '$visitor',
]);
DefaultContentTypeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'DefaultContentType',
  '$visitor',
]);
ExternalDocumentationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ExternalDocumentation',
  '$visitor',
]);
IdentifierElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Identifier',
  '$visitor',
]);
InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
LicenseElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'License',
  '$visitor',
]);
MessageElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Message',
  '$visitor',
]);
MessageBindingsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'MessageBindings',
  '$visitor',
]);
MessageExampleElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'MessageExample',
  '$visitor',
]);
MessageTraitElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'MessageTrait',
  '$visitor',
]);
OAuthFlowElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OAuthFlow',
  '$visitor',
]);
OAuthFlowsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OAuthFlows',
  '$visitor',
]);
OperationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Operation',
  '$visitor',
]);
OperationBindingsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OperationBindings',
  '$visitor',
]);
OperationTraitElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OperationTrait',
  '$visitor',
]);
ParameterElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Parameter',
  '$visitor',
]);
ParametersElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Parameters',
  '$visitor',
]);
ReferenceElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Reference',
  '$visitor',
]);
SchemaElement.refract = createRefractor(['visitors', 'document', 'objects', 'Schema', '$visitor']);
SecurityRequirementElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);
SecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityScheme',
  '$visitor',
]);
ServerElement.refract = createRefractor(['visitors', 'document', 'objects', 'Server', '$visitor']);
ServerBindingsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerBindings',
  '$visitor',
]);
ServersElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Servers',
  '$visitor',
]);
ServerVariableElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerVariable',
  '$visitor',
]);
TagElement.refract = createRefractor(['visitors', 'document', 'objects', 'Tag', '$visitor']);
TagsElement.refract = createRefractor(['visitors', 'document', 'objects', 'Tags', '$visitor']);

/**
 * Binding elements.
 */
// AMQP 0-9-1
AmqpChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'amqp',
  'ChannelBinding',
  '$visitor',
]);
AmqpMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'amqp',
  'MessageBinding',
  '$visitor',
]);
AmqpOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'amqp',
  'OperationBinding',
  '$visitor',
]);
AmqpServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'amqp',
  'ServerBinding',
  '$visitor',
]);
// AMQP 1.0
Amqp1ChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'amqp1',
  'ChannelBinding',
  '$visitor',
]);
Amqp1MessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'amqp1',
  'MessageBinding',
  '$visitor',
]);
Amqp1OperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'amqp1',
  'OperationBinding',
  '$visitor',
]);
Amqp1ServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'amqp1',
  'ServerBinding',
  '$visitor',
]);
// HTTP
HttpChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'http',
  'ChannelBinding',
  '$visitor',
]);
HttpMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'http',
  'MessageBinding',
  '$visitor',
]);
HttpOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'http',
  'OperationBinding',
  '$visitor',
]);
HttpServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'http',
  'ServerBinding',
  '$visitor',
]);
// Google Cloud Pub/Sub
GooglepubsubChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'googlepubsub',
  'ChannelBinding',
  '$visitor',
]);
GooglepubsubMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'googlepubsub',
  'MessageBinding',
  '$visitor',
]);
GooglepubsubOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'googlepubsub',
  'OperationBinding',
  '$visitor',
]);
GooglepubsubServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'googlepubsub',
  'ServerBinding',
  '$visitor',
]);
// IBM MQ
IbmmqChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'ibmmq',
  'ChannelBinding',
  '$visitor',
]);
IbmmqMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'ibmmq',
  'MessageBinding',
  '$visitor',
]);
IbmmqOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'ibmmq',
  'OperationBinding',
  '$visitor',
]);
IbmmqServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'ibmmq',
  'ServerBinding',
  '$visitor',
]);
// JMS
JmsChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'jms',
  'ChannelBinding',
  '$visitor',
]);
JmsMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'jms',
  'MessageBinding',
  '$visitor',
]);
JmsOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'jms',
  'OperationBinding',
  '$visitor',
]);
JmsServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'jms',
  'ServerBinding',
  '$visitor',
]);
// Kafka
KafkaChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'kafka',
  'ChannelBinding',
  '$visitor',
]);
KafkaMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'kafka',
  'MessageBinding',
  '$visitor',
]);
KafkaOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'kafka',
  'OperationBinding',
  '$visitor',
]);
KafkaServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'kafka',
  'ServerBinding',
  '$visitor',
]);
// Anypoint MQ
AnypointmqChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'anypointmq',
  'ChannelBinding',
  '$visitor',
]);
AnypointmqMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'anypointmq',
  'MessageBinding',
  '$visitor',
]);
AnypointmqOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'anypointmq',
  'OperationBinding',
  '$visitor',
]);
AnypointmqServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'anypointmq',
  'ServerBinding',
  '$visitor',
]);
// Mercure
MercureChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mercure',
  'ChannelBinding',
  '$visitor',
]);
MercureMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mercure',
  'MessageBinding',
  '$visitor',
]);
MercureOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mercure',
  'OperationBinding',
  '$visitor',
]);
MercureServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mercure',
  'ServerBinding',
  '$visitor',
]);
// MQTT
MqttChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mqtt',
  'ChannelBinding',
  '$visitor',
]);
MqttMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mqtt',
  'MessageBinding',
  '$visitor',
]);
MqttOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mqtt',
  'OperationBinding',
  '$visitor',
]);
MqttServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mqtt',
  'ServerBinding',
  '$visitor',
]);
// MQTT 5
Mqtt5ChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mqtt5',
  'ChannelBinding',
  '$visitor',
]);
Mqtt5MessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mqtt5',
  'MessageBinding',
  '$visitor',
]);
Mqtt5OperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mqtt5',
  'OperationBinding',
  '$visitor',
]);
Mqtt5ServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'mqtt5',
  'ServerBinding',
  '$visitor',
]);
// NATS
NatsChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'nats',
  'ChannelBinding',
  '$visitor',
]);
NatsMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'nats',
  'MessageBinding',
  '$visitor',
]);
NatsOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'nats',
  'OperationBinding',
  '$visitor',
]);
NatsServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'nats',
  'ServerBinding',
  '$visitor',
]);
// Pulsar
PulsarChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'pulsar',
  'ChannelBinding',
  '$visitor',
]);
PulsarMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'pulsar',
  'MessageBinding',
  '$visitor',
]);
PulsarOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'pulsar',
  'OperationBinding',
  '$visitor',
]);
PulsarServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'pulsar',
  'ServerBinding',
  '$visitor',
]);
// Redis
RedisChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'redis',
  'ChannelBinding',
  '$visitor',
]);
RedisMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'redis',
  'MessageBinding',
  '$visitor',
]);
RedisOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'redis',
  'OperationBinding',
  '$visitor',
]);
RedisServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'redis',
  'ServerBinding',
  '$visitor',
]);
// SNS
SnsChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'sns',
  'ChannelBinding',
  '$visitor',
]);
SnsMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'sns',
  'MessageBinding',
  '$visitor',
]);
SnsOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'sns',
  'OperationBinding',
  '$visitor',
]);
SnsServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'sns',
  'ServerBinding',
  '$visitor',
]);
// Solace
SolaceChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'solace',
  'ChannelBinding',
  '$visitor',
]);
SolaceMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'solace',
  'MessageBinding',
  '$visitor',
]);
SolaceOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'solace',
  'OperationBinding',
  '$visitor',
]);
SolaceServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'solace',
  'ServerBinding',
  '$visitor',
]);
// SQS
SqsChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'sqs',
  'ChannelBinding',
  '$visitor',
]);
SqsMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'sqs',
  'MessageBinding',
  '$visitor',
]);
SqsOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'sqs',
  'OperationBinding',
  '$visitor',
]);
SqsServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'sqs',
  'ServerBinding',
  '$visitor',
]);
// STOMP
StompChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'stomp',
  'ChannelBinding',
  '$visitor',
]);
StompMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'stomp',
  'MessageBinding',
  '$visitor',
]);
StompOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'stomp',
  'OperationBinding',
  '$visitor',
]);
StompServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'stomp',
  'ServerBinding',
  '$visitor',
]);
// WebSocket
WebSocketChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'ws',
  'ChannelBinding',
  '$visitor',
]);
WebSocketMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'ws',
  'MessageBinding',
  '$visitor',
]);
WebSocketOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'ws',
  'OperationBinding',
  '$visitor',
]);
WebSocketServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'bindings',
  'ws',
  'ServerBinding',
  '$visitor',
]);
