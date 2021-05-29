import { createRefractor } from './index';
/**
 * AsyncApi 2.0.0 specification elements.
 */
import AsyncApi2_0Element from '../elements/AsyncApi2-0';
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
import OAuthFlowElement from '../elements/OAuthFlow';
import OAuthFlowsElement from '../elements/OAuthFlows';
import OperationElement from '../elements/Operation';
import ParameterElement from '../elements/Parameter';
import ParametersElement from '../elements/Parameters';
import ReferenceElement from '../elements/Reference';
import SchemaElement from '../elements/Schema';
import SecurityRequirementElement from '../elements/SecurityRequirement';
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
// HTTP
import HttpChannelBindingElement from '../elements/bindings/http/HttpChannelBinding';
import HttpMessageBindingElement from '../elements/bindings/http/HttpMessageBinding';
import HttpOperationBindingElement from '../elements/bindings/http/HttpOperationBinding';
import HttpServerBindingElement from '../elements/bindings/http/HttpServerBinding';
// Kafka
import KafkaChannelBindingElement from '../elements/bindings/kafka/KafkaChannelBinding';
import KafkaMessageBindingElement from '../elements/bindings/kafka/KafkaMessageBinding';
import KafkaOperationBindingElement from '../elements/bindings/kafka/KafkaOperationBinding';
import KafkaServerBindingElement from '../elements/bindings/kafka/KafkaServerBinding';
// Mqtt
import MqttChannelBindingElement from '../elements/bindings/mqtt/MqttChannelBinding';
import MqttMessageBindingElement from '../elements/bindings/mqtt/MqttMessageBinding';
import MqttOperationBindingElement from '../elements/bindings/mqtt/MqttOperationBinding';
import MqttServerBindingElement from '../elements/bindings/mqtt/MqttServerBinding';
// WebSocket
import WebSocketChannelBindingElement from '../elements/bindings/ws/WebSocketChannelBinding';
import WebSocketMessageBindingElement from '../elements/bindings/ws/WebSocketMessageBinding';
import WebSocketOperationBindingElement from '../elements/bindings/ws/WebSocketOperationBinding';
import WebSocketServerBindingElement from '../elements/bindings/ws/WebSocketServerBinding';

/**
 * AsyncApi 2.0.0 specification elements.
 */
AsyncApi2_0Element.refract = createRefractor([
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
// Mqtt
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
