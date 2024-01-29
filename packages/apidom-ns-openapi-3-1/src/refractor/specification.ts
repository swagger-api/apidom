import { specificationObj as OpenApi3_0Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import OpenApi3_1Visitor from './visitors/open-api-3-1';
import InfoVisitor from './visitors/open-api-3-1/info';
import InfoSummaryVisitor from './visitors/open-api-3-1/info/SummaryVisitor';
import ContactVisitor from './visitors/open-api-3-1/contact';
import LicenseVisitor from './visitors/open-api-3-1/license';
import LicenseIdentifierVisitor from './visitors/open-api-3-1/license/IdentifierVisitor';
import LinkVisitor from './visitors/open-api-3-1/link';
import JsonSchemaDialectVisitor from './visitors/open-api-3-1/JsonSchemaDialectVisitor';
import ServerVisitor from './visitors/open-api-3-1/server';
import ServerVariableVisitor from './visitors/open-api-3-1/server-variable';
import MediaTypeVisitor from './visitors/open-api-3-1/media-type';
import SecurityRequirementVisitor from './visitors/open-api-3-1/security-requirement';
import ComponentsVisitor from './visitors/open-api-3-1/components';
import TagVisitor from './visitors/open-api-3-1/tag';
import ReferenceVisitor from './visitors/open-api-3-1/reference';
import ReferenceSummaryVisitor from './visitors/open-api-3-1/reference/SummaryVisitor';
import ReferenceDescriptionVisitor from './visitors/open-api-3-1/reference/DescriptionVisitor';
import ParameterVisitor from './visitors/open-api-3-1/parameter';
import HeaderVisitor from './visitors/open-api-3-1/header';
import SchemaVisitor from './visitors/open-api-3-1/schema';
import Schema$vocabularyVisitor from './visitors/open-api-3-1/schema/$vocabularyVisitor';
import Schema$refVisitor from './visitors/open-api-3-1/schema/$refVisitor';
import Schema$defsVisitor from './visitors/open-api-3-1/schema/$defsVisitor';
import SchemaAllOfVisitor from './visitors/open-api-3-1/schema/AllOfVisitor';
import SchemaAnyOfVisitor from './visitors/open-api-3-1/schema/AnyOfVisitor';
import SchemaOneOfVisitor from './visitors/open-api-3-1/schema/OneOfVisitor';
import SchemaDependantSchemasVisitor from './visitors/open-api-3-1/schema/DependentSchemasVisitor';
import SchemaPrefixItemsVisitor from './visitors/open-api-3-1/schema/PrefixItemsVisitor';
import SchemaPropertiesVisitor from './visitors/open-api-3-1/schema/PropertiesVisitor';
import SchemaPatternPropertiesVisitor from './visitors/open-api-3-1/schema/PatternProperties';
import SchemaTypeVisitor from './visitors/open-api-3-1/schema/TypeVisitor';
import SchemaEnumVisitor from './visitors/open-api-3-1/schema/EnumVisitor';
import SchemaDependentRequiredVisitor from './visitors/open-api-3-1/schema/DependentRequiredVisitor';
import SchemaExamplesVisitor from './visitors/open-api-3-1/schema/ExamplesVisitor';
import DiscriminatorVisitor from './visitors/open-api-3-1/distriminator';
import XmlVisitor from './visitors/open-api-3-1/xml';
import ComponentsSchemasVisitor from './visitors/open-api-3-1/components/SchemasVisitor';
import ComponentsPathItemsVisitor from './visitors/open-api-3-1/components/PathItemsVisitor';
import ExampleVisitor from './visitors/open-api-3-1/example';
import ExternalDocumentationVisitor from './visitors/open-api-3-1/external-documentation';
import EncodingVisitor from './visitors/open-api-3-1/encoding';
import PathsVisitor from './visitors/open-api-3-1/paths';
import RequestBodyVisitor from './visitors/open-api-3-1/request-body';
import CallbackVisitor from './visitors/open-api-3-1/callback';
import ResponseVisitor from './visitors/open-api-3-1/response';
import ResponsesVisitor from './visitors/open-api-3-1/responses';
import OperationVisitor from './visitors/open-api-3-1/operation';
import PathItemVisitor from './visitors/open-api-3-1/path-item';
import SecuritySchemeVisitor from './visitors/open-api-3-1/security-scheme';
import OAuthFlowsVisitor from './visitors/open-api-3-1/oauth-flows';
import OAuthFlowVisitor from './visitors/open-api-3-1/oauth-flow';
import WebhooksVisitor from './visitors/open-api-3-1/WebhooksVisitor';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 */
const specification: any = {
  visitors: {
    value: OpenApi3_0Specification.visitors.value,
    document: {
      objects: {
        OpenApi: {
          $visitor: OpenApi3_1Visitor,
          fixedFields: {
            openapi: OpenApi3_0Specification.visitors.document.objects.OpenApi.fixedFields.openapi,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            jsonSchemaDialect: JsonSchemaDialectVisitor,
            servers: OpenApi3_0Specification.visitors.document.objects.OpenApi.fixedFields.servers,
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
            summary: InfoSummaryVisitor,
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
            identifier: LicenseIdentifierVisitor,
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
            servers: OpenApi3_0Specification.visitors.document.objects.PathItem.fixedFields.servers,
            parameters:
              OpenApi3_0Specification.visitors.document.objects.PathItem.fixedFields.parameters,
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
          },
        },
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: OpenApi3_0Specification.visitors.document.objects.Reference.fixedFields.$ref,
            summary: ReferenceSummaryVisitor,
            description: ReferenceDescriptionVisitor,
          },
        },
        Schema: {
          $visitor: SchemaVisitor,
          fixedFields: {
            // core vocabulary
            $schema: { $ref: '#/visitors/value' },
            $vocabulary: Schema$vocabularyVisitor,
            $id: { $ref: '#/visitors/value' },
            $anchor: { $ref: '#/visitors/value' },
            $dynamicAnchor: { $ref: '#/visitors/value' },
            $dynamicRef: { $ref: '#/visitors/value' },
            $ref: Schema$refVisitor,
            $defs: Schema$defsVisitor,
            $comment: { $ref: '#/visitors/value' },
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
            const: { $ref: '#/visitors/value' },
            // validation Keywords for Numeric Instances (number and integer)
            multipleOf: { $ref: '#/visitors/value' },
            maximum: { $ref: '#/visitors/value' },
            exclusiveMaximum: { $ref: '#/visitors/value' },
            minimum: { $ref: '#/visitors/value' },
            exclusiveMinimum: { $ref: '#/visitors/value' },
            // validation Keywords for Strings
            maxLength: { $ref: '#/visitors/value' },
            minLength: { $ref: '#/visitors/value' },
            pattern: { $ref: '#/visitors/value' },
            // validation Keywords for Arrays
            maxItems: { $ref: '#/visitors/value' },
            minItems: { $ref: '#/visitors/value' },
            uniqueItems: { $ref: '#/visitors/value' },
            maxContains: { $ref: '#/visitors/value' },
            minContains: { $ref: '#/visitors/value' },
            // validation Keywords for Objects
            maxProperties: { $ref: '#/visitors/value' },
            minProperties: { $ref: '#/visitors/value' },
            required: { $ref: '#/visitors/value' },
            dependentRequired: SchemaDependentRequiredVisitor,
            // basic Meta-Data Annotations vocabulary
            title: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            default: { $ref: '#/visitors/value' },
            deprecated: { $ref: '#/visitors/value' },
            readOnly: { $ref: '#/visitors/value' },
            writeOnly: { $ref: '#/visitors/value' },
            examples: SchemaExamplesVisitor,
            // semantic Content With "format" vocabulary
            format: { $ref: '#/visitors/value' },
            // contents of String-Encoded Data vocabulary
            contentEncoding: { $ref: '#/visitors/value' },
            contentMediaType: { $ref: '#/visitors/value' },
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
};

export default specification;
