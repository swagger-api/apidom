import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import FallbackVisitor from './visitors/FallbackVisitor.ts';
import SwaggerVisitor from './visitors/open-api-2/index.ts';
import SwaggerSwaggerVisitor from './visitors/open-api-2/SwaggerVisitor.ts';
import SwaggerHostVisitor from './visitors/open-api-2/HostVisitor.ts';
import SwaggerBasePathVisitor from './visitors/open-api-2/BasePathVisitor.ts';
import SwaggerSchemesVisitor from './visitors/open-api-2/SchemesVisitor.ts';
import SwaggerConsumesVisitor from './visitors/open-api-2/ConsumesVisitor.ts';
import SwaggerProducesVisitor from './visitors/open-api-2/ProducesVisitor.ts';
import SwaggerSecurityVisitor from './visitors/open-api-2/SecurityVisitor.ts';
import SwaggerTagsVisitor from './visitors/open-api-2/TagsVisitor.ts';
import InfoVisitor from './visitors/open-api-2/info/index.ts';
import InfoVersionVisitor from './visitors/open-api-2/info/VersionVisitor.ts';
import ContactVisitor from './visitors/open-api-2/contact/index.ts';
import LicenseVisitor from './visitors/open-api-2/license/index.ts';
import PathsVisitor from './visitors/open-api-2/paths/index.ts';
import PathItemVisitor from './visitors/open-api-2/path-item/index.ts';
import PathItem$RefVisitor from './visitors/open-api-2/path-item/$RefVisitor.ts';
import PathItemParametersVisitor from './visitors/open-api-2/path-item/ParametersVisitor.ts';
import OperationVisitor from './visitors/open-api-2/operation/index.ts';
import OperationTagsVisitor from './visitors/open-api-2/operation/TagsVisitor.ts';
import OperationConsumesVisitor from './visitors/open-api-2/operation/ConsumesVisitor.ts';
import OperationProducesVisitor from './visitors/open-api-2/operation/ProducesVisitor.ts';
import OperationParametersVisitor from './visitors/open-api-2/operation/ParametersVisitor.ts';
import OperationSchemesVisitor from './visitors/open-api-2/operation/SchemesVisitor.ts';
import OperationSecurityVisitor from './visitors/open-api-2/operation/SecurityVisitor.ts';
import ExternalDocumentationElement from './visitors/open-api-2/external-documentation/index.ts';
import ParameterVisitor from './visitors/open-api-2/parameter/index.ts';
import ItemsVisitor from './visitors/open-api-2/items/index.ts';
import ResponsesVisitor from './visitors/open-api-2/responses/index.ts';
import ResponsesDefaultVisitor from './visitors/open-api-2/responses/DefaultVisitor.ts';
import ResponseVisitor from './visitors/open-api-2/response/index.ts';
import HeadersVisitor from './visitors/open-api-2/headers/index.ts';
import ExampleVisitor from './visitors/open-api-2/example/index.ts';
import HeaderVisitor from './visitors/open-api-2/header/index.ts';
import TagVisitor from './visitors/open-api-2/tag/index.ts';
import ReferenceVisitor from './visitors/open-api-2/reference/index.ts';
import Reference$RefVisitor from './visitors/open-api-2/reference/$RefVisitor.ts';
import SchemaVisitor from './visitors/open-api-2/schema/index.ts';
import SchemaAllOfVisitor from './visitors/open-api-2/schema/AllOfVisitor.ts';
import SchemaItemsVisitor from './visitors/open-api-2/schema/ItemsVisitor.ts';
import SchemaPropertiesVisitor from './visitors/open-api-2/schema/PropertiesVisitor.ts';
import SchemaOrJSONReferenceVisitor from './visitors/open-api-2/schema/SchemaOrJSONReferenceVisitor.ts';
import XmlVisitor from './visitors/open-api-2/xml/index.ts';
import DefinitionsVisitor from './visitors/open-api-2/definitions/index.ts';
import ResponsesDefinitionsVisitor from './visitors/open-api-2/responses-definitions/index.ts';
import ParametersDefinitionsVisitor from './visitors/open-api-2/parameters-definitions/index.ts';
import SecurityDefinitionsVisitor from './visitors/open-api-2/security-definitions/index.ts';
import SecuritySchemeVisitor from './visitors/open-api-2/security-scheme/index.ts';
import ScopesVisitor from './visitors/open-api-2/scopes/index.ts';
import SecurityRequirementVisitor from './visitors/open-api-2/security-requirement/index.ts';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor.ts';

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

/**
 * @public
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        // JSON Schema Draft 4/5 specific visitors
        JSONReference: JSONSchemaDraft4Specification.visitors.document.objects.JSONReference,
        JSONSchema: {
          $ref: '#/visitors/document/objects/Schema',
        },
        // OpenAPI 2 specific visitors
        Swagger: {
          $visitor: SwaggerVisitor,
          fixedFields: {
            swagger: SwaggerSwaggerVisitor,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            host: SwaggerHostVisitor,
            basePath: SwaggerBasePathVisitor,
            schemes: SwaggerSchemesVisitor,
            consumes: SwaggerConsumesVisitor,
            produces: SwaggerProducesVisitor,
            paths: {
              $ref: '#/visitors/document/objects/Paths',
            },
            definitions: {
              $ref: '#/visitors/document/objects/Definitions',
            },
            parameters: {
              $ref: '#/visitors/document/objects/ParametersDefinitions',
            },
            responses: {
              $ref: '#/visitors/document/objects/ResponsesDefinitions',
            },
            securityDefinitions: {
              $ref: '#/visitors/document/objects/SecurityDefinitions',
            },
            security: SwaggerSecurityVisitor,
            tags: SwaggerTagsVisitor,
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
        Paths: {
          $visitor: PathsVisitor,
        },
        PathItem: {
          $visitor: PathItemVisitor,
          fixedFields: {
            $ref: PathItem$RefVisitor,
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
            consumes: OperationConsumesVisitor,
            produces: OperationProducesVisitor,
            parameters: OperationParametersVisitor,
            responses: {
              $ref: '#/visitors/document/objects/Responses',
            },
            schemes: OperationSchemesVisitor,
            deprecated: { $ref: '#/visitors/value' },
            security: OperationSecurityVisitor,
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationElement,
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
            description: jsonSchemaFixedFields.description,
            required: jsonSchemaFixedFields.required,
            schema: SchemaOrJSONReferenceVisitor,
            type: jsonSchemaFixedFields.type,
            format: jsonSchemaFixedFields.format,
            items: {
              $ref: '#/visitors/document/objects/Items',
            },
            collectionFormat: { $ref: '#/visitors/value' },
            default: jsonSchemaFixedFields.default,
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
            enum: jsonSchemaFixedFields.enum,
            multipleOf: jsonSchemaFixedFields.multipleOf,
          },
        },
        Items: {
          $visitor: ItemsVisitor,
          fixedFields: {
            type: jsonSchemaFixedFields.type,
            format: jsonSchemaFixedFields.format,
            items: {
              $ref: '#/visitors/document/objects/Items',
            },
            collectionFormat: { $ref: '#/visitors/value' },
            default: jsonSchemaFixedFields.default,
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
            enum: jsonSchemaFixedFields.enum,
            multipleOf: jsonSchemaFixedFields.multipleOf,
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
            schema: SchemaOrJSONReferenceVisitor,
            headers: {
              $ref: '#/visitors/document/objects/Headers',
            },
            examples: {
              $ref: '#/visitors/document/objects/Example',
            },
          },
        },
        Headers: {
          $visitor: HeadersVisitor,
        },
        Example: {
          $visitor: ExampleVisitor,
        },
        Header: {
          $visitor: HeaderVisitor,
          fixedFields: {
            description: jsonSchemaFixedFields.description,
            type: jsonSchemaFixedFields.type,
            format: jsonSchemaFixedFields.format,
            items: {
              $ref: '#/visitors/document/objects/Items',
            },
            collectionFormat: { $ref: '#/visitors/value' },
            default: jsonSchemaFixedFields.default,
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
            enum: jsonSchemaFixedFields.enum,
            multipleOf: jsonSchemaFixedFields.multipleOf,
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
        Schema: {
          $visitor: SchemaVisitor,
          fixedFields: {
            // the following properties are taken directly from the JSON Schema definition and follow the same specifications
            format: jsonSchemaFixedFields.format,
            title: jsonSchemaFixedFields.title,
            description: jsonSchemaFixedFields.description,
            default: jsonSchemaFixedFields.default,
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
            type: jsonSchemaFixedFields.type,
            readOnly: jsonSchemaFixedFields.readOnly,
            // the following properties are taken from the JSON Schema definition but their definitions were adjusted to the Swagger Specification
            items: SchemaItemsVisitor,
            allOf: SchemaAllOfVisitor,
            properties: SchemaPropertiesVisitor,
            additionalProperties: SchemaOrJSONReferenceVisitor,
            // OpenAPI vocabulary
            discriminator: { $ref: '#/visitors/value' },
            xml: {
              $ref: '#/visitors/document/objects/XML',
            },
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            example: { $ref: '#/visitors/value' },
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
        Definitions: {
          $visitor: DefinitionsVisitor,
        },
        ParametersDefinitions: {
          $visitor: ParametersDefinitionsVisitor,
        },
        ResponsesDefinitions: {
          $visitor: ResponsesDefinitionsVisitor,
        },
        SecurityDefinitions: {
          $visitor: SecurityDefinitionsVisitor,
        },
        SecurityScheme: {
          $visitor: SecuritySchemeVisitor,
          fixedFields: {
            type: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            in: { $ref: '#/visitors/value' },
            flow: { $ref: '#/visitors/value' },
            authorizationUrl: { $ref: '#/visitors/value' },
            token: { $ref: '#/visitors/value' },
            scopes: {
              $ref: '#/visitors/document/objects/Scopes',
            },
          },
        },
        Scopes: {
          $visitor: ScopesVisitor,
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
