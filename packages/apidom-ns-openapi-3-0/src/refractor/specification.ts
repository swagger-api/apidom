import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import OpenApi3_0Visitor from './visitors/open-api-3-0';
import OpenapiVisitor from './visitors/open-api-3-0/OpenapiVisitor';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import InfoVisitor from './visitors/open-api-3-0/info';
import InfoTitleVisitor from './visitors/open-api-3-0/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/open-api-3-0/info/DescriptionVisitor';
import InfoTermsOfServiceVisitor from './visitors/open-api-3-0/info/TermsOfServiceVisitor';
import InfoVersionVisitor from './visitors/open-api-3-0/info/VersionVisitor';
import ContactVisitor from './visitors/open-api-3-0/contact';
import ContactNameVisitor from './visitors/open-api-3-0/contact/NameVisitor';
import ContactUrlVisitor from './visitors/open-api-3-0/contact/UrlVisitor';
import ContactEmailVisitor from './visitors/open-api-3-0/contact/EmailVisitor';
import LicenseVisitor from './visitors/open-api-3-0/license';
import LicenseNameVisitor from './visitors/open-api-3-0/license/NameVisitor';
import LicenseUrlVisitor from './visitors/open-api-3-0/license/UrlVisitor';
import LinkVisitor from './visitors/open-api-3-0/link';
import LinkOperationRefVisitor from './visitors/open-api-3-0/link/OperationRefVisitor';
import LinkOperationIdVisitor from './visitors/open-api-3-0/link/OperationIdVisitor';
import LinkParametersVisitor from './visitors/open-api-3-0/link/ParametersVisitor';
import LinkRequestBodyVisitor from './visitors/open-api-3-0/link/RequestBodyVisitor';
import LinkDescriptionVisitor from './visitors/open-api-3-0/link/DescriptionVisitor';
import ServerVisitor from './visitors/open-api-3-0/server';
import ServerUrlVisitor from './visitors/open-api-3-0/server/UrlVisitor';
import ServerDescriptionVisitor from './visitors/open-api-3-0/server/DescriptionVisitor';
import ServersVisitor from './visitors/open-api-3-0/ServersVisitor';
import ServerVariableVisitor from './visitors/open-api-3-0/server-variable';
import ServerVariableEnumVisitor from './visitors/open-api-3-0/server-variable/EnumVisitor';
import ServerVariableDefaultVisitor from './visitors/open-api-3-0/server-variable/DefaultVisitor';
import ServerVariableDescriptionVisitor from './visitors/open-api-3-0/server-variable/DescriptionVisitor';
import ServerVariablesVisitor from './visitors/open-api-3-0/server/VariablesVisitor';
import FallbackVisitor from './visitors/FallbackVisitor';
import MediaTypeVisitor from './visitors/open-api-3-0/media-type';
import MediaTypeSchemaVisitor from './visitors/open-api-3-0/media-type/SchemaVisitor';
import MediaTypeExampleVisitor from './visitors/open-api-3-0/media-type/ExampleVisitor';
import MediaTypeExamplesVisitor from './visitors/open-api-3-0/media-type/ExamplesVisitor';
import MediaTypeEncodingVisitor from './visitors/open-api-3-0/media-type/EncodingVisitor';
import SecurityRequirementVisitor from './visitors/open-api-3-0/security-requirement';
import SecurityVisitor from './visitors/open-api-3-0/SecurityVisitor';
import ComponentsVisitor from './visitors/open-api-3-0/components';
import TagVisitor from './visitors/open-api-3-0/tag';
import TagNameVisitor from './visitors/open-api-3-0/tag/NameVisitor';
import TagDescriptionVisitor from './visitors/open-api-3-0/tag/DescriptionVisitor';
import ReferenceVisitor from './visitors/open-api-3-0/reference';
import Reference$RefVisitor from './visitors/open-api-3-0/reference/$RefVisitor';
import ParameterVisitor from './visitors/open-api-3-0/parameter';
import ParameterNameVisitor from './visitors/open-api-3-0/parameter/NameVisitor';
import ParameterInVisitor from './visitors/open-api-3-0/parameter/InVisitor';
import ParameterDescriptionVisitor from './visitors/open-api-3-0/parameter/DescriptionVisitor';
import ParameterRequiredVisitor from './visitors/open-api-3-0/parameter/RequiredVisitor';
import ParameterDeprecatedVisitor from './visitors/open-api-3-0/parameter/DeprecatedVisitor';
import ParameterAllowEmptyValueVisitor from './visitors/open-api-3-0/parameter/AllowEmptyValueVisitor';
import ParameterStyleVisitor from './visitors/open-api-3-0/parameter/StyleVisitor';
import ParameterExplodeVisitor from './visitors/open-api-3-0/parameter/ExplodeVisitor';
import ParameterAllowReservedVisitor from './visitors/open-api-3-0/parameter/AllowReservedVisitor';
import ParameterSchemaVisitor from './visitors/open-api-3-0/parameter/SchemaVisitor';
import HeaderVisitor from './visitors/open-api-3-0/header';
import HeaderDescriptionVisitor from './visitors/open-api-3-0/header/DescriptionVisitor';
import HeaderRequiredVisitor from './visitors/open-api-3-0/header/RequiredVisitor';
import HeaderDeprecatedVisitor from './visitors/open-api-3-0/header/DeprecatedVisitor';
import HeaderAllowEmptyValueVisitor from './visitors/open-api-3-0/header/AllowEmptyValueVisitor';
import HeaderStyleVisitor from './visitors/open-api-3-0/header/StyleVisitor';
import HeaderExplodeVisitor from './visitors/open-api-3-0/header/ExplodeVisitor';
import HeaderAllowReservedVisitor from './visitors/open-api-3-0/header/AllowReservedVisitor';
import HeaderSchemaVisitor from './visitors/open-api-3-0/header/SchemaVisitor';
import HeaderExampleVisitor from './visitors/open-api-3-0/header/ExampleVisitor';
import HeaderExamplesVisitor from './visitors/open-api-3-0/header/ExamplesVisitor';
import HeaderContentVisitor from './visitors/open-api-3-0/header/ContentVisitor';
import SchemaVisitor from './visitors/open-api-3-0/schema';
import SchemaAllOfVisitor from './visitors/open-api-3-0/schema/AllOfVisitor';
import SchemaAnyOfVisitor from './visitors/open-api-3-0/schema/AnyOfVisitor';
import SchemaOneOfVisitor from './visitors/open-api-3-0/schema/OneOfVisitor';
import SchemaDefinitionsVisitor from './visitors/open-api-3-0/schema/DefinitionsVisitor';
import SchemaDependenciesVisitor from './visitors/open-api-3-0/schema/DependenciesVisitor';
import SchemaItemsVisitor from './visitors/open-api-3-0/schema/ItemsVisitor';
import SchemaPropertiesVisitor from './visitors/open-api-3-0/schema/PropertiesVisitor';
import SchemaPatternPropertiesVisitor from './visitors/open-api-3-0/schema/PatternPropertiesVisitor';
import SchemaTypeVisitor from './visitors/open-api-3-0/schema/TypeVisitor';
import SchemaNullableVisitor from './visitors/open-api-3-0/schema/NullableVisitor';
import SchemaWriteOnlyVisitor from './visitors/open-api-3-0/schema/WriteOnlyVisitor';
import SchemaExampleVisitor from './visitors/open-api-3-0/schema/ExampleVisitor';
import SchemaDeprecatedVisitor from './visitors/open-api-3-0/schema/DeprecatedVisitor';
import schemaInheritedFixedFields from './visitors/open-api-3-0/schema/inherited-fixed-fields';
import DiscriminatorVisitor from './visitors/open-api-3-0/distriminator';
import DiscriminatorPropertyNameVisitor from './visitors/open-api-3-0/distriminator/PropertyNameVisitor';
import DiscriminatorMappingVisitor from './visitors/open-api-3-0/distriminator/MappingVisitor';
import XmlVisitor from './visitors/open-api-3-0/xml';
import XmlNameVisitor from './visitors/open-api-3-0/xml/NameVisitor';
import XmlNamespaceVisitor from './visitors/open-api-3-0/xml/NamespaceVisitor';
import XmlPrefixVisitor from './visitors/open-api-3-0/xml/PrefixVisitor';
import XmlAttributeVisitor from './visitors/open-api-3-0/xml/AttributeVisitor';
import XmlWrappedVisitor from './visitors/open-api-3-0/xml/WrappedVisitor';
import ParameterExampleVisitor from './visitors/open-api-3-0/parameter/ExampleVisitor';
import ParameterExamplesVisitor from './visitors/open-api-3-0/parameter/ExamplesVisitor';
import ParameterContentVisitor from './visitors/open-api-3-0/parameter/ContentVisitor';
import ComponentsSchemasVisitor from './visitors/open-api-3-0/components/SchemasVisitor';
import ComponentsResponsesVisitor from './visitors/open-api-3-0/components/ResponsesVisitor';
import ComponentsParametersVisitor from './visitors/open-api-3-0/components/ParametersVisitor';
import ComponentsExamplesVisitor from './visitors/open-api-3-0/components/ExamplesVisitor';
import ComponentsRequestBodiesVisitor from './visitors/open-api-3-0/components/RequestBodiesVisitor';
import ComponentsHeadersVisitor from './visitors/open-api-3-0/components/HeadersVisitor';
import ComponentsSecuritySchemesVisitor from './visitors/open-api-3-0/components/SecuritySchemesVisitor';
import ComponentsLinksVisitor from './visitors/open-api-3-0/components/LinksVisitor';
import ComponentsCallbacksVisitor from './visitors/open-api-3-0/components/CallbacksVisitor';
import ExampleVisitor from './visitors/open-api-3-0/example';
import ExampleSummaryVisitor from './visitors/open-api-3-0/example/SummaryVisitor';
import ExampleDescriptionVisitor from './visitors/open-api-3-0/example/DescriptionVisitor';
import ExampleValueVisitor from './visitors/open-api-3-0/example/ValueVisitor';
import ExampleExternalValueVisitor from './visitors/open-api-3-0/example/ExternalValueVisitor';
import ExternalDocumentationVisitor from './visitors/open-api-3-0/external-documentation';
import ExternalDocumentationDescriptionVisitor from './visitors/open-api-3-0/external-documentation/DescriptionVisitor';
import ExternalDocumentationUrlVisitor from './visitors/open-api-3-0/external-documentation/UrlVisitor';
import EncodingVisitor from './visitors/open-api-3-0/encoding';
import EncodingContentTypeVisitor from './visitors/open-api-3-0/encoding/ContentTypeVisitor';
import EncodingHeadersVisitor from './visitors/open-api-3-0/encoding/HeadersVisitor';
import EncodingStyleVisitor from './visitors/open-api-3-0/encoding/StyleVisitor';
import EncodingExplodeVisitor from './visitors/open-api-3-0/encoding/ExplodeVisitor';
import EncodingAllowReserved from './visitors/open-api-3-0/encoding/AllowReservedVisitor';
import PathsVisitor from './visitors/open-api-3-0/paths';
import RequestBodyVisitor from './visitors/open-api-3-0/request-body';
import RequestBodyDescriptionVisitor from './visitors/open-api-3-0/request-body/DescriptionVisitor';
import RequestBodyContentVisitor from './visitors/open-api-3-0/request-body/ContentVisitor';
import RequestBodyRequiredVisitor from './visitors/open-api-3-0/request-body/RequiredVisitor';
import CallbackVisitor from './visitors/open-api-3-0/callback';
import ResponseVisitor from './visitors/open-api-3-0/response';
import ResponseDescriptionVisitor from './visitors/open-api-3-0/response/DescriptionVisitor';
import ResponseHeadersVisitor from './visitors/open-api-3-0/response/HeadersVisitor';
import ResponseContentVisitor from './visitors/open-api-3-0/response/ContentVisitor';
import ResponseLinksVisitor from './visitors/open-api-3-0/response/LinksVisitor';
import ResponsesVisitor from './visitors/open-api-3-0/responses';
import ResponsesDefaultVisitor from './visitors/open-api-3-0/responses/DefaultVisitor';
import OperationVisitor from './visitors/open-api-3-0/operation';
import OperationTagsVisitor from './visitors/open-api-3-0/operation/TagsVisitor';
import OperationSummaryVisitor from './visitors/open-api-3-0/operation/SummaryVisitor';
import OperationDescriptionVisitor from './visitors/open-api-3-0/operation/DescriptionVisitor';
import OperationOperationIdVisitor from './visitors/open-api-3-0/operation/OperationIdVisitor';
import OperationParametersVisitor from './visitors/open-api-3-0/operation/ParametersVisitor';
import OperationRequestBodyVisitor from './visitors/open-api-3-0/operation/RequestBodyVisitor';
import OperationCallbacksVisitor from './visitors/open-api-3-0/operation/CallbacksVisitor';
import OperationDeprecatedVisitor from './visitors/open-api-3-0/operation/DeprecatedVisitor';
import OperationSecurityVisitor from './visitors/open-api-3-0/operation/SecurityVisitor';
import OperationServersVisitor from './visitors/open-api-3-0/operation/ServersVisitor';
import PathItemVisitor from './visitors/open-api-3-0/path-item';
import PathItem$RefVisitor from './visitors/open-api-3-0/path-item/$RefVisitor';
import PathItemSummaryVisitor from './visitors/open-api-3-0/path-item/SummaryVisitor';
import PathItemDescriptionVisitor from './visitors/open-api-3-0/path-item/DescriptionVisitor';
import PathItemServersVisitor from './visitors/open-api-3-0/path-item/ServersVisitor';
import PathItemParametersVisitor from './visitors/open-api-3-0/path-item/ParametersVisitor';
import SecuritySchemeVisitor from './visitors/open-api-3-0/security-scheme';
import SecuritySchemeTypeVisitor from './visitors/open-api-3-0/security-scheme/TypeVisitor';
import SecuritySchemeDescriptionVisitor from './visitors/open-api-3-0/security-scheme/DescriptionVisitor';
import SecuritySchemeNameVisitor from './visitors/open-api-3-0/security-scheme/NameVisitor';
import SecuritySchemeInVisitor from './visitors/open-api-3-0/security-scheme/InVisitor';
import SecuritySchemeSchemeVisitor from './visitors/open-api-3-0/security-scheme/SchemeVisitor';
import SecuritySchemeBearerFormatVisitor from './visitors/open-api-3-0/security-scheme/BearerFormatVisitor';
import SecuritySchemeOpenIdConnectUrlVisitor from './visitors/open-api-3-0/security-scheme/OpenIdConnectUrlVisitor';
import OAuthFlowsVisitor from './visitors/open-api-3-0/oauth-flows';
import OAuthFlowVisitor from './visitors/open-api-3-0/oauth-flow';
import OAuthFlowAuthorizationUrlVisitor from './visitors/open-api-3-0/oauth-flow/AuthorizationUrlVisitor';
import OAuthFlowTokenUrlVisitor from './visitors/open-api-3-0/oauth-flow/TokenUrlVisitor';
import OAuthFlowRefreshUrlVisitor from './visitors/open-api-3-0/oauth-flow/RefreshUrlVisitor';
import OAuthFlowScopesVisitor from './visitors/open-api-3-0/oauth-flow/ScopesVisitor';
import TagsVisitor from './visitors/open-api-3-0/TagsVisitor';

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
    // validation keywords for any instance type
    allOf: SchemaAllOfVisitor,
    anyOf: SchemaAnyOfVisitor,
    oneOf: SchemaOneOfVisitor,
    definitions: SchemaDefinitionsVisitor,
    // validation keywords for arrays
    items: SchemaItemsVisitor,
    // Validation keywords for objects
    dependencies: SchemaDependenciesVisitor,
    properties: SchemaPropertiesVisitor,
    patternProperties: SchemaPatternPropertiesVisitor,
    // validation keywords for any instance type
    type: SchemaTypeVisitor,
    // OpenAPI vocabulary
    nullable: SchemaNullableVisitor,
    discriminator: {
      $ref: '#/visitors/document/objects/Discriminator',
    },
    writeOnly: SchemaWriteOnlyVisitor,
    xml: {
      $ref: '#/visitors/document/objects/XML',
    },
    externalDocs: {
      $ref: '#/visitors/document/objects/ExternalDocumentation',
    },
    example: SchemaExampleVisitor,
    deprecated: SchemaDeprecatedVisitor,
  },
};

const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        OpenApi: {
          $visitor: OpenApi3_0Visitor,
          fixedFields: {
            openapi: OpenapiVisitor,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            servers: ServersVisitor,
            paths: {
              $ref: '#/visitors/document/objects/Paths',
            },
            components: {
              $ref: '#/visitors/document/objects/Components',
            },
            security: SecurityVisitor,
            tags: TagsVisitor,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
          },
        },
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: InfoTitleVisitor,
            description: InfoDescriptionVisitor,
            termsOfService: InfoTermsOfServiceVisitor,
            contact: {
              $ref: '#/visitors/document/objects/Contact',
            },
            license: {
              $ref: '#/visitors/document/objects/License',
            },
            version: InfoVersionVisitor,
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
        Server: {
          $visitor: ServerVisitor,
          fixedFields: {
            url: ServerUrlVisitor,
            description: ServerDescriptionVisitor,
            variables: ServerVariablesVisitor,
          },
        },
        ServerVariable: {
          $visitor: ServerVariableVisitor,
          fixedFields: {
            enum: ServerVariableEnumVisitor,
            default: ServerVariableDefaultVisitor,
            description: ServerVariableDescriptionVisitor,
          },
        },
        Components: {
          $visitor: ComponentsVisitor,
          fixedFields: {
            schemas: ComponentsSchemasVisitor,
            responses: ComponentsResponsesVisitor,
            parameters: ComponentsParametersVisitor,
            examples: ComponentsExamplesVisitor,
            requestBodies: ComponentsRequestBodiesVisitor,
            headers: ComponentsHeadersVisitor,
            securitySchemes: ComponentsSecuritySchemesVisitor,
            links: ComponentsLinksVisitor,
            callbacks: ComponentsCallbacksVisitor,
          },
        },
        Paths: {
          $visitor: PathsVisitor,
        },
        PathItem: {
          $visitor: PathItemVisitor,
          fixedFields: {
            $ref: PathItem$RefVisitor,
            summary: PathItemSummaryVisitor,
            description: PathItemDescriptionVisitor,
            get: {
              $ref: '#/visitors/document/objects/Operation',
            },
            put: {
              $ref: '#/visitors/document/objects/Operation',
            },
            post: {
              $ref: '#/visitors/document/objects/Operation',
            },
            delete: {
              $ref: '#/visitors/document/objects/Operation',
            },
            options: {
              $ref: '#/visitors/document/objects/Operation',
            },
            head: {
              $ref: '#/visitors/document/objects/Operation',
            },
            patch: {
              $ref: '#/visitors/document/objects/Operation',
            },
            trace: {
              $ref: '#/visitors/document/objects/Operation',
            },
            servers: PathItemServersVisitor,
            parameters: PathItemParametersVisitor,
          },
        },
        Operation: {
          $visitor: OperationVisitor,
          fixedFields: {
            tags: OperationTagsVisitor,
            summary: OperationSummaryVisitor,
            description: OperationDescriptionVisitor,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            operationId: OperationOperationIdVisitor,
            parameters: OperationParametersVisitor,
            requestBody: OperationRequestBodyVisitor,
            responses: {
              $ref: '#/visitors/document/objects/Responses',
            },
            callbacks: OperationCallbacksVisitor,
            deprecated: OperationDeprecatedVisitor,
            security: OperationSecurityVisitor,
            servers: OperationServersVisitor,
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
          fixedFields: {
            description: ExternalDocumentationDescriptionVisitor,
            url: ExternalDocumentationUrlVisitor,
          },
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            name: ParameterNameVisitor,
            in: ParameterInVisitor,
            description: ParameterDescriptionVisitor,
            required: ParameterRequiredVisitor,
            deprecated: ParameterDeprecatedVisitor,
            allowEmptyValue: ParameterAllowEmptyValueVisitor,
            style: ParameterStyleVisitor,
            explode: ParameterExplodeVisitor,
            allowReserved: ParameterAllowReservedVisitor,
            schema: ParameterSchemaVisitor,
            example: ParameterExampleVisitor,
            examples: ParameterExamplesVisitor,
            content: ParameterContentVisitor,
          },
        },
        RequestBody: {
          $visitor: RequestBodyVisitor,
          fixedFields: {
            description: RequestBodyDescriptionVisitor,
            content: RequestBodyContentVisitor,
            required: RequestBodyRequiredVisitor,
          },
        },
        MediaType: {
          $visitor: MediaTypeVisitor,
          fixedFields: {
            schema: MediaTypeSchemaVisitor,
            example: MediaTypeExampleVisitor,
            examples: MediaTypeExamplesVisitor,
            encoding: MediaTypeEncodingVisitor,
          },
        },
        Encoding: {
          $visitor: EncodingVisitor,
          fixedFields: {
            contentType: EncodingContentTypeVisitor,
            headers: EncodingHeadersVisitor,
            style: EncodingStyleVisitor,
            explode: EncodingExplodeVisitor,
            allowReserved: EncodingAllowReserved,
          },
        },
        Responses: {
          $visitor: ResponsesVisitor,
          fixedFields: {
            default: ResponsesDefaultVisitor,
          },
        },
        Response: {
          $visitor: ResponseVisitor,
          fixedFields: {
            description: ResponseDescriptionVisitor,
            headers: ResponseHeadersVisitor,
            content: ResponseContentVisitor,
            links: ResponseLinksVisitor,
          },
        },
        Callback: {
          $visitor: CallbackVisitor,
        },
        Example: {
          $visitor: ExampleVisitor,
          fixedFields: {
            summary: ExampleSummaryVisitor,
            description: ExampleDescriptionVisitor,
            value: ExampleValueVisitor,
            externalValue: ExampleExternalValueVisitor,
          },
        },
        Link: {
          $visitor: LinkVisitor,
          fixedFields: {
            operationRef: LinkOperationRefVisitor,
            operationId: LinkOperationIdVisitor,
            parameters: LinkParametersVisitor,
            requestBody: LinkRequestBodyVisitor,
            description: LinkDescriptionVisitor,
            server: {
              $ref: '#/visitors/document/objects/Server',
            },
          },
        },
        Header: {
          $visitor: HeaderVisitor,
          fixedFields: {
            description: HeaderDescriptionVisitor,
            required: HeaderRequiredVisitor,
            deprecated: HeaderDeprecatedVisitor,
            allowEmptyValue: HeaderAllowEmptyValueVisitor,
            style: HeaderStyleVisitor,
            explode: HeaderExplodeVisitor,
            allowReserved: HeaderAllowReservedVisitor,
            schema: HeaderSchemaVisitor,
            example: HeaderExampleVisitor,
            examples: HeaderExamplesVisitor,
            content: HeaderContentVisitor,
          },
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
        JSONReference: ReferenceSpecification,
        Reference: ReferenceSpecification,
        JSONSchema: SchemaSpecification,
        Schema: SchemaSpecification,
        LinkDescription: JSONSchemaDraft4Specification.visitors.document.objects.LinkDescription,
        Media: JSONSchemaDraft4Specification.visitors.document.objects.Media,
        Discriminator: {
          $visitor: DiscriminatorVisitor,
          fixedFields: {
            propertyName: DiscriminatorPropertyNameVisitor,
            mapping: DiscriminatorMappingVisitor,
          },
        },
        XML: {
          $visitor: XmlVisitor,
          fixedFields: {
            name: XmlNameVisitor,
            namespace: XmlNamespaceVisitor,
            prefix: XmlPrefixVisitor,
            attribute: XmlAttributeVisitor,
            wrapped: XmlWrappedVisitor,
          },
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
        SecurityRequirement: {
          $visitor: SecurityRequirementVisitor,
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

export default specification;
