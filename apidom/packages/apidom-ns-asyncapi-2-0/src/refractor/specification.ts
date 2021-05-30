import FallbackVisitor from './visitors/FallbackVisitor';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
/**
 * AsyncApi 2.0.0 specification elements.
 */
import AsyncApi2_0Visitor from './visitors/async-api-2-0';
import AsyncApiVersionVisitor from './visitors/async-api-2-0/AsyncApiVersionVisitor';
import IdentifierVisitor from './visitors/async-api-2-0/IdentifierVisitor';
import InfoVisitor from './visitors/async-api-2-0/info';
import InfoTitleVisitor from './visitors/async-api-2-0/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/async-api-2-0/info/DescriptionVisitor';
import InfoTermsOfServiceVisitor from './visitors/async-api-2-0/info/TermsOfServiceVisitor';
import InfoVersionVisitor from './visitors/async-api-2-0/info/VersionVisitor';
import ContactVisitor from './visitors/async-api-2-0/contact';
import ContactNameVisitor from './visitors/async-api-2-0/contact/NameVisitor';
import ContactUrlVisitor from './visitors/async-api-2-0/contact/UrlVisitor';
import ContactEmailVisitor from './visitors/async-api-2-0/contact/EmailVisitor';
import CorrelationIDVisitor from './visitors/async-api-2-0/correlation-id';
import CorrelationIDDescriptionVisitor from './visitors/async-api-2-0/correlation-id/DescriptionVisitor';
import CorrelationIDLocationVisitor from './visitors/async-api-2-0/correlation-id/LocationVisitor';
import DefaultContentTypeVisitor from './visitors/async-api-2-0/DefaultContentTypeVisitor';
import LicenseVisitor from './visitors/async-api-2-0/license';
import LicenseNameVisitor from './visitors/async-api-2-0/license/NameVisitor';
import LicenseUrlVisitor from './visitors/async-api-2-0/license/UrlVisitor';
import OAuthFlowsVisitor from './visitors/async-api-2-0/oauth-flows';
import OAuthFlowVisitor from './visitors/async-api-2-0/oauth-flow';
import OAuthFlowAuthorizationUrlVisitor from './visitors/async-api-2-0/oauth-flow/AuthorizationUrlVisitor';
import OAuthFlowTokenUrlVisitor from './visitors/async-api-2-0/oauth-flow/TokenUrlVisitor';
import OAuthFlowRefreshUrlVisitor from './visitors/async-api-2-0/oauth-flow/RefreshUrlVisitor';
import OAuthFlowScopesVisitor from './visitors/async-api-2-0/oauth-flow/ScopesVisitor';
import ServersVisitor from './visitors/async-api-2-0/servers';
import ServerVisitor from './visitors/async-api-2-0/server';
import ServerUrlVisitor from './visitors/async-api-2-0/server/UrlVisitor';
import ServerProtocolVisitor from './visitors/async-api-2-0/server/ProtocolVisitor';
import ServerProtocolVersionVisitor from './visitors/async-api-2-0/server/ProtocolVersionVisitor';
import ServerDescriptionVisitor from './visitors/async-api-2-0/server/DescriptionVisitor';
import ServerVariablesVisitor from './visitors/async-api-2-0/server/VariablesVisitor';
import ServerSecurityVisitor from './visitors/async-api-2-0/server/SecurityVisitor';
import ServerVariableVisitor from './visitors/async-api-2-0/server-variable';
import ServerVariableEnumVisitor from './visitors/async-api-2-0/server-variable/EnumVisitor';
import ServerVariableDefaultVisitor from './visitors/async-api-2-0/server-variable/DefaultVisitor';
import ServerVariableDescriptionVisitor from './visitors/async-api-2-0/server-variable/DescriptionVisitor';
import ServerVariableExamplesVisitor from './visitors/async-api-2-0/server-variable/ExamplesVisitor';
import ServerBindingsVisitor from './visitors/async-api-2-0/server-bindings';
import SecuritySchemeVisitor from './visitors/async-api-2-0/security-scheme';
import SecuritySchemeTypeVisitor from './visitors/async-api-2-0/security-scheme/TypeVisitor';
import SecuritySchemeDescriptionVisitor from './visitors/async-api-2-0/security-scheme/DescriptionVisitor';
import SecuritySchemeNameVisitor from './visitors/async-api-2-0/security-scheme/NameVisitor';
import SecuritySchemeInVisitor from './visitors/async-api-2-0/security-scheme/InVisitor';
import SecuritySchemeSchemeVisitor from './visitors/async-api-2-0/security-scheme/SchemeVisitor';
import SecuritySchemeBearerFormatVisitor from './visitors/async-api-2-0/security-scheme/BearerFormatVisitor';
import SecuritySchemeOpenIdConnectUrlVisitor from './visitors/async-api-2-0/security-scheme/OpenIdConnectUrlVisitor';
import SecurityRequirementVisitor from './visitors/async-api-2-0/security-requirement';
import ReferenceVisitor from './visitors/async-api-2-0/reference';
import Reference$RefVisitor from './visitors/async-api-2-0/reference/$RefVisitor';
import SchemaVisitor from './visitors/async-api-2-0/schema';
import ParametersVisitor from './visitors/async-api-2-0/parameters';
import ParameterVisitor from './visitors/async-api-2-0/parameter';
import ParameterDescriptionVisitor from './visitors/async-api-2-0/parameter/DescriptionVisitor';
import ParameterLocationVisitor from './visitors/async-api-2-0/parameter/LocationVisitor';
import ExternalDocumentationVisitor from './visitors/async-api-2-0/external-documentation';
import ExternalDocumentationDescriptionVisitor from './visitors/async-api-2-0/external-documentation/DescriptionVisitor';
import ExternalDocumentationUrlVisitor from './visitors/async-api-2-0/external-documentation/UrlVisitor';
import ComponentsVisitor from './visitors/async-api-2-0/components';
import ComponentsSchemasVisitor from './visitors/async-api-2-0/components/SchemasVisitor';
import ComponentParametersVisitor from './visitors/async-api-2-0/components/ParametersVisitor';
import OperationVisitor from './visitors/async-api-2-0/operation';
import TagsVisitor from './visitors/async-api-2-0/tags';
import TagVisitor from './visitors/async-api-2-0/tag';
import TagNameVisitor from './visitors/async-api-2-0/tag/NameVisitor';
import TagDescriptionVisitor from './visitors/async-api-2-0/tag/DescriptionVisitor';
import ChannelsVisitor from './visitors/async-api-2-0/channels';
import ChannelBindingsVisitor from './visitors/async-api-2-0/channel-bindings';
import ChannelItemVisitor from './visitors/async-api-2-0/channel-item';
import ChannelItem$RefVisitor from './visitors/async-api-2-0/channel-item/$RefVisitor';
import ChannelItemDescriptionVisitor from './visitors/async-api-2-0/channel-item/DescriptionVisitor';
import MessageBindingsVisitor from './visitors/async-api-2-0/message-bindings';
/**
 * Binding elements.
 */
// AMQP 0-9-1
import AmqpChannelBindingVisitor from './visitors/async-api-2-0/bindings/amqp/channel-binding';
import AmqpChannelBindingIsVisitor from './visitors/async-api-2-0/bindings/amqp/channel-binding/IsVisitor';
import AmqpChannelBindingExchangeVisitor from './visitors/async-api-2-0/bindings/amqp/channel-binding/ExchangeVisitor';
import AmqpChannelBindingQueueVisitor from './visitors/async-api-2-0/bindings/amqp/channel-binding/QueueVisitor';
import AmqpChannelBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/amqp/channel-binding/BindingVersionVisitor';
import AmqpMessageBindingVisitor from './visitors/async-api-2-0/bindings/amqp/message-binding';
import AmqpMessageBindingContentEncodingVisitor from './visitors/async-api-2-0/bindings/amqp/message-binding/ContentEncodingVisitor';
import AmqpMessageBindingMessageTypeVisitor from './visitors/async-api-2-0/bindings/amqp/message-binding/MessageTypeVisitor';
import AmqpMessageBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/amqp/message-binding/BindingVersionVisitor';
import AmqpOperationBindingVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding';
import AmqpOperationBindingExpirationVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/ExpirationVisitor';
import AmqpOperationBindingUserIdVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/UserIdVisitor';
import AmqpOperationBindingCcVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/CcVisitor';
import AmqpOperationBindingPriorityVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/PriorityVisitor';
import AmqpOperationBindingDeliveryModeVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/DeliveryModeVisitor';
import AmqpOperationBindingMandatoryVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/MandatoryVisitor';
import AmqpOperationBindingBccVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/BccVisitor';
import AmqpOperationBindingReplyToVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/ReplyToVisitor';
import AmqpOperationBindingTimestampVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/TimestampVisitor';
import AmqpOperationBindingAckVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/AckVisitor';
import AmqpOperationBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/amqp/operation-binding/BindingVersionVisitor';
import AmqpServerBindingVisitor from './visitors/async-api-2-0/bindings/amqp/server-binding';
// AMQP 1.0
import Amqp1ChannelBindingVisitor from './visitors/async-api-2-0/bindings/amqp1/channel-binding';
import Amqp1MessageBindingVisitor from './visitors/async-api-2-0/bindings/amqp1/message-binding';
import Amqp1OperationBindingVisitor from './visitors/async-api-2-0/bindings/amqp1/operation-binding';
import Amqp1ServerBindingVisitor from './visitors/async-api-2-0/bindings/amqp1/server-binding';
// HTTP
import HttpChannelBindingVisitor from './visitors/async-api-2-0/bindings/http/channel-binding';
import HttpMessageBindingVisitor from './visitors/async-api-2-0/bindings/http/message-binding';
import HttpMessageBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/http/message-binding/BindingVersionVisitor';
import HttpOperationBindingVisitor from './visitors/async-api-2-0/bindings/http/operation-binding';
import HttpOperationBindingTypeVisitor from './visitors/async-api-2-0/bindings/http/operation-binding/TypeVisitor';
import HttpOperationBindingMethodVisitor from './visitors/async-api-2-0/bindings/http/operation-binding/MethodVisitor';
import HttpOperationBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/http/operation-binding/BindingVersionVisitor';
import HttpServerBindingVisitor from './visitors/async-api-2-0/bindings/http/server-binding';
// JMS
import JmsChannelBindingVisitor from './visitors/async-api-2-0/bindings/jms/channel-binding';
import JmsMessageBindingVisitor from './visitors/async-api-2-0/bindings/jms/message-binding';
import JmsOperationBindingVisitor from './visitors/async-api-2-0/bindings/jms/operation-binding';
import JmsServerBindingVisitor from './visitors/async-api-2-0/bindings/jms/server-binding';
// Kafka
import KafkaChannelBindingVisitor from './visitors/async-api-2-0/bindings/kafka/channel-binding';
import KafkaMessageBindingVisitor from './visitors/async-api-2-0/bindings/kafka/message-binding';
import KafkaMessageBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/kafka/message-binding/BindingVersionVisitor';
import KafkaOperationBindingVisitor from './visitors/async-api-2-0/bindings/kafka/operation-binding';
import KafkaOperationBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/kafka/operation-binding/BindingVersionVisitor';
import KafkaServerBindingVisitor from './visitors/async-api-2-0/bindings/kafka/server-binding';
// Mercure
import MercureChannelBindingVisitor from './visitors/async-api-2-0/bindings/mercure/channel-binding';
import MercureMessageBindingVisitor from './visitors/async-api-2-0/bindings/mercure/message-binding';
import MercureOperationBindingVisitor from './visitors/async-api-2-0/bindings/mercure/operation-binding';
import MercureServerBindingVisitor from './visitors/async-api-2-0/bindings/mercure/server-binding';
// MQTT
import MqttChannelBindingVisitor from './visitors/async-api-2-0/bindings/mqtt/channel-binding';
import MqttMessageBindingVisitor from './visitors/async-api-2-0/bindings/mqtt/message-binding';
import MqttMessageBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/mqtt/message-binding/BindingVersionVisitor';
import MqttOperationBindingVisitor from './visitors/async-api-2-0/bindings/mqtt/operation-binding';
import MqttOperationBindingQosVisitor from './visitors/async-api-2-0/bindings/mqtt/operation-binding/QosVisitor';
import MqttOperationBindingRetainVisitor from './visitors/async-api-2-0/bindings/mqtt/operation-binding/RetainVisitor';
import MqttOperationBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/mqtt/operation-binding/BindingVersionVisitor';
import MqttServerBindingVisitor from './visitors/async-api-2-0/bindings/mqtt/server-binding';
import MqttServerBindingClientIdVisitor from './visitors/async-api-2-0/bindings/mqtt/server-binding/ClientIdVisitor';
import MqttServerBindingCleanSessionVisitor from './visitors/async-api-2-0/bindings/mqtt/server-binding/CleanSessionVisitor';
import MqttServerBindingLastWillVisitor from './visitors/async-api-2-0/bindings/mqtt/server-binding/LastWillVisitor';
import MqttServerBindingKeepAliveVisitor from './visitors/async-api-2-0/bindings/mqtt/server-binding/KeepAliveVisitor';
import MqttServerBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/mqtt/server-binding/BindingVersionVisitor';
// MQTT 5
import Mqtt5ChannelBindingVisitor from './visitors/async-api-2-0/bindings/mqtt5/channel-binding';
import Mqtt5MessageBindingVisitor from './visitors/async-api-2-0/bindings/mqtt5/message-binding';
import Mqtt5OperationBindingVisitor from './visitors/async-api-2-0/bindings/mqtt5/operation-binding';
import Mqtt5ServerBindingVisitor from './visitors/async-api-2-0/bindings/mqtt5/server-binding';
// NATS
import NatsChannelBindingVisitor from './visitors/async-api-2-0/bindings/nats/channel-binding';
import NatsMessageBindingVisitor from './visitors/async-api-2-0/bindings/nats/message-binding';
import NatsOperationBindingVisitor from './visitors/async-api-2-0/bindings/nats/operation-binding';
import NatsServerBindingVisitor from './visitors/async-api-2-0/bindings/nats/server-binding';
// Redis
import RedisChannelBindingVisitor from './visitors/async-api-2-0/bindings/redis/channel-binding';
import RedisMessageBindingVisitor from './visitors/async-api-2-0/bindings/redis/message-binding';
import RedisOperationBindingVisitor from './visitors/async-api-2-0/bindings/redis/operation-binding';
import RedisServerBindingVisitor from './visitors/async-api-2-0/bindings/redis/server-binding';
// SNS
import SnsChannelBindingVisitor from './visitors/async-api-2-0/bindings/sns/channel-binding';
import SnsMessageBindingVisitor from './visitors/async-api-2-0/bindings/sns/message-binding';
import SnsOperationBindingVisitor from './visitors/async-api-2-0/bindings/sns/operation-binding';
import SnsServerBindingVisitor from './visitors/async-api-2-0/bindings/sns/server-binding';
// SQS
import SqsChannelBindingVisitor from './visitors/async-api-2-0/bindings/sqs/channel-binding';
import SqsMessageBindingVisitor from './visitors/async-api-2-0/bindings/sqs/message-binding';
import SqsOperationBindingVisitor from './visitors/async-api-2-0/bindings/sqs/operation-binding';
import SqsServerBindingVisitor from './visitors/async-api-2-0/bindings/sqs/server-binding';
// STOMP
import StompChannelBindingVisitor from './visitors/async-api-2-0/bindings/stomp/channel-binding';
import StompMessageBindingVisitor from './visitors/async-api-2-0/bindings/stomp/message-binding';
import StompOperationBindingVisitor from './visitors/async-api-2-0/bindings/stomp/operation-binding';
import StompServerBindingVisitor from './visitors/async-api-2-0/bindings/stomp/server-binding';
// WebSocket
import WebSocketChannelBindingVisitor from './visitors/async-api-2-0/bindings/ws/channel-binding';
import WebSocketChannelBindingMethodVisitor from './visitors/async-api-2-0/bindings/ws/channel-binding/MethodVisitor';
import WebSocketChannelBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/ws/channel-binding/BindingVersionVisitor';
import WebSocketMessageBindingVisitor from './visitors/async-api-2-0/bindings/ws/message-binding';
import WebSocketOperationBindingVisitor from './visitors/async-api-2-0/bindings/ws/operation-binding';
import WebSocketServerBindingVisitor from './visitors/async-api-2-0/bindings/ws/server-binding';
import OperationBindingsVisitor from './visitors/async-api-2-0/operation-bindings';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        /**
         * AsyncApi 2.0.0 specification elements.
         */
        AsyncApi: {
          $visitor: AsyncApi2_0Visitor,
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
            bindings: {
              $ref: '#/visitors/document/objects/ServerBindings',
            },
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
            subscribe: {
              $ref: '#/visitors/document/objects/Operation',
            },
            publish: {
              $ref: '#/visitors/document/objects/Operation',
            },
            parameters: {
              $ref: '#/visitors/document/objects/Parameters',
            },
            bindings: {
              $ref: '#/visitors/document/objects/ChannelBindings',
            },
          },
        },
        Operation: {
          $visitor: OperationVisitor,
          fixedFields: {},
        },
        Tags: {
          $visitors: TagsVisitor,
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
            parameters: ComponentParametersVisitor,
          },
        },
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: Reference$RefVisitor,
          },
        },
        Schema: {
          $visitor: SchemaVisitor,
        },
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
          },
        },
        Parameters: {
          $visitor: ParametersVisitor,
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            description: ParameterDescriptionVisitor,
            schema: {
              $ref: '#/visitors/document/objects/Schema',
            },
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
                type: HttpOperationBindingTypeVisitor,
                method: HttpOperationBindingMethodVisitor,
                query: {
                  $ref: '#/visitors/document/objects/Schema',
                },
                bindingVersion: HttpOperationBindingBindingVersionVisitor,
              },
            },
            MessageBinding: {
              $visitor: HttpMessageBindingVisitor,
              fixedFields: {
                headers: {
                  $ref: '#/visitors/document/objects/Schema',
                },
                bindingVersion: HttpMessageBindingBindingVersionVisitor,
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
                method: WebSocketChannelBindingMethodVisitor,
                query: {
                  $ref: '#/visitors/document/objects/Schema',
                },
                headers: {
                  $ref: '#/visitors/document/objects/Schema',
                },
                bindingVersion: WebSocketChannelBindingBindingVersionVisitor,
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
            },
            ChannelBinding: {
              $visitor: KafkaChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: KafkaOperationBindingVisitor,
              fixedFields: {
                groupId: {
                  $ref: '#/visitors/document/objects/Schema',
                },
                clientId: {
                  $ref: '#/visitors/document/objects/Schema',
                },
                bindingVersion: KafkaOperationBindingBindingVersionVisitor,
              },
            },
            MessageBinding: {
              $visitor: KafkaMessageBindingVisitor,
              fixedFields: {
                key: {
                  $ref: '#/visitors/document/objects/Schema',
                },
                bindingVersion: KafkaMessageBindingBindingVersionVisitor,
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
                is: AmqpChannelBindingIsVisitor,
                exchange: AmqpChannelBindingExchangeVisitor,
                queue: AmqpChannelBindingQueueVisitor,
                bindingVersion: AmqpChannelBindingBindingVersionVisitor,
              },
            },
            OperationBinding: {
              $visitor: AmqpOperationBindingVisitor,
              fixedFields: {
                expiration: AmqpOperationBindingExpirationVisitor,
                userId: AmqpOperationBindingUserIdVisitor,
                cc: AmqpOperationBindingCcVisitor,
                priority: AmqpOperationBindingPriorityVisitor,
                deliveryMode: AmqpOperationBindingDeliveryModeVisitor,
                mandatory: AmqpOperationBindingMandatoryVisitor,
                bcc: AmqpOperationBindingBccVisitor,
                replyTo: AmqpOperationBindingReplyToVisitor,
                timestamp: AmqpOperationBindingTimestampVisitor,
                ack: AmqpOperationBindingAckVisitor,
                bindingVersion: AmqpOperationBindingBindingVersionVisitor,
              },
            },
            MessageBinding: {
              $visitor: AmqpMessageBindingVisitor,
              fixedFields: {
                contentEncoding: AmqpMessageBindingContentEncodingVisitor,
                messageType: AmqpMessageBindingMessageTypeVisitor,
                bindingVersion: AmqpMessageBindingBindingVersionVisitor,
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
                clientId: MqttServerBindingClientIdVisitor,
                cleanSession: MqttServerBindingCleanSessionVisitor,
                lastWill: MqttServerBindingLastWillVisitor,
                keepAlive: MqttServerBindingKeepAliveVisitor,
                bindingVersion: MqttServerBindingBindingVersionVisitor,
              },
            },
            ChannelBinding: {
              $visitor: MqttChannelBindingVisitor,
            },
            OperationBinding: {
              $visitor: MqttOperationBindingVisitor,
              fixedFields: {
                qos: MqttOperationBindingQosVisitor,
                retain: MqttOperationBindingRetainVisitor,
                bindingVersion: MqttOperationBindingBindingVersionVisitor,
              },
            },
            MessageBinding: {
              $visitor: MqttMessageBindingVisitor,
              fixedFields: {
                bindingVersion: MqttMessageBindingBindingVersionVisitor,
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
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

export default specification;
