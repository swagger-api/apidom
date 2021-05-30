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
  AsyncApiVersionElement: [],
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
  MessageBindingsElement: ['content'],
  OAuthFlowElement: ['content'],
  OAuthFlowsElement: ['content'],
  OperationElement: ['content'],
  OperationBindingsElement: ['content'],
  ParameterElement: ['content'],
  ParametersElement: ['content'],
  ReferenceElement: ['content'],
  SchemaElement: ['content'],
  SecurityRequirementElement: ['content'],
  SecuritySchemeElement: ['content'],
  ServerElement: ['content'],
  ServerBindingsElement: ['content'],
  ServersElement: ['content'],
  ServerVariableElement: ['content'],
  TagElement: ['content'],
  TagsElement: ['content'],
  /**
   * Binding elements.
   */
  // AMQP 0-9-1
  AmqpChannelBindingElement: ['content'],
  AmqpMessageBindingElement: ['content'],
  AmqpOperationBindingElement: ['content'],
  AmqpServerBindingElement: ['content'],
  // AMQP 1.0
  Amqp1ChannelBindingElement: ['content'],
  Amqp1MessageBindingElement: ['content'],
  Amqp1OperationBindingElement: ['content'],
  Amqp1ServerBindingElement: ['content'],
  // HTTP
  HttpChannelBindingElement: ['content'],
  HttpMessageBindingElement: ['content'],
  HttpOperationBindingElement: ['content'],
  HttpServerBindingElement: ['content'],
  // JMS
  JmsChannelBindingElement: ['content'],
  JmsMessageBindingElement: ['content'],
  JmsOperationBindingElement: ['content'],
  JmsServerBindingElement: ['content'],
  // Kafka
  KafkaChannelBindingElement: ['content'],
  KafkaMessageBindingElement: ['content'],
  KafkaOperationBindingElement: ['content'],
  KafkaServerBindingElement: ['content'],
  // Mercure
  MercureChannelBindingElement: ['content'],
  MercureMessageBindingElement: ['content'],
  MercureOperationBindingElement: ['content'],
  MercureServerBindingElement: ['content'],
  // MQTT
  MqttChannelBindingElement: ['content'],
  MqttMessageBindingElement: ['content'],
  MqttOperationBindingElement: ['content'],
  MqttServerBindingElement: ['content'],
  // MQTT 5
  Mqtt5ChannelBindingElement: ['content'],
  Mqtt5MessageBindingElement: ['content'],
  Mqtt5OperationBindingElement: ['content'],
  Mqtt5ServerBindingElement: ['content'],
  // NATS
  NatsChannelBindingElement: ['content'],
  NatsMessageBindingElement: ['content'],
  NatsOperationBindingElement: ['content'],
  NatsServerBindingElement: ['content'],
  // Redis
  RedisChannelBindingElement: ['content'],
  RedisMessageBindingElement: ['content'],
  RedisOperationBindingElement: ['content'],
  RedisServerBindingElement: ['content'],
  // SNS
  SnsChannelBindingElement: ['content'],
  SnsMessageBindingElement: ['content'],
  SnsOperationBindingElement: ['content'],
  SnsServerBindingElement: ['content'],
  // SQS
  SqsChannelBindingElement: ['content'],
  SqsMessageBindingElement: ['content'],
  SqsOperationBindingElement: ['content'],
  SqsServerBindingElement: ['content'],
  // STOMP
  StompChannelBindingElement: ['content'],
  StompMessageBindingElement: ['content'],
  StompOperationBindingElement: ['content'],
  StompServerBindingElement: ['content'],
  // WebSocket
  WebSocketChannelBindingElement: ['content'],
  WebSocketMessageBindingElement: ['content'],
  WebSocketOperationBindingElement: ['content'],
  WebSocketServerBindingElement: ['content'],
  ...keyMapBase,
};
