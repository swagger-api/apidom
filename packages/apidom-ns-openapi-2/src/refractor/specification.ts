import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import FallbackVisitor from './visitors/FallbackVisitor';
import InfoVisitor from './visitors/open-api-2/info';
import InfoVersionVisitor from './visitors/open-api-2/info/VersionVisitor';
import LicenseVisitor from './visitors/open-api-2/license';
import ContactVisitor from './visitors/open-api-2/contact';
import ExternalDocumentationElement from './visitors/open-api-2/external-documentation';
import ParameterVisitor from './visitors/open-api-2/parameter';
import ItemsVisitor from './visitors/open-api-2/items';
import HeadersVisitor from './visitors/open-api-2/headers';
import ExampleVisitor from './visitors/open-api-2/example';
import HeaderVisitor from './visitors/open-api-2/header';
import TagVisitor from './visitors/open-api-2/tag';
import SchemaVisitor from './visitors/open-api-2/schema';
import XmlVisitor from './visitors/open-api-2/xml';
import SecurityDefinitionsVisitor from './visitors/open-api-2/security-definitions';
import SecuritySchemeVisitor from './visitors/open-api-2/security-scheme';
import ScopesVisitor from './visitors/open-api-2/scopes';
import SecurityRequirementVisitor from './visitors/open-api-2/security-requirement';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';

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
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: FallbackVisitor,
            description: FallbackVisitor,
            termsOfService: FallbackVisitor,
            contact: {
              $ref: '#/visitors/document/objects/Contact',
            },
            license: {
              $ref: '#/visitors/document/objects/License',
            },
            version: InfoVersionVisitor,
          },
        },
        License: {
          $visitor: LicenseVisitor,
          fixedFields: {
            name: FallbackVisitor,
            url: FallbackVisitor,
          },
        },
        Contact: {
          $visitor: ContactVisitor,
          fixedFields: {
            name: FallbackVisitor,
            url: FallbackVisitor,
            email: FallbackVisitor,
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationElement,
          fixedFields: {
            description: FallbackVisitor,
            url: FallbackVisitor,
          },
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            name: FallbackVisitor,
            in: FallbackVisitor,
            description: jsonSchemaFixedFields.description,
            required: jsonSchemaFixedFields.required,
            schema: {
              $ref: '#/visitors/document/objects/Schema',
            },
            type: jsonSchemaFixedFields.type,
            format: jsonSchemaFixedFields.format,
            items: {
              $ref: '#/visitors/document/objects/Items',
            },
            collectionFormat: FallbackVisitor,
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
            collectionFormat: FallbackVisitor,
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
            collectionFormat: FallbackVisitor,
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
            name: FallbackVisitor,
            description: FallbackVisitor,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
          },
        },
        Schema: {
          $visitor: SchemaVisitor,
        },
        XML: {
          $visitor: XmlVisitor,
          fixedFields: {
            name: FallbackVisitor,
            namespace: FallbackVisitor,
            prefix: FallbackVisitor,
            attribute: FallbackVisitor,
            wrapped: FallbackVisitor,
          },
        },
        SecurityDefinitions: {
          $visitor: SecurityDefinitionsVisitor,
        },
        SecurityScheme: {
          $visitor: SecuritySchemeVisitor,
          fixedFields: {
            type: FallbackVisitor,
            description: FallbackVisitor,
            name: FallbackVisitor,
            in: FallbackVisitor,
            flow: FallbackVisitor,
            authorizationUrl: FallbackVisitor,
            token: FallbackVisitor,
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
