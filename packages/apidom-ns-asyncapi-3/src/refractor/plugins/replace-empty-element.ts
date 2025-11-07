import { defaultTo } from 'ramda';
import {
  ArrayElement,
  ObjectElement,
  StringElement,
  assignSourceMap,
  cloneDeep,
  includesClasses,
  isArrayElement,
  isElement,
  isMemberElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import {
  ComponentsChannelBindingsElement,
  ComponentsCorrelationIDsElement,
  ComponentsMessageBindingsElement,
  ComponentsMessageTraitsElement,
  ComponentsMessagesElement,
  ComponentsOperationBindingsElement,
  ComponentsOperationTraitsElement,
  ComponentsParametersElement,
  ComponentsSecuritySchemesElement,
  ComponentsServerBindingsElement,
  ComponentsServerVariablesElement,
  ComponentsServersElement,
  MessageTraitExamplesElement,
  ServerSecurityElement,
  ServerVariablesElement,
} from '@swagger-api/apidom-ns-asyncapi-2';

import mediaTypes from '../../media-types.ts';
import AsyncApiVersionElement from '../../elements/AsyncApiVersion.ts';
import IdentifierElement from '../../elements/Identifier.ts';
import InfoElement from '../../elements/Info.ts';
import ServersElement from '../../elements/Servers.ts';
import DefaultContentTypeElement from '../../elements/DefaultContentType.ts';
import ChannelsElement from '../../elements/Channels.ts';
import ComponentsElement from '../../elements/Components.ts';
import TagsElement from '../../elements/Tags.ts';
import ExternalDocumentationElement from '../../elements/ExternalDocumentation.ts';
import ContactElement from '../../elements/Contact.ts';
import LicenseElement from '../../elements/License.ts';
import ServerElement from '../../elements/Server.ts';
import ServerVariableElement from '../../elements/ServerVariable.ts';
import ChannelElement from '../../elements/Channel.ts';
import SchemaElement from '../../elements/Schema.ts';
import MessageElement from '../../elements/Message.ts';
import MessagesElement from '../../elements/Messages.ts';
import SecuritySchemeElement from '../../elements/SecurityScheme.ts';
import ParameterElement from '../../elements/Parameter.ts';
import ParametersElement from '../../elements/Parameters.ts';
import CorrelationIDElement from '../../elements/CorrelationID.ts';
import OperationTraitElement from '../../elements/OperationTrait.ts';
import MessageTraitElement from '../../elements/MessageTrait.ts';
import ServerBindingsElement from '../../elements/ServerBindings.ts';
import ChannelBindingsElement from '../../elements/ChannelBindings.ts';
import OperationBindingsElement from '../../elements/OperationBindings.ts';
import MessageBindingsElement from '../../elements/MessageBindings.ts';
import OAuthFlowsElement from '../../elements/OauthFlows.ts';
import OAuthFlowElement from '../../elements/OauthFlow.ts';
import OperationElement from '../../elements/Operation.ts';
import OperationReplyElement from '../../elements/OperationReply.ts';
import OperationReplyAddressElement from '../../elements/OperationReplyAddress.ts';
import OperationsElement from '../../elements/Operations.ts';
import TagElement from '../../elements/Tag.ts';
import MessageExampleElement from '../../elements/MessageExample.ts';
import ReferenceElement from '../../elements/Reference.ts';
import MultiFormatSchemaElement from '../../elements/MultiFormatSchema.ts';
import ComponentsRepliesElement from '../../elements/nces/ComponentsReplies.ts';
import ComponentsReplyAddressesElement from '../../elements/nces/ComponentsReplyAddresses.ts';
// binding elements
import AmqpChannelBindingElement from '../../elements/bindings/amqp/AmqpChannelBinding.ts';
import AmqpMessageBindingElement from '../../elements/bindings/amqp/AmqpMessageBinding.ts';
import AmqpOperationBindingElement from '../../elements/bindings/amqp/AmqpOperationBinding.ts';
import AmqpServerBindingElement from '../../elements/bindings/amqp/AmqpServerBinding.ts';
import Amqp1ChannelBindingElement from '../../elements/bindings/amqp1/Amqp1ChannelBinding.ts';
import Amqp1MessageBindingElement from '../../elements/bindings/amqp1/Amqp1MessageBinding.ts';
import Amqp1OperationBindingElement from '../../elements/bindings/amqp1/Amqp1OperationBinding.ts';
import Amqp1ServerBindingElement from '../../elements/bindings/amqp1/Amqp1ServerBinding.ts';
import AnypointmqChannelBindingElement from '../../elements/bindings/anypointmq/AnypointmqChannelBinding.ts';
import AnypointmqMessageBindingElement from '../../elements/bindings/anypointmq/AnypointmqMessageBinding.ts';
import AnypointmqOperationBindingElement from '../../elements/bindings/anypointmq/AnypointmqOperationBinding.ts';
import AnypointmqServerBindingElement from '../../elements/bindings/anypointmq/AnypointmqServerBinding.ts';
import GooglepubsubChannelBindingElement from '../../elements/bindings/googlepubsub/GooglepubsubChannelBinding.ts';
import GooglepubsubMessageBindingElement from '../../elements/bindings/googlepubsub/GooglepubsubMessageBinding.ts';
import GooglepubsubOperationBindingElement from '../../elements/bindings/googlepubsub/GooglepubsubOperationBinding.ts';
import GooglepubsubServerBindingElement from '../../elements/bindings/googlepubsub/GooglepubsubServerBinding.ts';
import HttpChannelBindingElement from '../../elements/bindings/http/HttpChannelBinding.ts';
import HttpMessageBindingElement from '../../elements/bindings/http/HttpMessageBinding.ts';
import HttpOperationBindingElement from '../../elements/bindings/http/HttpOperationBinding.ts';
import HttpServerBindingElement from '../../elements/bindings/http/HttpServerBinding.ts';
import IbmmqChannelBindingElement from '../../elements/bindings/ibmmq/IbmmqChannelBinding.ts';
import IbmmqMessageBindingElement from '../../elements/bindings/ibmmq/IbmmqMessageBinding.ts';
import IbmmqOperationBindingElement from '../../elements/bindings/ibmmq/IbmmqOperationBinding.ts';
import IbmmqServerBindingElement from '../../elements/bindings/ibmmq/IbmmqServerBinding.ts';
import JmsChannelBindingElement from '../../elements/bindings/jms/JmsChannelBinding.ts';
import JmsMessageBindingElement from '../../elements/bindings/jms/JmsMessageBinding.ts';
import JmsOperationBindingElement from '../../elements/bindings/jms/JmsOperationBinding.ts';
import JmsServerBindingElement from '../../elements/bindings/jms/JmsServerBinding.ts';
import KafkaChannelBindingElement from '../../elements/bindings/kafka/KafkaChannelBinding.ts';
import KafkaMessageBindingElement from '../../elements/bindings/kafka/KafkaMessageBinding.ts';
import KafkaOperationBindingElement from '../../elements/bindings/kafka/KafkaOperationBinding.ts';
import KafkaServerBindingElement from '../../elements/bindings/kafka/KafkaServerBinding.ts';
import MercureChannelBindingElement from '../../elements/bindings/mercure/MercureChannelBinding.ts';
import MercureMessageBindingElement from '../../elements/bindings/mercure/MercureMessageBinding.ts';
import MercureOperationBindingElement from '../../elements/bindings/mercure/MercureOperationBinding.ts';
import MercureServerBindingElement from '../../elements/bindings/mercure/MercureServerBinding.ts';
import MqttChannelBindingElement from '../../elements/bindings/mqtt/MqttChannelBinding.ts';
import MqttMessageBindingElement from '../../elements/bindings/mqtt/MqttMessageBinding.ts';
import MqttOperationBindingElement from '../../elements/bindings/mqtt/MqttOperationBinding.ts';
import MqttServerBindingElement from '../../elements/bindings/mqtt/MqttServerBinding.ts';
import Mqtt5ChannelBindingElement from '../../elements/bindings/mqtt5/Mqtt5ChannelBinding.ts';
import Mqtt5MessageBindingElement from '../../elements/bindings/mqtt5/Mqtt5MessageBinding.ts';
import Mqtt5OperationBindingElement from '../../elements/bindings/mqtt5/Mqtt5OperationBinding.ts';
import Mqtt5ServerBindingElement from '../../elements/bindings/mqtt5/Mqtt5ServerBinding.ts';
import NatsChannelBindingElement from '../../elements/bindings/nats/NatsChannelBinding.ts';
import NatsMessageBindingElement from '../../elements/bindings/nats/NatsMessageBinding.ts';
import NatsOperationBindingElement from '../../elements/bindings/nats/NatsOperationBinding.ts';
import NatsServerBindingElement from '../../elements/bindings/nats/NatsServerBinding.ts';
import PulsarChannelBindingElement from '../../elements/bindings/pulsar/PulsarChannelBinding.ts';
import PulsarMessageBindingElement from '../../elements/bindings/pulsar/PulsarMessageBinding.ts';
import PulsarOperationBindingElement from '../../elements/bindings/pulsar/PulsarOperationBinding.ts';
import PulsarServerBindingElement from '../../elements/bindings/pulsar/PulsarServerBinding.ts';
import RedisChannelBindingElement from '../../elements/bindings/redis/RedisChannelBinding.ts';
import RedisMessageBindingElement from '../../elements/bindings/redis/RedisMessageBinding.ts';
import RedisOperationBindingElement from '../../elements/bindings/redis/RedisOperationBinding.ts';
import RedisServerBindingElement from '../../elements/bindings/redis/RedisServerBinding.ts';
import SnsChannelBindingElement from '../../elements/bindings/sns/SnsChannelBinding.ts';
import SnsMessageBindingElement from '../../elements/bindings/sns/SnsMessageBinding.ts';
import SnsOperationBindingElement from '../../elements/bindings/sns/SnsOperationBinding.ts';
import SnsServerBindingElement from '../../elements/bindings/sns/SnsServerBinding.ts';
import SolaceChannelBindingElement from '../../elements/bindings/solace/SolaceChannelBinding.ts';
import SolaceMessageBindingElement from '../../elements/bindings/solace/SolaceMessageBinding.ts';
import SolaceOperationBindingElement from '../../elements/bindings/solace/SolaceOperationBinding.ts';
import SolaceServerBindingElement from '../../elements/bindings/solace/SolaceServerBinding.ts';
import SqsChannelBindingElement from '../../elements/bindings/sqs/SqsChannelBinding.ts';
import SqsMessageBindingElement from '../../elements/bindings/sqs/SqsMessageBinding.ts';
import SqsOperationBindingElement from '../../elements/bindings/sqs/SqsOperationBinding.ts';
import SqsServerBindingElement from '../../elements/bindings/sqs/SqsServerBinding.ts';
import StompChannelBindingElement from '../../elements/bindings/stomp/StompChannelBinding.ts';
import StompMessageBindingElement from '../../elements/bindings/stomp/StompMessageBinding.ts';
import StompOperationBindingElement from '../../elements/bindings/stomp/StompOperationBinding.ts';
import StompServerBindingElement from '../../elements/bindings/stomp/StompServerBinding.ts';
import WebSocketChannelBindingElement from '../../elements/bindings/ws/WebSocketChannelBinding.ts';
import WebSocketMessageBindingElement from '../../elements/bindings/ws/WebSocketMessageBinding.ts';
import WebSocketOperationBindingElement from '../../elements/bindings/ws/WebSocketOperationBinding.ts';
import WebSocketServerBindingElement from '../../elements/bindings/ws/WebSocketServerBinding.ts';
// nces / helper collections
import ComponentsOperationsElement from '../../elements/nces/ComponentsOperations.ts';
import ChannelServersElement from '../../elements/nces/ChannelServers.ts';
import ComponentsSchemasElement from '../../elements/nces/ComponentsSchemas.ts';
import MessageExamplesElement from '../../elements/nces/MessageExamples.ts';
import MessageTraitsElement from '../../elements/nces/MessageTraits.ts';
import OperationMessagesElement from '../../elements/nces/OperationMessages.ts';
import OperationReplyMessagesElement from '../../elements/nces/OperationReplyMessages.ts';
import OperationSecurityElement from '../../elements/nces/OperationSecurity.ts';
import OperationTraitsElement from '../../elements/nces/OperationTraits.ts';
import OperationTraitSecurityElement from '../../elements/nces/OperationTraitSecurity.ts';
import SecuritySchemeScopesElement from '../../elements/nces/SecuritySchemeScopes.ts';
import { getNodeType } from '../../traversal/visitor.ts';
/**
 * This plugin targets YAML 1.2 empty nodes. When a mapping value is omitted,
 * it substitutes the most suitable semantic AsyncAPI 3 element.
 *
 * https://yaml.org/spec/1.2.2/#72-empty-nodes
 *
 * @example
 *
 * ```yaml
 * asyncapi: 3.0.0
 * operations:
 *   sendMessage:
 * ```
 * Refracting result without this plugin:
 *
 *  (AsyncApi3Element
 *    (MemberElement
 *      (StringElement)
 *      (OperationsElement
 *        (MemberElement
 *          (StringElement)
 *          (StringElement))))
 *
 * Refracting result with this plugin:
 *
 *  (AsyncApi3Element
 *    (MemberElement
 *      (StringElement)
 *      (OperationsElement
 *        (MemberElement
 *          (StringElement)
 *          (OperationElement))))
 */

const isEmptyElement = (element: unknown): element is StringElement =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema: Record<string, unknown> = {
  AsyncApi3Element: {
    asyncapi(...args: string[]) {
      return new AsyncApiVersionElement(...args);
    },
    identifier(...args: string[]) {
      return new IdentifierElement(...args);
    },
    info(...args: Record<string, unknown>[]) {
      return new InfoElement(...args);
    },
    servers(...args: Record<string, unknown>[]) {
      return new ServersElement(...args);
    },
    defaultContentType(...args: string[]) {
      return new DefaultContentTypeElement(...args);
    },
    channels(...args: Record<string, unknown>[]) {
      return new ChannelsElement(...args);
    },
    components(...args: Record<string, unknown>[]) {
      return new ComponentsElement(...args);
    },
    operations(...args: Record<string, unknown>[]) {
      return new OperationsElement(...args);
    },
  },

  InfoElement: {
    contact(...args: Record<string, unknown>[]) {
      return new ContactElement(...args);
    },
    license(...args: Record<string, unknown>[]) {
      return new LicenseElement(...args);
    },
    tags(...args: ConstructorParameters<typeof TagsElement>) {
      return new TagsElement(...args);
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
  },

  ServersElement: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new ServerElement(...args);
    },
  },

  ServerElement: {
    variables(...args: Record<string, unknown>[]) {
      return new ServerVariablesElement(...args);
    },
    security(...args: ConstructorParameters<typeof ServerSecurityElement>) {
      return new ServerSecurityElement(...args);
    },
    tags(...args: ConstructorParameters<typeof TagsElement>) {
      return new TagsElement(...args);
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
    bindings(...args: Record<string, unknown>[]) {
      return new ServerBindingsElement(...args);
    },
  },

  ServerVariableElement: {
    enum(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
    examples(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
  },

  ChannelsElement: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new ChannelElement(...args);
    },
  },

  ChannelElement: {
    servers(...args: ConstructorParameters<typeof ChannelServersElement>) {
      return new ChannelServersElement(...args);
    },
    parameters(...args: Record<string, unknown>[]) {
      return new ParametersElement(...args);
    },
    messages(...args: Record<string, unknown>[]) {
      return new MessagesElement(...args);
    },
    bindings(...args: Record<string, unknown>[]) {
      return new ChannelBindingsElement(...args);
    },
    tags(...args: ConstructorParameters<typeof TagsElement> ) {
      return new TagsElement(...args);
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
  },

  MessagesElement: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new MessageElement(...args);
    },
  },

  OperationsElement: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new OperationElement(...args);
    },
  },

  OperationElement: {
    channel(...args: Record<string, unknown>[]) {
      return new ReferenceElement(...args);
    },
    tags(...args: ConstructorParameters<typeof ChannelServersElement>) {
      return new TagsElement(...args);
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
    bindings(...args: Record<string, unknown>[]) {
      return new OperationBindingsElement(...args);
    },
    traits(...args: ConstructorParameters<typeof OperationTraitsElement>) {
      return new OperationTraitsElement(...args);
    },
    security(...args: ConstructorParameters<typeof OperationSecurityElement>) {
      return new OperationSecurityElement(...args);
    },
    messages(...args: ConstructorParameters<typeof OperationMessagesElement>) {
      return new OperationMessagesElement(...args);
    },
    reply(...args: Record<string, unknown>[]) {
      return new OperationReplyElement(...args);
    },
  },

  OperationTraitElement: {
    security(...args: ConstructorParameters<typeof OperationTraitSecurityElement>) {
      return new OperationTraitSecurityElement(...args);
    },
    tags(...args: ConstructorParameters<typeof TagsElement>) {
      return new TagsElement(...args);
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
    bindings(...args: Record<string, unknown>[]) {
      return new OperationBindingsElement(...args);
    },
  },

  OperationReplyElement: {
    address(...args: Record<string, unknown>[]) {
      return new OperationReplyAddressElement(...args);
    },
    channel(...args: Record<string, unknown>[]) {
      return new ReferenceElement(...args);
    },
    messages(...args: ConstructorParameters<typeof OperationReplyMessagesElement>) {
      return new OperationReplyMessagesElement(...args);
    },
  },

  ParametersElement: {
    '[key: *]': function key(...args: unknown[]) {
      return new ParameterElement(...args);
    },
  },

  ParameterElement: {
    enum(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
    examples(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
  },

  ServerBindingsElement: {
    http(...args: Record<string, unknown>[]) {
      return new HttpServerBindingElement(...args);
    },
    ws(...args: Record<string, unknown>[]) {
      return new WebSocketServerBindingElement(...args);
    },
    kafka(...args: Record<string, unknown>[]) {
      return new KafkaServerBindingElement(...args);
    },
    anypointmq(...args: Record<string, unknown>[]) {
      return new AnypointmqServerBindingElement(...args);
    },
    amqp(...args: Record<string, unknown>[]) {
      return new AmqpServerBindingElement(...args);
    },
    amqp1(...args: Record<string, unknown>[]) {
      return new Amqp1ServerBindingElement(...args);
    },
    mqtt(...args: Record<string, unknown>[]) {
      return new MqttServerBindingElement(...args);
    },
    mqtt5(...args: Record<string, unknown>[]) {
      return new Mqtt5ServerBindingElement(...args);
    },
    nats(...args: Record<string, unknown>[]) {
      return new NatsServerBindingElement(...args);
    },
    jms(...args: Record<string, unknown>[]) {
      return new JmsServerBindingElement(...args);
    },
    sns(...args: Record<string, unknown>[]) {
      return new SnsServerBindingElement(...args);
    },
    solace(...args: Record<string, unknown>[]) {
      return new SolaceServerBindingElement(...args);
    },
    sqs(...args: Record<string, unknown>[]) {
      return new SqsServerBindingElement(...args);
    },
    stomp(...args: Record<string, unknown>[]) {
      return new StompServerBindingElement(...args);
    },
    redis(...args: Record<string, unknown>[]) {
      return new RedisServerBindingElement(...args);
    },
    mercure(...args: Record<string, unknown>[]) {
      return new MercureServerBindingElement(...args);
    },
    ibmmq(...args: Record<string, unknown>[]) {
      return new IbmmqServerBindingElement(...args);
    },
    googlepubsub(...args: Record<string, unknown>[]) {
      return new GooglepubsubServerBindingElement(...args);
    },
    pulsar(...args: Record<string, unknown>[]) {
      return new PulsarServerBindingElement(...args);
    },
  },

  ChannelBindingsElement: {
    http(...args: Record<string, unknown>[]) {
      return new HttpChannelBindingElement(...args);
    },
    ws(...args: Record<string, unknown>[]) {
      return new WebSocketChannelBindingElement(...args);
    },
    kafka(...args: Record<string, unknown>[]) {
      return new KafkaChannelBindingElement(...args);
    },
    anypointmq(...args: Record<string, unknown>[]) {
      return new AnypointmqChannelBindingElement(...args);
    },
    amqp(...args: Record<string, unknown>[]) {
      return new AmqpChannelBindingElement(...args);
    },
    amqp1(...args: Record<string, unknown>[]) {
      return new Amqp1ChannelBindingElement(...args);
    },
    mqtt(...args: Record<string, unknown>[]) {
      return new MqttChannelBindingElement(...args);
    },
    mqtt5(...args: Record<string, unknown>[]) {
      return new Mqtt5ChannelBindingElement(...args);
    },
    nats(...args: Record<string, unknown>[]) {
      return new NatsChannelBindingElement(...args);
    },
    jms(...args: Record<string, unknown>[]) {
      return new JmsChannelBindingElement(...args);
    },
    sns(...args: Record<string, unknown>[]) {
      return new SnsChannelBindingElement(...args);
    },
    solace(...args: Record<string, unknown>[]) {
      return new SolaceChannelBindingElement(...args);
    },
    sqs(...args: Record<string, unknown>[]) {
      return new SqsChannelBindingElement(...args);
    },
    stomp(...args: Record<string, unknown>[]) {
      return new StompChannelBindingElement(...args);
    },
    redis(...args: Record<string, unknown>[]) {
      return new RedisChannelBindingElement(...args);
    },
    mercure(...args: Record<string, unknown>[]) {
      return new MercureChannelBindingElement(...args);
    },
    ibmmq(...args: Record<string, unknown>[]) {
      return new IbmmqChannelBindingElement(...args);
    },
    googlepubsub(...args: Record<string, unknown>[]) {
      return new GooglepubsubChannelBindingElement(...args);
    },
    pulsar(...args: Record<string, unknown>[]) {
      return new PulsarChannelBindingElement(...args);
    },
  },

  OperationBindingsElement: {
    http(...args: Record<string, unknown>[]) {
      return new HttpOperationBindingElement(...args);
    },
    ws(...args: Record<string, unknown>[]) {
      return new WebSocketOperationBindingElement(...args);
    },
    kafka(...args: Record<string, unknown>[]) {
      return new KafkaOperationBindingElement(...args);
    },
    anypointmq(...args: Record<string, unknown>[]) {
      return new AnypointmqOperationBindingElement(...args);
    },
    amqp(...args: Record<string, unknown>[]) {
      return new AmqpOperationBindingElement(...args);
    },
    amqp1(...args: Record<string, unknown>[]) {
      return new Amqp1OperationBindingElement(...args);
    },
    mqtt(...args: Record<string, unknown>[]) {
      return new MqttOperationBindingElement(...args);
    },
    mqtt5(...args: Record<string, unknown>[]) {
      return new Mqtt5OperationBindingElement(...args);
    },
    nats(...args: Record<string, unknown>[]) {
      return new NatsOperationBindingElement(...args);
    },
    jms(...args: Record<string, unknown>[]) {
      return new JmsOperationBindingElement(...args);
    },
    sns(...args: Record<string, unknown>[]) {
      return new SnsOperationBindingElement(...args);
    },
    solace(...args: Record<string, unknown>[]) {
      return new SolaceOperationBindingElement(...args);
    },
    sqs(...args: Record<string, unknown>[]) {
      return new SqsOperationBindingElement(...args);
    },
    stomp(...args: Record<string, unknown>[]) {
      return new StompOperationBindingElement(...args);
    },
    redis(...args: Record<string, unknown>[]) {
      return new RedisOperationBindingElement(...args);
    },
    mercure(...args: Record<string, unknown>[]) {
      return new MercureOperationBindingElement(...args);
    },
    googlepubsub(...args: Record<string, unknown>[]) {
      return new GooglepubsubOperationBindingElement(...args);
    },
    ibmmq(...args: Record<string, unknown>[]) {
      return new IbmmqOperationBindingElement(...args);
    },
    pulsar(...args: Record<string, unknown>[]) {
      return new PulsarOperationBindingElement(...args);
    },
  },

  MessageBindingsElement: {
    http(...args: Record<string, unknown>[]) {
      return new HttpMessageBindingElement(...args);
    },
    ws(...args: Record<string, unknown>[]) {
      return new WebSocketMessageBindingElement(...args);
    },
    kafka(...args: Record<string, unknown>[]) {
      return new KafkaMessageBindingElement(...args);
    },
    anypointmq(...args: Record<string, unknown>[]) {
      return new AnypointmqMessageBindingElement(...args);
    },
    amqp(...args: Record<string, unknown>[]) {
      return new AmqpMessageBindingElement(...args);
    },
    amqp1(...args: Record<string, unknown>[]) {
      return new Amqp1MessageBindingElement(...args);
    },
    mqtt(...args: Record<string, unknown>[]) {
      return new MqttMessageBindingElement(...args);
    },
    mqtt5(...args: Record<string, unknown>[]) {
      return new Mqtt5MessageBindingElement(...args);
    },
    nats(...args: Record<string, unknown>[]) {
      return new NatsMessageBindingElement(...args);
    },
    jms(...args: Record<string, unknown>[]) {
      return new JmsMessageBindingElement(...args);
    },
    sns(...args: Record<string, unknown>[]) {
      return new SnsMessageBindingElement(...args);
    },
    solace(...args: Record<string, unknown>[]) {
      return new SolaceMessageBindingElement(...args);
    },
    sqs(...args: Record<string, unknown>[]) {
      return new SqsMessageBindingElement(...args);
    },
    stomp(...args: Record<string, unknown>[]) {
      return new StompMessageBindingElement(...args);
    },
    redis(...args: Record<string, unknown>[]) {
      return new RedisMessageBindingElement(...args);
    },
    mercure(...args: Record<string, unknown>[]) {
      return new MercureMessageBindingElement(...args);
    },
    ibmmq(...args: Record<string, unknown>[]) {
      return new IbmmqMessageBindingElement(...args);
    },
    googlepubsub(...args: Record<string, unknown>[]) {
      return new GooglepubsubMessageBindingElement(...args);
    },
    pulsar(...args: Record<string, unknown>[]) {
      return new PulsarMessageBindingElement(...args);
    },
  },

  MessageElement: {
    headers(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    correlationId(...args: Record<string, unknown>[]) {
      return new CorrelationIDElement(...args);
    },
    tags(...args: ConstructorParameters<typeof TagsElement>) {
      return new TagsElement(...args);
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
    bindings(...args: Record<string, unknown>[]) {
      return new MessageBindingsElement(...args);
    },
    examples(...args: ConstructorParameters<typeof MessageExamplesElement>) {
      return new MessageExamplesElement(...args);
    },
    traits(...args: ConstructorParameters<typeof MessageTraitsElement>) {
      return new MessageTraitsElement(...args);
    },
    payload(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  MessageTraitElement: {
    headers(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    correlationId(...args: Record<string, unknown>[]) {
      return new CorrelationIDElement(...args);
    },
    tags(...args: ConstructorParameters<typeof TagsElement>) {
      return new TagsElement(...args);
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
    bindings(...args: Record<string, unknown>[]) {
      return new MessageBindingsElement(...args);
    },
    examples(...args: ConstructorParameters<typeof MessageExamplesElement>) {
      return new MessageExamplesElement(...args);
    },
  },

  MessageExampleElement: {
    headers(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
  },

  TagsElement: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new TagElement(...args);
    },
  },

  TagElement: {
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
  },

  ComponentsElement: {
    schemas(...args: Record<string, unknown>[]) {
      return new ComponentsSchemasElement(...args);
    },
    servers(...args: Record<string, unknown>[]) {
      return new ComponentsServersElement(...args);
    },
    serverVariables(...args: Record<string, unknown>[]) {
      return new ComponentsServerVariablesElement(...args);
    },
    messages(...args: Record<string, unknown>[]) {
      return new ComponentsMessagesElement(...args);
    },
    securitySchemes(...args: Record<string, unknown>[]) {
      return new ComponentsSecuritySchemesElement(...args);
    },
    parameters(...args: Record<string, unknown>[]) {
      return new ComponentsParametersElement(...args);
    },
    correlationIds(...args: Record<string, unknown>[]) {
      return new ComponentsCorrelationIDsElement(...args);
    },
    operationTraits(...args: Record<string, unknown>[]) {
      return new ComponentsOperationTraitsElement(...args);
    },
    messageTraits(...args: Record<string, unknown>[]) {
      return new ComponentsMessageTraitsElement(...args);
    },
    serverBindings(...args: Record<string, unknown>[]) {
      return new ComponentsServerBindingsElement(...args);
    },
    channelBindings(...args: Record<string, unknown>[]) {
      return new ComponentsChannelBindingsElement(...args);
    },
    operationBindings(...args: Record<string, unknown>[]) {
      return new ComponentsOperationBindingsElement(...args);
    },
    messageBindings(...args: Record<string, unknown>[]) {
      return new ComponentsMessageBindingsElement(...args);
    },
    operations(...args: Record<string, unknown>[]) {
      return new ComponentsOperationsElement(...args);
    },
    replies(...args: Record<string, unknown>[]) {
      return new OperationReplyElement(...args);
    },
    replyAddresses(...args: Record<string, unknown>[]) {
      return new OperationReplyAddressElement(...args);
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
    tags(...args: ConstructorParameters<typeof TagsElement>) {
      return new TagsElement(...args);
    },
  },

  MultiFormatSchemaElement: {
    schema(...args: any[]) {
      const { context: multiFormatSchemaElement } = this as { context: MultiFormatSchemaElement };
      const schemaFormat = defaultTo(
        mediaTypes.latest(),
        toValue(multiFormatSchemaElement.schemaFormat),
      );

      if (mediaTypes.includes(schemaFormat)) {
        return new SchemaElement(...args);
      }

      return new ObjectElement(...args);
    },
  },

  SchemaElement: {
    allOf(...args: ConstructorParameters<typeof ArrayElement>) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-allOf');
      return element;
    },
    anyOf(...args: ConstructorParameters<typeof ArrayElement>) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-anyOf');
      return element;
    },
    oneOf(...args: ConstructorParameters<typeof ArrayElement>) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-oneOf');
      return element;
    },
    not(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    if(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    then(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    else(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    enum(...args: ConstructorParameters<typeof ArrayElement> ) {
      return new ArrayElement(...args);
    },
    items(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    additionalItems(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    contains(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    required(...args: ConstructorParameters<typeof ArrayElement>) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-required');
      return element;
    },
    properties(...args: Record<string, unknown>[]) {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-properties');
      return element;
    },
    patternProperties(...args: Record<string, unknown>[]) {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-patternProperties');
      return element;
    },
    additionalProperties(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    dependencies(...args: Record<string, unknown>[]) {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-dependencies');
      return element;
    },
    propertyNames(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    examples(...args: ConstructorParameters<typeof ArrayElement>) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-examples');
      return element;
    },
    definitions(...args: Record<string, unknown>[]) {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-definitions');
      return element;
    },
    externalDocs(...args: Record<string, unknown>[]) {
      return new ExternalDocumentationElement(...args);
    },
  },

  SecuritySchemeElement: {
    flows(...args: Record<string, unknown>[]) {
      return new OAuthFlowsElement(...args);
    },
    scopes(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
  },

  OAuthFlowsElement: {
    implicit(...args: Record<string, unknown>[]) {
      return new OAuthFlowElement(...args);
    },
    password(...args: Record<string, unknown>[]) {
      return new OAuthFlowElement(...args);
    },
    clientCredentials(...args: Record<string, unknown>[]) {
      return new OAuthFlowElement(...args);
    },
    authorizationCode(...args: Record<string, unknown>[]) {
      return new OAuthFlowElement(...args);
    },
  },

  OAuthFlowElement: {
    availableScopes(...args: ConstructorParameters<typeof SecuritySchemeScopesElement>) {
      return new SecuritySchemeScopesElement(...args);
    },
  },

  HttpOperationBindingElement: {
    query(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  HttpMessageBindingElement: {
    headers(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  WebSocketChannelBindingElement: {
    query(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    headers(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  KafkaOperationBindingElement: {
    groupId(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
    clientId(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  KafkaMessageBindingElement: {
    key(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  AnypointmqMessageBindingElement: {
    headers(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  AmqpChannelBindingElement: {
    exchange(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
    queue(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
  },

  AmqpOperationBindingElement: {
    cc(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
    bcc(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
  },

  IbmmqChannelBindingElement: {
    queue(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
    topic(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
  },

  MqttServerBindingElement: {
    lastWill(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
  },

  SolaceOperationBindingElement: {
    destinations(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
  },

  GooglepubsubChannelBindingElement: {
    labels(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
    messageStoragePolicy(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
    schemaSettings(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
  },

  GooglepubsubMessageBindingElement: {
    attributes(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
    schema(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
  },

  PulsarChannelBindingElement: {
    'geo-replication': function geoReplication(...args: ConstructorParameters<typeof ArrayElement>) {
      return new ArrayElement(...args);
    },
    retention(...args: Record<string, unknown>[]) {
      return new ObjectElement(...args);
    },
  },

  [ComponentsSchemasElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  [ComponentsServersElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new ServerElement(...args);
    },
  },

  [ComponentsServerVariablesElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new ServerVariableElement(...args);
    },
  },

  [ComponentsMessagesElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new MessageElement(...args);
    },
  },

  [ComponentsSecuritySchemesElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new SecuritySchemeElement(...args);
    },
  },

  [ComponentsParametersElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new ParameterElement(...args);
    },
  },

  [ComponentsCorrelationIDsElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new CorrelationIDElement(...args);
    },
  },

  [ComponentsOperationTraitsElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new OperationTraitElement(...args);
    },
  },

  [ComponentsMessageTraitsElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new MessageTraitElement(...args);
    },
  },

  [ComponentsServerBindingsElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new ServerBindingsElement(...args);
    },
  },

  [ComponentsChannelBindingsElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new ChannelBindingsElement(...args);
    },
  },

  [ComponentsOperationBindingsElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new OperationBindingsElement(...args);
    },
  },

  [ComponentsOperationsElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new OperationBindingsElement(...args);
    },
  },

  [ComponentsMessageBindingsElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new MessageBindingsElement(...args);
    },
  },

  [ComponentsOperationsElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new OperationElement(...args);
    },
  },

  [ServerVariablesElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new ServerVariableElement(...args);
    },
  },

  [ServerSecurityElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new SecuritySchemeElement(...args);
    },
  },

  [OperationTraitsElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new OperationTraitElement(...args);
    },
  },

  [OperationSecurityElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new SecuritySchemeElement(...args);
    },
  },

  [OperationMessagesElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new ReferenceElement(...args);
    },
  
  },

  [OperationReplyMessagesElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new ReferenceElement(...args);
    },
  },

  [MessageExamplesElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new MessageExampleElement(...args);
    },
  },

  [MessageTraitsElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new MessageTraitElement(...args);
    },
  },

  [MessageTraitExamplesElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new MessageExampleElement(...args);
    },
  },

  [ChannelServersElement.primaryClass]: {
    '<*>': function asterisk(...args: Record<string, unknown>[] ) {
      return new ReferenceElement(...args);
    },
  },

  [ComponentsRepliesElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new OperationReplyElement(...args);
    },
  },

  [ComponentsReplyAddressesElement.primaryClass]: {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new OperationReplyAddressElement(...args);
    },
  },

  'json-schema-properties': {
    '[key: *]': function key(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  'json-schema-allOf': {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  'json-schema-anyOf': {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },

  'json-schema-oneOf': {
    '<*>': function asterisk(...args: Record<string, unknown>[]) {
      return new SchemaElement(...args);
    },
  },
};

const findElementFactory = (ancestor: any , keyName: string) => {
  const elementType = getNodeType(ancestor);
  const keyMapping = (schema[elementType ?? ''] || schema[toValue(ancestor.classes.first)]) as Record<string, unknown> | unknown | undefined ; 

  if (keyMapping == null || typeof keyMapping !== 'object') {
    return undefined;
  }

  return Object.prototype.hasOwnProperty.call(keyMapping, '[key: *]')
    ? (keyMapping as Record<string, unknown>)['[key: *]']
    : (keyMapping as Record<string, unknown>)[keyName];
};

/**
 * @public
 */
const plugin = () => () => ({
  visitor: {
    StringElement(
      element: StringElement, 
      key: unknown, parent: unknown, path: unknown, ancestors: Record<string, unknown>[] | unknown[]) {
      if (!isEmptyElement(element)) return undefined;

      const lineage = [...ancestors, parent].filter(isElement);
      const parentElement = lineage.at(-1);
      let elementFactory;
      let context;

      if (isArrayElement(parentElement)) {
        context = element;
        elementFactory = findElementFactory(parentElement, '<*>');
      } else if (isMemberElement(parentElement)) {
        context = lineage.at(-2);
        elementFactory = findElementFactory(context, toValue(parentElement.key));
      }

      // no element factory found
      if (typeof elementFactory !== 'function') return undefined;

      const result = elementFactory.call(
        { context },
        undefined,
        cloneDeep(element.meta),
        cloneDeep(element.attributes),
      );

      return assignSourceMap(result, element);
    },
  },
});

export default plugin;
