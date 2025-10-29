import { specificationObj as AsyncApi2_0Specification } from '@swagger-api/apidom-ns-asyncapi-2';

import FallbackVisitor from './visitors/FallbackVisitor.ts';
import AsyncApi3Visitor from './visitors/async-api-3/index.ts';
import AsyncApiVersionVisitor from './visitors/async-api-3/AsyncApiVersionVisitor.ts';
import IdentifierVisitor from './visitors/async-api-3/IdentifierVisitor.ts';
import InfoVisitor from './visitors/async-api-3/info/info.ts';
import ChannelsVisitor from './visitors/async-api-3/channels/index.ts';
import ChannelVisitor from './visitors/async-api-3/channel/index.ts';
import ChannelServersVisitor from './visitors/async-api-3/channel/ServersVisitor.ts';
import ExternalDocsVisitor from './visitors/generics/ExternalDocumentationVisitor.ts';
import ChanneBindingsVisitor from './visitors/async-api-3/channel/BindingsVisitor.ts';
import ComponentsVisitor from './visitors/async-api-3/components/index.ts';
import ComponentsSchemasVisitor from './visitors/async-api-3/components/SchemasVisitor.ts';
import ComponentsOperationsVisitor from './visitors/async-api-3/components/OperationsVisitor.ts';
import DefaultContentTypeVisitor from '../elements/DefaultContentType.ts';
import SecuritySchemesVisitor from './visitors/async-api-3/SecuritySchemesVisitor.ts';
import ServerVisitor from './visitors/async-api-3/server/index.ts';
import ServerVariableVisitor from './visitors/async-api-3/server-variable/index.ts';
import ParametersVisitor from './visitors/async-api-3/parameters/index.ts';
import ParameterVisitor from './visitors/async-api-3/parameter/index.ts';
import TagsVisitor from './visitors/async-api-3/tags/index.ts';
import ExternalDocumentationVisitor from './visitors/async-api-3/external-documentation-object/index.ts';

import OperationVisitor from './visitors/async-api-3/operation/OperationVisitor.ts';
import OperationsVisitor from './visitors/async-api-3/operations/index.ts';
import OperationMessagesVisitor from './visitors/async-api-3/operation/MessagesVisitor.ts';
import OperationBindingsVisitor_ from './visitors/async-api-3/operation/BindingsVisitor.ts';
import OperationTraitsVisitor from './visitors/async-api-3/operation/TraitsVisitor.ts';
import OperationSecurityVisitor  from './visitors/async-api-3/operation/SecurityVisitor.ts';
import SchemaVisitor from './visitors/async-api-3/schema/index.ts';
import ReferenceVisitor from './visitors/async-api-3/reference/index.ts';
import ContactVisitor from './visitors/async-api-3/contact/index.ts';
import LicenseVisitor from './visitors/async-api-3/license/index.ts';
import TagVisitor from './visitors/async-api-3/tag/index.ts';
import MessagesVisitor from './visitors/async-api-3/messages/index.ts';
import MessageVisitor from './visitors/async-api-3/message/index.ts';
import MessageExamplesVisitor from './visitors/async-api-3/message/ExamplesVisitor.ts';
import MessageExampleVisitor from './visitors/async-api-3/message-example/index.ts';
import MessageBindingsVisitor from './visitors/async-api-3/message/BindingsVisitor.ts';
import MessageHeadersVisitor from './visitors/async-api-3/message/HeadersVisitor.ts';
import MessageTraitsVisitor from './visitors/async-api-3/message/TraitsVisitor.ts';
import MessageCorrelationIdVisitor from './visitors/async-api-3/message/CorrelationIdVisitor.ts';
import OperationReplyVisitor from './visitors/async-api-3/operation-reply/index.ts';
import ServersVisitor from './visitors/async-api-3/servers/index.ts';
import MultiFormatSchemaVisitor from './visitors/async-api-3/multiFormatSchema/index.ts'
import ChannelBindingsVisitor from './visitors/async-api-3/channel-bindings/index.ts';
import MessageTraitVisitor from './visitors/async-api-3/message-trait/index.ts';
import MessageTraitHeadersVisitor from './visitors/async-api-3/message-trait/HeadersVisitor.ts';
import SecuritySchemeVisitor from './visitors/async-api-3/security-scheme/index.ts';
import OperationBindingsVisitor from './visitors/async-api-3/operation-bindings/index.ts';
import OAuthFlowVisitor from './visitors/async-api-3/oauth-flow/index.ts';
import OAuthFlowsVisitor from './visitors/async-api-3/oauth-flows/index.ts';
import ServerBindingsVisitor from './visitors/async-api-3/server-bindings/index.ts';
import ChannelAddressExpressionsVisitor from './visitors/async-api-3/channel-address-expression/index.ts';
import OperationTraitVisitor from './visitors/async-api-3/operation-trait/index.ts';
import OperationReplyAddressVisitor from './visitors/async-api-3/operation-reply-address/index.ts';
import OperationReplyAddressVisitor_ from './visitors/async-api-3/operation-reply/AddressVisitor.ts';
import OperationReplyMessagesVisitor from './visitors/async-api-3/operation-reply/MessagesVisitor.ts';
import { default as schemaInheritedFixedFields } from './visitors/async-api-3/schema/inherited-fixed-fields.ts'

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
    externalDocs: ExternalDocumentationVisitor,
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
            asyncapi: { $ref: '#/visitors/value' },
            id: { $ref: '#/visitors/value' },
            info: { $ref: '#/visitors/document/objects/Info' },
            servers: { $ref: '#/visitors/document/objects/Servers' },
            defaultContentType: { $ref: '#/visitors/value' },
            channels: { $ref: '#/visitors/document/objects/Channels' },
            operations: { $ref: '#/visitors/document/objects/Operation' },
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
            externalDocs: ExternalDocsVisitor,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
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
            security: AsyncApi2_0Specification.visitors.document.objects.Server.fixedFields.security,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: ExternalDocumentationVisitor,
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
            messages: { $ref: '#/visitors/value' },
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            servers: ChannelServersVisitor,
            parameters: { $ref: '#/visitors/document/object/Parameters' },
            tags: { $ref: '#/visitors/document/objects/Tags' },
            externalDocs: ExternalDocsVisitor,
            bindings: ChanneBindingsVisitor,
          },
        },
        ChannelAddressExpressions: {
          $visitor: ChannelAddressExpressionsVisitor
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
            channel: { $ref: '#/visitors/value' },
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            security: OperationSecurityVisitor,
            tags: { $ref: '#/visitors/document/objects/Tags' },
            externalDocs: ExternalDocsVisitor,
            bindings: OperationBindingsVisitor_,
            traits: OperationTraitsVisitor,
            message: OperationMessagesVisitor,
            reply: OperationReplyVisitor,
          },
        },
        OperationTrait: {
          $visitors: OperationTraitVisitor,
          fixedFields: {
            title: { $ref: '#/visitors/value' },
            summary: AsyncApi2_0Specification.visitors.document.objects.OperationTrait.fixedFields.summary,
            description: AsyncApi2_0Specification.visitors.document.objects.OperationTrait.fixedFields.description,
            security: AsyncApi2_0Specification.visitors.document.objects.OperationTrait.fixedFields.security,
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: ExternalDocumentationVisitor,
            bindings: AsyncApi2_0Specification.visitors.document.objects.OperationTrait.fixedFields.bindings,
          }
        },
        OperationReply: {
          $visitor: OperationReplyVisitor,
          fixedFields: {
            address: OperationReplyAddressVisitor_,
            channel: { $ref: '#/visitors/document/objects/Reference' },
            messages: OperationReplyMessagesVisitor
          },
        },
        OperationReplyAddress: {
          $visitor: OperationReplyAddressVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            location: {$ref: '#/visitors/value' }
          }
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
            payload: { $ref: '#/visitors/document/objects/Schema' },
            correlationId: MessageCorrelationIdVisitor,
            contetType: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            tags: {
              $ref: '#/visitors/document/objects/Tags',
            },
            externalDocs: ExternalDocumentationVisitor,
            bindings: MessageBindingsVisitor,
            examples: MessageExamplesVisitor,
            traits: MessageTraitsVisitor
          },
        },
        MessageTrait: {
          $visitor: MessageTraitVisitor,
          fixedFields: {
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
            externalDocs: ExternalDocsVisitor,
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
            externalDocs: ExternalDocsVisitor,
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
          fixedFields: {
            description: AsyncApi2_0Specification.visitors.document.objects.ExternalDocumentation.fixedFields.description,
            url:  AsyncApi2_0Specification.visitors.document.objects.ExternalDocumentation.fixedFields.url
          },
        },
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: AsyncApi2_0Specification.visitors.document.objects.Reference.fixedFields.$ref
          },
        },
        Components: {
          $visitor: ComponentsVisitor,
          fixedFields: {
            schemas: ComponentsSchemasVisitor,
            servers: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.servers,
            channels: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.channels,
            serverVariables:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.serverVariables,
            operations: ComponentsOperationsVisitor,
            messages: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.messages,
            securitySchemes: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.securitySchemes,
            parameters: AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.parameters,
            correlationIds:  AsyncApi2_0Specification.visitors.document.objects.Components.fixedFields.correlationIds,
            replies: { $ref: '#/visitors/value' },
            replyAddresses: { $ref: '#/visitors/value' },
            tags: { $ref: '#/visitors/document/objects/Tags' },
            externalDocs: ExternalDocumentationVisitor,
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
            $shemaFormat: { $ref: '#/visitors/document/objects/SchemaFormat' },
            $schema: { $ref: '#/visitors/document/objects/Schema' },
            properties: { $ref: '#/visitors/document/objects/MultiFormatSchema' },
          },
        },
        Schema: SchemaSpecification,
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
        SecuritySchemes: {
          $visitor: SecuritySchemesVisitor,
        },
        OperationMessage: {
          $visitor: MessageVisitor,
        },
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
            scopes: { $ref: '#/visitors/value' },
          },
        },
      },
    },
  },
};

export default specification;
