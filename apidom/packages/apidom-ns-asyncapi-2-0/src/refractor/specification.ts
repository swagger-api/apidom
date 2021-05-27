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
/**
 * Binding elements.
 */
// HTTP
import HttpMessageBindingVisitor from './visitors/async-api-2-0/bindings/http/message-binding';
import HttpMessageBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/http/message-binding/BindingVersionVisitor';
import HttpOperationBindingVisitor from './visitors/async-api-2-0/bindings/http/operation-binding';
import HttpOperationBindingTypeVisitor from './visitors/async-api-2-0/bindings/http/operation-binding/TypeVisitor';
import HttpOperationBindingMethodVisitor from './visitors/async-api-2-0/bindings/http/operation-binding/MethodVisitor';
import HttpOperationBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/http/operation-binding/BindingVersionVisitor';
// Kafka
import KafkaMessageBindingVisitor from './visitors/async-api-2-0/bindings/kafka/message-binding';
import KafkaMessageBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/kafka/message-binding/BindingVersionVisitor';
import KafkaOperationBindingVisitor from './visitors/async-api-2-0/bindings/kafka/operation-binding';
import KafkaOperationBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/kafka/operation-binding/BindingVersionVisitor';
// WebSocket
import WebSocketChannelBindingVisitor from './visitors/async-api-2-0/bindings/web-socket/channel-binding';
import WebSocketChannelBindingMethodVisitor from './visitors/async-api-2-0/bindings/web-socket/channel-binding/MethodVisitor';
import WebSocketChannelBindingBindingVersionVisitor from './visitors/async-api-2-0/bindings/web-socket/channel-binding/BindingVersionVisitor';

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
          fixedFields: {},
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
          fixedFields: {},
        },
        CorrelationID: {
          $visitor: CorrelationIDVisitor,
          fixedFields: {
            description: CorrelationIDDescriptionVisitor,
            location: CorrelationIDLocationVisitor,
          },
        },
        /**
         * Binding elements.
         */
        // HTTP
        HttpOperationBinding: {
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
        HttpMessageBinding: {
          $visitor: HttpMessageBindingVisitor,
          fixedFields: {
            headers: {
              $ref: '#/visitors/document/objects/Schema',
            },
            bindingVersion: HttpMessageBindingBindingVersionVisitor,
          },
        },
        // Kafka
        KafkaMessageBinding: {
          $visitor: KafkaMessageBindingVisitor,
          fixedFields: {
            key: {
              $ref: '#/visitors/document/objects/Schema',
            },
            bindingVersion: KafkaMessageBindingBindingVersionVisitor,
          },
        },
        KafkaOperationBinding: {
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
        // WebSocket
        WebSocketChannelBinding: {
          $visitor: WebSocketChannelBindingVisitor,
          fixedFields: {
            method: WebSocketChannelBindingMethodVisitor,
          },
          query: {
            $ref: '#/visitors/document/objects/Schema',
          },
          headers: {
            $ref: '#/visitors/document/objects/Schema',
          },
          bindingVersion: WebSocketChannelBindingBindingVersionVisitor,
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

export default specification;
