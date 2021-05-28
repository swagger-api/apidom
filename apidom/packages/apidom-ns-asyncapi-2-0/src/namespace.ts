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
// AMQP
import AmqpChannelBinding0_9Element from './elements/bindings/amqp-0-9/AmqpChannelBinding0-9';
import AmqpMessageBinding0_9Element from './elements/bindings/amqp-0-9/AmqpMessageBinding0-9';
import AmqpOperationBinding0_9Element from './elements/bindings/amqp-0-9/AmqpOperationBinding0-9';
// HTTP
import HttpMessageBindingElement from './elements/bindings/http/HttpMessageBinding';
import HttpOperationBindingElement from './elements/bindings/http/HttpOperationBinding';
// Kafka
import KafkaMessageBindingElement from './elements/bindings/kafka/KafkaMessageBinding';
import KafkaOperationBindingElement from './elements/bindings/kafka/KafkaOperationBinding';
// MQTT
import MqttMessageBindingElement from './elements/bindings/mqtt/MqttMessageBinding';
import MqttOperationBindingElement from './elements/bindings/mqtt/MqttOperationBinding';
import MqttServerBindingElement from './elements/bindings/mqtt/MqttServerBinding';
// WebSocket
import WebSocketChannelBindingElement from './elements/bindings/ws/WebSocketChannelBinding';

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
    base.register('amqpChannelBindingElement', AmqpChannelBinding0_9Element);
    base.register('amqpMessageBindingElement', AmqpMessageBinding0_9Element);
    base.register('amqpOperationBindingElement', AmqpOperationBinding0_9Element);
    // HTTP
    base.register('httpMessageBindingElement', HttpMessageBindingElement);
    base.register('httpOperationBindingElement', HttpOperationBindingElement);
    // Kafka
    base.register('kafkaMessageBindingElement', KafkaMessageBindingElement);
    base.register('kafkaOperationBindingElement', KafkaOperationBindingElement);
    // MQTT
    base.register('mqttMessageBindingElement', MqttMessageBindingElement);
    base.register('mqttOperationBindingElement', MqttOperationBindingElement);
    base.register('mqttServerBindingElement', MqttServerBindingElement);
    // WebSocket
    base.register('webSocketChannelBindingElement', WebSocketChannelBindingElement);

    return base;
  },
};

export default asyncApi2_0;
