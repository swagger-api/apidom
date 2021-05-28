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
// AMQP
import AmqpChannelBinding0_9Element from '../elements/bindings/amqp-0-9/AmqpChannelBinding0-9';
import AmqpMessageBinding0_9Element from '../elements/bindings/amqp-0-9/AmqpMessageBinding0-9';
import AmqpOperationBinding0_9Element from '../elements/bindings/amqp-0-9/AmqpOperationBinding0-9';
// HTTP
import HttpMessageBindingElement from '../elements/bindings/http/HttpMessageBinding';
import HttpOperationBindingElement from '../elements/bindings/http/HttpOperationBinding';
// Kafka
import KafkaMessageBindingElement from '../elements/bindings/kafka/KafkaMessageBinding';
import KafkaOperationBindingElement from '../elements/bindings/kafka/KafkaOperationBinding';
// Mqtt
import MqttMessageBindingElement from '../elements/bindings/mqtt/MqttMessageBinding';
import MqttOperationBindingElement from '../elements/bindings/mqtt/MqttOperationBinding';
import MqttServerBindingElement from '../elements/bindings/mqtt/MqttServerBinding';
// WebSocket
import WebSocketChannelBindingElement from '../elements/bindings/ws/WebSocketChannelBinding';

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
// AMQP
AmqpChannelBinding0_9Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AmqpChannelBinding0_9',
  '$visitor',
]);
AmqpMessageBinding0_9Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AmqpMessageBinding0_9',
  '$visitor',
]);
AmqpOperationBinding0_9Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AmqpOperationBinding0_9',
  '$visitor',
]);
// HTTP
HttpMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'HttpMessageBinding',
  '$visitor',
]);
HttpOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'HttpOperationBinding',
  '$visitor',
]);
// Kafka
KafkaMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'KafkaMessageBinding',
  '$visitor',
]);
KafkaOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'KafkaOperationBinding',
  '$visitor',
]);
// Mqtt
MqttMessageBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'MqttMessageBinding',
  '$visitor',
]);
MqttOperationBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'MqttOperationBinding',
  '$visitor',
]);
MqttServerBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'MqttServerBinding',
  '$visitor',
]);
// WebSocket
WebSocketChannelBindingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'WebSocketChannelBinding',
  '$visitor',
]);
