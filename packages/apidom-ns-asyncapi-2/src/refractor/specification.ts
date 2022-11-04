import { specificationObj as JSONSchemaDraft7Specification } from '@swagger-api/apidom-ns-json-schema-draft-7';

import FallbackVisitor from './visitors/FallbackVisitor';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
/**
 * AsyncApi >= 2.0.0 <=2.5.0 specification elements.
 */
import AsyncApi2Visitor from './visitors/async-api-2';
import AsyncApiVersionVisitor from './visitors/async-api-2/AsyncApiVersionVisitor';
import IdentifierVisitor from './visitors/async-api-2/IdentifierVisitor';
import InfoVisitor from './visitors/async-api-2/info';
import InfoTitleVisitor from './visitors/async-api-2/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/async-api-2/info/DescriptionVisitor';
import InfoTermsOfServiceVisitor from './visitors/async-api-2/info/TermsOfServiceVisitor';
import InfoVersionVisitor from './visitors/async-api-2/info/VersionVisitor';
import ContactVisitor from './visitors/async-api-2/contact';
import ContactNameVisitor from './visitors/async-api-2/contact/NameVisitor';
import ContactUrlVisitor from './visitors/async-api-2/contact/UrlVisitor';
import ContactEmailVisitor from './visitors/async-api-2/contact/EmailVisitor';
import CorrelationIDVisitor from './visitors/async-api-2/correlation-id';
import CorrelationIDDescriptionVisitor from './visitors/async-api-2/correlation-id/DescriptionVisitor';
import CorrelationIDLocationVisitor from './visitors/async-api-2/correlation-id/LocationVisitor';
import DefaultContentTypeVisitor from './visitors/async-api-2/DefaultContentTypeVisitor';
import LicenseVisitor from './visitors/async-api-2/license';
import LicenseNameVisitor from './visitors/async-api-2/license/NameVisitor';
import LicenseUrlVisitor from './visitors/async-api-2/license/UrlVisitor';
import OAuthFlowsVisitor from './visitors/async-api-2/oauth-flows';
import OAuthFlowVisitor from './visitors/async-api-2/oauth-flow';
import OAuthFlowAuthorizationUrlVisitor from './visitors/async-api-2/oauth-flow/AuthorizationUrlVisitor';
import OAuthFlowTokenUrlVisitor from './visitors/async-api-2/oauth-flow/TokenUrlVisitor';
import OAuthFlowRefreshUrlVisitor from './visitors/async-api-2/oauth-flow/RefreshUrlVisitor';
import OAuthFlowScopesVisitor from './visitors/async-api-2/oauth-flow/ScopesVisitor';
import ServersVisitor from './visitors/async-api-2/servers';
import ServerVisitor from './visitors/async-api-2/server';
import ServerUrlVisitor from './visitors/async-api-2/server/UrlVisitor';
import ServerProtocolVisitor from './visitors/async-api-2/server/ProtocolVisitor';
import ServerProtocolVersionVisitor from './visitors/async-api-2/server/ProtocolVersionVisitor';
import ServerDescriptionVisitor from './visitors/async-api-2/server/DescriptionVisitor';
import ServerBindingsVisitor_ from './visitors/async-api-2/server/BindingsVisitor';
import ServerVariablesVisitor from './visitors/async-api-2/server/VariablesVisitor';
import ServerSecurityVisitor from './visitors/async-api-2/server/SecurityVisitor';
import ServerVariableVisitor from './visitors/async-api-2/server-variable';
import ServerVariableEnumVisitor from './visitors/async-api-2/server-variable/EnumVisitor';
import ServerVariableDefaultVisitor from './visitors/async-api-2/server-variable/DefaultVisitor';
import ServerVariableDescriptionVisitor from './visitors/async-api-2/server-variable/DescriptionVisitor';
import ServerVariableExamplesVisitor from './visitors/async-api-2/server-variable/ExamplesVisitor';
import ServerBindingsVisitor from './visitors/async-api-2/server-bindings';
import SecuritySchemeVisitor from './visitors/async-api-2/security-scheme';
import SecuritySchemeTypeVisitor from './visitors/async-api-2/security-scheme/TypeVisitor';
import SecuritySchemeDescriptionVisitor from './visitors/async-api-2/security-scheme/DescriptionVisitor';
import SecuritySchemeNameVisitor from './visitors/async-api-2/security-scheme/NameVisitor';
import SecuritySchemeInVisitor from './visitors/async-api-2/security-scheme/InVisitor';
import SecuritySchemeSchemeVisitor from './visitors/async-api-2/security-scheme/SchemeVisitor';
import SecuritySchemeBearerFormatVisitor from './visitors/async-api-2/security-scheme/BearerFormatVisitor';
import SecuritySchemeOpenIdConnectUrlVisitor from './visitors/async-api-2/security-scheme/OpenIdConnectUrlVisitor';
import SecurityRequirementVisitor from './visitors/async-api-2/security-requirement';
import ReferenceVisitor from './visitors/async-api-2/reference';
import Reference$RefVisitor from './visitors/async-api-2/reference/$RefVisitor';
import SchemaVisitor from './visitors/async-api-2/schema';
import SchemaOrReferenceVisitor from './visitors/async-api-2/schema/SchemaOrReferenceVisitor';
import SchemaDeprecatedVisitor from './visitors/async-api-2/schema/DeprecatedVisitor';
import SchemaDiscriminatorVisitor from './visitors/async-api-2/schema/DiscriminatorVisitor';
import SchemaAllOfVisitor from './visitors/async-api-2/schema/AllOfVisitor';
import SchemaAnyOfVisitor from './visitors/async-api-2/schema/AnyOfVisitor';
import SchemaOneOfVisitor from './visitors/async-api-2/schema/OneOfVisitor';
import SchemaDefinitionsVisitor from './visitors/async-api-2/schema/DefinitionsVisitor';
import SchemaDependenciesVisitor from './visitors/async-api-2/schema/DependenciesVisitor';
import SchemaItemsVisitor from './visitors/async-api-2/schema/ItemsVisitor';
import SchemaPatternPropertiesVisitor from './visitors/async-api-2/schema/PatternPropertiesVisitor';
import SchemaPropertiesVisitor from './visitors/async-api-2/schema/PropertiesVisitor';
import schemaInheritedFixedFields from './visitors/async-api-2/schema/inherited-fixed-fields';
import ParametersVisitor from './visitors/async-api-2/parameters';
import ParameterVisitor from './visitors/async-api-2/parameter';
import ParameterDescriptionVisitor from './visitors/async-api-2/parameter/DescriptionVisitor';
import ParameterLocationVisitor from './visitors/async-api-2/parameter/LocationVisitor';
import ParameterSchemaVisitor from './visitors/async-api-2/parameter/SchemaVisitor';
import ExternalDocumentationVisitor from './visitors/async-api-2/external-documentation';
import ExternalDocumentationDescriptionVisitor from './visitors/async-api-2/external-documentation/DescriptionVisitor';
import ExternalDocumentationUrlVisitor from './visitors/async-api-2/external-documentation/UrlVisitor';
import ComponentsVisitor from './visitors/async-api-2/components';
import ComponentsSchemasVisitor from './visitors/async-api-2/components/SchemasVisitor';
import ComponentsServersVisitor from './visitors/async-api-2/components/ServersVisitor';
import ComponentsServerVariablesVisitor from './visitors/async-api-2/components/ServerVariablesVisitor';
import ComponentsChannelsVisitor from './visitors/async-api-2/components/ChannelsVisitor';
import ComponentsMessagesVisitor from './visitors/async-api-2/components/MessagesVisitor';
import ComponentsSecuritySchemesVisitor from './visitors/async-api-2/components/SecuritySchemesVisitor';
import ComponentsParametersVisitor from './visitors/async-api-2/components/ParametersVisitor';
import ComponentsCorrelationIdsVisitor from './visitors/async-api-2/components/CorrelationIdsVisitor';
import ComponentsOperationTraitsVisitor from './visitors/async-api-2/components/OperationTraitsVisitor';
import ComponentsMessageTraitsVisitor from './visitors/async-api-2/components/MessageTraitsVisitor';
import ComponentsServerBindingsVisitor from './visitors/async-api-2/components/ServerBindingsVisitor';
import ComponentsChannelBindingsVisitor from './visitors/async-api-2/components/ChannelBindingsVisitor';
import ComponentsOperationBindingsVisitor from './visitors/async-api-2/components/OperationBindingsVisitor';
import ComponentsMessageBindingsVisitor from './visitors/async-api-2/components/MessageBindingsVisitor';
import OperationVisitor from './visitors/async-api-2/operation';
import OperationOperationIdVisitor from './visitors/async-api-2/operation/OperationIdVisitor';
import OperationSummaryVisitor from './visitors/async-api-2/operation/SummaryVisitor';
import OperationDescriptionVisitor from './visitors/async-api-2/operation/DescriptionVisitor';
import OperationSecurityVisitor from './visitors/async-api-2/operation/SecurityVisitor';
import OperationBindingsVisitor_ from './visitors/async-api-2/operation/BindingsVisitor';
import OperationTraitsVisitor from './visitors/async-api-2/operation/TraitsVisitor';
import OperationMessageVisitor from './visitors/async-api-2/operation/MessageVisitor';
import TagsVisitor from './visitors/async-api-2/tags';
import TagVisitor from './visitors/async-api-2/tag';
import TagNameVisitor from './visitors/async-api-2/tag/NameVisitor';
import TagDescriptionVisitor from './visitors/async-api-2/tag/DescriptionVisitor';
import ChannelsVisitor from './visitors/async-api-2/channels';
import ChannelBindingsVisitor from './visitors/async-api-2/channel-bindings';
import ChannelItemVisitor from './visitors/async-api-2/channel-item';
import ChannelItem$RefVisitor from './visitors/async-api-2/channel-item/$RefVisitor';
import ChannelItemDescriptionVisitor from './visitors/async-api-2/channel-item/DescriptionVisitor';
import ChannelItemServersVisitor from './visitors/async-api-2/channel-item/ServersVisitor';
import ChannelItemBindingsVisitor from './visitors/async-api-2/channel-item/BindingsVisitor';
import MessageBindingsVisitor from './visitors/async-api-2/message-bindings';
import MessageExampleVisitor from './visitors/async-api-2/message-example';
import MessageExampleHeadersVisitor from './visitors/async-api-2/message-example/HeadersVisitor';
import MessageExamplePayloadVisitor from './visitors/async-api-2/message-example/PayloadVisitor';
import MessageExampleNameVisitor from './visitors/async-api-2/message-example/NameVisitor';
import MessageExampleSummaryVisitor from './visitors/async-api-2/message-example/SummaryVisitor';
import MessageTraitVisitor from './visitors/async-api-2/message-trait';
import MessageTraitMessageIdVisitor from './visitors/async-api-2/message-trait/MessageIdVisitor';
import MessageTraitHeadersVisitor from './visitors/async-api-2/message-trait/HeadersVisitor';
import MessageTraitCorrelationIdVisitor from './visitors/async-api-2/message-trait/CorrelationIdVisitor';
import MessageTraitSchemaFormatVisitor from './visitors/async-api-2/message-trait/SchemaFormatVisitor';
import MessageTraitContentTypeVisitor from './visitors/async-api-2/message-trait/ContentTypeVisitor';
import MessageTraitNameVisitor from './visitors/async-api-2/message-trait/NameVisitor';
import MessageTraitTitleVisitor from './visitors/async-api-2/message-trait/TitleVisitor';
import MessageTraitSummaryVisitor from './visitors/async-api-2/message-trait/SummaryVisitor';
import MessageTraitDescriptionVisitor from './visitors/async-api-2/message-trait/DescriptionVisitor';
import MessageTraitBindingsVisitor from './visitors/async-api-2/message-trait/BindingsVisitor';
import MessageTraitExamplesVisitor from './visitors/async-api-2/message-trait/ExamplesVisitor';
import MessageVisitor from './visitors/async-api-2/message';
import MessageMessageIdVisitor from './visitors/async-api-2/message/MessageIdVisitor';
import MessageHeadersVisitor from './visitors/async-api-2/message/HeadersVisitor';
import MessagePayloadVisitor from './visitors/async-api-2/message/PayloadVisitor';
import MessageCorrelationIdVisitor from './visitors/async-api-2/message/CorrelationIdVisitor';
import MessageSchemaFormatVisitor from './visitors/async-api-2/message/SchemaFormatVisitor';
import MessageContentTypeVisitor from './visitors/async-api-2/message/ContentTypeVisitor';
import MessageNameVisitor from './visitors/async-api-2/message/NameVisitor';
import MessageTitleVisitor from './visitors/async-api-2/message/TitleVisitor';
import MessageSummaryVisitor from './visitors/async-api-2/message/SummaryVisitor';
import MessageDescriptionVisitor from './visitors/async-api-2/message/DescriptionVisitor';
import MessageBindingsVisitor_ from './visitors/async-api-2/message/BindingsVisitor';
import MessageExamplesVisitor from './visitors/async-api-2/message/ExamplesVisitor';
import MessageTraitsVisitor from './visitors/async-api-2/message/TraitsVisitor';
import OperationBindingsVisitor from './visitors/async-api-2/operation-bindings';
import OperationTraitVisitor from './visitors/async-api-2/operation-trait';
import OperationTraitOperationIdVisitor from './visitors/async-api-2/operation-trait/OperationIdVisitor';
import OperationTraitSummaryVisitor from './visitors/async-api-2/operation-trait/SummaryVisitor';
import OperationTraitDescriptionVisitor from './visitors/async-api-2/operation-trait/DescriptionVisitor';
import OperationTraitSecurityVisitor from './visitors/async-api-2/operation-trait/SecurityVisitor';
import OperationTraitBindingsVisitor from './visitors/async-api-2/operation-trait/BindingsVisitor';
/**
 * Binding elements.
 */
// AMQP 0-9-1
import AmqpChannelBindingVisitor from './visitors/async-api-2/bindings/amqp/channel-binding';
import AmqpMessageBindingVisitor from './visitors/async-api-2/bindings/amqp/message-binding';
import AmqpOperationBindingVisitor from './visitors/async-api-2/bindings/amqp/operation-binding';
import AmqpServerBindingVisitor from './visitors/async-api-2/bindings/amqp/server-binding';
// AMQP 1.0
import Amqp1ChannelBindingVisitor from './visitors/async-api-2/bindings/amqp1/channel-binding';
import Amqp1MessageBindingVisitor from './visitors/async-api-2/bindings/amqp1/message-binding';
import Amqp1OperationBindingVisitor from './visitors/async-api-2/bindings/amqp1/operation-binding';
import Amqp1ServerBindingVisitor from './visitors/async-api-2/bindings/amqp1/server-binding';
// Anypoint MQ
import AnypointmqChannelBindingVisitor from './visitors/async-api-2/bindings/anypointmq/channel-binding';
import AnypointmqMessageBindingVisitor from './visitors/async-api-2/bindings/anypointmq/message-binding';
import AnypointmqOperationBindingVisitor from './visitors/async-api-2/bindings/anypointmq/operation-binding';
import AnypointmqServerBindingVisitor from './visitors/async-api-2/bindings/anypointmq/server-binding';
// HTTP
import HttpChannelBindingVisitor from './visitors/async-api-2/bindings/http/channel-binding';
import HttpMessageBindingVisitor from './visitors/async-api-2/bindings/http/message-binding';
import HttpOperationBindingVisitor from './visitors/async-api-2/bindings/http/operation-binding';
import HttpServerBindingVisitor from './visitors/async-api-2/bindings/http/server-binding';
// Google Cloud Pub/Sub
import GooglepubsubChannelBindingVisitor from './visitors/async-api-2/bindings/googlepubsub/channel-binding';
import GooglepubsubMessageBindingVisitor from './visitors/async-api-2/bindings/googlepubsub/message-binding';
import GooglepubsubOperationBindingVisitor from './visitors/async-api-2/bindings/googlepubsub/operation-binding';
import GooglepubsubServerBindingVisitor from './visitors/async-api-2/bindings/googlepubsub/server-binding';
// IBM MQ
import IbmmqChannelBindingVisitor from './visitors/async-api-2/bindings/ibmmq/channel-binding';
import IbmmqMessageBindingVisitor from './visitors/async-api-2/bindings/ibmmq/message-binding';
import IbmmqOperationBindingVisitor from './visitors/async-api-2/bindings/ibmmq/operation-binding';
import IbmmqServerBindingVisitor from './visitors/async-api-2/bindings/ibmmq/server-binding';
// JMS
import JmsChannelBindingVisitor from './visitors/async-api-2/bindings/jms/channel-binding';
import JmsMessageBindingVisitor from './visitors/async-api-2/bindings/jms/message-binding';
import JmsOperationBindingVisitor from './visitors/async-api-2/bindings/jms/operation-binding';
import JmsServerBindingVisitor from './visitors/async-api-2/bindings/jms/server-binding';
// Kafka
import KafkaChannelBindingVisitor from './visitors/async-api-2/bindings/kafka/channel-binding';
import KafkaMessageBindingVisitor from './visitors/async-api-2/bindings/kafka/message-binding';
import KafkaOperationBindingVisitor from './visitors/async-api-2/bindings/kafka/operation-binding';
import KafkaServerBindingVisitor from './visitors/async-api-2/bindings/kafka/server-binding';
// Mercure
import MercureChannelBindingVisitor from './visitors/async-api-2/bindings/mercure/channel-binding';
import MercureMessageBindingVisitor from './visitors/async-api-2/bindings/mercure/message-binding';
import MercureOperationBindingVisitor from './visitors/async-api-2/bindings/mercure/operation-binding';
import MercureServerBindingVisitor from './visitors/async-api-2/bindings/mercure/server-binding';
// MQTT
import MqttChannelBindingVisitor from './visitors/async-api-2/bindings/mqtt/channel-binding';
import MqttMessageBindingVisitor from './visitors/async-api-2/bindings/mqtt/message-binding';
import MqttOperationBindingVisitor from './visitors/async-api-2/bindings/mqtt/operation-binding';
import MqttServerBindingVisitor from './visitors/async-api-2/bindings/mqtt/server-binding';
// MQTT 5
import Mqtt5ChannelBindingVisitor from './visitors/async-api-2/bindings/mqtt5/channel-binding';
import Mqtt5MessageBindingVisitor from './visitors/async-api-2/bindings/mqtt5/message-binding';
import Mqtt5OperationBindingVisitor from './visitors/async-api-2/bindings/mqtt5/operation-binding';
import Mqtt5ServerBindingVisitor from './visitors/async-api-2/bindings/mqtt5/server-binding';
// NATS
import NatsChannelBindingVisitor from './visitors/async-api-2/bindings/nats/channel-binding';
import NatsMessageBindingVisitor from './visitors/async-api-2/bindings/nats/message-binding';
import NatsOperationBindingVisitor from './visitors/async-api-2/bindings/nats/operation-binding';
import NatsServerBindingVisitor from './visitors/async-api-2/bindings/nats/server-binding';
// Redis
import RedisChannelBindingVisitor from './visitors/async-api-2/bindings/redis/channel-binding';
import RedisMessageBindingVisitor from './visitors/async-api-2/bindings/redis/message-binding';
import RedisOperationBindingVisitor from './visitors/async-api-2/bindings/redis/operation-binding';
import RedisServerBindingVisitor from './visitors/async-api-2/bindings/redis/server-binding';
// SNS
import SnsChannelBindingVisitor from './visitors/async-api-2/bindings/sns/channel-binding';
import SnsMessageBindingVisitor from './visitors/async-api-2/bindings/sns/message-binding';
import SnsOperationBindingVisitor from './visitors/async-api-2/bindings/sns/operation-binding';
import SnsServerBindingVisitor from './visitors/async-api-2/bindings/sns/server-binding';
// Solace
import SolaceChannelBindingVisitor from './visitors/async-api-2/bindings/solace/channel-binding';
import SolaceMessageBindingVisitor from './visitors/async-api-2/bindings/solace/message-binding';
import SolaceOperationBindingVisitor from './visitors/async-api-2/bindings/solace/operation-binding';
import SolaceServerBindingVisitor from './visitors/async-api-2/bindings/solace/server-binding';
// SQS
import SqsChannelBindingVisitor from './visitors/async-api-2/bindings/sqs/channel-binding';
import SqsMessageBindingVisitor from './visitors/async-api-2/bindings/sqs/message-binding';
import SqsOperationBindingVisitor from './visitors/async-api-2/bindings/sqs/operation-binding';
import SqsServerBindingVisitor from './visitors/async-api-2/bindings/sqs/server-binding';
// STOMP
import StompChannelBindingVisitor from './visitors/async-api-2/bindings/stomp/channel-binding';
import StompMessageBindingVisitor from './visitors/async-api-2/bindings/stomp/message-binding';
import StompOperationBindingVisitor from './visitors/async-api-2/bindings/stomp/operation-binding';
import StompServerBindingVisitor from './visitors/async-api-2/bindings/stomp/server-binding';
// WebSocket
import WebSocketChannelBindingVisitor from './visitors/async-api-2/bindings/ws/channel-binding';
import WebSocketMessageBindingVisitor from './visitors/async-api-2/bindings/ws/message-binding';
import WebSocketOperationBindingVisitor from './visitors/async-api-2/bindings/ws/operation-binding';
import WebSocketServerBindingVisitor from './visitors/async-api-2/bindings/ws/server-binding';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 */

const ReferenceSpecification = {
  $visitor: ReferenceVisitor,
  fixedFields: {
    $ref: Reference$RefVisitor,
  },
};

const SchemaSpecification = {
  $visitor: SchemaVisitor,
  fixedFields: {
    ...schemaInheritedFixedFields,
    // validation vocabulary
    // validation keywords for Applying Subschemas With Boolean Logic
    allOf: SchemaAllOfVisitor,
    anyOf: SchemaAnyOfVisitor,
    oneOf: SchemaOneOfVisitor,
    // validation Keywords for Arrays
    items: SchemaItemsVisitor,
    // validation Keywords for Objects
    properties: SchemaPropertiesVisitor,
    patternProperties: SchemaPatternPropertiesVisitor,
    dependencies: SchemaDependenciesVisitor,
    // validation Vocabulary for Schema Re-Use With "definitions"
    definitions: SchemaDefinitionsVisitor,
    // AsyncAPI vocabulary
    discriminator: SchemaDiscriminatorVisitor,
    externalDocs: {
      $ref: '#/visitors/document/objects/ExternalDocumentation',
    },
    deprecated: SchemaDeprecatedVisitor,
  },
};

const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        /**
         * AsyncApi >= 2.0.0 <=2.5.0 specification elements.
         */
        AsyncApi: {
          $visitor: AsyncApi2Visitor,
          fixedFields: {
            asyncapi: {
              $ref: '#/visitors/document/objects/AsyncApiVersion',
            },
            id: {
              $ref: '#/visitors/document/objects/Identifier',
            },
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            servers: {
              $ref: '#/visitors/document/objects/Servers',
            },
            defaultContentType: {
              $ref: '#/visitors/document/objects/DefaultContentType',
            },
            channels: {
              $ref: '#/visitors/document/objects/Channels',
            },
            components: {
              $ref: '#/visitors/document/objects/Components',
            },
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
          },
        },
        AsyncApiVersion: {
          $visitor: AsyncApiVersionVisitor,
        },
        Identifier: {
          $visitor: IdentifierVisitor,
        },
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: InfoTitleVisitor,
            description: InfoDescriptionVisitor,
            termsOfService: InfoTermsOfServiceVisitor,
            version: InfoVersionVisitor,
            contact: {
              $ref: '#/visitors/document/objects/Contact',
            },
            license: {
              $ref: '#/visitors/document/objects/License',
            },
          },
        },
        Contact: {
          $visitor: ContactVisitor,
          fixedFields: {
            name: ContactNameVisitor,
            url: ContactUrlVisitor,
            email: ContactEmailVisitor,
          },
        },
        License: {
          $visitor: LicenseVisitor,
          fixedFields: {
            name: LicenseNameVisitor,
            url: LicenseUrlVisitor,
          },
        },
        Servers: {
          $visitor: ServersVisitor,
        },
        Server: {
          $visitor: ServerVisitor,
          fixedFields: {
            url: ServerUrlVisitor,
            protocol: ServerProtocolVisitor,
            protocolVersion: ServerProtocolVersionVisitor,
            description: ServerDescriptionVisitor,
            variables: ServerVariablesVisitor,
            security: ServerSecurityVisitor,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            bindings: ServerBindingsVisitor_,
          },
        },
        ServerVariable: {
          $visitor: ServerVariableVisitor,
          fixedFields: {
            enum: ServerVariableEnumVisitor,
            default: ServerVariableDefaultVisitor,
            description: ServerVariableDescriptionVisitor,
            examples: ServerVariableExamplesVisitor,
          },
        },
        DefaultContentType: {
          $visitor: DefaultContentTypeVisitor,
        },
        Channels: {
          $visitor: ChannelsVisitor,
        },
        ChannelItem: {
          $visitor: ChannelItemVisitor,
          fixedFields: {
            $ref: ChannelItem$RefVisitor,
            description: ChannelItemDescriptionVisitor,
            servers: ChannelItemServersVisitor,
            subscribe: {
              $ref: '#/visitors/document/objects/Operation',
            },
            publish: {
              $ref: '#/visitors/document/objects/Operation',
            },
            parameters: {
              $ref: '#/visitors/document/objects/Parameters',
            },
            bindings: ChannelItemBindingsVisitor,
          },
        },
        Operation: {
          $visitor: OperationVisitor,
          fixedFields: {
            operationId: OperationOperationIdVisitor,
            summary: OperationSummaryVisitor,
            description: OperationDescriptionVisitor,
            security: OperationSecurityVisitor,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            bindings: OperationBindingsVisitor_,
            traits: OperationTraitsVisitor,
            message: OperationMessageVisitor,
          },
        },
        OperationTrait: {
          $visitor: OperationTraitVisitor,
          fixedFields: {
            operationId: OperationTraitOperationIdVisitor,
            summary: OperationTraitSummaryVisitor,
            description: OperationTraitDescriptionVisitor,
            security: OperationTraitSecurityVisitor,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            bindings: OperationTraitBindingsVisitor,
          },
        },
        Message: {
          $visitor: MessageVisitor,
          fixedFields: {
            messageId: MessageMessageIdVisitor,
            headers: MessageHeadersVisitor,
            payload: MessagePayloadVisitor,
            correlationId: MessageCorrelationIdVisitor,
            schemaFormat: MessageSchemaFormatVisitor,
            contentType: MessageContentTypeVisitor,
            name: MessageNameVisitor,
            title: MessageTitleVisitor,
            summary: MessageSummaryVisitor,
            description: MessageDescriptionVisitor,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            bindings: MessageBindingsVisitor_,
            examples: MessageExamplesVisitor,
            traits: MessageTraitsVisitor,
          },
        },
        MessageTrait: {
          $visitor: MessageTraitVisitor,
          fixedFields: {
            messageId: MessageTraitMessageIdVisitor,
            headers: MessageTraitHeadersVisitor,
            correlationId: MessageTraitCorrelationIdVisitor,
            schemaFormat: MessageTraitSchemaFormatVisitor,
            contentType: MessageTraitContentTypeVisitor,
            name: MessageTraitNameVisitor,
            title: MessageTraitTitleVisitor,
            summary: MessageTraitSummaryVisitor,
            description: MessageTraitDescriptionVisitor,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            bindings: MessageTraitBindingsVisitor,
            examples: MessageTraitExamplesVisitor,
          },
        },
        MessageExample: {
          $visitor: MessageExampleVisitor,
          fixedFields: {
            headers: MessageExampleHeadersVisitor,
            payload: MessageExamplePayloadVisitor,
            name: MessageExampleNameVisitor,
            summary: MessageExampleSummaryVisitor,
          },
        },
        Tags: {
          $visitor: TagsVisitor,
        },
        Tag: {
          $visitor: TagVisitor,
          fixedFields: {
            name: TagNameVisitor,
            description: TagDescriptionVisitor,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
          fixedFields: {
            description: ExternalDocumentationDescriptionVisitor,
            url: ExternalDocumentationUrlVisitor,
          },
        },
        Components: {
          $visitor: ComponentsVisitor,
          fixedFields: {
            schemas: ComponentsSchemasVisitor,
            servers: ComponentsServersVisitor,
            serverVariables: ComponentsServerVariablesVisitor,
            channels: ComponentsChannelsVisitor,
            messages: ComponentsMessagesVisitor,
            securitySchemes: ComponentsSecuritySchemesVisitor,
            parameters: ComponentsParametersVisitor,
            correlationIds: ComponentsCorrelationIdsVisitor,
            operationTraits: ComponentsOperationTraitsVisitor,
            messageTraits: ComponentsMessageTraitsVisitor,
            serverBindings: ComponentsServerBindingsVisitor,
            channelBindings: ComponentsChannelBindingsVisitor,
            operationBindings: ComponentsOperationBindingsVisitor,
            messageBindings: ComponentsMessageBindingsVisitor,
          },
        },
        JSONReference: ReferenceSpecification,
        Reference: ReferenceSpecification,
        JSONSchema: SchemaSpecification,
        Schema: SchemaSpecification,
        LinkDescription: JSONSchemaDraft7Specification.visitors.document.objects.LinkDescription,
        SecurityScheme: {
          $visitor: SecuritySchemeVisitor,
          fixedFields: {
            type: SecuritySchemeTypeVisitor,
            description: SecuritySchemeDescriptionVisitor,
            name: SecuritySchemeNameVisitor,
            in: SecuritySchemeInVisitor,
            scheme: SecuritySchemeSchemeVisitor,
            bearerFormat: SecuritySchemeBearerFormatVisitor,
            flows: {
              $ref: '#/visitors/document/objects/OAuthFlows',
            },
            openIdConnectUrl: SecuritySchemeOpenIdConnectUrlVisitor,
          },
        },
        SecurityRequirement: {
          $visitor: SecurityRequirementVisitor,
        },
        OAuthFlows: {
          $visitor: OAuthFlowsVisitor,
          fixedFields: {
            implicit: {
              $ref: '#/visitors/document/objects/OAuthFlow',
            },
            password: {
              $ref: '#/visitors/document/objects/OAuthFlow',
            },
            clientCredentials: {
              $ref: '#/visitors/document/objects/OAuthFlow',
            },
            authorizationCode: {
              $ref: '#/visitors/document/objects/OAuthFlow',
            },
          },
        },
        OAuthFlow: {
          $visitor: OAuthFlowVisitor,
          fixedFields: {
            authorizationUrl: OAuthFlowAuthorizationUrlVisitor,
            tokenUrl: OAuthFlowTokenUrlVisitor,
            refreshUrl: OAuthFlowRefreshUrlVisitor,
            scopes: OAuthFlowScopesVisitor,
          },
        },
        ServerBindings: {
          $visitor: ServerBindingsVisitor,
          fixedFields: {
            http: {
              $ref: '#/visitors/document/objects/bindings/http/ServerBinding',
            },
            ws: {
              $ref: '#/visitors/document/objects/bindings/ws/ServerBinding',
            },
            kafka: {
              $ref: '#/visitors/document/objects/bindings/kafka/ServerBinding',
            },
            anypointmq: {
              $ref: '#/visitors/document/objects/bindings/anypointmq/ServerBinding',
            },
            amqp: {
              $ref: '#/visitors/document/objects/bindings/amqp/ServerBinding',
            },
            amqp1: {
              $ref: '#/visitors/document/objects/bindings/amqp1/ServerBinding',
            },
            mqtt: {
              $ref: '#/visitors/document/objects/bindings/mqtt/ServerBinding',
            },
            mqtt5: {
              $ref: '#/visitors/document/objects/bindings/mqtt5/ServerBinding',
            },
            nats: {
              $ref: '#/visitors/document/objects/bindings/nats/ServerBinding',
            },
            jms: {
              $ref: '#/visitors/document/objects/bindings/jms/ServerBinding',
            },
            sns: {
              $ref: '#/visitors/document/objects/bindings/sns/ServerBinding',
            },
            solace: {
              $ref: '#/visitors/document/objects/bindings/solace/ServerBinding',
            },
            sqs: {
              $ref: '#/visitors/document/objects/bindings/sqs/ServerBinding',
            },
            stomp: {
              $ref: '#/visitors/document/objects/bindings/stomp/ServerBinding',
            },
            redis: {
              $ref: '#/visitors/document/objects/bindings/redis/ServerBinding',
            },
            mercure: {
              $ref: '#/visitors/document/objects/bindings/mercure/ServerBinding',
            },
            ibmmq: {
              $ref: '#/visitors/document/objects/bindings/ibmmq/ServerBinding',
            },
            googlepubsub: {
              $ref: '#/visitors/document/objects/bindings/googlepubsub/ServerBinding',
            },
          },
        },
        Parameters: {
          $visitor: ParametersVisitor,
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            description: ParameterDescriptionVisitor,
            schema: ParameterSchemaVisitor,
            location: ParameterLocationVisitor,
          },
        },
        ChannelBindings: {
          $visitor: ChannelBindingsVisitor,
          fixedFields: {
            http: {
              $ref: '#/visitors/document/objects/bindings/http/ChannelBinding',
            },
            ws: {
              $ref: '#/visitors/document/objects/bindings/ws/ChannelBinding',
            },
            kafka: {
              $ref: '#/visitors/document/objects/bindings/kafka/ChannelBinding',
            },
            anypointmq: {
              $ref: '#/visitors/document/objects/bindings/anypointmq/ChannelBinding',
            },
            amqp: {
              $ref: '#/visitors/document/objects/bindings/amqp/ChannelBinding',
            },
            amqp1: {
              $ref: '#/visitors/document/objects/bindings/amqp1/ChannelBinding',
            },
            mqtt: {
              $ref: '#/visitors/document/objects/bindings/mqtt/ChannelBinding',
            },
            mqtt5: {
              $ref: '#/visitors/document/objects/bindings/mqtt5/ChannelBinding',
            },
            nats: {
              $ref: '#/visitors/document/objects/bindings/nats/ChannelBinding',
            },
            jms: {
              $ref: '#/visitors/document/objects/bindings/jms/ChannelBinding',
            },
            sns: {
              $ref: '#/visitors/document/objects/bindings/sns/ChannelBinding',
            },
            solace: {
              $ref: '#/visitors/document/objects/bindings/solace/ChannelBinding',
            },
            sqs: {
              $ref: '#/visitors/document/objects/bindings/sqs/ChannelBinding',
            },
            stomp: {
              $ref: '#/visitors/document/objects/bindings/stomp/ChannelBinding',
            },
            redis: {
              $ref: '#/visitors/document/objects/bindings/redis/ChannelBinding',
            },
            mercure: {
              $ref: '#/visitors/document/objects/bindings/mercure/ChannelBinding',
            },
            ibmmq: {
              $ref: '#/visitors/document/objects/bindings/ibmmq/ChannelBinding',
            },
            googlepubsub: {
              $ref: '#/visitors/document/objects/bindings/googlepubsub/ChannelBinding',
            },
          },
        },
        OperationBindings: {
          $visitor: OperationBindingsVisitor,
          fixedFields: {
            http: {
              $ref: '#/visitors/document/objects/bindings/http/OperationBinding',
            },
            ws: {
              $ref: '#/visitors/document/objects/bindings/ws/OperationBinding',
            },
            kafka: {
              $ref: '#/visitors/document/objects/bindings/kafka/OperationBinding',
            },
            anypointmq: {
              $ref: '#/visitors/document/objects/bindings/anypointmq/OperationBinding',
            },
            amqp: {
              $ref: '#/visitors/document/objects/bindings/amqp/OperationBinding',
            },
            amqp1: {
              $ref: '#/visitors/document/objects/bindings/amqp1/OperationBinding',
            },
            mqtt: {
              $ref: '#/visitors/document/objects/bindings/mqtt/OperationBinding',
            },
            mqtt5: {
              $ref: '#/visitors/document/objects/bindings/mqtt5/OperationBinding',
            },
            nats: {
              $ref: '#/visitors/document/objects/bindings/nats/OperationBinding',
            },
            jms: {
              $ref: '#/visitors/document/objects/bindings/jms/OperationBinding',
            },
            sns: {
              $ref: '#/visitors/document/objects/bindings/sns/OperationBinding',
            },
            solace: {
              $ref: '#/visitors/document/objects/bindings/solace/OperationBinding',
            },
            sqs: {
              $ref: '#/visitors/document/objects/bindings/sqs/OperationBinding',
            },
            stomp: {
              $ref: '#/visitors/document/objects/bindings/stomp/OperationBinding',
            },
            redis: {
              $ref: '#/visitors/document/objects/bindings/redis/OperationBinding',
            },
            mercure: {
              $ref: '#/visitors/document/objects/bindings/mercure/OperationBinding',
            },
            googlepubsub: {
              $ref: '#/visitors/document/objects/bindings/googlepubsub/OperationBinding',
            },
            ibmmq: {
              $ref: '#/visitors/document/objects/bindings/ibmmq/OperationBinding',
            },
          },
        },
        MessageBindings: {
          $visitor: MessageBindingsVisitor,
          fixedFields: {
            http: {
              $ref: '#/visitors/document/objects/bindings/http/MessageBinding',
            },
            ws: {
              $ref: '#/visitors/document/objects/bindings/ws/MessageBinding',
            },
            kafka: {
              $ref: '#/visitors/document/objects/bindings/kafka/MessageBinding',
            },
            anypointmq: {
              $ref: '#/visitors/document/objects/bindings/anypointmq/MessageBinding',
            },
            amqp: {
              $ref: '#/visitors/document/objects/bindings/amqp/MessageBinding',
            },
            amqp1: {
              $ref: '#/visitors/document/objects/bindings/amqp1/MessageBinding',
            },
            mqtt: {
              $ref: '#/visitors/document/objects/bindings/mqtt/MessageBinding',
            },
            mqtt5: {
              $ref: '#/visitors/document/objects/bindings/mqtt5/MessageBinding',
            },
            nats: {
              $ref: '#/visitors/document/objects/bindings/nats/MessageBinding',
            },
            jms: {
              $ref: '#/visitors/document/objects/bindings/jms/MessageBinding',
            },
            sns: {
              $ref: '#/visitors/document/objects/bindings/sns/MessageBinding',
            },
            solace: {
              $ref: '#/visitors/document/objects/bindings/solace/MessageBinding',
            },
            sqs: {
              $ref: '#/visitors/document/objects/bindings/sqs/MessageBinding',
            },
            stomp: {
              $ref: '#/visitors/document/objects/bindings/stomp/MessageBinding',
            },
            redis: {
              $ref: '#/visitors/document/objects/bindings/redis/MessageBinding',
            },
            mercure: {
              $ref: '#/visitors/document/objects/bindings/mercure/MessageBinding',
            },
            ibmmq: {
              $ref: '#/visitors/document/objects/bindings/ibmmq/MessageBinding',
            },
            googlepubsub: {
              $ref: '#/visitors/document/objects/bindings/googlepubsub/MessageBinding',
            },
          },
        },
        CorrelationID: {
          $visitor: CorrelationIDVisitor,
          fixedFields: {
            description: CorrelationIDDescriptionVisitor,
            location: CorrelationIDLocationVisitor,
          },
        },
        bindings: {
          http: {
            ServerBinding: {
              $visitor: HttpServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: HttpChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: HttpOperationBindingVisitor,
              fixedFields: {
                type: {
                  $ref: '#/visitors/value',
                },
                method: {
                  $ref: '#/visitors/value',
                },
                query: SchemaOrReferenceVisitor,
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            MessageBinding: {
              $visitor: HttpMessageBindingVisitor,
              fixedFields: {
                headers: SchemaOrReferenceVisitor,
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
          },
          ws: {
            ServerBinding: {
              $visitor: WebSocketServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: WebSocketChannelBindingVisitor,
              fixedFields: {
                method: {
                  $ref: '#/visitors/value',
                },
                query: SchemaOrReferenceVisitor,
                headers: SchemaOrReferenceVisitor,
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            OperationBinding: {
              $visitor: WebSocketOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: WebSocketMessageBindingVisitor,
            },
          },
          kafka: {
            ServerBinding: {
              $visitor: KafkaServerBindingVisitor,
              fixedFields: {
                schemaRegistryUrl: {
                  $ref: '#/visitors/value',
                },
                schemaRegistryVendor: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            ChannelBinding: {
              $visitor: KafkaChannelBindingVisitor,
              fixedFields: {
                topic: {
                  $ref: '#/visitors/value',
                },
                partitions: {
                  $ref: '#/visitors/value',
                },
                replicas: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            OperationBinding: {
              $visitor: KafkaOperationBindingVisitor,
              fixedFields: {
                groupId: SchemaOrReferenceVisitor,
                clientId: SchemaOrReferenceVisitor,
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            MessageBinding: {
              $visitor: KafkaMessageBindingVisitor,
              fixedFields: {
                key: SchemaOrReferenceVisitor,
                schemaIdLocation: {
                  $ref: '#/visitors/value',
                },
                schemaIdPayloadEncoding: {
                  $ref: '#/visitors/value',
                },
                schemaLookupStrategy: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
          },
          anypointmq: {
            ServerBinding: {
              $visitor: AnypointmqServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: AnypointmqChannelBindingVisitor,
              fixedFields: {
                destination: {
                  $ref: '#/visitors/value',
                },
                destinationType: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            OperationBinding: {
              $visitor: AnypointmqOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: AnypointmqMessageBindingVisitor,
              fixedFields: {
                headers: SchemaOrReferenceVisitor,
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
          },
          amqp: {
            ServerBinding: {
              $visitor: AmqpServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: AmqpChannelBindingVisitor,
              fixedFields: {
                is: {
                  $ref: '#/visitors/value',
                },
                exchange: {
                  $ref: '#/visitors/value',
                },
                queue: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            OperationBinding: {
              $visitor: AmqpOperationBindingVisitor,
              fixedFields: {
                expiration: {
                  $ref: '#/visitors/value',
                },
                userId: {
                  $ref: '#/visitors/value',
                },
                cc: {
                  $ref: '#/visitors/value',
                },
                priority: {
                  $ref: '#/visitors/value',
                },
                deliveryMode: {
                  $ref: '#/visitors/value',
                },
                mandatory: {
                  $ref: '#/visitors/value',
                },
                bcc: {
                  $ref: '#/visitors/value',
                },
                replyTo: {
                  $ref: '#/visitors/value',
                },
                timestamp: {
                  $ref: '#/visitors/value',
                },
                ack: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            MessageBinding: {
              $visitor: AmqpMessageBindingVisitor,
              fixedFields: {
                contentEncoding: {
                  $ref: '#/visitors/value',
                },
                messageType: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
          },
          amqp1: {
            ServerBinding: {
              $visitor: Amqp1ServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: Amqp1ChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: Amqp1OperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: Amqp1MessageBindingVisitor,
            },
          },
          mqtt: {
            ServerBinding: {
              $visitor: MqttServerBindingVisitor,
              fixedFields: {
                clientId: {
                  $ref: '#/visitors/value',
                },
                cleanSession: {
                  $ref: '#/visitors/value',
                },
                lastWill: {
                  $ref: '#/visitors/value',
                },
                keepAlive: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            ChannelBinding: {
              $visitor: MqttChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: MqttOperationBindingVisitor,
              fixedFields: {
                qos: {
                  $ref: '#/visitors/value',
                },
                retain: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            MessageBinding: {
              $visitor: MqttMessageBindingVisitor,
              fixedFields: {
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
          },
          mqtt5: {
            ServerBinding: {
              $visitor: Mqtt5ServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: Mqtt5ChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: Mqtt5OperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: Mqtt5MessageBindingVisitor,
            },
          },
          nats: {
            ServerBinding: {
              $visitor: NatsServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: NatsChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: NatsOperationBindingVisitor,
              fixedFields: {
                queue: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            MessageBinding: {
              $visitor: NatsMessageBindingVisitor,
            },
          },
          jms: {
            ServerBinding: {
              $visitor: JmsServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: JmsChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: JmsOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: JmsMessageBindingVisitor,
            },
          },
          sns: {
            ServerBinding: {
              $visitor: SnsServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: SnsChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: SnsOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: SnsMessageBindingVisitor,
            },
          },
          solace: {
            ServerBinding: {
              $visitor: SolaceServerBindingVisitor,
              fixedFields: {
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
                msgVpn: {
                  $ref: '#/visitors/value',
                },
              },
            },
            ChannelBinding: {
              $visitor: SolaceChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: SolaceOperationBindingVisitor,
              fixedFields: {
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
                destinations: {
                  $ref: '#/visitors/value',
                },
              },
            },
            MessageBinding: {
              $visitor: SolaceMessageBindingVisitor,
            },
          },
          sqs: {
            ServerBinding: {
              $visitor: SqsServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: SqsChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: SqsOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: SqsMessageBindingVisitor,
            },
          },
          stomp: {
            ServerBinding: {
              $visitor: StompServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: StompChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: StompOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: StompMessageBindingVisitor,
            },
          },
          redis: {
            ServerBinding: {
              $visitor: RedisServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: RedisChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: RedisOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: RedisMessageBindingVisitor,
            },
          },
          mercure: {
            ServerBinding: {
              $visitor: MercureServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: MercureChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: MercureOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: MercureMessageBindingVisitor,
            },
          },
          googlepubsub: {
            ServerBinding: {
              $visitor: GooglepubsubServerBindingVisitor,
            },
            ChannelBinding: {
              $visitor: GooglepubsubChannelBindingVisitor,
              fixedFields: {
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
                labels: {
                  $ref: '#/visitors/value',
                },
                messageRetentionDuration: {
                  $ref: '#/visitors/value',
                },
                messageStoragePolicy: {
                  $ref: '#/visitors/value',
                },
                schemaSettings: {
                  $ref: '#/visitors/value',
                },
                topic: {
                  $ref: '#/visitors/value',
                },
              },
            },
            OperationBinding: {
              $visitor: GooglepubsubOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: GooglepubsubMessageBindingVisitor,
              fixedFields: {
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
                attributes: {
                  $ref: '#/visitors/value',
                },
                orderingKey: {
                  $ref: '#/visitors/value',
                },
                schema: {
                  $ref: '#/visitors/value',
                },
              },
            },
          },
          ibmmq: {
            ServerBinding: {
              $visitor: IbmmqServerBindingVisitor,
              fixedFields: {
                groupId: {
                  $ref: '#/visitors/value',
                },
                ccdtQueueManagerName: {
                  $ref: '#/visitors/value',
                },
                cipherSpec: {
                  $ref: '#/visitors/value',
                },
                multiEndpointServer: {
                  $ref: '#/visitors/value',
                },
                heartBeatInterval: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            ChannelBinding: {
              $visitor: IbmmqChannelBindingVisitor,
              fixedFields: {
                destinationType: {
                  $ref: '#/visitors/value',
                },
                queue: {
                  $ref: '#/visitors/value',
                },
                topic: {
                  $ref: '#/visitors/value',
                },
                maxMsgLength: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            MessageBinding: {
              $visitor: IbmmqMessageBindingVisitor,
              fixedFields: {
                type: {
                  $ref: '#/visitors/value',
                },
                headers: {
                  $ref: '#/visitors/value',
                },
                description: {
                  $ref: '#/visitors/value',
                },
                expiry: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            OperationBinding: {
              $visitor: IbmmqOperationBindingVisitor,
            },
          },
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

export default specification;
