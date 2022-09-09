import OpenApi3_1Visitor from './visitors/open-api-3-1';
import OpenapiVisitor from './visitors/open-api-3-1/OpenapiVisitor';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import InfoVisitor from './visitors/open-api-3-1/info';
import InfoTitleVisitor from './visitors/open-api-3-1/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/open-api-3-1/info/DescriptionVisitor';
import InfoSummaryVisitor from './visitors/open-api-3-1/info/SummaryVisitor';
import InfoTermsOfServiceVisitor from './visitors/open-api-3-1/info/TermsOfServiceVisitor';
import InfoVersionVisitor from './visitors/open-api-3-1/info/VersionVisitor';
import ContactVisitor from './visitors/open-api-3-1/contact';
import ContactNameVisitor from './visitors/open-api-3-1/contact/NameVisitor';
import ContactUrlVisitor from './visitors/open-api-3-1/contact/UrlVisitor';
import ContactEmailVisitor from './visitors/open-api-3-1/contact/EmailVisitor';
import LicenseVisitor from './visitors/open-api-3-1/license';
import LicenseNameVisitor from './visitors/open-api-3-1/license/NameVisitor';
import LicenseIdentifierVisitor from './visitors/open-api-3-1/license/IdentifierVisitor';
import LicenseUrlVisitor from './visitors/open-api-3-1/license/UrlVisitor';
import LinkVisitor from './visitors/open-api-3-1/link';
import LinkOperationRefVisitor from './visitors/open-api-3-1/link/OperationRefVisitor';
import LinkOperationIdVisitor from './visitors/open-api-3-1/link/OperationIdVisitor';
import LinkParametersVisitor from './visitors/open-api-3-1/link/ParametersVisitor';
import LinkRequestBodyVisitor from './visitors/open-api-3-1/link/RequestBodyVisitor';
import LinkDescriptionVisitor from './visitors/open-api-3-1/link/DescriptionVisitor';
import JsonSchemaDialectVisitor from './visitors/open-api-3-1/JsonSchemaDialectVisitor';
import ServerVisitor from './visitors/open-api-3-1/server';
import ServerUrlVisitor from './visitors/open-api-3-1/server/UrlVisitor';
import ServerDescriptionVisitor from './visitors/open-api-3-1/server/DescriptionVisitor';
import ServersVisitor from './visitors/open-api-3-1/ServersVisitor';
import ServerVariableVisitor from './visitors/open-api-3-1/server-variable';
import ServerVariableEnumVisitor from './visitors/open-api-3-1/server-variable/EnumVisitor';
import ServerVariableDefaultVisitor from './visitors/open-api-3-1/server-variable/DefaultVisitor';
import ServerVariableDescriptionVisitor from './visitors/open-api-3-1/server-variable/DescriptionVisitor';
import ServerVariablesVisitor from './visitors/open-api-3-1/server/VariablesVisitor';
import FallbackVisitor from './visitors/FallbackVisitor';
import MediaTypeVisitor from './visitors/open-api-3-1/media-type';
import MediaTypeExampleVisitor from './visitors/open-api-3-1/media-type/ExampleVisitor';
import MediaTypeExamplesVisitor from './visitors/open-api-3-1/media-type/ExamplesVisitor';
import MediaTypeEncodingVisitor from './visitors/open-api-3-1/media-type/EncodingVisitor';
import SecurityRequirementVisitor from './visitors/open-api-3-1/security-requirement';
import SecurityVisitor from './visitors/open-api-3-1/SecurityVisitor';
import ComponentsVisitor from './visitors/open-api-3-1/components';
import TagVisitor from './visitors/open-api-3-1/tag';
import TagNameVisitor from './visitors/open-api-3-1/tag/NameVisitor';
import TagDescriptionVisitor from './visitors/open-api-3-1/tag/DescriptionVisitor';
import ReferenceVisitor from './visitors/open-api-3-1/reference';
import Reference$RefVisitor from './visitors/open-api-3-1/reference/$RefVisitor';
import ReferenceSummaryVisitor from './visitors/open-api-3-1/reference/SummaryVisitor';
import ReferenceDescriptionVisitor from './visitors/open-api-3-1/reference/DescriptionVisitor';
import ParameterVisitor from './visitors/open-api-3-1/parameter';
import ParameterNameVisitor from './visitors/open-api-3-1/parameter/NameVisitor';
import ParameterInVisitor from './visitors/open-api-3-1/parameter/InVisitor';
import ParameterDescriptionVisitor from './visitors/open-api-3-1/parameter/DescriptionVisitor';
import ParameterRequiredVisitor from './visitors/open-api-3-1/parameter/RequiredVisitor';
import ParameterDeprecatedVisitor from './visitors/open-api-3-1/parameter/DeprecatedVisitor';
import ParameterAllowEmptyValueVisitor from './visitors/open-api-3-1/parameter/AllowEmptyValueVisitor';
import ParameterStyleVisitor from './visitors/open-api-3-1/parameter/StyleVisitor';
import ParameterExplodeVisitor from './visitors/open-api-3-1/parameter/ExplodeVisitor';
import ParameterAllowReservedVisitor from './visitors/open-api-3-1/parameter/AllowReservedVisitor';
import HeaderVisitor from './visitors/open-api-3-1/header';
import HeaderDescriptionVisitor from './visitors/open-api-3-1/header/DescriptionVisitor';
import HeaderRequiredVisitor from './visitors/open-api-3-1/header/RequiredVisitor';
import HeaderDeprecatedVisitor from './visitors/open-api-3-1/header/DeprecatedVisitor';
import HeaderAllowEmptyValueVisitor from './visitors/open-api-3-1/header/AllowEmptyValueVisitor';
import HeaderStyleVisitor from './visitors/open-api-3-1/header/StyleVisitor';
import HeaderExplodeVisitor from './visitors/open-api-3-1/header/ExplodeVisitor';
import HeaderAllowReservedVisitor from './visitors/open-api-3-1/header/AllowReservedVisitor';
import HeaderContentVisitor from './visitors/open-api-3-1/header/ContentVisitor';
import HeaderExampleVisitor from './visitors/open-api-3-1/header/ExampleVisitor';
import HeaderExamplesVisitor from './visitors/open-api-3-1/header/ExamplesVisitor';
import SchemaVisitor from './visitors/open-api-3-1/schema';
import Schema$schemaVisitor from './visitors/open-api-3-1/schema/$schemaVisitor';
import Schema$vocabularyVisitor from './visitors/open-api-3-1/schema/$vocabularyVisitor';
import Schema$idVisitor from './visitors/open-api-3-1/schema/$idVisitor';
import Schema$anchorVisitor from './visitors/open-api-3-1/schema/$anchorVisitor';
import Schema$dynamicAnchorVisitor from './visitors/open-api-3-1/schema/$dynamicAnchorVisitor';
import Schema$dynamicRefVisitor from './visitors/open-api-3-1/schema/$dynamicRefVisitor';
import Schema$refVisitor from './visitors/open-api-3-1/schema/$refVisitor';
import Schema$defsVisitor from './visitors/open-api-3-1/schema/$defsVisitor';
import Schema$commentVisitor from './visitors/open-api-3-1/schema/$commentVisitor';
import SchemaAllOfVisitor from './visitors/open-api-3-1/schema/AllOfVisitor';
import SchemaAnyOfVisitor from './visitors/open-api-3-1/schema/AnyOfVisitor';
import SchemaOneOfVisitor from './visitors/open-api-3-1/schema/OneOfVisitor';
import SchemaDependantSchemasVisitor from './visitors/open-api-3-1/schema/DependentSchemasVisitor';
import SchemaPrefixItemsVisitor from './visitors/open-api-3-1/schema/PrefixItemsVisitor';
import SchemaPropertiesVisitor from './visitors/open-api-3-1/schema/PropertiesVisitor';
import SchemaPatternPropertiesVisitor from './visitors/open-api-3-1/schema/PatternProperties';
import SchemaTypeVisitor from './visitors/open-api-3-1/schema/TypeVisitor';
import SchemaEnumVisitor from './visitors/open-api-3-1/schema/EnumVisitor';
import SchemaConstVisitor from './visitors/open-api-3-1/schema/ConstVisitor';
import SchemaMultipleOfVisitor from './visitors/open-api-3-1/schema/MultipleOfVisitor';
import SchemaMaximumVisitor from './visitors/open-api-3-1/schema/MaximumVisitor';
import SchemaExclusiveMaximumVisitor from './visitors/open-api-3-1/schema/ExclusiveMaximumVisitor';
import SchemaMinimumVisitor from './visitors/open-api-3-1/schema/MinimumVisitor';
import SchemaExclusiveMinimumVisitor from './visitors/open-api-3-1/schema/ExclusiveMinimumVisitor';
import SchemaMaxLengthVisitor from './visitors/open-api-3-1/schema/MaxLengthVisitor';
import SchemaMinLengthVisitor from './visitors/open-api-3-1/schema/MinLengthVisitor';
import SchemaPatternVisitor from './visitors/open-api-3-1/schema/PatternVisitor';
import SchemaMaxItemsVisitor from './visitors/open-api-3-1/schema/MaxItemsVisitor';
import SchemaMinItemsVisitor from './visitors/open-api-3-1/schema/MinItemsVisitor';
import SchemaUniqueItemsVisitor from './visitors/open-api-3-1/schema/UniqueItemsVisitor';
import SchemaMaxContainsVisitor from './visitors/open-api-3-1/schema/MaxContainsVisitor';
import SchemaMinContainsVisitor from './visitors/open-api-3-1/schema/MinContainsVisitor';
import SchemaMaxPropertiesVisitor from './visitors/open-api-3-1/schema/MaxPropertiesVisitor';
import SchemaMinPropertiesVisitor from './visitors/open-api-3-1/schema/MinPropertiesVisitor';
import SchemaRequiredVisitor from './visitors/open-api-3-1/schema/RequiredVisitor';
import SchemaDependentRequiredVisitor from './visitors/open-api-3-1/schema/DependentRequiredVisitor';
import SchemaTitleVisitor from './visitors/open-api-3-1/schema/TitleVisitor';
import SchemaDescriptionVisitor from './visitors/open-api-3-1/schema/DescriptionVisitor';
import SchemaDefaultVisitor from './visitors/open-api-3-1/schema/DefaultVisitor';
import SchemaDeprecatedVisitor from './visitors/open-api-3-1/schema/DeprecatedVisitor';
import SchemaReadOnlyVisitor from './visitors/open-api-3-1/schema/ReadOnlyVisitor';
import SchemaWriteOnlyVisitor from './visitors/open-api-3-1/schema/WriteOnlyVisitor';
import SchemaExamplesVisitor from './visitors/open-api-3-1/schema/ExamplesVisitor';
import SchemaFormatVisitor from './visitors/open-api-3-1/schema/FormatVisitor';
import SchemaContentEncodingVisitor from './visitors/open-api-3-1/schema/ContentEncodingVisitor';
import SchemaContentMediaTypeVisitor from './visitors/open-api-3-1/schema/ContentMediaTypeVisitor';
import SchemaExampleVisitor from './visitors/open-api-3-1/schema/ExampleVisitor';
import DiscriminatorVisitor from './visitors/open-api-3-1/distriminator';
import DiscriminatorPropertyNameVisitor from './visitors/open-api-3-1/distriminator/PropertyNameVisitor';
import DiscriminatorMappingVisitor from './visitors/open-api-3-1/distriminator/MappingVisitor';
import XmlVisitor from './visitors/open-api-3-1/xml';
import XmlNameVisitor from './visitors/open-api-3-1/xml/NameVisitor';
import XmlNamespaceVisitor from './visitors/open-api-3-1/xml/NamespaceVisitor';
import XmlPrefixVisitor from './visitors/open-api-3-1/xml/PrefixVisitor';
import XmlAttributeVisitor from './visitors/open-api-3-1/xml/AttributeVisitor';
import XmlWrappedVisitor from './visitors/open-api-3-1/xml/WrappedVisitor';
import ParameterExampleVisitor from './visitors/open-api-3-1/parameter/ExampleVisitor';
import ParameterExamplesVisitor from './visitors/open-api-3-1/parameter/ExamplesVisitor';
import ParameterContentVisitor from './visitors/open-api-3-1/parameter/ContentVisitor';
import ComponentsSchemasVisitor from './visitors/open-api-3-1/components/SchemasVisitor';
import ComponentsResponsesVisitor from './visitors/open-api-3-1/components/ResponsesVisitor';
import ComponentsParametersVisitor from './visitors/open-api-3-1/components/ParametersVisitor';
import ComponentsExamplesVisitor from './visitors/open-api-3-1/components/ExamplesVisitor';
import ComponentsRequestBodiesVisitor from './visitors/open-api-3-1/components/RequestBodiesVisitor';
import ComponentsHeadersVisitor from './visitors/open-api-3-1/components/HeadersVisitor';
import ComponentsSecuritySchemesVisitor from './visitors/open-api-3-1/components/SecuritySchemesVisitor';
import ComponentsLinksVisitor from './visitors/open-api-3-1/components/LinksVisitor';
import ComponentsCallbacksVisitor from './visitors/open-api-3-1/components/CallbacksVisitor';
import ComponentsPathItemsVisitor from './visitors/open-api-3-1/components/PathItemsVisitor';
import ExampleVisitor from './visitors/open-api-3-1/example';
import ExampleSummaryVisitor from './visitors/open-api-3-1/example/SummaryVisitor';
import ExampleDescriptionVisitor from './visitors/open-api-3-1/example/DescriptionVisitor';
import ExampleValueVisitor from './visitors/open-api-3-1/example/ValueVisitor';
import ExampleExternalValueVisitor from './visitors/open-api-3-1/example/ExternalValueVisitor';
import ExternalDocumentationVisitor from './visitors/open-api-3-1/external-documentation';
import ExternalDocumentationDescriptionVisitor from './visitors/open-api-3-1/external-documentation/DescriptionVisitor';
import ExternalDocumentationUrlVisitor from './visitors/open-api-3-1/external-documentation/UrlVisitor';
import EncodingVisitor from './visitors/open-api-3-1/encoding';
import EncodingContentTypeVisitor from './visitors/open-api-3-1/encoding/ContentTypeVisitor';
import EncodingHeadersVisitor from './visitors/open-api-3-1/encoding/HeadersVisitor';
import EncodingStyleVisitor from './visitors/open-api-3-1/encoding/StyleVisitor';
import EncodingExplodeVisitor from './visitors/open-api-3-1/encoding/ExplodeVisitor';
import EncodingAllowReserved from './visitors/open-api-3-1/encoding/AllowReservedVisitor';
import PathsVisitor from './visitors/open-api-3-1/paths';
import RequestBodyVisitor from './visitors/open-api-3-1/request-body';
import RequestBodyDescriptionVisitor from './visitors/open-api-3-1/request-body/DescriptionVisitor';
import RequestBodyContentVisitor from './visitors/open-api-3-1/request-body/ContentVisitor';
import RequestBodyRequiredVisitor from './visitors/open-api-3-1/request-body/RequiredVisitor';
import CallbackVisitor from './visitors/open-api-3-1/callback';
import ResponseVisitor from './visitors/open-api-3-1/response';
import ResponseDescriptionVisitor from './visitors/open-api-3-1/response/DescriptionVisitor';
import ResponseHeadersVisitor from './visitors/open-api-3-1/response/HeadersVisitor';
import ResponseContentVisitor from './visitors/open-api-3-1/response/ContentVisitor';
import ResponseLinksVisitor from './visitors/open-api-3-1/response/LinksVisitor';
import ResponsesVisitor from './visitors/open-api-3-1/responses';
import ResponsesDefaultVisitor from './visitors/open-api-3-1/responses/DefaultVisitor';
import OperationVisitor from './visitors/open-api-3-1/operation';
import OperationTagsVisitor from './visitors/open-api-3-1/operation/TagsVisitor';
import OperationSummaryVisitor from './visitors/open-api-3-1/operation/SummaryVisitor';
import OperationDescriptionVisitor from './visitors/open-api-3-1/operation/DescriptionVisitor';
import OperationOperationIdVisitor from './visitors/open-api-3-1/operation/OperationIdVisitor';
import OperationParametersVisitor from './visitors/open-api-3-1/operation/ParametersVisitor';
import OperationRequestBodyVisitor from './visitors/open-api-3-1/operation/RequestBodyVisitor';
import OperationCallbacksVisitor from './visitors/open-api-3-1/operation/CallbacksVisitor';
import OperationDeprecatedVisitor from './visitors/open-api-3-1/operation/DeprecatedVisitor';
import OperationSecurityVisitor from './visitors/open-api-3-1/operation/SecurityVisitor';
import OperationServersVisitor from './visitors/open-api-3-1/operation/ServersVisitor';
import PathItemVisitor from './visitors/open-api-3-1/path-item';
import PathItem$RefVisitor from './visitors/open-api-3-1/path-item/$RefVisitor';
import PathItemSummaryVisitor from './visitors/open-api-3-1/path-item/SummaryVisitor';
import PathItemDescriptionVisitor from './visitors/open-api-3-1/path-item/DescriptionVisitor';
import PathItemServersVisitor from './visitors/open-api-3-1/path-item/ServersVisitor';
import PathItemParametersVisitor from './visitors/open-api-3-1/path-item/ParametersVisitor';
import SecuritySchemeVisitor from './visitors/open-api-3-1/security-scheme';
import SecuritySchemeTypeVisitor from './visitors/open-api-3-1/security-scheme/TypeVisitor';
import SecuritySchemeDescriptionVisitor from './visitors/open-api-3-1/security-scheme/DescriptionVisitor';
import SecuritySchemeNameVisitor from './visitors/open-api-3-1/security-scheme/NameVisitor';
import SecuritySchemeInVisitor from './visitors/open-api-3-1/security-scheme/InVisitor';
import SecuritySchemeSchemeVisitor from './visitors/open-api-3-1/security-scheme/SchemeVisitor';
import SecuritySchemeBearerFormatVisitor from './visitors/open-api-3-1/security-scheme/BearerFormatVisitor';
import SecuritySchemeOpenIdConnectUrlVisitor from './visitors/open-api-3-1/security-scheme/OpenIdConnectUrlVisitor';
import OAuthFlowsVisitor from './visitors/open-api-3-1/oauth-flows';
import OAuthFlowVisitor from './visitors/open-api-3-1/oauth-flow';
import OAuthFlowAuthorizationUrlVisitor from './visitors/open-api-3-1/oauth-flow/AuthorizationUrlVisitor';
import OAuthFlowTokenUrlVisitor from './visitors/open-api-3-1/oauth-flow/TokenUrlVisitor';
import OAuthFlowRefreshUrlVisitor from './visitors/open-api-3-1/oauth-flow/RefreshUrlVisitor';
import OAuthFlowScopesVisitor from './visitors/open-api-3-1/oauth-flow/ScopesVisitor';
import WebhooksVisitor from './visitors/open-api-3-1/WebhooksVisitor';
import TagsVisitor from './visitors/open-api-3-1/TagsVisitor';

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
        OpenApi: {
          $visitor: OpenApi3_1Visitor,
          fixedFields: {
            openapi: OpenapiVisitor,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            jsonSchemaDialect: JsonSchemaDialectVisitor,
            servers: ServersVisitor,
            paths: {
              $ref: '#/visitors/document/objects/Paths',
            },
            webhooks: WebhooksVisitor,
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
            summary: InfoSummaryVisitor,
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
            identifier: LicenseIdentifierVisitor,
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
            pathItems: ComponentsPathItemsVisitor,
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
            schema: {
              $ref: '#/visitors/document/objects/Schema',
            },
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
            schema: {
              $ref: '#/visitors/document/objects/Schema',
            },
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
            schema: {
              $ref: '#/visitors/document/objects/Schema',
            },
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
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: Reference$RefVisitor,
            summary: ReferenceSummaryVisitor,
            description: ReferenceDescriptionVisitor,
          },
        },
        Schema: {
          $visitor: SchemaVisitor,
          fixedFields: {
            // core vocabulary
            $schema: Schema$schemaVisitor,
            $vocabulary: Schema$vocabularyVisitor,
            $id: Schema$idVisitor,
            $anchor: Schema$anchorVisitor,
            $dynamicAnchor: Schema$dynamicAnchorVisitor,
            $dynamicRef: Schema$dynamicRefVisitor,
            $ref: Schema$refVisitor,
            $defs: Schema$defsVisitor,
            $comment: Schema$commentVisitor,
            // applicator vocabulary
            allOf: SchemaAllOfVisitor,
            anyOf: SchemaAnyOfVisitor,
            oneOf: SchemaOneOfVisitor,
            not: {
              $ref: '#/visitors/document/objects/Schema',
            },
            if: {
              $ref: '#/visitors/document/objects/Schema',
            },
            then: {
              $ref: '#/visitors/document/objects/Schema',
            },
            else: {
              $ref: '#/visitors/document/objects/Schema',
            },
            dependentSchemas: SchemaDependantSchemasVisitor,
            prefixItems: SchemaPrefixItemsVisitor,
            items: {
              $ref: '#/visitors/document/objects/Schema',
            },
            contains: {
              $ref: '#/visitors/document/objects/Schema',
            },
            properties: SchemaPropertiesVisitor,
            patternProperties: SchemaPatternPropertiesVisitor,
            additionalProperties: {
              $ref: '#/visitors/document/objects/Schema',
            },
            propertyNames: {
              $ref: '#/visitors/document/objects/Schema',
            },
            // unevaluated Locations vocabulary
            unevaluatedItems: {
              $ref: '#/visitors/document/objects/Schema',
            },
            unevaluatedProperties: {
              $ref: '#/visitors/document/objects/Schema',
            },
            // validation vocabulary
            // validation Keywords for Any Instance Type
            type: SchemaTypeVisitor,
            enum: SchemaEnumVisitor,
            const: SchemaConstVisitor,
            // validation Keywords for Numeric Instances (number and integer)
            multipleOf: SchemaMultipleOfVisitor,
            maximum: SchemaMaximumVisitor,
            exclusiveMaximum: SchemaExclusiveMaximumVisitor,
            minimum: SchemaMinimumVisitor,
            exclusiveMinimum: SchemaExclusiveMinimumVisitor,
            // validation Keywords for Strings
            maxLength: SchemaMaxLengthVisitor,
            minLength: SchemaMinLengthVisitor,
            pattern: SchemaPatternVisitor,
            // validation Keywords for Arrays
            maxItems: SchemaMaxItemsVisitor,
            minItems: SchemaMinItemsVisitor,
            uniqueItems: SchemaUniqueItemsVisitor,
            maxContains: SchemaMaxContainsVisitor,
            minContains: SchemaMinContainsVisitor,
            // validation Keywords for Objects
            maxProperties: SchemaMaxPropertiesVisitor,
            minProperties: SchemaMinPropertiesVisitor,
            required: SchemaRequiredVisitor,
            dependentRequired: SchemaDependentRequiredVisitor,
            // basic Meta-Data Annotations vocabulary
            title: SchemaTitleVisitor,
            description: SchemaDescriptionVisitor,
            default: SchemaDefaultVisitor,
            deprecated: SchemaDeprecatedVisitor,
            readOnly: SchemaReadOnlyVisitor,
            writeOnly: SchemaWriteOnlyVisitor,
            examples: SchemaExamplesVisitor,
            // semantic Content With "format" vocabulary
            format: SchemaFormatVisitor,
            // contents of String-Encoded Data vocabulary
            contentEncoding: SchemaContentEncodingVisitor,
            contentMediaType: SchemaContentMediaTypeVisitor,
            contentSchema: {
              $ref: '#/visitors/document/objects/Schema',
            },
            // OAS base vocabulary
            discriminator: {
              $ref: '#/visitors/document/objects/Discriminator',
            },
            xml: {
              $ref: '#/visitors/document/objects/XML',
            },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            example: SchemaExampleVisitor,
          },
        },
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
