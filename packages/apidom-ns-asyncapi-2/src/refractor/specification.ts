import { specificationObj as JSONSchemaDraft7Specification } from '@swagger-api/apidom-ns-json-schema-draft-7';

import FallbackVisitor from './visitors/FallbackVisitor.ts';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor.ts';
/**
 * AsyncApi >= 2.0.0 <=2.6.0 specification elements.
 */
import AsyncApi2Visitor from './visitors/async-api-2/index.ts';
import AsyncApiVersionVisitor from './visitors/async-api-2/AsyncApiVersionVisitor.ts';
import IdentifierVisitor from './visitors/async-api-2/IdentifierVisitor.ts';
import InfoVisitor from './visitors/async-api-2/info/index.ts';
import InfoVersionVisitor from './visitors/async-api-2/info/VersionVisitor.ts';
import ContactVisitor from './visitors/async-api-2/contact/index.ts';
import CorrelationIDVisitor from './visitors/async-api-2/correlation-id/index.ts';
import DefaultContentTypeVisitor from './visitors/async-api-2/DefaultContentTypeVisitor.ts';
import LicenseVisitor from './visitors/async-api-2/license/index.ts';
import OAuthFlowsVisitor from './visitors/async-api-2/oauth-flows/index.ts';
import OAuthFlowVisitor from './visitors/async-api-2/oauth-flow/index.ts';
import OAuthFlowScopesVisitor from './visitors/async-api-2/oauth-flow/ScopesVisitor.ts';
import ServersVisitor from './visitors/async-api-2/servers/index.ts';
import ServerVisitor from './visitors/async-api-2/server/index.ts';
import ServerUrlVisitor from './visitors/async-api-2/server/UrlVisitor.ts';
import ServerBindingsVisitor_ from './visitors/async-api-2/server/BindingsVisitor.ts';
import ServerVariablesVisitor from './visitors/async-api-2/server/VariablesVisitor.ts';
import ServerSecurityVisitor from './visitors/async-api-2/server/SecurityVisitor.ts';
import ServerVariableVisitor from './visitors/async-api-2/server-variable/index.ts';
import ServerBindingsVisitor from './visitors/async-api-2/server-bindings/index.ts';
import SecuritySchemeVisitor from './visitors/async-api-2/security-scheme/index.ts';
import SecurityRequirementVisitor from './visitors/async-api-2/security-requirement/index.ts';
import ReferenceVisitor from './visitors/async-api-2/reference/index.ts';
import Reference$RefVisitor from './visitors/async-api-2/reference/$RefVisitor.ts';
import SchemaVisitor from './visitors/async-api-2/schema/index.ts';
import SchemaOrReferenceVisitor from './visitors/async-api-2/schema/SchemaOrReferenceVisitor.ts';
import SchemaAllOfVisitor from './visitors/async-api-2/schema/AllOfVisitor.ts';
import SchemaAnyOfVisitor from './visitors/async-api-2/schema/AnyOfVisitor.ts';
import SchemaOneOfVisitor from './visitors/async-api-2/schema/OneOfVisitor.ts';
import SchemaDefinitionsVisitor from './visitors/async-api-2/schema/DefinitionsVisitor.ts';
import SchemaDependenciesVisitor from './visitors/async-api-2/schema/DependenciesVisitor.ts';
import SchemaItemsVisitor from './visitors/async-api-2/schema/ItemsVisitor.ts';
import SchemaPatternPropertiesVisitor from './visitors/async-api-2/schema/PatternPropertiesVisitor.ts';
import SchemaPropertiesVisitor from './visitors/async-api-2/schema/PropertiesVisitor.ts';
import schemaInheritedFixedFields from './visitors/async-api-2/schema/inherited-fixed-fields.ts';
import ParametersVisitor from './visitors/async-api-2/parameters/index.ts';
import ParameterVisitor from './visitors/async-api-2/parameter/index.ts';
import ParameterSchemaVisitor from './visitors/async-api-2/parameter/SchemaVisitor.ts';
import ExternalDocumentationVisitor from './visitors/async-api-2/external-documentation/index.ts';
import ComponentsVisitor from './visitors/async-api-2/components/index.ts';
import ComponentsSchemasVisitor from './visitors/async-api-2/components/SchemasVisitor.ts';
import ComponentsServersVisitor from './visitors/async-api-2/components/ServersVisitor.ts';
import ComponentsServerVariablesVisitor from './visitors/async-api-2/components/ServerVariablesVisitor.ts';
import ComponentsChannelsVisitor from './visitors/async-api-2/components/ChannelsVisitor.ts';
import ComponentsMessagesVisitor from './visitors/async-api-2/components/MessagesVisitor.ts';
import ComponentsSecuritySchemesVisitor from './visitors/async-api-2/components/SecuritySchemesVisitor.ts';
import ComponentsParametersVisitor from './visitors/async-api-2/components/ParametersVisitor.ts';
import ComponentsCorrelationIdsVisitor from './visitors/async-api-2/components/CorrelationIdsVisitor.ts';
import ComponentsOperationTraitsVisitor from './visitors/async-api-2/components/OperationTraitsVisitor.ts';
import ComponentsMessageTraitsVisitor from './visitors/async-api-2/components/MessageTraitsVisitor.ts';
import ComponentsServerBindingsVisitor from './visitors/async-api-2/components/ServerBindingsVisitor.ts';
import ComponentsChannelBindingsVisitor from './visitors/async-api-2/components/ChannelBindingsVisitor.ts';
import ComponentsOperationBindingsVisitor from './visitors/async-api-2/components/OperationBindingsVisitor.ts';
import ComponentsMessageBindingsVisitor from './visitors/async-api-2/components/MessageBindingsVisitor.ts';
import OperationVisitor from './visitors/async-api-2/operation/index.ts';
import OperationSecurityVisitor from './visitors/async-api-2/operation/SecurityVisitor.ts';
import OperationBindingsVisitor_ from './visitors/async-api-2/operation/BindingsVisitor.ts';
import OperationTraitsVisitor from './visitors/async-api-2/operation/TraitsVisitor.ts';
import OperationMessageVisitor from './visitors/async-api-2/operation/MessageVisitor.ts';
import TagsVisitor from './visitors/async-api-2/tags/index.ts';
import TagVisitor from './visitors/async-api-2/tag/index.ts';
import ChannelsVisitor from './visitors/async-api-2/channels/index.ts';
import ChannelBindingsVisitor from './visitors/async-api-2/channel-bindings/index.ts';
import ChannelItemVisitor from './visitors/async-api-2/channel-item/index.ts';
import ChannelItem$RefVisitor from './visitors/async-api-2/channel-item/$RefVisitor.ts';
import ChannelItemServersVisitor from './visitors/async-api-2/channel-item/ServersVisitor.ts';
import ChannelItemBindingsVisitor from './visitors/async-api-2/channel-item/BindingsVisitor.ts';
import MessageBindingsVisitor from './visitors/async-api-2/message-bindings/index.ts';
import MessageExampleVisitor from './visitors/async-api-2/message-example/index.ts';
import MessageTraitVisitor from './visitors/async-api-2/message-trait/index.ts';
import MessageTraitHeadersVisitor from './visitors/async-api-2/message-trait/HeadersVisitor.ts';
import MessageTraitCorrelationIdVisitor from './visitors/async-api-2/message-trait/CorrelationIdVisitor.ts';
import MessageTraitBindingsVisitor from './visitors/async-api-2/message-trait/BindingsVisitor.ts';
import MessageTraitExamplesVisitor from './visitors/async-api-2/message-trait/ExamplesVisitor.ts';
import MessageVisitor from './visitors/async-api-2/message/index.ts';
import MessageHeadersVisitor from './visitors/async-api-2/message/HeadersVisitor.ts';
import MessageCorrelationIdVisitor from './visitors/async-api-2/message/CorrelationIdVisitor.ts';
import MessageBindingsVisitor_ from './visitors/async-api-2/message/BindingsVisitor.ts';
import MessageExamplesVisitor from './visitors/async-api-2/message/ExamplesVisitor.ts';
import MessageTraitsVisitor from './visitors/async-api-2/message/TraitsVisitor.ts';
import OperationBindingsVisitor from './visitors/async-api-2/operation-bindings/index.ts';
import OperationTraitVisitor from './visitors/async-api-2/operation-trait/index.ts';
import OperationTraitSecurityVisitor from './visitors/async-api-2/operation-trait/SecurityVisitor.ts';
import OperationTraitBindingsVisitor from './visitors/async-api-2/operation-trait/BindingsVisitor.ts';
/**
 * Binding elements.
 */
// AMQP 0-9-1
import AmqpChannelBindingVisitor from './visitors/async-api-2/bindings/amqp/channel-binding/index.ts';
import AmqpMessageBindingVisitor from './visitors/async-api-2/bindings/amqp/message-binding/index.ts';
import AmqpOperationBindingVisitor from './visitors/async-api-2/bindings/amqp/operation-binding/index.ts';
import AmqpServerBindingVisitor from './visitors/async-api-2/bindings/amqp/server-binding/index.ts';
// AMQP 1.0
import Amqp1ChannelBindingVisitor from './visitors/async-api-2/bindings/amqp1/channel-binding/index.ts';
import Amqp1MessageBindingVisitor from './visitors/async-api-2/bindings/amqp1/message-binding/index.ts';
import Amqp1OperationBindingVisitor from './visitors/async-api-2/bindings/amqp1/operation-binding/index.ts';
import Amqp1ServerBindingVisitor from './visitors/async-api-2/bindings/amqp1/server-binding/index.ts';
// Anypoint MQ
import AnypointmqChannelBindingVisitor from './visitors/async-api-2/bindings/anypointmq/channel-binding/index.ts';
import AnypointmqMessageBindingVisitor from './visitors/async-api-2/bindings/anypointmq/message-binding/index.ts';
import AnypointmqOperationBindingVisitor from './visitors/async-api-2/bindings/anypointmq/operation-binding/index.ts';
import AnypointmqServerBindingVisitor from './visitors/async-api-2/bindings/anypointmq/server-binding/index.ts';
// HTTP
import HttpChannelBindingVisitor from './visitors/async-api-2/bindings/http/channel-binding/index.ts';
import HttpMessageBindingVisitor from './visitors/async-api-2/bindings/http/message-binding/index.ts';
import HttpOperationBindingVisitor from './visitors/async-api-2/bindings/http/operation-binding/index.ts';
import HttpServerBindingVisitor from './visitors/async-api-2/bindings/http/server-binding/index.ts';
// Google Cloud Pub/Sub
import GooglepubsubChannelBindingVisitor from './visitors/async-api-2/bindings/googlepubsub/channel-binding/index.ts';
import GooglepubsubMessageBindingVisitor from './visitors/async-api-2/bindings/googlepubsub/message-binding/index.ts';
import GooglepubsubOperationBindingVisitor from './visitors/async-api-2/bindings/googlepubsub/operation-binding/index.ts';
import GooglepubsubServerBindingVisitor from './visitors/async-api-2/bindings/googlepubsub/server-binding/index.ts';
// IBM MQ
import IbmmqChannelBindingVisitor from './visitors/async-api-2/bindings/ibmmq/channel-binding/index.ts';
import IbmmqMessageBindingVisitor from './visitors/async-api-2/bindings/ibmmq/message-binding/index.ts';
import IbmmqOperationBindingVisitor from './visitors/async-api-2/bindings/ibmmq/operation-binding/index.ts';
import IbmmqServerBindingVisitor from './visitors/async-api-2/bindings/ibmmq/server-binding/index.ts';
// JMS
import JmsChannelBindingVisitor from './visitors/async-api-2/bindings/jms/channel-binding/index.ts';
import JmsMessageBindingVisitor from './visitors/async-api-2/bindings/jms/message-binding/index.ts';
import JmsOperationBindingVisitor from './visitors/async-api-2/bindings/jms/operation-binding/index.ts';
import JmsServerBindingVisitor from './visitors/async-api-2/bindings/jms/server-binding/index.ts';
// Kafka
import KafkaChannelBindingVisitor from './visitors/async-api-2/bindings/kafka/channel-binding/index.ts';
import KafkaMessageBindingVisitor from './visitors/async-api-2/bindings/kafka/message-binding/index.ts';
import KafkaOperationBindingVisitor from './visitors/async-api-2/bindings/kafka/operation-binding/index.ts';
import KafkaServerBindingVisitor from './visitors/async-api-2/bindings/kafka/server-binding/index.ts';
// Mercure
import MercureChannelBindingVisitor from './visitors/async-api-2/bindings/mercure/channel-binding/index.ts';
import MercureMessageBindingVisitor from './visitors/async-api-2/bindings/mercure/message-binding/index.ts';
import MercureOperationBindingVisitor from './visitors/async-api-2/bindings/mercure/operation-binding/index.ts';
import MercureServerBindingVisitor from './visitors/async-api-2/bindings/mercure/server-binding/index.ts';
// MQTT
import MqttChannelBindingVisitor from './visitors/async-api-2/bindings/mqtt/channel-binding/index.ts';
import MqttMessageBindingVisitor from './visitors/async-api-2/bindings/mqtt/message-binding/index.ts';
import MqttOperationBindingVisitor from './visitors/async-api-2/bindings/mqtt/operation-binding/index.ts';
import MqttServerBindingVisitor from './visitors/async-api-2/bindings/mqtt/server-binding/index.ts';
// MQTT 5
import Mqtt5ChannelBindingVisitor from './visitors/async-api-2/bindings/mqtt5/channel-binding/index.ts';
import Mqtt5MessageBindingVisitor from './visitors/async-api-2/bindings/mqtt5/message-binding/index.ts';
import Mqtt5OperationBindingVisitor from './visitors/async-api-2/bindings/mqtt5/operation-binding/index.ts';
import Mqtt5ServerBindingVisitor from './visitors/async-api-2/bindings/mqtt5/server-binding/index.ts';
// NATS
import NatsChannelBindingVisitor from './visitors/async-api-2/bindings/nats/channel-binding/index.ts';
import NatsMessageBindingVisitor from './visitors/async-api-2/bindings/nats/message-binding/index.ts';
import NatsOperationBindingVisitor from './visitors/async-api-2/bindings/nats/operation-binding/index.ts';
import NatsServerBindingVisitor from './visitors/async-api-2/bindings/nats/server-binding/index.ts';
// Pulsar
import PulsarChannelBindingVisitor from './visitors/async-api-2/bindings/pulsar/channel-binding/index.ts';
import PulsarMessageBindingVisitor from './visitors/async-api-2/bindings/pulsar/message-binding/index.ts';
import PulsarOperationBindingVisitor from './visitors/async-api-2/bindings/pulsar/operation-binding/index.ts';
import PulsarServerBindingVisitor from './visitors/async-api-2/bindings/pulsar/server-binding/index.ts';
// Redis
import RedisChannelBindingVisitor from './visitors/async-api-2/bindings/redis/channel-binding/index.ts';
import RedisMessageBindingVisitor from './visitors/async-api-2/bindings/redis/message-binding/index.ts';
import RedisOperationBindingVisitor from './visitors/async-api-2/bindings/redis/operation-binding/index.ts';
import RedisServerBindingVisitor from './visitors/async-api-2/bindings/redis/server-binding/index.ts';
// SNS
import SnsChannelBindingVisitor from './visitors/async-api-2/bindings/sns/channel-binding/index.ts';
import SnsMessageBindingVisitor from './visitors/async-api-2/bindings/sns/message-binding/index.ts';
import SnsOperationBindingVisitor from './visitors/async-api-2/bindings/sns/operation-binding/index.ts';
import SnsServerBindingVisitor from './visitors/async-api-2/bindings/sns/server-binding/index.ts';
// Solace
import SolaceChannelBindingVisitor from './visitors/async-api-2/bindings/solace/channel-binding/index.ts';
import SolaceMessageBindingVisitor from './visitors/async-api-2/bindings/solace/message-binding/index.ts';
import SolaceOperationBindingVisitor from './visitors/async-api-2/bindings/solace/operation-binding/index.ts';
import SolaceServerBindingVisitor from './visitors/async-api-2/bindings/solace/server-binding/index.ts';
// SQS
import SqsChannelBindingVisitor from './visitors/async-api-2/bindings/sqs/channel-binding/index.ts';
import SqsMessageBindingVisitor from './visitors/async-api-2/bindings/sqs/message-binding/index.ts';
import SqsOperationBindingVisitor from './visitors/async-api-2/bindings/sqs/operation-binding/index.ts';
import SqsServerBindingVisitor from './visitors/async-api-2/bindings/sqs/server-binding/index.ts';
// STOMP
import StompChannelBindingVisitor from './visitors/async-api-2/bindings/stomp/channel-binding/index.ts';
import StompMessageBindingVisitor from './visitors/async-api-2/bindings/stomp/message-binding/index.ts';
import StompOperationBindingVisitor from './visitors/async-api-2/bindings/stomp/operation-binding/index.ts';
import StompServerBindingVisitor from './visitors/async-api-2/bindings/stomp/server-binding/index.ts';
// WebSocket
import WebSocketChannelBindingVisitor from './visitors/async-api-2/bindings/ws/channel-binding/index.ts';
import WebSocketMessageBindingVisitor from './visitors/async-api-2/bindings/ws/message-binding/index.ts';
import WebSocketOperationBindingVisitor from './visitors/async-api-2/bindings/ws/operation-binding/index.ts';
import WebSocketServerBindingVisitor from './visitors/async-api-2/bindings/ws/server-binding/index.ts';

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
    discriminator: { $ref: '#/visitors/value' },
    externalDocs: {
      $ref: '#/visitors/document/objects/ExternalDocumentation',
    },
    deprecated: { $ref: '#/visitors/value' },
  },
};

/**
 * @public
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        /**
         * `AsyncApi >= 2.0.0 <=2.6.0` specification elements.
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
            title: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            termsOfService: { $ref: '#/visitors/value' },
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
            name: { $ref: '#/visitors/value' },
            url: { $ref: '#/visitors/value' },
            email: { $ref: '#/visitors/value' },
          },
        },
        License: {
          $visitor: LicenseVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            url: { $ref: '#/visitors/value' },
          },
        },
        Servers: {
          $visitor: ServersVisitor,
        },
        Server: {
          $visitor: ServerVisitor,
          fixedFields: {
            url: ServerUrlVisitor,
            protocol: { $ref: '#/visitors/value' },
            protocolVersion: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
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
            enum: { $ref: '#/visitors/value' },
            default: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            examples: { $ref: '#/visitors/value' },
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
            description: { $ref: '#/visitors/value' },
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
            operationId: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
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
            operationId: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
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
            messageId: { $ref: '#/visitors/value' },
            headers: MessageHeadersVisitor,
            payload: { $ref: '#/visitors/value' },
            correlationId: MessageCorrelationIdVisitor,
            schemaFormat: { $ref: '#/visitors/value' },
            contentType: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
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
            messageId: { $ref: '#/visitors/value' },
            headers: MessageTraitHeadersVisitor,
            correlationId: MessageTraitCorrelationIdVisitor,
            schemaFormat: { $ref: '#/visitors/value' },
            contentType: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
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
            headers: { $ref: '#/visitors/value' },
            payload: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
          },
        },
        Tags: {
          $visitor: TagsVisitor,
        },
        Tag: {
          $visitor: TagVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            url: { $ref: '#/visitors/value' },
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
            type: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            in: { $ref: '#/visitors/value' },
            scheme: { $ref: '#/visitors/value' },
            bearerFormat: { $ref: '#/visitors/value' },
            flows: {
              $ref: '#/visitors/document/objects/OAuthFlows',
            },
            openIdConnectUrl: { $ref: '#/visitors/value' },
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
            authorizationUrl: { $ref: '#/visitors/value' },
            tokenUrl: { $ref: '#/visitors/value' },
            refreshUrl: { $ref: '#/visitors/value' },
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
            pulsar: {
              $ref: '#/visitors/document/objects/bindings/pulsar/ServerBinding',
            },
          },
        },
        Parameters: {
          $visitor: ParametersVisitor,
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            schema: ParameterSchemaVisitor,
            location: { $ref: '#/visitors/value' },
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
            pulsar: {
              $ref: '#/visitors/document/objects/bindings/pulsar/ChannelBinding',
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
            pulsar: {
              $ref: '#/visitors/document/objects/bindings/pulsar/OperationBinding',
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
            pulsar: {
              $ref: '#/visitors/document/objects/bindings/pulsar/MessageBinding',
            },
          },
        },
        CorrelationID: {
          $visitor: CorrelationIDVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            location: { $ref: '#/visitors/value' },
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
          pulsar: {
            ServerBinding: {
              $visitor: PulsarServerBindingVisitor,
              fixedFields: {
                tenant: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            ChannelBinding: {
              $visitor: PulsarChannelBindingVisitor,
              fixedFields: {
                namespace: {
                  $ref: '#/visitors/value',
                },
                persistence: {
                  $ref: '#/visitors/value',
                },
                compaction: {
                  $ref: '#/visitors/value',
                },
                'geo-replication': {
                  $ref: '#/visitors/value',
                },
                retention: {
                  $ref: '#/visitors/value',
                },
                ttl: {
                  $ref: '#/visitors/value',
                },
                deduplication: {
                  $ref: '#/visitors/value',
                },
                bindingVersion: {
                  $ref: '#/visitors/value',
                },
              },
            },
            OperationBinding: {
              $visitor: PulsarOperationBindingVisitor,
            },
            MessageBinding: {
              $visitor: PulsarMessageBindingVisitor,
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
