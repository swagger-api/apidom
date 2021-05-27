import { isElement, keyMap as keyMapBase, Element } from 'apidom';

// getNodeType :: Node -> String
export const getNodeType = <T extends Element>(element: T): string | undefined => {
  if (!isElement(element)) {
    return undefined;
  }
  return `${element.element.charAt(0).toUpperCase() + element.element.slice(1)}Element`;
};

export const keyMap = {
  /**
   * AsyncApi 2.0.0 specification elements.
   */
  AsyncApi2_0Element: ['content'],
  ChannelBindingsElement: ['content'],
  ChannelItemElement: ['content'],
  ChannelsElement: ['content'],
  ComponentsElement: ['content'],
  ContactElement: ['content'],
  CorrelationIDElement: ['content'],
  DefaultContentType: [],
  ExternalDocumentationElement: ['content'],
  InfoElement: ['content'],
  LicenseElement: ['content'],
  OAuthFlowElement: ['content'],
  OAuthFlowsElement: ['content'],
  OperationElement: ['content'],
  ParameterElement: ['content'],
  ParametersElement: ['content'],
  ReferenceElement: ['content'],
  SchemaElement: ['content'],
  SecurityRequirementElement: ['content'],
  ServerElement: ['content'],
  ServerBindingElement: ['content'],
  ServersElement: ['content'],
  ServerVariableElement: ['content'],
  TagElement: ['content'],
  TagsElement: ['content'],
  /**
   * Binding elements.
   */
  // AMQP
  AmqpChannelBindingElement: ['content'],
  AmqpMessageBindingElement: ['content'],
  AmqpOperationBindingElement: ['content'],
  // HTTP
  HttpMessageBindingElement: ['content'],
  HttpOperationBindingElement: ['content'],
  // Kafka
  KafkaMessageBindingElement: ['content'],
  KafkaOperationBindingElement: ['content'],
  // MQTT
  MqttChannelBindingElement: ['content'],
  MqttMessageBindingElement: ['content'],
  MqttServerBindingElement: ['content'],
  // WebSocket
  WebSocketChannelBindingElement: ['content'],
  ...keyMapBase,
};
