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
import AmqpChannelBinding0_9_1Element from './elements/bindings/amqp-0-9-1/AmqpChannelBinding0-9-1';
import AmqpMessageBinding0_9_1Element from './elements/bindings/amqp-0-9-1/AmqpMessageBinding0-9-1';
import AmqpOperationBinding0_9_1Element from './elements/bindings/amqp-0-9-1/AmqpOperationBinding0-9-1';
import AmqpServerBinding0_9_1Element from './elements/bindings/amqp-0-9-1/AmqpServerBinding0-9-1';
// HTTP
import HttpChannelBindingElement from './elements/bindings/http/HttpChannelBinding';
import HttpMessageBindingElement from './elements/bindings/http/HttpMessageBinding';
import HttpOperationBindingElement from './elements/bindings/http/HttpOperationBinding';
import HttpServerBindingElement from './elements/bindings/http/HttpServerBinding';
// Kafka
import KafkaChannelBindingElement from './elements/bindings/kafka/KafkaChannelBinding';
import KafkaMessageBindingElement from './elements/bindings/kafka/KafkaMessageBinding';
import KafkaOperationBindingElement from './elements/bindings/kafka/KafkaOperationBinding';
import KafkaServerBindingElement from './elements/bindings/kafka/KafkaServerBinding';
// MQTT
import MqttChannelBindingElement from './elements/bindings/mqtt/MqttChannelBinding';
import MqttMessageBindingElement from './elements/bindings/mqtt/MqttMessageBinding';
import MqttOperationBindingElement from './elements/bindings/mqtt/MqttOperationBinding';
import MqttServerBindingElement from './elements/bindings/mqtt/MqttServerBinding';
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
    // AMQP
    base.register('amqpChannelBinding0_9', AmqpChannelBinding0_9_1Element);
    base.register('amqpMessageBinding0_9', AmqpMessageBinding0_9_1Element);
    base.register('amqpOperationBinding0_9', AmqpOperationBinding0_9_1Element);
    base.register('amqpServerBinding0_9', AmqpServerBinding0_9_1Element);
    // HTTP
    base.register('httpChannelBinding', HttpChannelBindingElement);
    base.register('httpMessageBinding', HttpMessageBindingElement);
    base.register('httpOperationBinding', HttpOperationBindingElement);
    base.register('httpServerBinding', HttpServerBindingElement);
    // Kafka
    base.register('kafkaChannelBinding', KafkaChannelBindingElement);
    base.register('kafkaMessageBinding', KafkaMessageBindingElement);
    base.register('kafkaOperationBinding', KafkaOperationBindingElement);
    base.register('kafkaServerBinding', KafkaServerBindingElement);
    // MQTT
    base.register('mqttChannelBinding', MqttChannelBindingElement);
    base.register('mqttMessageBinding', MqttMessageBindingElement);
    base.register('mqttOperationBinding', MqttOperationBindingElement);
    base.register('mqttServerBinding', MqttServerBindingElement);
    // WebSocket
    base.register('webSocketChannelBinding', WebSocketChannelBindingElement);
    base.register('webSocketMessageBinding', WebSocketMessageBindingElement);
    base.register('webSocketOperationBinding', WebSocketOperationBindingElement);
    base.register('webSocketServerBinding', WebSocketServerBindingElement);

    return base;
  },
};

export default asyncApi2_0;
