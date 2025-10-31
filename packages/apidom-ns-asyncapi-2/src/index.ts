export {
  isRefElement,
  isLinkElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from '@swagger-api/apidom-core';

export { default as mediaTypes, AsyncAPIMediaTypes } from './media-types.ts';
export type { Format } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as specificationObj } from './refractor/specification.ts';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';

export {
  isAsyncApi2Element,
  isAsyncApiVersionElement,
  isChannelBindingsElement,
  isChannelItemElement,
  isChannelsElement,
  isComponentsElement,
  isContactElement,
  isIdentifierElement,
  isInfoElement,
  isLicenseElement,
  isOperationElement,
  isParameterElement,
  isParametersElement,
  isReferenceElement,
  isSchemaElement,
  isBooleanJsonSchemaElement,
  isSecurityRequirementElement,
  isServerElement,
  isServerBindingsElement,
  isServersElement,
  isServerVariableElement,
} from './predicates.ts';

export { isReferenceLikeElement, isAsyncApiExtension } from './refractor/predicates.ts';
export type { ReferenceLikeElement } from './refractor/predicates.ts';

export { default as AlternatingVisitor } from './refractor/visitors/generics/AlternatingVisitor.ts';
export type {
  AlternatingVisitorOptions,
  Alternator,
} from './refractor/visitors/generics/AlternatingVisitor.ts';
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export type { FixedFieldsVisitorOptions } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor.ts';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor.ts';
export { default as MixedFieldsVisitor } from './refractor/visitors/generics/MixedFieldsVisitor.ts';
export type { MixedFieldsVisitorOptions } from './refractor/visitors/generics/MixedFieldsVisitor.ts';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export type { PatternedFieldsVisitorOptions } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor.ts';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor.ts';
export { default as SpecificationExtensionVisitor } from './refractor/visitors/SpecificationExtensionVisitor.ts';
export type { SpecificationExtensionVisitorOptions } from './refractor/visitors/SpecificationExtensionVisitor.ts';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor.ts';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor.ts';
export { default as Visitor } from './refractor/visitors/Visitor.ts';
export type { VisitorOptions } from './refractor/visitors/Visitor.ts';

export type {
  default as AmqpChannelBindingVisitor,
  AmqpChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/amqp/channel-binding/index.ts';
export type {
  default as AmqpMessageBindingVisitor,
  AmqpMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/amqp/message-binding/index.ts';
export type {
  default as AmqpOperationBindingVisitor,
  AmqpOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/amqp/operation-binding/index.ts';
export type {
  default as AmqpServerBindingVisitor,
  AmqpServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/amqp/server-binding/index.ts';
export type {
  default as Amqp1ChannelBindingVisitor,
  Amqp1ChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/amqp1/channel-binding/index.ts';
export type {
  default as Amqp1MessageBindingVisitor,
  Amqp1MessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/amqp1/message-binding/index.ts';
export type {
  default as Amqp1OperationBindingVisitor,
  Amqp1OperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/amqp1/operation-binding/index.ts';
export type {
  default as Amqp1ServerBindingVisitor,
  Amqp1ServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/amqp1/server-binding/index.ts';
export type {
  default as AnypointmqChannelBindingVisitor,
  AnypointmqChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/anypointmq/channel-binding/index.ts';
export type {
  default as AnypointmqMessageBindingVisitor,
  AnypointmqMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/anypointmq/message-binding/index.ts';
export type {
  default as AnypointmqOperationBindingVisitor,
  AnypointmqOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/anypointmq/operation-binding/index.ts';
export type {
  default as AnypointmqServerBindingVisitor,
  AnypointmqServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/anypointmq/server-binding/index.ts';
export type {
  default as GooglepubsubChannelBindingVisitor,
  GooglepubsubChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/googlepubsub/channel-binding/index.ts';
export type {
  default as GooglepubsubMessageBindingVisitor,
  GooglepubsubMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/googlepubsub/message-binding/index.ts';
export type {
  default as GooglepubsubOperationBindingVisitor,
  GooglepubsubOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/googlepubsub/operation-binding/index.ts';
export type {
  default as GooglepubsubServerBindingVisitor,
  GooglepubsubServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/googlepubsub/server-binding/index.ts';
export type {
  default as HttpChannelBindingVisitor,
  HttpChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/http/channel-binding/index.ts';
export type {
  default as HttpMessageBindingVisitor,
  HttpMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/http/message-binding/index.ts';
export type {
  default as HttpOperationBindingVisitor,
  HttpOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/http/operation-binding/index.ts';
export type {
  default as HttpServerBindingVisitor,
  HttpServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/http/server-binding/index.ts';
export type {
  default as IbmmqChannelBindingVisitor,
  IbmmqChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/ibmmq/channel-binding/index.ts';
export type {
  default as IbmmqMessageBindingVisitor,
  IbmmqMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/ibmmq/message-binding/index.ts';
export type {
  default as IbmmqOperationBindingVisitor,
  IbmmqOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/ibmmq/operation-binding/index.ts';
export type {
  default as IbmmqServerBindingVisitor,
  IbmmqServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/ibmmq/server-binding/index.ts';
export type {
  default as JmsChannelBindingVisitor,
  JmsChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/jms/channel-binding/index.ts';
export type {
  default as JmsMessageBindingVisitor,
  JmsMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/jms/message-binding/index.ts';
export type {
  default as JmsOperationBindingVisitor,
  JmsOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/jms/operation-binding/index.ts';
export type {
  default as JmsServerBindingVisitor,
  JmsServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/jms/server-binding/index.ts';
export type {
  default as KafkaChannelBindingVisitor,
  KafkaChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/kafka/channel-binding/index.ts';
export type {
  default as KafkaMessageBindingVisitor,
  KafkaMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/kafka/message-binding/index.ts';
export type {
  default as KafkaOperationBindingVisitor,
  KafkaOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/kafka/operation-binding/index.ts';
export type {
  default as KafkaServerBindingVisitor,
  KafkaServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/kafka/server-binding/index.ts';
export type {
  default as MercureChannelBindingVisitor,
  MercureChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mercure/channel-binding/index.ts';
export type {
  default as MercureMessageBindingVisitor,
  MercureMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mercure/message-binding/index.ts';
export type {
  default as MercureOperationBindingVisitor,
  MercureOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mercure/operation-binding/index.ts';
export type {
  default as MercureServerBindingVisitor,
  MercureServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mercure/server-binding/index.ts';
export type {
  default as MqttChannelBindingVisitor,
  MqttChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mqtt/channel-binding/index.ts';
export type {
  default as MqttMessageBindingVisitor,
  MqttMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mqtt/message-binding/index.ts';
export type {
  default as MqttOperationBindingVisitor,
  MqttOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mqtt/operation-binding/index.ts';
export type {
  default as MqttServerBindingVisitor,
  MqttServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mqtt/server-binding/index.ts';
export type {
  default as Mqtt5ChannelBindingVisitor,
  Mqtt5ChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mqtt5/channel-binding/index.ts';
export type {
  default as Mqtt5MessageBindingVisitor,
  Mqtt5MessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mqtt5/message-binding/index.ts';
export type {
  default as Mqtt5OperationBindingVisitor,
  Mqtt5OperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mqtt5/operation-binding/index.ts';
export type {
  default as Mqtt5ServerBindingVisitor,
  Mqtt5ServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/mqtt5/server-binding/index.ts';
export type {
  default as NatsChannelBindingVisitor,
  NatsChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/nats/channel-binding/index.ts';
export type {
  default as NatsMessageBindingVisitor,
  NatsMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/nats/message-binding/index.ts';
export type {
  default as NatsOperationBindingVisitor,
  NatsOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/nats/operation-binding/index.ts';
export type {
  default as NatsServerBindingVisitor,
  NatsServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/nats/server-binding/index.ts';
export type {
  default as PulsarChannelBindingVisitor,
  PulsarChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/pulsar/channel-binding/index.ts';
export type {
  default as PulsarMessageBindingVisitor,
  PulsarMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/pulsar/message-binding/index.ts';
export type {
  default as PulsarOperationBindingVisitor,
  PulsarOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/pulsar/operation-binding/index.ts';
export type {
  default as PulsarServerBindingVisitor,
  PulsarServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/pulsar/server-binding/index.ts';
export type {
  default as RedisChannelBindingVisitor,
  RedisChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/redis/channel-binding/index.ts';
export type {
  default as RedisMessageBindingVisitor,
  RedisMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/redis/message-binding/index.ts';
export type {
  default as RedisOperationBindingVisitor,
  RedisOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/redis/operation-binding/index.ts';
export type {
  default as RedisServerBindingVisitor,
  RedisServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/redis/server-binding/index.ts';
export type {
  default as SnsChannelBindingVisitor,
  SnsChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/sns/channel-binding/index.ts';
export type {
  default as SnsMessageBindingVisitor,
  SnsMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/sns/message-binding/index.ts';
export type {
  default as SnsOperationBindingVisitor,
  SnsOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/sns/operation-binding/index.ts';
export type {
  default as SnsServerBindingVisitor,
  SnsServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/sns/server-binding/index.ts';
export type {
  default as SolaceChannelBindingVisitor,
  SolaceChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/solace/channel-binding/index.ts';
export type {
  default as SolaceMessageBindingVisitor,
  SolaceMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/solace/message-binding/index.ts';
export type {
  default as SolaceOperationBindingVisitor,
  SolaceOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/solace/operation-binding/index.ts';
export type {
  default as SolaceServerBindingVisitor,
  SolaceServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/solace/server-binding/index.ts';
export type {
  default as SqsChannelBindingVisitor,
  SqsChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/sqs/channel-binding/index.ts';
export type {
  default as SqsMessageBindingVisitor,
  SqsMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/sqs/message-binding/index.ts';
export type {
  default as SqsOperationBindingVisitor,
  SqsOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/sqs/operation-binding/index.ts';
export type {
  default as SqsServerBindingVisitor,
  SqsServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/sqs/server-binding/index.ts';
export type {
  default as StompChannelBindingVisitor,
  StompChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/stomp/channel-binding/index.ts';
export type {
  default as StompMessageBindingVisitor,
  StompMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/stomp/message-binding/index.ts';
export type {
  default as StompOperationBindingVisitor,
  StompOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/stomp/operation-binding/index.ts';
export type {
  default as StompServerBindingVisitor,
  StompServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/stomp/server-binding/index.ts';
export type {
  default as WebSocketChannelBindingVisitor,
  WebSocketChannelBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/ws/channel-binding/index.ts';
export type {
  default as WebSocketMessageBindingVisitor,
  WebSocketMessageBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/ws/message-binding/index.ts';
export type {
  default as WebSocketOperationBindingVisitor,
  WebSocketOperationBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/ws/operation-binding/index.ts';
export type {
  default as WebSocketServerBindingVisitor,
  WebSocketServerBindingVisitorOptions,
} from './refractor/visitors/async-api-2/bindings/ws/server-binding/index.ts';
export type {
  default as ChannelBindingsVisitor,
  ChannelBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/channel-bindings/index.ts';
export type {
  default as ChannelItemVisitor,
  ChannelItemVisitorOptions,
} from './refractor/visitors/async-api-2/channel-item/index.ts';
export type {
  default as ChannelItem$RefVisitor,
  $RefVisitorOptions as ChannelItem$RefVisitorOptions,
} from './refractor/visitors/async-api-2/channel-item/$RefVisitor.ts';
export type {
  default as ChannelItemBindingsVisitor,
  BindingsVisitorOptions as ChannelItemBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/channel-item/BindingsVisitor.ts';
export type {
  default as ChannelItemServersVisitor,
  ServersVisitorOptions as ChannelItemServersVisitorOptions,
} from './refractor/visitors/async-api-2/channel-item/ServersVisitor.ts';
export type {
  default as ChannelsVisitor,
  ChannelsVisitorOptions,
} from './refractor/visitors/async-api-2/channels/index.ts';
export type {
  default as ComponentsVisitor,
  ComponentsVisitorOptions,
} from './refractor/visitors/async-api-2/components/index.ts';
export type {
  default as ComponentsChannelBindingsVisitor,
  ChannelBindingsVisitorOptions as ComponentsChannelBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/components/ChannelBindingsVisitor.ts';
export type {
  default as ComponentsChannelsVisitor,
  ChannelsVisitorOptions as ComponentsChannelsVisitorOptions,
} from './refractor/visitors/async-api-2/components/ChannelsVisitor.ts';
export type {
  default as ComponentsCorrelationIdsVisitor,
  CorrelationIdsVisitorOptions as ComponentsCorrelationIdsVisitorOptions,
} from './refractor/visitors/async-api-2/components/CorrelationIdsVisitor.ts';
export type {
  default as ComponentsMessageBindingsVisitor,
  MessageBindingsVisitorOptions as ComponentsMessageBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/components/MessageBindingsVisitor.ts';
export type {
  default as ComponentsMessagesVisitor,
  MessagesVisitorOptions as ComponentsMessagesVisitorOptions,
} from './refractor/visitors/async-api-2/components/MessagesVisitor.ts';
export type {
  default as ComponentsMessageTraitsVisitor,
  MessageTraitsVisitorOptions as ComponentsMessageTraitsVisitorOptions,
} from './refractor/visitors/async-api-2/components/MessageTraitsVisitor.ts';
export type {
  default as ComponentsOperationBindingsVisitor,
  OperationBindingsVisitorOptions as ComponentsOperationBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/components/OperationBindingsVisitor.ts';
export type {
  default as ComponentsOperationTraitsVisitor,
  OperationTraitsVisitorOptions as ComponentsOperationTraitsVisitorOptions,
} from './refractor/visitors/async-api-2/components/OperationTraitsVisitor.ts';
export type {
  default as ComponentsParametersVisitor,
  ParametersVisitorOptions as ComponentsParametersVisitorOptions,
} from './refractor/visitors/async-api-2/components/ParametersVisitor.ts';
export type {
  default as ComponentsSchemasVisitor,
  SchemasVisitorOptions as ComponentsSchemasVisitorOptions,
} from './refractor/visitors/async-api-2/components/SchemasVisitor.ts';
export type {
  default as ComponentsSecuritySchemesVisitor,
  SecuritySchemesVisitorOptions as ComponentsSecuritySchemesVisitorOptions,
} from './refractor/visitors/async-api-2/components/SecuritySchemesVisitor.ts';
export type {
  default as ComponentsServerBindingsVisitor,
  ServerBindingsVisitorOptions as ComponentsServerBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/components/ServerBindingsVisitor.ts';
export type {
  default as ComponentsServersVisitor,
  ServersVisitorOptions as ComponentsServersVisitorOptions,
} from './refractor/visitors/async-api-2/components/ServersVisitor.ts';
export type {
  default as ComponentsServerVariablesVisitor,
  ServerVariablesVisitorOptions as ComponentsServerVariablesVisitorOptions,
} from './refractor/visitors/async-api-2/components/ServerVariablesVisitor.ts';
export type {
  default as ContactVisitor,
  ContactVisitorOptions,
} from './refractor/visitors/async-api-2/contact/index.ts';
export type {
  default as CorrelationIDVisitor,
  CorrelationIDVisitorOptions,
} from './refractor/visitors/async-api-2/correlation-id/index.ts';
export type {
  default as ExternalDocumentationVisitor,
  ExternalDocumentationVisitorOptions,
} from './refractor/visitors/async-api-2/external-documentation/index.ts';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/async-api-2/info/index.ts';
export type {
  default as InfoVersionVisitor,
  VersionVisitorOptions as InfoVersionVisitorOptions,
} from './refractor/visitors/async-api-2/info/VersionVisitor.ts';
export type {
  default as LicenseVisitor,
  LicenseVisitorOptions,
} from './refractor/visitors/async-api-2/license/index.ts';
export type {
  default as MessageVisitor,
  MessageVisitorOptions,
} from './refractor/visitors/async-api-2/message/index.ts';
export type {
  default as MessageBindingsFieldVisitor,
  BindingsVisitorOptions as MessageBindingsFieldVisitorOptions,
} from './refractor/visitors/async-api-2/message/BindingsVisitor.ts';
export type {
  default as MessageCorrelationIdVisitor,
  CorrelationIdVisitorOptions as MessageCorrelationIdVisitorOptions,
} from './refractor/visitors/async-api-2/message/CorrelationIdVisitor.ts';
export type {
  default as MessageExamplesVisitor,
  ExamplesVisitorOptions as MessageExamplesVisitorOptions,
} from './refractor/visitors/async-api-2/message/ExamplesVisitor.ts';
export type {
  default as MessageHeadersVisitor,
  HeadersVisitorOptions as MessageHeadersVisitorOptions,
} from './refractor/visitors/async-api-2/message/HeadersVisitor.ts';
export type {
  default as MessageTraitsVisitor,
  TraitsVisitorOptions as MessageTraitsVisitorOptions,
} from './refractor/visitors/async-api-2/message/TraitsVisitor.ts';
export type {
  default as MessageBindingsVisitor,
  MessageBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/message-bindings/index.ts';
export type {
  default as MessageExampleVisitor,
  MessageExampleVisitorOptions,
} from './refractor/visitors/async-api-2/message-example/index.ts';
export type {
  default as MessageTraitVisitor,
  MessageTraitVisitorOptions,
} from './refractor/visitors/async-api-2/message-trait/index.ts';
export type {
  default as MessageTraitBindingsVisitor,
  BindingsVisitorOptions as MessageTraitBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/message-trait/BindingsVisitor.ts';
export type {
  default as MessageTraitCorrelationIdVisitor,
  CorrelationIdVisitorOptions as MessageTraitCorrelationIdVisitorOptions,
} from './refractor/visitors/async-api-2/message-trait/CorrelationIdVisitor.ts';
export type {
  default as MessageTraitExamplesVisitor,
  ExamplesVisitorOptions as MessageTraitExamplesVisitorOptions,
} from './refractor/visitors/async-api-2/message-trait/ExamplesVisitor.ts';
export type {
  default as MessageTraitHeadersVisitor,
  DefaultVisitorOptions as MessageTraitHeadersVisitorOptions,
} from './refractor/visitors/async-api-2/message-trait/HeadersVisitor.ts';
export type {
  default as OAuthFlowVisitor,
  OAuthFlowVisitorOptions,
} from './refractor/visitors/async-api-2/oauth-flow/index.ts';
export type {
  default as OAuthFlowScopesVisitor,
  ScopesVisitorOptions as OAuthFlowScopesVisitorOptions,
} from './refractor/visitors/async-api-2/oauth-flow/ScopesVisitor.ts';
export type {
  default as OAuthFlowsVisitor,
  OAuthFlowsVisitorOptions,
} from './refractor/visitors/async-api-2/oauth-flows/index.ts';
export type {
  default as OperationVisitor,
  OperationVisitorOptions,
} from './refractor/visitors/async-api-2/operation/index.ts';
export type {
  default as OperationBindingsFieldVisitor,
  BindingsVisitorOptions as OperationBindingsFieldVisitorOptions,
} from './refractor/visitors/async-api-2/operation/BindingsVisitor.ts';
export type {
  default as OperationMessageVisitor,
  MessageVisitorOptions as OperationMessageVisitorOptions,
} from './refractor/visitors/async-api-2/operation/MessageVisitor.ts';
export type {
  default as OperationSecurityVisitor,
  SecurityVisitorOptions as OperationSecurityVisitorOptions,
} from './refractor/visitors/async-api-2/operation/SecurityVisitor.ts';
export type {
  default as OperationTraitsVisitor,
  TraitsVisitorOptions as OperationTraitsVisitorOptions,
} from './refractor/visitors/async-api-2/operation/TraitsVisitor.ts';
export type {
  default as OperationBindingsVisitor,
  OperationBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/operation-bindings/index.ts';
export type {
  default as OperationTraitVisitor,
  OperationTraitVisitorOptions,
} from './refractor/visitors/async-api-2/operation-trait/index.ts';
export type {
  default as OperationTraitBindingsVisitor,
  BindingsVisitorOptions as OperationTraitBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/operation-trait/BindingsVisitor.ts';
export type {
  default as OperationTraitSecurityVisitor,
  SecurityVisitorOptions as OperationTraitSecurityVisitorOptions,
} from './refractor/visitors/async-api-2/operation-trait/SecurityVisitor.ts';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/async-api-2/parameter/index.ts';
export type {
  default as ParameterSchemaVisitor,
  SchemaVisitorOptions as ParameterSchemaVisitorOptions,
} from './refractor/visitors/async-api-2/parameter/SchemaVisitor.ts';
export type {
  default as ParametersVisitor,
  ParametersVisitorOptions,
} from './refractor/visitors/async-api-2/parameters/index.ts';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/async-api-2/reference/index.ts';
export type {
  default as Reference$RefVisitor,
  $RefVisitorOptions as Reference$RefVisitorOptions,
} from './refractor/visitors/async-api-2/reference/$RefVisitor.ts';
export type {
  default as SchemaVisitor,
  SchemaVisitorOptions,
} from './refractor/visitors/async-api-2/schema/index.ts';
export type {
  default as SchemaAllOfVisitor,
  AllOfVisitorOptions as SchemaAllOfVisitorOptions,
  JSONSchemaAllOfVisitor,
} from './refractor/visitors/async-api-2/schema/AllOfVisitor.ts';
export type {
  default as SchemaAnyOfVisitor,
  AnyOfVisitorOptions as SchemaAnyOfVisitorOptions,
  JSONSchemaAnyOfVisitor,
} from './refractor/visitors/async-api-2/schema/AnyOfVisitor.ts';
export type {
  default as SchemaDefinitionsVisitor,
  DefinitionsVisitorOptions as SchemaDefinitionsVisitorOptions,
  JSONSchemaDefinitionsVisitor,
} from './refractor/visitors/async-api-2/schema/DefinitionsVisitor.ts';
export type {
  default as SchemaDependenciesVisitor,
  DependenciesVisitorOptions as SchemaDependenciesVisitorOptions,
  JSONSchemaDependenciesVisitor,
} from './refractor/visitors/async-api-2/schema/DependenciesVisitor.ts';
export type {
  default as SchemaItemsVisitor,
  ItemsVisitorOptions as SchemaItemsVisitorOptions,
  JSONSchemaItemsVisitor,
} from './refractor/visitors/async-api-2/schema/ItemsVisitor.ts';
export type {
  default as SchemaOneOfVisitor,
  OneOfVisitorOptions as SchemaOneOfVisitorOptions,
  JSONSchemaOneOfVisitor,
} from './refractor/visitors/async-api-2/schema/OneOfVisitor.ts';
export type {
  default as SchemaPatternPropertiesVisitor,
  PatternPropertiesVisitorOptions as SchemaPatternPropertiesVisitorOptions,
  JSONSchemaPatternPropertiesVisitor,
} from './refractor/visitors/async-api-2/schema/PatternPropertiesVisitor.ts';
export type {
  default as SchemaPropertiesVisitor,
  PropertiesVisitorOptions as SchemaPropertiesVisitorOptions,
  JSONSchemaPropertiesVisitor,
} from './refractor/visitors/async-api-2/schema/PropertiesVisitor.ts';
export { default as SchemaOrReferenceVisitor } from './refractor/visitors/async-api-2/schema/SchemaOrReferenceVisitor.ts';
export type {
  SchemaOrReferenceVisitorOptions,
  JSONSchemaOrJSONReferenceVisitor,
} from './refractor/visitors/async-api-2/schema/SchemaOrReferenceVisitor.ts';
export type {
  default as SecurityRequirementVisitor,
  SecurityRequirementVisitorOptions,
} from './refractor/visitors/async-api-2/security-requirement/index.ts';
export type {
  default as SecuritySchemeVisitor,
  SecuritySchemeVisitorOptions,
} from './refractor/visitors/async-api-2/security-scheme/index.ts';
export type {
  default as ServerVisitor,
  ServerVisitorOptions,
} from './refractor/visitors/async-api-2/server/index.ts';
export type {
  default as ServerBindingsFieldVisitor,
  BindingsVisitorOptions as ServerBindingsFieldVisitorOptions,
} from './refractor/visitors/async-api-2/server/BindingsVisitor.ts';
export type {
  default as ServerSecurityVisitor,
  SecurityVisitorOptions as ServerSecurityVisitorOptions,
} from './refractor/visitors/async-api-2/server/SecurityVisitor.ts';
export type {
  default as ServerUrlVisitor,
  UrlVisitorOptions as ServerUrlVisitorOptions,
} from './refractor/visitors/async-api-2/server/UrlVisitor.ts';
export type {
  default as ServerVariablesVisitor,
  VariablesVisitorOptions as ServerVariablesVisitorOptions,
} from './refractor/visitors/async-api-2/server/VariablesVisitor.ts';
export type {
  default as ServerBindingsVisitor,
  ServerBindingsVisitorOptions,
} from './refractor/visitors/async-api-2/server-bindings/index.ts';
export type {
  default as ServerVariableVisitor,
  ServerVariableVisitorOptions,
} from './refractor/visitors/async-api-2/server-variable/index.ts';
export type {
  default as ServersVisitor,
  ServersVisitorOptions,
} from './refractor/visitors/async-api-2/servers/index.ts';
export type {
  default as TagVisitor,
  TagVisitorOptions,
} from './refractor/visitors/async-api-2/tag/index.ts';
export type {
  default as TagsVisitor,
  TagsVisitorOptions,
} from './refractor/visitors/async-api-2/tags/index.ts';
export type {
  default as AsyncApi2Visitor,
  AsyncApi2VisitorOptions,
} from './refractor/visitors/async-api-2/index.ts';
export type {
  default as AsyncApiVersionVisitor,
  AsyncApiVersionVisitorOptions,
} from './refractor/visitors/async-api-2/AsyncApiVersionVisitor.ts';
export type {
  default as DefaultContentTypeVisitor,
  DefaultContentTypeVisitorOptions,
} from './refractor/visitors/async-api-2/DefaultContentTypeVisitor.ts';
export type {
  default as IdentifierVisitor,
  IdentifierVisitorOptions,
} from './refractor/visitors/async-api-2/IdentifierVisitor.ts';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

export {
  /**
   * AsyncApi >= 2.0.0 <=2.6.0 specification elements.
   */
  AsyncApi2Element,
  AsyncApiVersionElement,
  ChannelBindingsElement,
  ChannelItemElement,
  ChannelsElement,
  ComponentsElement,
  ContactElement,
  CorrelationIDElement,
  DefaultContentTypeElement,
  ExternalDocumentationElement,
  IdentifierElement,
  InfoElement,
  LicenseElement,
  MessageElement,
  MessageBindingsElement,
  MessageExampleElement,
  MessageTraitElement,
  OAuthFlowElement,
  OAuthFlowsElement,
  OperationElement,
  OperationBindingsElement,
  OperationTraitElement,
  ParameterElement,
  ParametersElement,
  ReferenceElement,
  SchemaElement,
  SecurityRequirementElement,
  SecuritySchemeElement,
  ServerElement,
  ServerBindingsElement,
  ServersElement,
  ServerVariableElement,
  TagElement,
  TagsElement,
  /**
   * Binding elements.
   */
  // AMQP 0-9-1
  AmqpChannelBindingElement,
  AmqpMessageBindingElement,
  AmqpOperationBindingElement,
  AmqpServerBindingElement,
  // AMQP 1.0
  Amqp1ChannelBindingElement,
  Amqp1MessageBindingElement,
  Amqp1OperationBindingElement,
  Amqp1ServerBindingElement,
  // Anypoint MQ
  AnypointmqChannelBindingElement,
  AnypointmqMessageBindingElement,
  AnypointmqOperationBindingElement,
  AnypointmqServerBindingElement,
  // Google Cloud Pub/Sub
  GooglepubsubChannelBindingElement,
  GooglepubsubMessageBindingElement,
  GooglepubsubOperationBindingElement,
  GooglepubsubServerBindingElement,

  // HTTP
  HttpChannelBindingElement,
  HttpMessageBindingElement,
  HttpOperationBindingElement,
  HttpServerBindingElement,
  // IBM MQ
  IbmmqChannelBindingElement,
  IbmmqMessageBindingElement,
  IbmmqOperationBindingElement,
  IbmmqServerBindingElement,
  // JMS
  JmsChannelBindingElement,
  JmsMessageBindingElement,
  JmsOperationBindingElement,
  JmsServerBindingElement,
  // Kafka
  KafkaChannelBindingElement,
  KafkaMessageBindingElement,
  KafkaOperationBindingElement,
  KafkaServerBindingElement,
  // Mercure
  MercureChannelBindingElement,
  MercureMessageBindingElement,
  MercureOperationBindingElement,
  MercureServerBindingElement,
  // MQTT
  MqttChannelBindingElement,
  MqttMessageBindingElement,
  MqttOperationBindingElement,
  MqttServerBindingElement,
  // MQTT 5
  Mqtt5ChannelBindingElement,
  Mqtt5MessageBindingElement,
  Mqtt5OperationBindingElement,
  Mqtt5ServerBindingElement,
  // NATS
  NatsChannelBindingElement,
  NatsMessageBindingElement,
  NatsOperationBindingElement,
  NatsServerBindingElement,
  // Pulsar
  PulsarChannelBindingElement,
  PulsarMessageBindingElement,
  PulsarOperationBindingElement,
  PulsarServerBindingElement,
  // Redis
  RedisChannelBindingElement,
  RedisMessageBindingElement,
  RedisOperationBindingElement,
  RedisServerBindingElement,
  // SNS
  SnsChannelBindingElement,
  SnsMessageBindingElement,
  SnsOperationBindingElement,
  SnsServerBindingElement,
  // Solace
  SolaceChannelBindingElement,
  SolaceMessageBindingElement,
  SolaceOperationBindingElement,
  SolaceServerBindingElement,
  // SQS
  SqsChannelBindingElement,
  SqsMessageBindingElement,
  SqsOperationBindingElement,
  SqsServerBindingElement,
  // STOMP
  StompChannelBindingElement,
  StompMessageBindingElement,
  StompOperationBindingElement,
  StompServerBindingElement,
  // WebSocket
  WebSocketChannelBindingElement,
  WebSocketMessageBindingElement,
  WebSocketOperationBindingElement,
  WebSocketServerBindingElement,
} from './refractor/registration.ts';

export { default as ComponentsChannelsElement } from './elements/nces/ComponentsChannels.ts';
export { default as ComponentsSchemasElement } from './elements/nces/ComponentsSchemas.ts';
export { default as MessageExamplesElement } from './elements/nces/MessageExamples.ts';
export { default as MessageTraitsElement } from './elements/nces/MessageTraits.ts';
export { default as OperationMessageElement } from './elements/nces/OperationMessage.ts';
export { default as OperationSecurityElement } from './elements/nces/OperationSecurity.ts';
export { default as OperationTraitsElement } from './elements/nces/OperationTraits.ts';
export { default as ServerSecurityElement } from './elements/nces/ServerSecurity.ts';

export type { default as ChannelItemsServersElement } from './elements/nces/ChannelItemsServers.ts';
export type { default as ComponentsChannelBindingsElement } from './elements/nces/ComponentsChannelBindings.ts';
export type { default as ComponentsCorrelationIDsElement } from './elements/nces/ComponentsCorrelationIDs.ts';
export type { default as ComponentsMessageBindingsElement } from './elements/nces/ComponentsMessageBindings.ts';
export type { default as ComponentsMessagesElement } from './elements/nces/ComponentsMessages.ts';
export type { default as ComponentsMessageTraitsElement } from './elements/nces/ComponentsMessageTraits.ts';
export type { default as ComponentsOperationBindingsElement } from './elements/nces/ComponentsOperationBindings.ts';
export type { default as ComponentsOperationTraitsElement } from './elements/nces/ComponentsOperationTraits.ts';
export type { default as ComponentsParametersElement } from './elements/nces/ComponentsParameters.ts';
export type { default as ComponentsSecuritySchemesElement } from './elements/nces/ComponentsSecuritySchemes.ts';
export type { default as ComponentsServerBindingsElement } from './elements/nces/ComponentsServerBindings.ts';
export type { default as ComponentsServersElement } from './elements/nces/ComponentsServers.ts';
export type { default as ComponentsServerVariablesElement } from './elements/nces/ComponentsServerVariables.ts';
export type { default as MessageTraitExamplesElement } from './elements/nces/MessageTraitExamples.ts';
export type { default as OAuthFlowScopesElement } from './elements/nces/OAuthFlowScopes.ts';
export type { default as OperationMessageMapElement } from './elements/nces/OperationMessageMap.ts';
export type { default as OperationTraitSecurityElement } from './elements/nces/OperationTraitSecurity.ts';
export type { default as ServerVariablesElement } from './elements/nces/ServerVariables.ts';
