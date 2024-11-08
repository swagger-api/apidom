import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import OpenApi3_0Visitor from './visitors/open-api-3-0/index.ts';
import OpenapiVisitor from './visitors/open-api-3-0/OpenapiVisitor.ts';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor.ts';
import InfoVisitor from './visitors/open-api-3-0/info/index.ts';
import InfoVersionVisitor from './visitors/open-api-3-0/info/VersionVisitor.ts';
import ContactVisitor from './visitors/open-api-3-0/contact/index.ts';
import LicenseVisitor from './visitors/open-api-3-0/license/index.ts';
import LinkVisitor from './visitors/open-api-3-0/link/index.ts';
import LinkOperationRefVisitor from './visitors/open-api-3-0/link/OperationRefVisitor.ts';
import LinkOperationIdVisitor from './visitors/open-api-3-0/link/OperationIdVisitor.ts';
import LinkParametersVisitor from './visitors/open-api-3-0/link/ParametersVisitor.ts';
import ServerVisitor from './visitors/open-api-3-0/server/index.ts';
import ServerUrlVisitor from './visitors/open-api-3-0/server/UrlVisitor.ts';
import ServersVisitor from './visitors/open-api-3-0/ServersVisitor.ts';
import ServerVariableVisitor from './visitors/open-api-3-0/server-variable/index.ts';
import ServerVariablesVisitor from './visitors/open-api-3-0/server/VariablesVisitor.ts';
import FallbackVisitor from './visitors/FallbackVisitor.ts';
import MediaTypeVisitor from './visitors/open-api-3-0/media-type/index.ts';
import MediaTypeSchemaVisitor from './visitors/open-api-3-0/media-type/SchemaVisitor.ts';
import MediaTypeExamplesVisitor from './visitors/open-api-3-0/media-type/ExamplesVisitor.ts';
import MediaTypeEncodingVisitor from './visitors/open-api-3-0/media-type/EncodingVisitor.ts';
import SecurityRequirementVisitor from './visitors/open-api-3-0/security-requirement/index.ts';
import SecurityVisitor from './visitors/open-api-3-0/SecurityVisitor.ts';
import ComponentsVisitor from './visitors/open-api-3-0/components/index.ts';
import TagVisitor from './visitors/open-api-3-0/tag/index.ts';
import ReferenceVisitor from './visitors/open-api-3-0/reference/index.ts';
import Reference$RefVisitor from './visitors/open-api-3-0/reference/$RefVisitor.ts';
import ParameterVisitor from './visitors/open-api-3-0/parameter/index.ts';
import ParameterSchemaVisitor from './visitors/open-api-3-0/parameter/SchemaVisitor.ts';
import HeaderVisitor from './visitors/open-api-3-0/header/index.ts';
import HeaderSchemaVisitor from './visitors/open-api-3-0/header/SchemaVisitor.ts';
import HeaderExamplesVisitor from './visitors/open-api-3-0/header/ExamplesVisitor.ts';
import HeaderContentVisitor from './visitors/open-api-3-0/header/ContentVisitor.ts';
import SchemaVisitor from './visitors/open-api-3-0/schema/index.ts';
import SchemaAllOfVisitor from './visitors/open-api-3-0/schema/AllOfVisitor.ts';
import SchemaAnyOfVisitor from './visitors/open-api-3-0/schema/AnyOfVisitor.ts';
import SchemaOneOfVisitor from './visitors/open-api-3-0/schema/OneOfVisitor.ts';
import SchemaItemsVisitor from './visitors/open-api-3-0/schema/ItemsVisitor.ts';
import SchemaPropertiesVisitor from './visitors/open-api-3-0/schema/PropertiesVisitor.ts';
import SchemaTypeVisitor from './visitors/open-api-3-0/schema/TypeVisitor.ts';
import SchemaOrReferenceVisitor from './visitors/open-api-3-0/schema/SchemaOrReferenceVisitor.ts';
import DiscriminatorVisitor from './visitors/open-api-3-0/distriminator/index.ts';
import DiscriminatorMappingVisitor from './visitors/open-api-3-0/distriminator/MappingVisitor.ts';
import XmlVisitor from './visitors/open-api-3-0/xml/index.ts';
import ParameterExamplesVisitor from './visitors/open-api-3-0/parameter/ExamplesVisitor.ts';
import ParameterContentVisitor from './visitors/open-api-3-0/parameter/ContentVisitor.ts';
import ComponentsSchemasVisitor from './visitors/open-api-3-0/components/SchemasVisitor.ts';
import ComponentsResponsesVisitor from './visitors/open-api-3-0/components/ResponsesVisitor.ts';
import ComponentsParametersVisitor from './visitors/open-api-3-0/components/ParametersVisitor.ts';
import ComponentsExamplesVisitor from './visitors/open-api-3-0/components/ExamplesVisitor.ts';
import ComponentsRequestBodiesVisitor from './visitors/open-api-3-0/components/RequestBodiesVisitor.ts';
import ComponentsHeadersVisitor from './visitors/open-api-3-0/components/HeadersVisitor.ts';
import ComponentsSecuritySchemesVisitor from './visitors/open-api-3-0/components/SecuritySchemesVisitor.ts';
import ComponentsLinksVisitor from './visitors/open-api-3-0/components/LinksVisitor.ts';
import ComponentsCallbacksVisitor from './visitors/open-api-3-0/components/CallbacksVisitor.ts';
import ExampleVisitor from './visitors/open-api-3-0/example/index.ts';
import ExampleExternalValueVisitor from './visitors/open-api-3-0/example/ExternalValueVisitor.ts';
import ExternalDocumentationVisitor from './visitors/open-api-3-0/external-documentation/index.ts';
import EncodingVisitor from './visitors/open-api-3-0/encoding/index.ts';
import EncodingHeadersVisitor from './visitors/open-api-3-0/encoding/HeadersVisitor.ts';
import PathsVisitor from './visitors/open-api-3-0/paths/index.ts';
import RequestBodyVisitor from './visitors/open-api-3-0/request-body/index.ts';
import RequestBodyContentVisitor from './visitors/open-api-3-0/request-body/ContentVisitor.ts';
import CallbackVisitor from './visitors/open-api-3-0/callback/index.ts';
import ResponseVisitor from './visitors/open-api-3-0/response/index.ts';
import ResponseHeadersVisitor from './visitors/open-api-3-0/response/HeadersVisitor.ts';
import ResponseContentVisitor from './visitors/open-api-3-0/response/ContentVisitor.ts';
import ResponseLinksVisitor from './visitors/open-api-3-0/response/LinksVisitor.ts';
import ResponsesVisitor from './visitors/open-api-3-0/responses/index.ts';
import ResponsesDefaultVisitor from './visitors/open-api-3-0/responses/DefaultVisitor.ts';
import OperationVisitor from './visitors/open-api-3-0/operation/index.ts';
import OperationTagsVisitor from './visitors/open-api-3-0/operation/TagsVisitor.ts';
import OperationParametersVisitor from './visitors/open-api-3-0/operation/ParametersVisitor.ts';
import OperationRequestBodyVisitor from './visitors/open-api-3-0/operation/RequestBodyVisitor.ts';
import OperationCallbacksVisitor from './visitors/open-api-3-0/operation/CallbacksVisitor.ts';
import OperationSecurityVisitor from './visitors/open-api-3-0/operation/SecurityVisitor.ts';
import OperationServersVisitor from './visitors/open-api-3-0/operation/ServersVisitor.ts';
import PathItemVisitor from './visitors/open-api-3-0/path-item/index.ts';
import PathItem$RefVisitor from './visitors/open-api-3-0/path-item/$RefVisitor.ts';
import PathItemServersVisitor from './visitors/open-api-3-0/path-item/ServersVisitor.ts';
import PathItemParametersVisitor from './visitors/open-api-3-0/path-item/ParametersVisitor.ts';
import SecuritySchemeVisitor from './visitors/open-api-3-0/security-scheme/index.ts';
import OAuthFlowsVisitor from './visitors/open-api-3-0/oauth-flows/index.ts';
import OAuthFlowVisitor from './visitors/open-api-3-0/oauth-flow/index.ts';
import OAuthFlowScopesVisitor from './visitors/open-api-3-0/oauth-flow/ScopesVisitor.ts';
import TagsVisitor from './visitors/open-api-3-0/TagsVisitor.ts';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 */
const { fixedFields: jsonSchemaFixedFields } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema;

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
            title: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            termsOfService: { $ref: '#/visitors/value' },
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
        Server: {
          $visitor: ServerVisitor,
          fixedFields: {
            url: ServerUrlVisitor,
            description: { $ref: '#/visitors/value' },
            variables: ServerVariablesVisitor,
          },
        },
        ServerVariable: {
          $visitor: ServerVariableVisitor,
          fixedFields: {
            enum: { $ref: '#/visitors/value' },
            default: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
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
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
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
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            operationId: { $ref: '#/visitors/value' },
            parameters: OperationParametersVisitor,
            requestBody: OperationRequestBodyVisitor,
            responses: {
              $ref: '#/visitors/document/objects/Responses',
            },
            callbacks: OperationCallbacksVisitor,
            deprecated: { $ref: '#/visitors/value' },
            security: OperationSecurityVisitor,
            servers: OperationServersVisitor,
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            url: { $ref: '#/visitors/value' },
          },
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            in: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            required: { $ref: '#/visitors/value' },
            deprecated: { $ref: '#/visitors/value' },
            allowEmptyValue: { $ref: '#/visitors/value' },
            style: { $ref: '#/visitors/value' },
            explode: { $ref: '#/visitors/value' },
            allowReserved: { $ref: '#/visitors/value' },
            schema: ParameterSchemaVisitor,
            example: { $ref: '#/visitors/value' },
            examples: ParameterExamplesVisitor,
            content: ParameterContentVisitor,
          },
        },
        RequestBody: {
          $visitor: RequestBodyVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            content: RequestBodyContentVisitor,
            required: { $ref: '#/visitors/value' },
          },
        },
        MediaType: {
          $visitor: MediaTypeVisitor,
          fixedFields: {
            schema: MediaTypeSchemaVisitor,
            example: { $ref: '#/visitors/value' },
            examples: MediaTypeExamplesVisitor,
            encoding: MediaTypeEncodingVisitor,
          },
        },
        Encoding: {
          $visitor: EncodingVisitor,
          fixedFields: {
            contentType: { $ref: '#/visitors/value' },
            headers: EncodingHeadersVisitor,
            style: { $ref: '#/visitors/value' },
            explode: { $ref: '#/visitors/value' },
            allowReserved: { $ref: '#/visitors/value' },
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
            description: { $ref: '#/visitors/value' },
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
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            value: { $ref: '#/visitors/value' },
            externalValue: ExampleExternalValueVisitor,
          },
        },
        Link: {
          $visitor: LinkVisitor,
          fixedFields: {
            operationRef: LinkOperationRefVisitor,
            operationId: LinkOperationIdVisitor,
            parameters: LinkParametersVisitor,
            requestBody: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            server: {
              $ref: '#/visitors/document/objects/Server',
            },
          },
        },
        Header: {
          $visitor: HeaderVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            required: { $ref: '#/visitors/value' },
            deprecated: { $ref: '#/visitors/value' },
            allowEmptyValue: { $ref: '#/visitors/value' },
            style: { $ref: '#/visitors/value' },
            explode: { $ref: '#/visitors/value' },
            allowReserved: { $ref: '#/visitors/value' },
            schema: HeaderSchemaVisitor,
            example: { $ref: '#/visitors/value' },
            examples: HeaderExamplesVisitor,
            content: HeaderContentVisitor,
          },
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
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: Reference$RefVisitor,
          },
        },
        JSONSchema: {
          $ref: '#/visitors/document/objects/Schema',
        },
        JSONReference: {
          $ref: '#/visitors/document/objects/Reference',
        },
        Schema: {
          $visitor: SchemaVisitor,
          fixedFields: {
            // the following properties are taken directly from the JSON Schema definition and follow the same specifications
            title: jsonSchemaFixedFields.title,
            multipleOf: jsonSchemaFixedFields.multipleOf,
            maximum: jsonSchemaFixedFields.maximum,
            exclusiveMaximum: jsonSchemaFixedFields.exclusiveMaximum,
            minimum: jsonSchemaFixedFields.minimum,
            exclusiveMinimum: jsonSchemaFixedFields.exclusiveMinimum,
            maxLength: jsonSchemaFixedFields.maxLength,
            minLength: jsonSchemaFixedFields.minLength,
            pattern: jsonSchemaFixedFields.pattern,
            maxItems: jsonSchemaFixedFields.maxItems,
            minItems: jsonSchemaFixedFields.minItems,
            uniqueItems: jsonSchemaFixedFields.uniqueItems,
            maxProperties: jsonSchemaFixedFields.maxProperties,
            minProperties: jsonSchemaFixedFields.minProperties,
            required: jsonSchemaFixedFields.required,
            enum: jsonSchemaFixedFields.enum,
            // the following properties are taken from the JSON Schema definition but their definitions were adjusted to the OpenAPI Specification
            type: SchemaTypeVisitor,
            allOf: SchemaAllOfVisitor,
            anyOf: SchemaAnyOfVisitor,
            oneOf: SchemaOneOfVisitor,
            not: SchemaOrReferenceVisitor,
            items: SchemaItemsVisitor,
            properties: SchemaPropertiesVisitor,
            additionalProperties: SchemaOrReferenceVisitor,
            description: jsonSchemaFixedFields.description,
            format: jsonSchemaFixedFields.format,
            default: jsonSchemaFixedFields.default,
            // OpenAPI vocabulary
            nullable: { $ref: '#/visitors/value' },
            discriminator: {
              $ref: '#/visitors/document/objects/Discriminator',
            },
            writeOnly: { $ref: '#/visitors/value' },
            xml: {
              $ref: '#/visitors/document/objects/XML',
            },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            example: { $ref: '#/visitors/value' },
            deprecated: { $ref: '#/visitors/value' },
          },
        },
        Discriminator: {
          $visitor: DiscriminatorVisitor,
          fixedFields: {
            propertyName: { $ref: '#/visitors/value' },
            mapping: DiscriminatorMappingVisitor,
          },
        },
        XML: {
          $visitor: XmlVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            namespace: { $ref: '#/visitors/value' },
            prefix: { $ref: '#/visitors/value' },
            attribute: { $ref: '#/visitors/value' },
            wrapped: { $ref: '#/visitors/value' },
          },
        },
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
        SecurityRequirement: {
          $visitor: SecurityRequirementVisitor,
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
} as const;

export default specification;
