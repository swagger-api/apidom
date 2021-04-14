import FallbackVisitor from './visitors/FallbackVisitor';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
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
import LicenseVisitor from './visitors/async-api-2-0/license';
import LicenseNameVisitor from './visitors/async-api-2-0/license/NameVisitor';
import LicenseUrlVisitor from './visitors/async-api-2-0/license/UrlVisitor';
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
import ComponentsVisitor from './visitors/async-api-2-0/components';
import ComponentsSchemasVisitor from './visitors/async-api-2-0/components/SchemasVisitor';
import ComponentParametersVisitor from './visitors/async-api-2-0/components/ParametersVisitor';
import OperationVisitor from './visitors/async-api-2-0/operation';
import ChannelsVisitor from './visitors/async-api-2-0/channels';
import ChannelBindingsVisitor from './visitors/async-api-2-0/channel-bindings';
import ChannelItemVisitor from './visitors/async-api-2-0/channel-item';
import ChannelItem$RefVisitor from './visitors/async-api-2-0/channel-item/$RefVisitor';
import ChannelItemDescriptionVisitor from './visitors/async-api-2-0/channel-item/DescriptionVisitor';

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
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

export default specification;
