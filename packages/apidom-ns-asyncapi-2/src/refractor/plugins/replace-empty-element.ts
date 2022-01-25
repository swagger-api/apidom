import { defaultTo } from 'ramda';
import {
  MemberElement,
  StringElement,
  ObjectElement,
  ArrayElement,
  isStringElement,
  includesClasses,
  isArrayElement,
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
import SecurityRequirementElement from '../../elements/SecurityRequirement';
import TagElement from '../../elements/Tag';
import MessageExampleElement from '../../elements/MessageExample';
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
import ServerSecurityElement from '../../elements/nces/ServerSecurity';
import OperationMessageElement from '../../elements/nces/OperationMessage';
import MessageExamplesElement from '../../elements/nces/MessageExamples';
import MessageTraitsElement from '../../elements/nces/MessageTraits';
import MessageTraitExamplesElement from '../../elements/nces/MessageTraitExamples';
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
    asyncapi: (...args: any[]) => new AsyncApiVersionElement(...args),
    identifier: (...args: any[]) => new IdentifierElement(...args),
    info: (...args: any[]) => new InfoElement(...args),
    servers: (...args: any[]) => new ServersElement(...args),
    defaultContentType: (...args: any[]) => new DefaultContentTypeElement(...args),
    channels: (...args: any[]) => new ChannelsElement(...args),
    components: (...args: any[]) => new ComponentsElement(...args),
    tags: (...args: any[]) => new TagsElement(...args),
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
  },
  InfoElement: {
    contact: (...args: any[]) => new ContactElement(...args),
    license: (...args: any[]) => new LicenseElement(...args),
  },
  ServersElement: {
    '[key: *]': (...args: any[]) => new ServerElement(...args),
  },
  ServerElement: {
    variables: (...args: any[]) => new ServerVariablesElement(...args),
    security: (...args: any[]) => new ServerSecurityElement(...args),
    bindings: (...args: any[]) => new ServerBindingsElement(...args),
  },
  ServerVariableElement: {
    enum: (...args: any[]) => new ArrayElement(...args),
    examples: (...args: any[]) => new ArrayElement(...args),
  },
  SecurityRequirementElement: {
    '[key: *]': (...args: any[]) => new ArrayElement(...args),
  },
  ChannelsElement: {
    '[key: *]': (...args: any[]) => new ChannelItemElement(...args),
  },
  ChannelItemElement: {
    servers: (...args: any[]) => new ChannelItemServersElement(...args),
    subscribe: (...args: any[]) => new OperationElement(...args),
    publish: (...args: any[]) => new OperationElement(...args),
    parameters: (...args: any[]) => new ParameterElement(...args),
    bindings: (...args: any[]) => new ChannelBindingsElement(...args),
  },
  OperationElement: {
    tags: (...args: any[]) => new TagsElement(...args),
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
    bindings: (...args: any[]) => new OperationBindingsElement(...args),
    traits: (...args: any[]) => new OperationTraitsElement(...args),
    message: (...args: any[]) => new MessageElement(...args),
  },
  ComponentsElement: {
    schemas: (...args: any[]) => new ComponentsSchemasElement(...args),
    messages: (...args: any[]) => new ComponentsMessagesElement(...args),
    securitySchemes: (...args: any[]) => new ComponentsSecuritySchemesElement(...args),
    parameters: (...args: any[]) => new ComponentsParametersElement(...args),
    correlationIds: (...args: any[]) => new ComponentsCorrelationIDsElement(...args),
    operationTraits: (...args: any[]) => new ComponentsOperationTraitsElement(...args),
    messageTraits: (...args: any[]) => new ComponentsMessageTraitsElement(...args),
    serverBindings: (...args: any[]) => new ComponentsServerBindingsElement(...args),
    channelBindings: (...args: any[]) => new ComponentsChannelBindingsElement(...args),
    operationBindings: (...args: any[]) => new ComponentsOperationBindingsElement(...args),
    messageBindings: (...args: any[]) => new ComponentsMessageBindingsElement(...args),
  },
  TagElement: {
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
  },
  MessageElement: {
    headers: (...args: any[]) => new SchemaElement(...args),
    correlationId: (...args: any[]) => new CorrelationIDElement(...args),
    tags: (...args: any[]) => new TagsElement(...args),
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
    bindings: (...args: any[]) => new MessageBindingsElement(...args),
    examples: (...args: any[]) => new ArrayElement(...args),
    traits: (...args: any[]) => new ArrayElement(...args),
    payload(...args: any[]) {
      // @ts-ignore
      const { context: messageElement } = this;
      const supportedSchemaFormats = [
        'application/vnd.aai.asyncapi;version=2.0.0',
        'application/vnd.aai.asyncapi+json;version=2.0.0',
        'application/vnd.aai.asyncapi+yaml;version=2.0.0',
        'application/vnd.aai.asyncapi;version=2.1.0',
        'application/vnd.aai.asyncapi+json;version=2.1.0',
        'application/vnd.aai.asyncapi+yaml;version=2.1.0',
        'application/vnd.aai.asyncapi;version=2.2.0',
        'application/vnd.aai.asyncapi+json;version=2.2.0',
        'application/vnd.aai.asyncapi+yaml;version=2.2.0',
      ];
      const schemaFormat = defaultTo(
        'application/vnd.aai.asyncapi;version=2.2.0',
        messageElement.schemaFormat?.toValue(),
      );

      if (supportedSchemaFormats.includes(schemaFormat)) {
        return new SchemaElement(...args);
      }

      return new ObjectElement(...args);
    },
  },
  SecuritySchemeElement: {
    flows: (...args: any[]) => new OAuthFlowsElement(...args),
  },
  OAuthFlowsElement: {
    implicit: (...args: any[]) => new OAuthFlowElement(...args),
    password: (...args: any[]) => new OAuthFlowElement(...args),
    clientCredentials: (...args: any[]) => new OAuthFlowElement(...args),
    authorizationCode: (...args: any[]) => new OAuthFlowElement(...args),
  },
  OAuthFlow: {
    scopes: (...args: any[]) => new OAuthFlowScopesElement(...args),
  },
  ParametersElement: {
    '[key: *]': (...args: any[]) => new ParameterElement(...args),
  },
  ParameterElement: {
    schema: (...args: any[]) => new SchemaElement(...args),
  },
  OperationTraitElement: {
    tags: (...args: any[]) => new TagsElement(...args),
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
    bindings: (...args: any[]) => new OperationBindingsElement(...args),
  },
  MessageTraitElement: {
    headers: (...args: any[]) => new SchemaElement(...args),
    correlationId: (...args: any[]) => new CorrelationIDElement(...args),
    tags: (...args: any[]) => new TagsElement(...args),
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
    bindings: (...args: any[]) => new MessageBindingsElement(...args),
    examples: (...args: any[]) => new ArrayElement(...args),
  },
  MessageExampleElement: {
    headers: (...args: any[]) => new ObjectElement(...args),
  },
  OperationBindingsElement: {
    http: (...args: any[]) => new HttpOperationBindingElement(...args),
    ws: (...args: any[]) => new WebSocketOperationBindingElement(...args),
    kafka: (...args: any[]) => new KafkaOperationBindingElement(...args),
    anypointmq: (...args: any[]) => new AnypointmqOperationBindingElement(...args),
    amqp: (...args: any[]) => new AmqpOperationBindingElement(...args),
    amqp1: (...args: any[]) => new Amqp1OperationBindingElement(...args),
    mqtt: (...args: any[]) => new MqttOperationBindingElement(...args),
    mqtt5: (...args: any[]) => new Mqtt5OperationBindingElement(...args),
    nats: (...args: any[]) => new NatsOperationBindingElement(...args),
    jms: (...args: any[]) => new JmsOperationBindingElement(...args),
    sns: (...args: any[]) => new SnsOperationBindingElement(...args),
    sqs: (...args: any[]) => new SqsOperationBindingElement(...args),
    stomp: (...args: any[]) => new StompOperationBindingElement(...args),
    redis: (...args: any[]) => new RedisOperationBindingElement(...args),
    mercure: (...args: any[]) => new MercureOperationBindingElement(...args),
  },
  MessageBindingsElement: {
    http: (...args: any[]) => new HttpMessageBindingElement(...args),
    ws: (...args: any[]) => new WebSocketMessageBindingElement(...args),
    kafka: (...args: any[]) => new KafkaMessageBindingElement(...args),
    anypointmq: (...args: any[]) => new AnypointmqMessageBindingElement(...args),
    amqp: (...args: any[]) => new AmqpMessageBindingElement(...args),
    amqp1: (...args: any[]) => new Amqp1MessageBindingElement(...args),
    mqtt: (...args: any[]) => new MqttMessageBindingElement(...args),
    mqtt5: (...args: any[]) => new Mqtt5MessageBindingElement(...args),
    nats: (...args: any[]) => new NatsMessageBindingElement(...args),
    jms: (...args: any[]) => new JmsMessageBindingElement(...args),
    sns: (...args: any[]) => new SnsMessageBindingElement(...args),
    sqs: (...args: any[]) => new SqsMessageBindingElement(...args),
    stomp: (...args: any[]) => new StompMessageBindingElement(...args),
    redis: (...args: any[]) => new RedisMessageBindingElement(...args),
    mercure: (...args: any[]) => new MercureMessageBindingElement(...args),
    ibmmq: (...args: any[]) => new IbmmqMessageBindingElement(...args),
  },
  ServerBindingsElement: {
    http: (...args: any[]) => new HttpServerBindingElement(...args),
    ws: (...args: any[]) => new WebSocketServerBindingElement(...args),
    kafka: (...args: any[]) => new KafkaServerBindingElement(...args),
    anypointmq: (...args: any[]) => new AnypointmqServerBindingElement(...args),
    amqp: (...args: any[]) => new AmqpServerBindingElement(...args),
    amqp1: (...args: any[]) => new Amqp1ServerBindingElement(...args),
    mqtt: (...args: any[]) => new MqttServerBindingElement(...args),
    mqtt5: (...args: any[]) => new Mqtt5ServerBindingElement(...args),
    nats: (...args: any[]) => new NatsServerBindingElement(...args),
    jms: (...args: any[]) => new JmsServerBindingElement(...args),
    sns: (...args: any[]) => new SnsServerBindingElement(...args),
    sqs: (...args: any[]) => new SqsServerBindingElement(...args),
    stomp: (...args: any[]) => new StompServerBindingElement(...args),
    redis: (...args: any[]) => new RedisServerBindingElement(...args),
    mercure: (...args: any[]) => new MercureServerBindingElement(...args),
    ibmmq: (...args: any[]) => new IbmmqServerBindingElement(...args),
  },
  ChannelBindingsElement: {
    http: (...args: any[]) => new HttpChannelBindingElement(...args),
    ws: (...args: any[]) => new WebSocketChannelBindingElement(...args),
    kafka: (...args: any[]) => new KafkaChannelBindingElement(...args),
    anypointmq: (...args: any[]) => new AnypointmqChannelBindingElement(...args),
    amqp: (...args: any[]) => new AmqpChannelBindingElement(...args),
    amqp1: (...args: any[]) => new Amqp1ChannelBindingElement(...args),
    mqtt: (...args: any[]) => new MqttChannelBindingElement(...args),
    mqtt5: (...args: any[]) => new Mqtt5ChannelBindingElement(...args),
    nats: (...args: any[]) => new NatsChannelBindingElement(...args),
    jms: (...args: any[]) => new JmsChannelBindingElement(...args),
    sns: (...args: any[]) => new SnsChannelBindingElement(...args),
    sqs: (...args: any[]) => new SqsChannelBindingElement(...args),
    stomp: (...args: any[]) => new StompChannelBindingElement(...args),
    redis: (...args: any[]) => new RedisChannelBindingElement(...args),
    mercure: (...args: any[]) => new MercureChannelBindingElement(...args),
    ibmmq: (...args: any[]) => new IbmmqChannelBindingElement(...args),
  },
  SchemaElement: {
    allOf: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-allOf');
      return element;
    },
    anyOf: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-anyOf');
      return element;
    },
    oneOf: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-oneOf');
      return element;
    },
    not: (...args: any[]) => new SchemaElement(...args),
    if: (...args: any[]) => new SchemaElement(...args),
    then: (...args: any[]) => new SchemaElement(...args),
    else: (...args: any[]) => new SchemaElement(...args),
    enum: (...args: any[]) => new ArrayElement(...args),
    items: (...args: any[]) => new SchemaElement(...args),
    additionalItems: (...args: any[]) => new SchemaElement(...args),
    contains: (...args: any[]) => new SchemaElement(...args),
    required: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-required');
      return element;
    },
    properties: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-properties');
      return element;
    },
    patternProperties: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-patternProperties');
      return element;
    },
    additionalProperties: (...args: any[]) => new SchemaElement(...args),
    dependencies: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-dependencies');
      return element;
    },
    propertyNames: (...args: any[]) => new SchemaElement(...args),
    examples: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-examples');
      return element;
    },
    definitions: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-definitions');
      return element;
    },
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
  },
  HttpOperationBindingElement: {
    query: (...args: any[]) => new SchemaElement(...args),
  },
  HttpMessageBindingElement: {
    headers: (...args: any[]) => new SchemaElement(...args),
  },
  WebSocketChannelBindingElement: {
    query: (...args: any[]) => new SchemaElement(...args),
    headers: (...args: any[]) => new SchemaElement(...args),
  },
  KafkaOperationBindingElement: {
    groupId: (...args: any[]) => new SchemaElement(...args),
    clientId: (...args: any[]) => new SchemaElement(...args),
  },
  KafkaMessageBindingElement: {
    key: (...args: any[]) => new SchemaElement(...args),
  },
  AnypointmqMessageBindingElement: {
    headers: (...args: any[]) => new SchemaElement(...args),
  },
  AmqpChannelBindingElement: {
    exchange: (...args: any[]) => new ObjectElement(...args),
    queue: (...args: any[]) => new ObjectElement(...args),
  },
  AmqpOperationBindingElement: {
    cc: (...args: any[]) => new ArrayElement(...args),
    bcc: (...args: any[]) => new ArrayElement(...args),
  },
  IbmmqChannelBindingElement: {
    queue: (...args: any[]) => new ObjectElement(...args),
    topic: (...args: any[]) => new ObjectElement(...args),
  },
  TagsElement: {
    '<*>': (...args: any[]) => new TagElement(...args),
  },
  // non-concrete types handling (NCEs)
  [ComponentsSchemasElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new SchemaElement(...args),
  },
  [ComponentsMessagesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new MessageElement(...args),
  },
  [ComponentsSecuritySchemesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new SecuritySchemeElement(...args),
  },
  [ComponentsParametersElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ParameterElement(...args),
  },
  [ComponentsCorrelationIDsElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new CorrelationIDElement(...args),
  },
  [ComponentsOperationTraitsElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new OperationTraitElement(...args),
  },
  [ComponentsMessageTraitsElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new MessageTraitElement(...args),
  },
  [ComponentsServerBindingsElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ServerBindingsElement(...args),
  },
  [ComponentsChannelBindingsElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ChannelBindingsElement(...args),
  },
  [ComponentsOperationBindingsElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new OperationBindingsElement(...args),
  },
  [ComponentsMessageBindingsElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new MessageBindingsElement(...args),
  },
  [ServerVariablesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ServerVariableElement(...args),
  },
  'json-schema-properties': {
    '[key: *]': (...args: any[]) => new SchemaElement(...args),
  },
  [ServerSecurityElement.primaryClass]: {
    '<*>': (...args: any[]) => new SecurityRequirementElement(...args),
  },
  [OperationTraitsElement.primaryClass]: {
    '<*>': (...args: any[]) => new OperationTraitElement(...args),
  },
  [OperationMessageElement.primaryClass]: {
    '<*>': (...args: any[]) => new MessageElement(...args),
  },
  [MessageExamplesElement.primaryClass]: {
    '<*>': (...args: any[]) => new MessageExampleElement(...args),
  },
  [MessageTraitsElement.primaryClass]: {
    '<*>': (...args: any[]) => new MessageTraitElement(...args),
  },
  [MessageTraitExamplesElement.primaryClass]: {
    '<*>': (...args: any[]) => new MessageExampleElement(...args),
  },
  'json-schema-allOf': {
    '<*>': (...args: any[]) => new SchemaElement(...args),
  },
  'json-schema-anyOf': {
    '<*>': (...args: any[]) => new SchemaElement(...args),
  },
  'json-schema-oneOf': {
    '<*>': (...args: any[]) => new SchemaElement(...args),
  },
};

const findElementFactory = (ancestor: any, keyName: string) => {
  const elementType = getNodeType(ancestor); // @ts-ignore
  const keyMapping = schema[elementType] || schema[ancestor.classes.first?.toValue?.()];

  return typeof keyMapping === 'undefined'
    ? undefined
    : Object.prototype.hasOwnProperty.call(keyMapping, '[key: *]')
    ? keyMapping['[key: *]']
    : keyMapping[keyName];
};

const plugin = () => () => {
  return {
    visitor: {
      MemberElement(element: MemberElement, ...rest: any) {
        // no empty Element, continue with next one
        if (!isEmptyElement(element.value)) return undefined;

        const [, , , ancestors] = rest;
        const ancestor = ancestors[ancestors.length - 1]; // @ts-ignore
        const elementFactory = findElementFactory(ancestor, element.key.toValue());

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        const originalValue = element.value as StringElement;

        return new MemberElement(
          element.key,
          elementFactory.call(
            { context: ancestor },
            undefined,
            originalValue.meta.clone(),
            originalValue.attributes.clone(),
          ),
          element.meta.clone(),
          element.attributes.clone(),
        );
      },

      StringElement(element: StringElement, ...rest: any) {
        if (!isEmptyElement(element)) return undefined;

        const [, , , ancestors] = rest;
        const ancestor = ancestors[ancestors.length - 1];

        // we're only interested in empty elements in ArrayElements
        if (!isArrayElement(ancestor)) return undefined;

        const elementFactory = findElementFactory(ancestor, '<*>');

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        return elementFactory(undefined, element.meta.clone(), element.attributes.clone());
      },
    },
  };
};

export default plugin;
