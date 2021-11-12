import {
  MemberElement,
  ObjectElement,
  ArrayElement,
  isStringElement,
  includesClasses,
} from '@swagger-api/apidom-core';

/**
 * AsyncApi 2.0.0 | 2.1.0 | 2.2.0 specification elements.
 */
import AsyncApiVersionElement from '../../elements/AsyncApiVersion';
import IdentifierElement from '../../elements/Identifier';
import InfoElement from '../../elements/Info';
import ServersElement from '../../elements/Servers';
import DefaultContentTypeElement from '../../elements/DefaultContentType';
import ChannelsElement from '../../elements/Channels';
import ComponentsElement from '../../elements/Components';
import TagsElement from '../../elements/Tags';
import ExternalDocumentationElement from '../../elements/ExternalDocumentation';
import ContactElement from '../../elements/Contact';
import LicenseElement from '../../elements/License';
import ServerElement from '../../elements/Server';
import ServerVariableElement from '../../elements/ServerVariable';
import ChannelItemElement from '../../elements/ChannelItem';
import SchemaElement from '../../elements/Schema';
import MessageElement from '../../elements/Message';
import SecuritySchemeElement from '../../elements/SecurityScheme';
import ParameterElement from '../../elements/Parameter';
import CorrelationIDElement from '../../elements/CorrelationID';
import OperationTraitElement from '../../elements/OperationTrait';
import MessageTraitElement from '../../elements/MessageTrait';
import ServerBindingsElement from '../../elements/ServerBindings';
import ChannelBindingsElement from '../../elements/ChannelBindings';
import OperationBindingsElement from '../../elements/OperationBindings';
import MessageBindingsElement from '../../elements/MessageBindings';
import OAuthFlowsElement from '../../elements/OAuthFlows';
import OAuthFlowElement from '../../elements/OAuthFlow';
import OperationElement from '../../elements/Operation';
/**
 * Binding elements.
 */
// AMQP 0-9-1
import AmqpChannelBindingElement from '../../elements/bindings/amqp/AmqpChannelBinding';
import AmqpMessageBindingElement from '../../elements/bindings/amqp/AmqpMessageBinding';
import AmqpOperationBindingElement from '../../elements/bindings/amqp/AmqpOperationBinding';
import AmqpServerBindingElement from '../../elements/bindings/amqp/AmqpServerBinding';
// AMQP 1.0
import Amqp1ChannelBindingElement from '../../elements/bindings/amqp1/Amqp1ChannelBinding';
import Amqp1MessageBindingElement from '../../elements/bindings/amqp1/Amqp1MessageBinding';
import Amqp1OperationBindingElement from '../../elements/bindings/amqp1/Amqp1OperationBinding';
import Amqp1ServerBindingElement from '../../elements/bindings/amqp1/Amqp1ServerBinding';
// HTTP
import HttpChannelBindingElement from '../../elements/bindings/http/HttpChannelBinding';
import HttpMessageBindingElement from '../../elements/bindings/http/HttpMessageBinding';
import HttpOperationBindingElement from '../../elements/bindings/http/HttpOperationBinding';
import HttpServerBindingElement from '../../elements/bindings/http/HttpServerBinding';
// IBM MQ
import IbmmqChannelBindingElement from '../../elements/bindings/ibmmq/IbmmqChannelBinding';
import IbmmqMessageBindingElement from '../../elements/bindings/ibmmq/IbmmqMessageBinding';
import IbmmqServerBindingElement from '../../elements/bindings/ibmmq/IbmmqServerBinding';
// JMS
import JmsChannelBindingElement from '../../elements/bindings/jms/JmsChannelBinding';
import JmsMessageBindingElement from '../../elements/bindings/jms/JmsMessageBinding';
import JmsOperationBindingElement from '../../elements/bindings/jms/JmsOperationBinding';
import JmsServerBindingElement from '../../elements/bindings/jms/JmsServerBinding';
// Kafka
import KafkaChannelBindingElement from '../../elements/bindings/kafka/KafkaChannelBinding';
import KafkaMessageBindingElement from '../../elements/bindings/kafka/KafkaMessageBinding';
import KafkaOperationBindingElement from '../../elements/bindings/kafka/KafkaOperationBinding';
import KafkaServerBindingElement from '../../elements/bindings/kafka/KafkaServerBinding';
// Anypoint MQ
import AnypointmqChannelBindingElement from '../../elements/bindings/anypointmq/AnypointmqChannelBinding';
import AnypointmqMessageBindingElement from '../../elements/bindings/anypointmq/AnypointmqMessageBinding';
import AnypointmqOperationBindingElement from '../../elements/bindings/anypointmq/AnypointmqOperationBinding';
import AnypointmqServerBindingElement from '../../elements/bindings/anypointmq/AnypointmqServerBinding';
// Mercure
import MercureChannelBindingElement from '../../elements/bindings/mercure/MercureChannelBinding';
import MercureMessageBindingElement from '../../elements/bindings/mercure/MercureMessageBinding';
import MercureOperationBindingElement from '../../elements/bindings/mercure/MercureOperationBinding';
import MercureServerBindingElement from '../../elements/bindings/mercure/MercureServerBinding';
// MQTT
import MqttChannelBindingElement from '../../elements/bindings/mqtt/MqttChannelBinding';
import MqttMessageBindingElement from '../../elements/bindings/mqtt/MqttMessageBinding';
import MqttOperationBindingElement from '../../elements/bindings/mqtt/MqttOperationBinding';
import MqttServerBindingElement from '../../elements/bindings/mqtt/MqttServerBinding';
// MQTT 5
import Mqtt5ChannelBindingElement from '../../elements/bindings/mqtt5/Mqtt5ChannelBinding';
import Mqtt5MessageBindingElement from '../../elements/bindings/mqtt5/Mqtt5MessageBinding';
import Mqtt5OperationBindingElement from '../../elements/bindings/mqtt5/Mqtt5OperationBinding';
import Mqtt5ServerBindingElement from '../../elements/bindings/mqtt5/Mqtt5ServerBinding';
// NATS
import NatsChannelBindingElement from '../../elements/bindings/nats/NatsChannelBinding';
import NatsMessageBindingElement from '../../elements/bindings/nats/NatsMessageBinding';
import NatsOperationBindingElement from '../../elements/bindings/nats/NatsOperationBinding';
import NatsServerBindingElement from '../../elements/bindings/nats/NatsServerBinding';
// Redis
import RedisChannelBindingElement from '../../elements/bindings/redis/RedisChannelBinding';
import RedisMessageBindingElement from '../../elements/bindings/redis/RedisMessageBinding';
import RedisOperationBindingElement from '../../elements/bindings/redis/RedisOperationBinding';
import RedisServerBindingElement from '../../elements/bindings/redis/RedisServerBinding';
// SNS
import SnsChannelBindingElement from '../../elements/bindings/sns/SnsChannelBinding';
import SnsMessageBindingElement from '../../elements/bindings/sns/SnsMessageBinding';
import SnsOperationBindingElement from '../../elements/bindings/sns/SnsOperationBinding';
import SnsServerBindingElement from '../../elements/bindings/sns/SnsServerBinding';
// SQS
import SqsChannelBindingElement from '../../elements/bindings/sqs/SqsChannelBinding';
import SqsMessageBindingElement from '../../elements/bindings/sqs/SqsMessageBinding';
import SqsOperationBindingElement from '../../elements/bindings/sqs/SqsOperationBinding';
import SqsServerBindingElement from '../../elements/bindings/sqs/SqsServerBinding';
// STOMP
import StompChannelBindingElement from '../../elements/bindings/stomp/StompChannelBinding';
import StompMessageBindingElement from '../../elements/bindings/stomp/StompMessageBinding';
import StompOperationBindingElement from '../../elements/bindings/stomp/StompOperationBinding';
import StompServerBindingElement from '../../elements/bindings/stomp/StompServerBinding';
// WebSocket
import WebSocketChannelBindingElement from '../../elements/bindings/ws/WebSocketChannelBinding';
import WebSocketMessageBindingElement from '../../elements/bindings/ws/WebSocketMessageBinding';
import WebSocketOperationBindingElement from '../../elements/bindings/ws/WebSocketOperationBinding';
import WebSocketServerBindingElement from '../../elements/bindings/ws/WebSocketServerBinding';
// non-concrete Elements (NCEs)
import ComponentsSchemasElement from '../../elements/nces/ComponentsSchemas';
import ComponentsMessagesElement from '../../elements/nces/ComponentsMessages';
import ComponentsSecuritySchemesElement from '../../elements/nces/ComponentsSecuritySchemes';
import ComponentsParametersElement from '../../elements/nces/ComponentsParameters';
import ComponentsCorrelationIDsElement from '../../elements/nces/ComponentsCorrelationIDs';
import ComponentsOperationTraitsElement from '../../elements/nces/ComponentsOperationTraits';
import ComponentsMessageTraitsElement from '../../elements/nces/ComponentsMessageTraits';
import ComponentsServerBindingsElement from '../../elements/nces/ComponentsServerBindings';
import ComponentsChannelBindingsElement from '../../elements/nces/ComponentsChannelBindings';
import ComponentsOperationBindingsElement from '../../elements/nces/ComponentsOperationBindings';
import ComponentsMessageBindingsElement from '../../elements/nces/ComponentsMessageBindings';
import ServerVariablesElement from '../../elements/nces/ServerVariables';
import ChannelItemServersElement from '../../elements/nces/ChannelItemsServers';
import OAuthFlowScopesElement from '../../elements/nces/OAuthFlowScopes';
import OperationTraitsElement from '../../elements/nces/OperationTraits';
import { getNodeType } from '../../traversal/visitor';

/**
 * This plugin is specific to YAML 1.2 format, which allows defining key-value pairs
 * with empty key, empty value, or both. If the value is not provided in YAML format,
 * this plugin compensates for this missing value with the most appropriate semantic element type.
 *
 * https://yaml.org/spec/1.2.2/#72-empty-nodes
 *
 * @example
 *
 * ```yaml
 * asyncapi: 2.2.0
 * info:
 * ```
 * Refracting result without this plugin:
 *
 *  (AsyncApi2Element
 *    (MemberElement
 *      (StringElement)
 *      (AsyncApiVersionElement))
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *
 * Refracting result with this plugin:
 *
 *  (AsyncApi2Element
 *    (MemberElement
 *      (StringElement)
 *      (AsyncApiVersionElement))
 *    (MemberElement
 *      (StringElement)
 *      (InfoElement))
 */

const isEmptyElement = (element: any) =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema = {
  // concrete types handling (CTs)
  AsyncApi2Element: {
    asyncapi: () => new AsyncApiVersionElement(),
    identifier: () => new IdentifierElement(),
    info: () => new InfoElement(),
    servers: () => new ServersElement(),
    defaultContentType: () => new DefaultContentTypeElement(),
    channels: () => new ChannelsElement(),
    components: () => new ComponentsElement(),
    tags: () => new TagsElement(),
    externalDocs: () => new ExternalDocumentationElement(),
  },
  InfoElement: {
    contact: () => new ContactElement(),
    license: () => new LicenseElement(),
  },
  ServersElement: {
    '*': () => new ServerElement(),
  },
  ServerElement: {
    variables: () => new ServerVariablesElement(),
    security: () => new ArrayElement(),
    bindings: () => new ServerBindingsElement(),
  },
  ServerVariableElement: {
    enum: () => new ArrayElement(),
    examples: () => new ArrayElement(),
  },
  SecurityRequirementElement: {
    '*': () => new ArrayElement(),
  },
  ChannelsElement: {
    '*': () => new ChannelItemElement(),
  },
  ChannelItemElement: {
    servers: () => new ChannelItemServersElement(),
    subscribe: () => new OperationElement(),
    publish: () => new OperationElement(),
    parameters: () => new ParameterElement(),
    bindings: () => new ChannelBindingsElement(),
  },
  OperationElement: {
    tags: () => new TagsElement(),
    externalDocs: () => new ExternalDocumentationElement(),
    bindings: () => new OperationBindingsElement(),
    traits: () => new OperationTraitsElement(),
    message: () => new MessageElement(),
  },
  ComponentsElement: {
    schemas: () => new ComponentsSchemasElement(),
    messages: () => new ComponentsMessagesElement(),
    securitySchemes: () => new ComponentsSecuritySchemesElement(),
    parameters: () => new ComponentsParametersElement(),
    correlationIds: () => new ComponentsCorrelationIDsElement(),
    operationTraits: () => new ComponentsOperationTraitsElement(),
    messageTraits: () => new ComponentsMessageTraitsElement(),
    serverBindings: () => new ComponentsServerBindingsElement(),
    channelBindings: () => new ComponentsChannelBindingsElement(),
    operationBindings: () => new ComponentsOperationBindingsElement(),
    messageBindings: () => new ComponentsMessageBindingsElement(),
  },
  TagElement: {
    externalDocs: () => new ExternalDocumentationElement(),
  },
  MessageElement: {
    headers: () => new SchemaElement(),
    correlationId: () => new CorrelationIDElement(),
    tags: () => new TagsElement(),
    externalDocs: () => new ExternalDocumentationElement(),
    bindings: () => new MessageBindingsElement(),
    examples: () => new ArrayElement(),
    traits: () => new ArrayElement(),
  },
  SecuritySchemeElement: {
    flows: () => new OAuthFlowsElement(),
  },
  OAuthFlowsElement: {
    implicit: () => new OAuthFlowElement(),
    password: () => new OAuthFlowElement(),
    clientCredentials: () => new OAuthFlowElement(),
    authorizationCode: () => new OAuthFlowElement(),
  },
  OAuthFlow: {
    scopes: () => new OAuthFlowScopesElement(),
  },
  ParametersElement: {
    '*': () => new ParameterElement(),
  },
  ParameterElement: {
    schema: () => new SchemaElement(),
  },
  OperationTraitElement: {
    tags: () => new TagsElement(),
    externalDocs: () => new ExternalDocumentationElement(),
    bindings: () => new OperationBindingsElement(),
  },
  MessageTraitElement: {
    headers: () => new SchemaElement(),
    correlationId: () => new CorrelationIDElement(),
    tags: () => new TagsElement(),
    externalDocs: () => new ExternalDocumentationElement(),
    bindings: () => new MessageBindingsElement(),
    examples: () => new ArrayElement(),
  },
  MessageExampleElement: {
    headers: () => new ObjectElement(),
  },
  OperationBindingsElement: {
    http: () => new HttpOperationBindingElement(),
    ws: () => new WebSocketOperationBindingElement(),
    kafka: () => new KafkaOperationBindingElement(),
    anypointmq: () => new AnypointmqOperationBindingElement(),
    amqp: () => new AmqpOperationBindingElement(),
    amqp1: () => new Amqp1OperationBindingElement(),
    mqtt: () => new MqttOperationBindingElement(),
    mqtt5: () => new Mqtt5OperationBindingElement(),
    nats: () => new NatsOperationBindingElement(),
    jms: () => new JmsOperationBindingElement(),
    sns: () => new SnsOperationBindingElement(),
    sqs: () => new SqsOperationBindingElement(),
    stomp: () => new StompOperationBindingElement(),
    redis: () => new RedisOperationBindingElement(),
    mercure: () => new MercureOperationBindingElement(),
  },
  MessageBindingsElement: {
    http: () => new HttpMessageBindingElement(),
    ws: () => new WebSocketMessageBindingElement(),
    kafka: () => new KafkaMessageBindingElement(),
    anypointmq: () => new AnypointmqMessageBindingElement(),
    amqp: () => new AmqpMessageBindingElement(),
    amqp1: () => new Amqp1MessageBindingElement(),
    mqtt: () => new MqttMessageBindingElement(),
    mqtt5: () => new Mqtt5MessageBindingElement(),
    nats: () => new NatsMessageBindingElement(),
    jms: () => new JmsMessageBindingElement(),
    sns: () => new SnsMessageBindingElement(),
    sqs: () => new SqsMessageBindingElement(),
    stomp: () => new StompMessageBindingElement(),
    redis: () => new RedisMessageBindingElement(),
    mercure: () => new MercureMessageBindingElement(),
    ibmmq: () => new IbmmqMessageBindingElement(),
  },
  ServerBindingsElement: {
    http: () => new HttpServerBindingElement(),
    ws: () => new WebSocketServerBindingElement(),
    kafka: () => new KafkaServerBindingElement(),
    anypointmq: () => new AnypointmqServerBindingElement(),
    amqp: () => new AmqpServerBindingElement(),
    amqp1: () => new Amqp1ServerBindingElement(),
    mqtt: () => new MqttServerBindingElement(),
    mqtt5: () => new Mqtt5ServerBindingElement(),
    nats: () => new NatsServerBindingElement(),
    jms: () => new JmsServerBindingElement(),
    sns: () => new SnsServerBindingElement(),
    sqs: () => new SqsServerBindingElement(),
    stomp: () => new StompServerBindingElement(),
    redis: () => new RedisServerBindingElement(),
    mercure: () => new MercureServerBindingElement(),
    ibmmq: () => new IbmmqServerBindingElement(),
  },
  ChannelBindingsElement: {
    http: () => new HttpChannelBindingElement(),
    ws: () => new WebSocketChannelBindingElement(),
    kafka: () => new KafkaChannelBindingElement(),
    anypointmq: () => new AnypointmqChannelBindingElement(),
    amqp: () => new AmqpChannelBindingElement(),
    amqp1: () => new Amqp1ChannelBindingElement(),
    mqtt: () => new MqttChannelBindingElement(),
    mqtt5: () => new Mqtt5ChannelBindingElement(),
    nats: () => new NatsChannelBindingElement(),
    jms: () => new JmsChannelBindingElement(),
    sns: () => new SnsChannelBindingElement(),
    sqs: () => new SqsChannelBindingElement(),
    stomp: () => new StompChannelBindingElement(),
    redis: () => new RedisChannelBindingElement(),
    mercure: () => new MercureChannelBindingElement(),
    ibmmq: () => new IbmmqChannelBindingElement(),
  },
  SchemaElement: {
    allOf: () => new ArrayElement([], { classes: ['json-schema-allOf'] }),
    anyOf: () => new ArrayElement([], { classes: ['json-schema-anyOf'] }),
    oneOf: () => new ArrayElement([], { classes: ['json-schema-oneOf'] }),
    not: () => new SchemaElement(),
    if: () => new SchemaElement(),
    then: () => new SchemaElement(),
    else: () => new SchemaElement(),
    enum: () => new ArrayElement(),
    items: () => new SchemaElement(),
    additionalItems: () => new SchemaElement(),
    containsProp: () => new SchemaElement(),
    required: () => new ArrayElement([], { classes: ['json-schema-required'] }),
    properties: () => new ObjectElement({}, { classes: ['json-schema-properties'] }),
    patternProperties: () => new ObjectElement({}, { classes: ['json-schema-patternProperties'] }),
    additionalProperties: () => new SchemaElement(),
    dependencies: () => new ObjectElement({}, { classes: ['json-schema-dependencies'] }),
    propertyNames: () => new SchemaElement(),
    examples: () => new ArrayElement([], { classes: ['json-schema-examples'] }),
    definitions: () => new ObjectElement({}, { classes: ['json-schema-definitions'] }),
    externalDocs: () => new ExternalDocumentationElement(),
  },
  HttpOperationBindingElement: {
    query: () => new SchemaElement(),
  },
  HttpMessageBindingElement: {
    headers: () => new SchemaElement(),
  },
  WebSocketChannelBindingElement: {
    query: () => new SchemaElement(),
    headers: () => new SchemaElement(),
  },
  KafkaOperationBindingElement: {
    groupId: () => new SchemaElement(),
    clientId: () => new SchemaElement(),
  },
  KafkaMessageBindingElement: {
    key: () => new SchemaElement(),
  },
  AnypointmqMessageBindingElement: {
    headers: () => new SchemaElement(),
  },
  AmqpChannelBindingElement: {
    exchange: () => new ObjectElement(),
    queue: () => new ObjectElement(),
  },
  AmqpOperationBindingElement: {
    cc: () => new ArrayElement(),
    bcc: () => new ArrayElement(),
  },
  IbmmqChannelBindingElement: {
    queue: () => new ObjectElement(),
    topic: () => new ObjectElement(),
  },
  // non-concrete types handling (NCEs)
  [ComponentsSchemasElement.primaryClass]: {
    '*': () => new SchemaElement(),
  },
  [ComponentsMessagesElement.primaryClass]: {
    '*': () => new MessageElement(),
  },
  [ComponentsSecuritySchemesElement.primaryClass]: {
    '*': () => new SecuritySchemeElement(),
  },
  [ComponentsParametersElement.primaryClass]: {
    '*': () => new ParameterElement(),
  },
  [ComponentsCorrelationIDsElement.primaryClass]: {
    '*': () => new CorrelationIDElement(),
  },
  [ComponentsOperationTraitsElement.primaryClass]: {
    '*': () => new OperationTraitElement(),
  },
  [ComponentsMessageTraitsElement.primaryClass]: {
    '*': () => new MessageTraitElement(),
  },
  [ComponentsServerBindingsElement.primaryClass]: {
    '*': () => new ServerBindingsElement(),
  },
  [ComponentsChannelBindingsElement.primaryClass]: {
    '*': () => new ChannelBindingsElement(),
  },
  [ComponentsOperationBindingsElement.primaryClass]: {
    '*': () => new OperationBindingsElement(),
  },
  [ComponentsMessageBindingsElement.primaryClass]: {
    '*': () => new MessageBindingsElement(),
  },
  [ServerVariablesElement.primaryClass]: {
    '*': () => new ServerVariableElement(),
  },
};

const findElementFactory = (ancestor: any, element: MemberElement) => {
  const elementType = getNodeType(ancestor); // @ts-ignore
  const keyName = element.key.toValue(); // @ts-ignore
  const keyMapping = schema[elementType] || schema[ancestor.classes.first?.toValue?.()];

  return typeof keyMapping === 'undefined'
    ? undefined
    : Object.prototype.hasOwnProperty.call(keyMapping, '*')
    ? keyMapping['*']
    : keyMapping[keyName];
};

const plugin = () => () => {
  return {
    visitor: {
      MemberElement(element: MemberElement, ...rest: any) {
        // no empty Element, continue with next one
        if (!isEmptyElement(element.value)) return undefined;

        const [, , , ancestors] = rest;
        const ancestor = ancestors[ancestors.length - 1];
        const elementFactory = findElementFactory(ancestor, element);

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        return new MemberElement(
          element.key,
          elementFactory(),
          element.meta.clone(),
          element.attributes.clone(),
        );
      },
    },
  };
};

export default plugin;
