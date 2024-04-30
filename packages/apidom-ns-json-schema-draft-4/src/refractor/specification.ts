import FallbackVisitor from './visitors/FallbackVisitor';
import JSONSchemaVisitor from './visitors/json-schema';
import JSONSchemaItemsVisitor from './visitors/json-schema/ItemsVisitor';
import JSONSchemaRequiredVisitor from './visitors/json-schema/RequiredVisitor';
import JSONSchemaPropertiesVisitor from './visitors/json-schema/PropertiesVisitor';
import JSONSchemaPatternPropertiesVisitor from './visitors/json-schema/PatternPropertiesVisitor';
import JSONSchemaDependenciesVisitor from './visitors/json-schema/DependenciesVisitor';
import JSONSchemaEnumVisitor from './visitors/json-schema/EnumVisitor';
import JSONSchemaTypeVisitor from './visitors/json-schema/TypeVisitor';
import JSONSchemaAllOfVisitor from './visitors/json-schema/AllOfVisitor';
import JSONSchemaAnyOfVisitor from './visitors/json-schema/AnyOfVisitor';
import JSONSchemaOneOfVisitor from './visitors/json-schema/OneOfVisitor';
import JSONSchemaDefinitionsVisitor from './visitors/json-schema/DefinitionsVisitor';
import JSONSchemaLinksVisitor from './visitors/json-schema/LinksVisitor';
import JSONReferenceVisitor from './visitors/json-schema/json-reference';
import JSONReference$RefVisitor from './visitors/json-schema/json-reference/$RefVisitor';
import JSONSchemaOrJSONReferenceVisitor from './visitors/json-schema/JSONSchemaOrJSONReferenceVisitor';
import MediaVisitor from './visitors/json-schema/media';
import LinkDescriptionVisitor from './visitors/json-schema/link-description';

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
    JSONSchemaOrJSONReferenceVisitor,
    document: {
      objects: {
        JSONSchema: {
          $visitor: JSONSchemaVisitor,
          fixedFields: {
            // core vocabulary
            id: { $ref: '#/visitors/value' },
            $schema: { $ref: '#/visitors/value' },
            // validation vocabulary
            // validation keywords for numeric instances (number and integer)
            multipleOf: { $ref: '#/visitors/value' },
            maximum: { $ref: '#/visitors/value' },
            exclusiveMaximum: { $ref: '#/visitors/value' },
            minimum: { $ref: '#/visitors/value' },
            exclusiveMinimum: { $ref: '#/visitors/value' },
            // validation keywords for strings
            maxLength: { $ref: '#/visitors/value' },
            minLength: { $ref: '#/visitors/value' },
            pattern: { $ref: '#/visitors/value' },
            // validation keywords for arrays
            additionalItems: JSONSchemaOrJSONReferenceVisitor,
            items: JSONSchemaItemsVisitor,
            maxItems: { $ref: '#/visitors/value' },
            minItems: { $ref: '#/visitors/value' },
            uniqueItems: { $ref: '#/visitors/value' },
            // validation keywords for objects
            maxProperties: { $ref: '#/visitors/value' },
            minProperties: { $ref: '#/visitors/value' },
            required: JSONSchemaRequiredVisitor,
            properties: JSONSchemaPropertiesVisitor,
            additionalProperties: JSONSchemaOrJSONReferenceVisitor,
            patternProperties: JSONSchemaPatternPropertiesVisitor,
            dependencies: JSONSchemaDependenciesVisitor,
            // validation keywords for any instance type
            enum: JSONSchemaEnumVisitor,
            type: JSONSchemaTypeVisitor,
            allOf: JSONSchemaAllOfVisitor,
            anyOf: JSONSchemaAnyOfVisitor,
            oneOf: JSONSchemaOneOfVisitor,
            not: JSONSchemaOrJSONReferenceVisitor,
            definitions: JSONSchemaDefinitionsVisitor,
            // metadata keywords
            title: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            default: { $ref: '#/visitors/value' },
            // semantic validation with "format"
            format: { $ref: '#/visitors/value' },
            // JSON Hyper-Schema
            base: { $ref: '#/visitors/value' },
            links: JSONSchemaLinksVisitor,
            media: {
              $ref: '#/visitors/document/objects/Media',
            },
            readOnly: { $ref: '#/visitors/value' },
          },
        },
        JSONReference: {
          $visitor: JSONReferenceVisitor,
          fixedFields: {
            $ref: JSONReference$RefVisitor,
          },
        },
        Media: {
          $visitor: MediaVisitor,
          fixedFields: {
            binaryEncoding: { $ref: '#/visitors/value' },
            type: { $ref: '#/visitors/value' },
          },
        },
        LinkDescription: {
          $visitor: LinkDescriptionVisitor,
          fixedFields: {
            href: { $ref: '#/visitors/value' },
            rel: { $ref: '#/visitors/value' },
            title: { $ref: '#/visitors/value' },
            targetSchema: JSONSchemaOrJSONReferenceVisitor,
            mediaType: { $ref: '#/visitors/value' },
            method: { $ref: '#/visitors/value' },
            encType: { $ref: '#/visitors/value' },
            schema: JSONSchemaOrJSONReferenceVisitor,
          },
        },
      },
    },
  },
};

export default specification;
