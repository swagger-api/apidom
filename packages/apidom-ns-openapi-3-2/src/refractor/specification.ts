import { specificationObj as OpenApi3_0Specification } from '@swagger-api/apidom-ns-openapi-3-0';
import { specificationObj as JSONSchema202012Specification } from '@swagger-api/apidom-ns-json-schema-2020-12';

import OpenApi3_2Visitor from './visitors/open-api-3-2/index.ts';
import InfoVisitor from './visitors/open-api-3-2/info/index.ts';
import ContactVisitor from './visitors/open-api-3-2/contact/index.ts';
import LicenseVisitor from './visitors/open-api-3-2/license/index.ts';
import LinkVisitor from './visitors/open-api-3-2/link/index.ts';
import JsonSchemaDialectVisitor from './visitors/open-api-3-2/JsonSchemaDialectVisitor.ts';
import ServerVisitor from './visitors/open-api-3-2/server/index.ts';
import ServerVariableVisitor from './visitors/open-api-3-2/server-variable/index.ts';
import MediaTypeVisitor from './visitors/open-api-3-2/media-type/index.ts';
import SecurityRequirementVisitor from './visitors/open-api-3-2/security-requirement/index.ts';
import ComponentsVisitor from './visitors/open-api-3-2/components/index.ts';
import TagVisitor from './visitors/open-api-3-2/tag/index.ts';
import ReferenceVisitor from './visitors/open-api-3-2/reference/index.ts';
import ParameterVisitor from './visitors/open-api-3-2/parameter/index.ts';
import HeaderVisitor from './visitors/open-api-3-2/header/index.ts';
import SchemaVisitor from './visitors/open-api-3-2/schema/index.ts';
import Schema$defsVisitor from './visitors/open-api-3-2/schema/$defsVisitor.ts';
import SchemaAllOfVisitor from './visitors/open-api-3-2/schema/AllOfVisitor.ts';
import SchemaAnyOfVisitor from './visitors/open-api-3-2/schema/AnyOfVisitor.ts';
import SchemaOneOfVisitor from './visitors/open-api-3-2/schema/OneOfVisitor.ts';
import SchemaDependantSchemasVisitor from './visitors/open-api-3-2/schema/DependentSchemasVisitor.ts';
import SchemaPrefixItemsVisitor from './visitors/open-api-3-2/schema/PrefixItemsVisitor.ts';
import SchemaPropertiesVisitor from './visitors/open-api-3-2/schema/PropertiesVisitor.ts';
import SchemaPatternPropertiesVisitor from './visitors/open-api-3-2/schema/PatternPropertiesVisitor.ts';
import DiscriminatorVisitor from './visitors/open-api-3-2/distriminator/index.ts';
import XmlVisitor from './visitors/open-api-3-2/xml/index.ts';
import ComponentsSchemasVisitor from './visitors/open-api-3-2/components/SchemasVisitor.ts';
import ComponentsPathItemsVisitor from './visitors/open-api-3-2/components/PathItemsVisitor.ts';
import ComponentsMediaTypesVisitor from './visitors/open-api-3-2/components/MediaTypesVisitor.ts';
import AdditionalOperationsVisitor from './visitors/open-api-3-2/path-item/AdditionalOperationsVisitor.ts';
import ExampleVisitor from './visitors/open-api-3-2/example/index.ts';
import ExternalDocumentationVisitor from './visitors/open-api-3-2/external-documentation/index.ts';
import EncodingVisitor from './visitors/open-api-3-2/encoding/index.ts';
import PathsVisitor from './visitors/open-api-3-2/paths/index.ts';
import RequestBodyVisitor from './visitors/open-api-3-2/request-body/index.ts';
import CallbackVisitor from './visitors/open-api-3-2/callback/index.ts';
import ResponseVisitor from './visitors/open-api-3-2/response/index.ts';
import ResponsesVisitor from './visitors/open-api-3-2/responses/index.ts';
import OperationVisitor from './visitors/open-api-3-2/operation/index.ts';
import PathItemVisitor from './visitors/open-api-3-2/path-item/index.ts';
import SecuritySchemeVisitor from './visitors/open-api-3-2/security-scheme/index.ts';
import OAuthFlowsVisitor from './visitors/open-api-3-2/oauth-flows/index.ts';
import OAuthFlowVisitor from './visitors/open-api-3-2/oauth-flow/index.ts';
import WebhooksVisitor from './visitors/open-api-3-2/WebhooksVisitor.ts';

const { JSONSchema: JSONSchemaVisitor, LinkDescription: LinkDescriptionVisitor } =
  JSONSchema202012Specification.visitors.document.objects;

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 * @public
 */
const specification = {
  visitors: {
    value: OpenApi3_0Specification.visitors.value,
    document: {
      objects: {
        OpenApi: {
          $visitor: OpenApi3_2Visitor,
          fixedFields: {
            openapi: OpenApi3_0Specification.visitors.document.objects.OpenApi.fixedFields.openapi,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            jsonSchemaDialect: JsonSchemaDialectVisitor,
            servers: OpenApi3_0Specification.visitors.document.objects.OpenApi.fixedFields.servers,
            // OpenAPI 3.2 addition
            $self: { $ref: '#/visitors/value' },
            paths: {
              $ref: '#/visitors/document/objects/Paths',
            },
            webhooks: WebhooksVisitor,
            components: {
              $ref: '#/visitors/document/objects/Components',
            },
            security:
              OpenApi3_0Specification.visitors.document.objects.OpenApi.fixedFields.security,
            tags: OpenApi3_0Specification.visitors.document.objects.OpenApi.fixedFields.tags,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
          },
        },
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: OpenApi3_0Specification.visitors.document.objects.Info.fixedFields.title,
            description:
              OpenApi3_0Specification.visitors.document.objects.Info.fixedFields.description,
            summary: { $ref: '#/visitors/value' },
            termsOfService:
              OpenApi3_0Specification.visitors.document.objects.Info.fixedFields.termsOfService,
            contact: {
              $ref: '#/visitors/document/objects/Contact',
            },
            license: {
              $ref: '#/visitors/document/objects/License',
            },
            version: OpenApi3_0Specification.visitors.document.objects.Info.fixedFields.version,
          },
        },
        Contact: {
          $visitor: ContactVisitor,
          fixedFields: {
            name: OpenApi3_0Specification.visitors.document.objects.Contact.fixedFields.name,
            url: OpenApi3_0Specification.visitors.document.objects.Contact.fixedFields.url,
            email: OpenApi3_0Specification.visitors.document.objects.Contact.fixedFields.email,
          },
        },
        License: {
          $visitor: LicenseVisitor,
          fixedFields: {
            name: OpenApi3_0Specification.visitors.document.objects.License.fixedFields.name,
            identifier: { $ref: '#/visitors/value' },
            url: OpenApi3_0Specification.visitors.document.objects.License.fixedFields.url,
          },
        },
        Server: {
          $visitor: ServerVisitor,
          fixedFields: {
            url: OpenApi3_0Specification.visitors.document.objects.Server.fixedFields.url,
            description:
              OpenApi3_0Specification.visitors.document.objects.Server.fixedFields.description,
            variables:
              OpenApi3_0Specification.visitors.document.objects.Server.fixedFields.variables,
            // OpenAPI 3.2 addition
            name: { $ref: '#/visitors/value' },
          },
        },
        ServerVariable: {
          $visitor: ServerVariableVisitor,
          fixedFields: {
            enum: OpenApi3_0Specification.visitors.document.objects.ServerVariable.fixedFields.enum,
            default:
              OpenApi3_0Specification.visitors.document.objects.ServerVariable.fixedFields.default,
            description:
              OpenApi3_0Specification.visitors.document.objects.ServerVariable.fixedFields
                .description,
          },
        },
        Components: {
          $visitor: ComponentsVisitor,
          fixedFields: {
            schemas: ComponentsSchemasVisitor,
            responses:
              OpenApi3_0Specification.visitors.document.objects.Components.fixedFields.responses,
            parameters:
              OpenApi3_0Specification.visitors.document.objects.Components.fixedFields.parameters,
            examples:
              OpenApi3_0Specification.visitors.document.objects.Components.fixedFields.examples,
            requestBodies:
              OpenApi3_0Specification.visitors.document.objects.Components.fixedFields
                .requestBodies,
            headers:
              OpenApi3_0Specification.visitors.document.objects.Components.fixedFields.headers,
            securitySchemes:
              OpenApi3_0Specification.visitors.document.objects.Components.fixedFields
                .securitySchemes,
            links: OpenApi3_0Specification.visitors.document.objects.Components.fixedFields.links,
            callbacks:
              OpenApi3_0Specification.visitors.document.objects.Components.fixedFields.callbacks,
            pathItems: ComponentsPathItemsVisitor,
            // OpenAPI 3.2 addition
            mediaTypes: ComponentsMediaTypesVisitor,
          },
        },
        Paths: {
          $visitor: PathsVisitor,
        },
        PathItem: {
          $visitor: PathItemVisitor,
          fixedFields: {
            $ref: OpenApi3_0Specification.visitors.document.objects.PathItem.fixedFields.$ref,
            summary: OpenApi3_0Specification.visitors.document.objects.PathItem.fixedFields.summary,
            description:
              OpenApi3_0Specification.visitors.document.objects.PathItem.fixedFields.description,
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
            // OpenAPI 3.2 addition
            query: {
              $ref: '#/visitors/document/objects/Operation',
            },
            servers: OpenApi3_0Specification.visitors.document.objects.PathItem.fixedFields.servers,
            parameters:
              OpenApi3_0Specification.visitors.document.objects.PathItem.fixedFields.parameters,
            // OpenAPI 3.2 addition
            additionalOperations: AdditionalOperationsVisitor,
          },
        },
        Operation: {
          $visitor: OperationVisitor,
          fixedFields: {
            tags: OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.tags,
            summary:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.summary,
            description:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.description,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            operationId:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.operationId,
            parameters:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.parameters,
            requestBody:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.requestBody,
            responses: {
              $ref: '#/visitors/document/objects/Responses',
            },
            callbacks:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.callbacks,
            deprecated:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.deprecated,
            security:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.security,
            servers:
              OpenApi3_0Specification.visitors.document.objects.Operation.fixedFields.servers,
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
          fixedFields: {
            description:
              OpenApi3_0Specification.visitors.document.objects.ExternalDocumentation.fixedFields
                .description,
            url: OpenApi3_0Specification.visitors.document.objects.ExternalDocumentation.fixedFields
              .url,
          },
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            name: OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.name,
            in: OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.in,
            description:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.description,
            required:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.required,
            deprecated:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.deprecated,
            allowEmptyValue:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields
                .allowEmptyValue,
            style: OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.style,
            explode:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.explode,
            allowReserved:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.allowReserved,
            schema: {
              $ref: '#/visitors/document/objects/Schema',
            },
            example:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.example,
            examples:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.examples,
            content:
              OpenApi3_0Specification.visitors.document.objects.Parameter.fixedFields.content,
          },
        },
        RequestBody: {
          $visitor: RequestBodyVisitor,
          fixedFields: {
            description:
              OpenApi3_0Specification.visitors.document.objects.RequestBody.fixedFields.description,
            content:
              OpenApi3_0Specification.visitors.document.objects.RequestBody.fixedFields.content,
            required:
              OpenApi3_0Specification.visitors.document.objects.RequestBody.fixedFields.required,
          },
        },
        MediaType: {
          $visitor: MediaTypeVisitor,
          fixedFields: {
            schema: {
              $ref: '#/visitors/document/objects/Schema',
            },
            example:
              OpenApi3_0Specification.visitors.document.objects.MediaType.fixedFields.example,
            examples:
              OpenApi3_0Specification.visitors.document.objects.MediaType.fixedFields.examples,
            encoding:
              OpenApi3_0Specification.visitors.document.objects.MediaType.fixedFields.encoding,
            // OpenAPI 3.2 addition
            itemSchema: {
              $ref: '#/visitors/document/objects/Schema',
            },
          },
        },
        Encoding: {
          $visitor: EncodingVisitor,
          fixedFields: {
            contentType:
              OpenApi3_0Specification.visitors.document.objects.Encoding.fixedFields.contentType,
            headers: OpenApi3_0Specification.visitors.document.objects.Encoding.fixedFields.headers,
            style: OpenApi3_0Specification.visitors.document.objects.Encoding.fixedFields.style,
            explode: OpenApi3_0Specification.visitors.document.objects.Encoding.fixedFields.explode,
            allowReserved:
              OpenApi3_0Specification.visitors.document.objects.Encoding.fixedFields.allowReserved,
          },
        },
        Responses: {
          $visitor: ResponsesVisitor,
          fixedFields: {
            default:
              OpenApi3_0Specification.visitors.document.objects.Responses.fixedFields.default,
          },
        },
        Response: {
          $visitor: ResponseVisitor,
          fixedFields: {
            description:
              OpenApi3_0Specification.visitors.document.objects.Response.fixedFields.description,
            headers: OpenApi3_0Specification.visitors.document.objects.Response.fixedFields.headers,
            content: OpenApi3_0Specification.visitors.document.objects.Response.fixedFields.content,
            links: OpenApi3_0Specification.visitors.document.objects.Response.fixedFields.links,
          },
        },
        Callback: {
          $visitor: CallbackVisitor,
        },
        Example: {
          $visitor: ExampleVisitor,
          fixedFields: {
            summary: OpenApi3_0Specification.visitors.document.objects.Example.fixedFields.summary,
            description:
              OpenApi3_0Specification.visitors.document.objects.Example.fixedFields.description,
            value: OpenApi3_0Specification.visitors.document.objects.Example.fixedFields.value,
            externalValue:
              OpenApi3_0Specification.visitors.document.objects.Example.fixedFields.externalValue,
            // OpenAPI 3.2 additions
            dataValue: { $ref: '#/visitors/value' },
            serializedValue: { $ref: '#/visitors/value' },
          },
        },
        Link: {
          $visitor: LinkVisitor,
          fixedFields: {
            operationRef:
              OpenApi3_0Specification.visitors.document.objects.Link.fixedFields.operationRef,
            operationId:
              OpenApi3_0Specification.visitors.document.objects.Link.fixedFields.operationId,
            parameters:
              OpenApi3_0Specification.visitors.document.objects.Link.fixedFields.parameters,
            requestBody:
              OpenApi3_0Specification.visitors.document.objects.Link.fixedFields.requestBody,
            description:
              OpenApi3_0Specification.visitors.document.objects.Link.fixedFields.description,
            server: {
              $ref: '#/visitors/document/objects/Server',
            },
          },
        },
        Header: {
          $visitor: HeaderVisitor,
          fixedFields: {
            description:
              OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.description,
            required: OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.required,
            deprecated:
              OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.deprecated,
            allowEmptyValue:
              OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.allowEmptyValue,
            style: OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.style,
            explode: OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.explode,
            allowReserved:
              OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.allowReserved,
            schema: {
              $ref: '#/visitors/document/objects/Schema',
            },
            example: OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.example,
            examples: OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.examples,
            content: OpenApi3_0Specification.visitors.document.objects.Header.fixedFields.content,
          },
        },
        Tag: {
          $visitor: TagVisitor,
          fixedFields: {
            name: OpenApi3_0Specification.visitors.document.objects.Tag.fixedFields.name,
            description:
              OpenApi3_0Specification.visitors.document.objects.Tag.fixedFields.description,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            // OpenAPI 3.2 additions
            summary: { $ref: '#/visitors/value' },
            parent: { $ref: '#/visitors/value' },
            kind: { $ref: '#/visitors/value' },
          },
        },
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: OpenApi3_0Specification.visitors.document.objects.Reference.fixedFields.$ref,
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
          },
        },
        JSONSchema: {
          $ref: '#/visitors/document/objects/Schema',
        },
        LinkDescription: {
          ...LinkDescriptionVisitor,
        },
        Schema: {
          $visitor: SchemaVisitor,
          fixedFields: {
            ...JSONSchemaVisitor.fixedFields,
            // core vocabulary
            $defs: Schema$defsVisitor,
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
            // contents of String-Encoded Data vocabulary
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
            example: { $ref: '#/visitors/value' },
          },
        },
        Discriminator: {
          $visitor: DiscriminatorVisitor,
          fixedFields: {
            propertyName:
              OpenApi3_0Specification.visitors.document.objects.Discriminator.fixedFields
                .propertyName,
            mapping:
              OpenApi3_0Specification.visitors.document.objects.Discriminator.fixedFields.mapping,
            // OpenAPI 3.2 addition
            defaultMapping: { $ref: '#/visitors/value' },
          },
        },
        XML: {
          $visitor: XmlVisitor,
          fixedFields: {
            name: OpenApi3_0Specification.visitors.document.objects.XML.fixedFields.name,
            namespace: OpenApi3_0Specification.visitors.document.objects.XML.fixedFields.namespace,
            prefix: OpenApi3_0Specification.visitors.document.objects.XML.fixedFields.prefix,
            attribute: OpenApi3_0Specification.visitors.document.objects.XML.fixedFields.attribute,
            wrapped: OpenApi3_0Specification.visitors.document.objects.XML.fixedFields.wrapped,
          },
        },
        SecurityScheme: {
          $visitor: SecuritySchemeVisitor,
          fixedFields: {
            type: OpenApi3_0Specification.visitors.document.objects.SecurityScheme.fixedFields.type,
            description:
              OpenApi3_0Specification.visitors.document.objects.SecurityScheme.fixedFields
                .description,
            name: OpenApi3_0Specification.visitors.document.objects.SecurityScheme.fixedFields.name,
            in: OpenApi3_0Specification.visitors.document.objects.SecurityScheme.fixedFields.in,
            scheme:
              OpenApi3_0Specification.visitors.document.objects.SecurityScheme.fixedFields.scheme,
            bearerFormat:
              OpenApi3_0Specification.visitors.document.objects.SecurityScheme.fixedFields
                .bearerFormat,
            flows: {
              $ref: '#/visitors/document/objects/OAuthFlows',
            },
            openIdConnectUrl:
              OpenApi3_0Specification.visitors.document.objects.SecurityScheme.fixedFields
                .openIdConnectUrl,
            // OpenAPI 3.2 addition
            oauth2MetadataUrl: { $ref: '#/visitors/value' },
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
            authorizationUrl:
              OpenApi3_0Specification.visitors.document.objects.OAuthFlow.fixedFields
                .authorizationUrl,
            tokenUrl:
              OpenApi3_0Specification.visitors.document.objects.OAuthFlow.fixedFields.tokenUrl,
            refreshUrl:
              OpenApi3_0Specification.visitors.document.objects.OAuthFlow.fixedFields.refreshUrl,
            scopes: OpenApi3_0Specification.visitors.document.objects.OAuthFlow.fixedFields.scopes,
          },
        },
        SecurityRequirement: {
          $visitor: SecurityRequirementVisitor,
        },
      },
      extension: {
        $visitor: OpenApi3_0Specification.visitors.document.extension.$visitor,
      },
    },
  },
} as const;

export default specification;
