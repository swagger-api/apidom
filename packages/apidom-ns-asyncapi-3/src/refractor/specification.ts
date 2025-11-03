import { specificationObj as AsyncApi2_0Specification } from '@swagger-api/apidom-ns-asyncapi-2';

import AsyncApi3Visitor from './visitors/async-api-3/index.ts';
import AsyncApiVersionVisitor from './visitors/async-api-3/AsyncApiVersionVisitor.ts';
import ChanneBindingsVisitor from './visitors/async-api-3/channel/BindingsVisitor.ts';
import ChannelAddressExpressionsVisitor from './visitors/async-api-3/channel-address-expressions/index.ts';
import ChannelBindingsVisitor from './visitors/async-api-3/channel-bindings/index.ts';
import ChannelServersVisitor from './visitors/async-api-3/channel/ServersVisitor.ts';
import ChannelVisitor from './visitors/async-api-3/channel/index.ts';
import ChannelsVisitor from './visitors/async-api-3/channels/index.ts';
import ComponentsChannelsVisitor from './visitors/async-api-3/components/ChannelsVisitor.ts';
import ComponentsExternalDocumentationVisitor from './visitors/async-api-3/components/ExternalDocumentationVisitor.ts';
import ComponentsRepliesVisitor from './visitors/async-api-3/components/RepliesVisitor.ts';
import ComponentsReplyAddressesVisitor from './visitors/async-api-3/components/ReplyAddressesVisitor.ts';
import ComponentsSchemasVisitor from './visitors/async-api-3/components/SchemasVisitor.ts';
import ComponentsTagsVisitor from './visitors/async-api-3/components/TagsVisitor.ts';
import ComponentsOperationsVisitor from './visitors/async-api-3/components/OperationsVisitor.ts';
import ComponentsVisitor from './visitors/async-api-3/components/index.ts';
import ContactVisitor from './visitors/async-api-3/contact/index.ts';
import CorrelationIDVisitor from './visitors/async-api-3/correlation-id/index.ts';
import DefaultContentTypeVisitor from './visitors/async-api-3/DefaultContentTypeVisitor.ts';
import ExternalDocumentationOrReferenceVisitor from './visitors/async-api-3/external-documentation-object/ExternalDocumentationOrReferenceVisitor.ts';
import ExternalDocumentationVisitor from './visitors/async-api-3/external-documentation-object/index.ts';
import FallbackVisitor from './visitors/FallbackVisitor.ts';
import IdentifierVisitor from './visitors/async-api-3/IdentifierVisitor.ts';
import InfoVisitor from './visitors/async-api-3/info/info.ts';
import LicenseVisitor from './visitors/async-api-3/license/index.ts';
import MessageBindingsVisitor from './visitors/async-api-3/message-bindings/index.ts';
import MessageBindingsVisitor_ from './visitors/async-api-3/message/BindingsVisitor.ts';
import MessageCorrelationIdVisitor from './visitors/async-api-3/message/CorrelationIdVisitor.ts';
import MessageExampleVisitor from './visitors/async-api-3/message-example/index.ts';
import MessageExamplesVisitor from './visitors/async-api-3/message/ExamplesVisitor.ts';
import MessageHeadersVisitor from './visitors/async-api-3/message/HeadersVisitor.ts';
import MessagePayloadVisitor from './visitors/async-api-3/message/PayloadVisitor.ts';
import MessageTraitHeadersVisitor from './visitors/async-api-3/message-trait/HeadersVisitor.ts';
import MessageTraitVisitor from './visitors/async-api-3/message-trait/index.ts';
import MessageTraitsVisitor from './visitors/async-api-3/message/TraitsVisitor.ts';
import MessageVisitor from './visitors/async-api-3/message/index.ts';
import MessagesVisitor from './visitors/async-api-3/messages/index.ts';
import MultiFormatSchemaVisitor from './visitors/async-api-3/multiFormatSchema/index.ts'
import OAuthFlowVisitor from './visitors/async-api-3/oauth-flow/index.ts';
import OAuthFlowsVisitor from './visitors/async-api-3/oauth-flows/index.ts';
import OperationBindingsVisitor from './visitors/async-api-3/operation-bindings/index.ts';
import OperationBindingsVisitor_ from './visitors/async-api-3/operation/BindingsVisitor.ts';
import OperationChannelVisitor from './visitors/async-api-3/operation/ChannelVisitor.ts';
import OperationMessagesVisitor from './visitors/async-api-3/operation/MessagesVisitor.ts';
import OperationReplyVisitor_ from './visitors/async-api-3/operation/ReplyVisitor.ts';
import OperationReplyAddressVisitor from './visitors/async-api-3/operation-reply-address/index.ts';
import OperationReplyAddressVisitor_ from './visitors/async-api-3/operation-reply/AddressVisitor.ts';
import OperationReplyMessagesVisitor from './visitors/async-api-3/operation-reply/MessagesVisitor.ts';
import OperationReplyVisitor from './visitors/async-api-3/operation-reply/index.ts';
import OperationSecurityVisitor  from './visitors/async-api-3/operation/SecurityVisitor.ts';
import OperationTraitVisitor from './visitors/async-api-3/operation-trait/index.ts';
import OperationTraitsVisitor from './visitors/async-api-3/operation/TraitsVisitor.ts';
import OperationVisitor from './visitors/async-api-3/operation/index.ts';
import OperationsVisitor from './visitors/async-api-3/operations/index.ts';
import ParameterVisitor from './visitors/async-api-3/parameter/index.ts';
import ParametersVisitor from './visitors/async-api-3/parameters/index.ts';
import ReferenceVisitor from './visitors/async-api-3/reference/index.ts';
import SchemaOrReferenceVisitor from './visitors/async-api-3/schema/SchemaOrReferenceVisitor.ts';
import SchemaVisitor from './visitors/async-api-3/schema/index.ts';
import SecuritySchemeScopesVisitor from './visitors/async-api-3/security-scheme/ScopesVisitor.ts';
import SecuritySchemeVisitor from './visitors/async-api-3/security-scheme/index.ts';
import ServerBindingsVisitor from './visitors/async-api-3/server-bindings/index.ts';
import ServerSecurityVisitor from './visitors/async-api-3/server/SecurityVisitor.ts';
import ServerVariableVisitor from './visitors/async-api-3/server-variable/index.ts';
import ServerVisitor from './visitors/async-api-3/server/index.ts';
import ServersVisitor from './visitors/async-api-3/servers/index.ts';
import TagVisitor from './visitors/async-api-3/tag/index.ts';
import TagsVisitor from './visitors/async-api-3/tags/index.ts';
import { default as schemaInheritedFixedFields } from './visitors/async-api-3/schema/inherited-fixed-fields.ts';
/**
 * Binding elements.
 */
// AMQP 0-9-1
import AmqpChannelBindingVisitor from './visitors/async-api-3/bindings/amqp/channel-binding/index.ts';
import AmqpMessageBindingVisitor from './visitors/async-api-3/bindings/amqp/message-binding/index.ts';
import AmqpOperationBindingVisitor from './visitors/async-api-3/bindings/amqp/operation-binding/index.ts';
import AmqpServerBindingVisitor from './visitors/async-api-3/bindings/amqp/server-binding/index.ts';
// AMQP 1.0
import Amqp1ChannelBindingVisitor from './visitors/async-api-3/bindings/amqp1/channel-binding/index.ts';
import Amqp1MessageBindingVisitor from './visitors/async-api-3/bindings/amqp1/message-binding/index.ts';
import Amqp1OperationBindingVisitor from './visitors/async-api-3/bindings/amqp1/operation-binding/index.ts';
import Amqp1ServerBindingVisitor from './visitors/async-api-3/bindings/amqp1/server-binding/index.ts';
// Anypoint MQ
import AnypointmqChannelBindingVisitor from './visitors/async-api-3/bindings/anypointmq/channel-binding/index.ts';
import AnypointmqMessageBindingVisitor from './visitors/async-api-3/bindings/anypointmq/message-binding/index.ts';
import AnypointmqOperationBindingVisitor from './visitors/async-api-3/bindings/anypointmq/operation-binding/index.ts';
import AnypointmqServerBindingVisitor from './visitors/async-api-3/bindings/anypointmq/server-binding/index.ts';
// HTTP
import HttpChannelBindingVisitor from './visitors/async-api-3/bindings/http/channel-binding/index.ts';
import HttpMessageBindingVisitor from './visitors/async-api-3/bindings/http/message-binding/index.ts';
import HttpOperationBindingVisitor from './visitors/async-api-3/bindings/http/operation-binding/index.ts';
import HttpServerBindingVisitor from './visitors/async-api-3/bindings/http/server-binding/index.ts';
// Google Cloud Pub/Sub
import GooglepubsubChannelBindingVisitor from './visitors/async-api-3/bindings/googlepubsub/channel-binding/index.ts';
import GooglepubsubMessageBindingVisitor from './visitors/async-api-3/bindings/googlepubsub/message-binding/index.ts';
import GooglepubsubOperationBindingVisitor from './visitors/async-api-3/bindings/googlepubsub/operation-binding/index.ts';
import GooglepubsubServerBindingVisitor from './visitors/async-api-3/bindings/googlepubsub/server-binding/index.ts';
// IBM MQ
import IbmmqChannelBindingVisitor from './visitors/async-api-3/bindings/ibmmq/channel-binding/index.ts';
import IbmmqMessageBindingVisitor from './visitors/async-api-3/bindings/ibmmq/message-binding/index.ts';
import IbmmqOperationBindingVisitor from './visitors/async-api-3/bindings/ibmmq/operation-binding/index.ts';
import IbmmqServerBindingVisitor from './visitors/async-api-3/bindings/ibmmq/server-binding/index.ts';
// JMS
import JmsChannelBindingVisitor from './visitors/async-api-3/bindings/jms/channel-binding/index.ts';
import JmsMessageBindingVisitor from './visitors/async-api-3/bindings/jms/message-binding/index.ts';
import JmsOperationBindingVisitor from './visitors/async-api-3/bindings/jms/operation-binding/index.ts';
import JmsServerBindingVisitor from './visitors/async-api-3/bindings/jms/server-binding/index.ts';
// Kafka
import KafkaChannelBindingVisitor from './visitors/async-api-3/bindings/kafka/channel-binding/index.ts';
import KafkaMessageBindingVisitor from './visitors/async-api-3/bindings/kafka/message-binding/index.ts';
import KafkaOperationBindingVisitor from './visitors/async-api-3/bindings/kafka/operation-binding/index.ts';
import KafkaServerBindingVisitor from './visitors/async-api-3/bindings/kafka/server-binding/index.ts';
// Mercure
import MercureChannelBindingVisitor from './visitors/async-api-3/bindings/mercure/channel-binding/index.ts';
import MercureMessageBindingVisitor from './visitors/async-api-3/bindings/mercure/message-binding/index.ts';
import MercureOperationBindingVisitor from './visitors/async-api-3/bindings/mercure/operation-binding/index.ts';
import MercureServerBindingVisitor from './visitors/async-api-3/bindings/mercure/server-binding/index.ts';
// MQTT
import MqttChannelBindingVisitor from './visitors/async-api-3/bindings/mqtt/channel-binding/index.ts';
import MqttMessageBindingVisitor from './visitors/async-api-3/bindings/mqtt/message-binding/index.ts';
import MqttOperationBindingVisitor from './visitors/async-api-3/bindings/mqtt/operation-binding/index.ts';
import MqttServerBindingVisitor from './visitors/async-api-3/bindings/mqtt/server-binding/index.ts';
// MQTT 5
import Mqtt5ChannelBindingVisitor from './visitors/async-api-3/bindings/mqtt5/channel-binding/index.ts';
import Mqtt5MessageBindingVisitor from './visitors/async-api-3/bindings/mqtt5/message-binding/index.ts';
import Mqtt5OperationBindingVisitor from './visitors/async-api-3/bindings/mqtt5/operation-binding/index.ts';
import Mqtt5ServerBindingVisitor from './visitors/async-api-3/bindings/mqtt5/server-binding/index.ts';
// NATS
import NatsChannelBindingVisitor from './visitors/async-api-3/bindings/nats/channel-binding/index.ts';
import NatsMessageBindingVisitor from './visitors/async-api-3/bindings/nats/message-binding/index.ts';
import NatsOperationBindingVisitor from './visitors/async-api-3/bindings/nats/operation-binding/index.ts';
import NatsServerBindingVisitor from './visitors/async-api-3/bindings/nats/server-binding/index.ts';
// Pulsar
import PulsarChannelBindingVisitor from './visitors/async-api-3/bindings/pulsar/channel-binding/index.ts';
import PulsarMessageBindingVisitor from './visitors/async-api-3/bindings/pulsar/message-binding/index.ts';
import PulsarOperationBindingVisitor from './visitors/async-api-3/bindings/pulsar/operation-binding/index.ts';
import PulsarServerBindingVisitor from './visitors/async-api-3/bindings/pulsar/server-binding/index.ts';
// Redis
import RedisChannelBindingVisitor from './visitors/async-api-3/bindings/redis/channel-binding/index.ts';
import RedisMessageBindingVisitor from './visitors/async-api-3/bindings/redis/message-binding/index.ts';
import RedisOperationBindingVisitor from './visitors/async-api-3/bindings/redis/operation-binding/index.ts';
import RedisServerBindingVisitor from './visitors/async-api-3/bindings/redis/server-binding/index.ts';
// SNS
import SnsChannelBindingVisitor from './visitors/async-api-3/bindings/sns/channel-binding/index.ts';
import SnsMessageBindingVisitor from './visitors/async-api-3/bindings/sns/message-binding/index.ts';
import SnsOperationBindingVisitor from './visitors/async-api-3/bindings/sns/operation-binding/index.ts';
import SnsServerBindingVisitor from './visitors/async-api-3/bindings/sns/server-binding/index.ts';
// Solace
import SolaceChannelBindingVisitor from './visitors/async-api-3/bindings/solace/channel-binding/index.ts';
import SolaceMessageBindingVisitor from './visitors/async-api-3/bindings/solace/message-binding/index.ts';
import SolaceOperationBindingVisitor from './visitors/async-api-3/bindings/solace/operation-binding/index.ts';
import SolaceServerBindingVisitor from './visitors/async-api-3/bindings/solace/server-binding/index.ts';
// SQS
import SqsChannelBindingVisitor from './visitors/async-api-3/bindings/sqs/channel-binding/index.ts';
import SqsMessageBindingVisitor from './visitors/async-api-3/bindings/sqs/message-binding/index.ts';
import SqsOperationBindingVisitor from './visitors/async-api-3/bindings/sqs/operation-binding/index.ts';
import SqsServerBindingVisitor from './visitors/async-api-3/bindings/sqs/server-binding/index.ts';
// STOMP
import StompChannelBindingVisitor from './visitors/async-api-3/bindings/stomp/channel-binding/index.ts';
import StompMessageBindingVisitor from './visitors/async-api-3/bindings/stomp/message-binding/index.ts';
import StompOperationBindingVisitor from './visitors/async-api-3/bindings/stomp/operation-binding/index.ts';
import StompServerBindingVisitor from './visitors/async-api-3/bindings/stomp/server-binding/index.ts';
// WebSocket
import WebSocketChannelBindingVisitor from './visitors/async-api-3/bindings/ws/channel-binding/index.ts';
import WebSocketMessageBindingVisitor from './visitors/async-api-3/bindings/ws/message-binding/index.ts';
import WebSocketOperationBindingVisitor from './visitors/async-api-3/bindings/ws/operation-binding/index.ts';
import WebSocketServerBindingVisitor from './visitors/async-api-3/bindings/ws/server-binding/index.ts';

const SchemaSpecification = {
  $visitor: SchemaVisitor,
  fixedFields: {
    ...schemaInheritedFixedFields,
    // validation vocabulary
    // validation keywords for Applying Subschemas With Boolean Logic
    allOf: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.allOf,
    anyOf: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.anyOf,
    oneOf: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.oneOf,
    // validation Keywords for Arrays
    items: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.items,
    // validation Keywords for Objects
    properties: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.properties,
    patternProperties: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.patternProperties,
    dependencies: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.dependencies,
    // validation Vocabulary for Schema Re-Use With "definitions"
    definitions: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.definitions,
    // AsyncAPI vocabulary
    discriminator:AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.discriminator,
    externalDocs:
      AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.externalDocs,
    deprecated: AsyncApi2_0Specification.visitors.document.objects.Schema.fixedFields.deprecated
  },
};

const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        /**
         * `AsyncApi 3.0.0` specification elements.
         */
        AsyncApi: {
          $visitor: AsyncApi3Visitor,
          fixedFields: {
            asyncapi: {
              $ref: '#/visitors/document/objects/AsyncApiVersion',
            },
            id: {
              $ref: '#/visitors/document/objects/Identifier',
            },
            info: { $ref: '#/visitors/document/objects/Info' },
            servers: { $ref: '#/visitors/document/objects/Servers' },
            defaultContentType: {
              $ref: '#/visitors/document/objects/DefaultContentType',
            },
            channels: { $ref: '#/visitors/document/objects/Channels' },
            operations: { $ref: '#/visitors/document/objects/Operations' },
            components: { $ref: '#/visitors/document/objects/Components' },
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
            title:  AsyncApi2_0Specification.visitors.document.objects.Info.fixedFields.title,
            version: AsyncApi2_0Specification.visitors.document.objects.Info.fixedFields.version,
            description:  AsyncApi2_0Specification.visitors.document.objects.Info.fixedFields.description,
            termsOfService:  AsyncApi2_0Specification.visitors.document.objects.Info.fixedFields.termsOfService,
            contact: { $ref: '#/visitors/document/objects/Contact' },
            license: { $ref: '#/visitors/document/objects/License' },
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: ExternalDocumentationOrReferenceVisitor,
          },
        },
        Contact: {
          $visitor: ContactVisitor,
          fixedFields: {
            name:  AsyncApi2_0Specification.visitors.document.objects.Contact.fixedFields.name,
            url:  AsyncApi2_0Specification.visitors.document.objects.Contact.fixedFields.url,
            email:  AsyncApi2_0Specification.visitors.document.objects.Contact.fixedFields.email
          },
        },
        License: {
          $visitor: LicenseVisitor,
          fixedFields: {
            name: AsyncApi2_0Specification.visitors.document.objects.License.fixedFields.name,
            url: AsyncApi2_0Specification.visitors.document.objects.License.fixedFields.url
          },
        },
        Servers: {
          $visitor: ServersVisitor,
        },
        Server: {
          $visitor: ServerVisitor,
          fixedFields: {
            host: { $ref: '#/visitors/value' },
            protocol: AsyncApi2_0Specification.visitors.document.objects.Server.fixedFields.protocol,
            protocolVersion: AsyncApi2_0Specification.visitors.document.objects.Server.fixedFields.protocolVersion,
            pathname: { $ref: '#/visitors/value' },
            description: AsyncApi2_0Specification.visitors.document.objects.Server.fixedFields.description,
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            variables:  AsyncApi2_0Specification.visitors.document.objects.Server.fixedFields.variables,
            security: ServerSecurityVisitor,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: ExternalDocumentationOrReferenceVisitor,
            bindings: AsyncApi2_0Specification.visitors.document.objects.Server.fixedFields.bindings,
          },
        },
        ServerVariable: {
          $visitor: ServerVariableVisitor,
          fixedFields: {
            enum: AsyncApi2_0Specification.visitors.document.objects.ServerVariable.fixedFields.enum,
            default: AsyncApi2_0Specification.visitors.document.objects.ServerVariable.fixedFields.default,
            description: AsyncApi2_0Specification.visitors.document.objects.ServerVariable.fixedFields.description,
            examples: AsyncApi2_0Specification.visitors.document.objects.ServerVariable.fixedFields.examples
          },
        },
        DefaultContentType: {
          $visitor: DefaultContentTypeVisitor,
        },
        Channels: {
          $visitor: ChannelsVisitor,
        },
        Channel: {
          $visitor: ChannelVisitor,
          fixedFields: {
            address: { $ref: '#/visitors/value' },
            messages: { $ref: '#/visitors/document/objects/Messages' },
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            servers: ChannelServersVisitor,
            parameters: {
              $ref: '#/visitors/document/objects/Parameters',
            },
            tags: { $ref: '#/visitors/document/objects/Tags' },
            externalDocs: ExternalDocumentationOrReferenceVisitor,
            bindings: ChanneBindingsVisitor,
          },
        },
        ChannelAddressExpressions: {
          $visitor: ChannelAddressExpressionsVisitor,
        },
        Messages: {
          $visitor: MessagesVisitor
        },
        Operations: {
          $visitor: OperationsVisitor,
        },
        Operation: {
          $visitor: OperationVisitor,
          fixedFields: {
            action: { $ref: '#/visitors/value' },
            channel: OperationChannelVisitor,
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            security: OperationSecurityVisitor,
            tags: { $ref: '#/visitors/document/objects/Tags' },
            externalDocs: ExternalDocumentationOrReferenceVisitor,
            bindings: OperationBindingsVisitor_,
            traits: OperationTraitsVisitor,
            messages: OperationMessagesVisitor,
            reply: OperationReplyVisitor_,
          },
        },
        OperationTrait: {
          $visitor: OperationTraitVisitor,
          fixedFields: {
            title: { $ref: '#/visitors/value' },
            summary: AsyncApi2_0Specification.visitors.document.objects.OperationTrait.fixedFields.summary,
            description: AsyncApi2_0Specification.visitors.document.objects.OperationTrait.fixedFields.description,
            security: OperationSecurityVisitor,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: ExternalDocumentationOrReferenceVisitor,
            bindings: AsyncApi2_0Specification.visitors.document.objects.OperationTrait.fixedFields.bindings,
          },
        },
        OperationReply: {
          $visitor: OperationReplyVisitor,
          fixedFields: {
            address: OperationReplyAddressVisitor_,
            channel: OperationChannelVisitor,
            messages: OperationReplyMessagesVisitor
          },
        },
        OperationReplyAddress: {
          $visitor: OperationReplyAddressVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            location: {$ref: '#/visitors/value' }
          },
        },
        Parameters: {
          $visitor: ParametersVisitor,
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            enum: { $ref: '#/visitors/value' },
            default: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            examples: { $ref: '#/visitors/value' },
            location: { $ref: '#/visitors/value' },
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
        Message: {
          $visitor: MessageVisitor,
          fixedFields: {
            headers: MessageHeadersVisitor,
            payload: MessagePayloadVisitor,
            correlationId: MessageCorrelationIdVisitor,
            contetType: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: ExternalDocumentationOrReferenceVisitor,
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
            correlationId: AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.correlationId,
            schemaFormat: AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.schemaFormat,
            contentType:AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.contentType,
            name: AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.name,
            title: AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.title,
            summary: AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.summary,
            description: AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.description,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: ExternalDocumentationOrReferenceVisitor,
            bindings: AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.bindings,
            examples: AsyncApi2_0Specification.visitors.document.objects.MessageTrait.fixedFields.examples,
          },
        },
        MessageExample: {
          $visitor: MessageExampleVisitor,
          fixedFields: {
            headers: AsyncApi2_0Specification.visitors.document.objects.MessageExample.fixedFields.headers,
            payload: AsyncApi2_0Specification.visitors.document.objects.MessageExample.fixedFields.payload,
            name: AsyncApi2_0Specification.visitors.document.objects.MessageExample.fixedFields.name,
            summary: AsyncApi2_0Specification.visitors.document.objects.MessageExample.fixedFields.summary
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
            externalDocs: ExternalDocumentationOrReferenceVisitor,
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
          fixedFields: {
            description: AsyncApi2_0Specification.visitors.document.objects.ExternalDocumentation.fixedFields.description,
            url:  AsyncApi2_0Specification.visitors.document.objects.ExternalDocumentation.fixedFields.url
          },
        },
        JSONReference: {
          $ref: '#/visitors/document/objects/Reference',
        },
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: AsyncApi2_0Specification.visitors.document.objects.Reference.fixedFields.$ref
          },
        },
        LinkDescription: AsyncApi2_0Specification.visitors.document.objects.LinkDescription,
        Components: {
          $visitor: ComponentsVisitor,
          fixedFields: {
            schemas: ComponentsSchemasVisitor,
            servers: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.servers,
            channels: ComponentsChannelsVisitor,
            serverVariables:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.serverVariables,
            operations: ComponentsOperationsVisitor,
            messages: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.messages,
            securitySchemes: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.securitySchemes,
            parameters: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.parameters,
            correlationIds:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.correlationIds,
            replies: ComponentsRepliesVisitor,
            replyAddresses: ComponentsReplyAddressesVisitor,
            tags: ComponentsTagsVisitor,
            externalDocs: ComponentsExternalDocumentationVisitor,
            operationTraits: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.operationTraits,
            messageTraits:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.messageTraits,
            serverBindings:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.serverBindings,
            channelBindings:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.channelBindings,
            operationBindings:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.operationBindings,
            messageBindings:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.messageBindings
          },
        },
        MultiFormatSchema: {
          $visitor: MultiFormatSchemaVisitor,
          fixedFields: {
            schemaFormat: { $ref: '#/visitors/value' },
            schema: { $ref: '#/visitors/value' },
          },
        },
        JSONSchema: SchemaSpecification,
        Schema: SchemaSpecification,
        SecurityScheme: {
          $visitor: SecuritySchemeVisitor,
          fixedFields: {
            type: AsyncApi2_0Specification.visitors.document.objects.SecurityScheme.fixedFields.type,
            description: AsyncApi2_0Specification.visitors.document.objects.SecurityScheme.fixedFields.description,
            name: AsyncApi2_0Specification.visitors.document.objects.SecurityScheme.fixedFields.name,
            in: AsyncApi2_0Specification.visitors.document.objects.SecurityScheme.fixedFields.in,
            scheme: AsyncApi2_0Specification.visitors.document.objects.SecurityScheme.fixedFields.scheme,
            bearerFormat: AsyncApi2_0Specification.visitors.document.objects.SecurityScheme.fixedFields.bearerFormat,
            flows: {
              $ref: '#/visitors/document/objects/OAuthFlows',
            },
            openIdConnectUrl: AsyncApi2_0Specification.visitors.document.objects.SecurityScheme.fixedFields.openIdConnectUrl,
            scopes: SecuritySchemeScopesVisitor
          },
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
            authorizationUrl:AsyncApi2_0Specification.visitors.document.objects.OAuthFlow.fixedFields.authorizationUrl,
            tokenUrl: AsyncApi2_0Specification.visitors.document.objects.OAuthFlow.fixedFields.tokenUrl,
            refreshUrl: AsyncApi2_0Specification.visitors.document.objects.OAuthFlow.fixedFields.refreshUrl,
            availableScopes: AsyncApi2_0Specification.visitors.document.objects.OAuthFlow.fixedFields.scopes
          },
        },
        CorrelationID: {
          $visitor: CorrelationIDVisitor,
          fixedFields: {
            description: AsyncApi2_0Specification.visitors.document.objects.CorrelationID.fixedFields.description,
            location: AsyncApi2_0Specification.visitors.document.objects.CorrelationID.fixedFields.location
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
    },
  },
};

export default specification;
