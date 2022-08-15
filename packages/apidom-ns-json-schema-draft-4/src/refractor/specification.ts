import FallbackVisitor from './visitors/FallbackVisitor';
import JSONSchemaVisitor from './visitors/json-schema';
import JSONSchemaIdVisitor from './visitors/json-schema/IdVisitor';
import JSONSchema$schemaVisitor from './visitors/json-schema/$schemaVisitor';
import JSONSchemaMultipleOfVisitor from './visitors/json-schema/MultipleOfVisitor';
import JSONSchemaMaximumVisitor from './visitors/json-schema/MaximumVisitor';
import JSONSchemaExclusiveMaximumVisitor from './visitors/json-schema/ExclusiveMaximumVisitor';
import JSONSchemaMinimumVisitor from './visitors/json-schema/MinimumVisitor';
import JSONSchemaExclusiveMinimumVisitor from './visitors/json-schema/ExclusiveMinimumVisitor';
import JSONSchemaMaxLengthVisitor from './visitors/json-schema/MaxLengthVisitor';
import JSONSchemaMinLengthVisitor from './visitors/json-schema/MinLengthVisitor';
import JSONSchemaPatternVisitor from './visitors/json-schema/PatternVisitor';
import JSONSchemaAdditionalItemsVisitor from './visitors/json-schema/AdditionalItemsVisitor';
import JSONSchemaItemsVisitor from './visitors/json-schema/ItemsVisitor';
import JSONSchemaMaxItemsVisitor from './visitors/json-schema/MaxItemsVisitor';
import JSONSchemaMinItemsVisitor from './visitors/json-schema/MinItemsVisitor';
import JSONSchemaUniqueItemsVisitor from './visitors/json-schema/UniqueItemsVisitor';
import JSONSchemaMaxPropertiesVisitor from './visitors/json-schema/MaxPropertiesVisitor';
import JSONSchemaMinPropertiesVisitor from './visitors/json-schema/MinPropertiesVisitor';
import JSONSchemaRequiredVisitor from './visitors/json-schema/RequiredVisitor';
import JSONSchemaPropertiesVisitor from './visitors/json-schema/PropertiesVisitor';
import JSONSchemaAdditionalPropertiesVisitor from './visitors/json-schema/AdditionalPropertiesVisitor';
import JSONSchemaPatternPropertiesVisitor from './visitors/json-schema/PatternPropertiesVisitor';
import JSONSchemaDependenciesVisitor from './visitors/json-schema/DependenciesVisitor';
import JSONSchemaEnumVisitor from './visitors/json-schema/EnumVisitor';
import JSONSchemaTypeVisitor from './visitors/json-schema/TypeVisitor';
import JSONSchemaAllOfVisitor from './visitors/json-schema/AllOfVisitor';
import JSONSchemaAnyOfVisitor from './visitors/json-schema/AnyOfVisitor';
import JSONSchemaOneOfVisitor from './visitors/json-schema/OneOfVisitor';
import JSONSchemaNotVisitor from './visitors/json-schema/NotVisitor';
import JSONSchemaDefinitionsVisitor from './visitors/json-schema/DefinitionsVisitor';
import JSONSchemaTitleVisitor from './visitors/json-schema/TitleVisitor';
import JSONSchemaDescriptionVisitor from './visitors/json-schema/DescriptionVisitor';
import JSONSchemaDefaultVisitor from './visitors/json-schema/DefaultVisitor';
import JSONSchemaFormatVisitor from './visitors/json-schema/FormatVisitor';
import JSONSchemaBaseVisitor from './visitors/json-schema/BaseVisitor';
import JSONSchemaLinksVisitor from './visitors/json-schema/LinksVisitor';
import JSONSchemaReadOnlyVisitor from './visitors/json-schema/ReadOnlyVisitor';
import JSONReferenceVisitor from './visitors/json-schema/json-reference';
import JSONReference$RefVisitor from './visitors/json-schema/json-reference/$RefVisitor';
import MediaVisitor from './visitors/json-schema/media';
import MediaBinaryEncodingVisitor from './visitors/json-schema/media/BinaryEncodingVisitor';
import MediaTypeVisitor from './visitors/json-schema/media/TypeVisitor';
import LinkDescriptionVisitor from './visitors/json-schema/link-description';
import LinkDescriptionHrefVisitor from './visitors/json-schema/link-description/HrefVisitor';
import LinkDescriptionRelVisitor from './visitors/json-schema/link-description/RelVisitor';
import LinkDescriptionTitleVisitor from './visitors/json-schema/link-description/TitleVisitor';
import LinkDescriptionTargetSchemaVisitor from './visitors/json-schema/link-description/TargetSchemaVisitor';
import LinkDescriptionMediaTypeVisitor from './visitors/json-schema/link-description/MediaTypeVisitor';
import LinkDescriptionMethodVisitor from './visitors/json-schema/link-description/MethodVisitor';
import LinkDescriptionEncTypeVisitor from './visitors/json-schema/link-description/EncTypeVisitor';
import LinkDescriptionSchemaVisitor from './visitors/json-schema/link-description/SchemaVisitor';

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
        JSONSchema: {
          $visitor: JSONSchemaVisitor,
          fixedFields: {
            // core vocabulary
            id: JSONSchemaIdVisitor,
            $schema: JSONSchema$schemaVisitor,
            // validation vocabulary
            // validation keywords for numeric instances (number and integer)
            multipleOf: JSONSchemaMultipleOfVisitor,
            maximum: JSONSchemaMaximumVisitor,
            exclusiveMaximum: JSONSchemaExclusiveMaximumVisitor,
            minimum: JSONSchemaMinimumVisitor,
            exclusiveMinimum: JSONSchemaExclusiveMinimumVisitor,
            // validation keywords for strings
            maxLength: JSONSchemaMaxLengthVisitor,
            minLength: JSONSchemaMinLengthVisitor,
            pattern: JSONSchemaPatternVisitor,
            // validation keywords for arrays
            additionalItems: JSONSchemaAdditionalItemsVisitor,
            items: JSONSchemaItemsVisitor,
            maxItems: JSONSchemaMaxItemsVisitor,
            minItems: JSONSchemaMinItemsVisitor,
            uniqueItems: JSONSchemaUniqueItemsVisitor,
            // validation keywords for objects
            maxProperties: JSONSchemaMaxPropertiesVisitor,
            minProperties: JSONSchemaMinPropertiesVisitor,
            required: JSONSchemaRequiredVisitor,
            properties: JSONSchemaPropertiesVisitor,
            additionalProperties: JSONSchemaAdditionalPropertiesVisitor,
            patternProperties: JSONSchemaPatternPropertiesVisitor,
            dependencies: JSONSchemaDependenciesVisitor,
            // validation keywords for any instance type
            enum: JSONSchemaEnumVisitor,
            type: JSONSchemaTypeVisitor,
            allOf: JSONSchemaAllOfVisitor,
            anyOf: JSONSchemaAnyOfVisitor,
            oneOf: JSONSchemaOneOfVisitor,
            not: JSONSchemaNotVisitor,
            definitions: JSONSchemaDefinitionsVisitor,
            // metadata keywords
            title: JSONSchemaTitleVisitor,
            description: JSONSchemaDescriptionVisitor,
            default: JSONSchemaDefaultVisitor,
            // semantic validation with "format"
            format: JSONSchemaFormatVisitor,
            // JSON Hyper-Schema
            base: JSONSchemaBaseVisitor,
            links: JSONSchemaLinksVisitor,
            media: {
              $ref: '#/visitors/document/objects/Media',
            },
            readOnly: JSONSchemaReadOnlyVisitor,
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
            binaryEncoding: MediaBinaryEncodingVisitor,
            type: MediaTypeVisitor,
          },
        },
        LinkDescription: {
          $visitor: LinkDescriptionVisitor,
          fixedFields: {
            href: LinkDescriptionHrefVisitor,
            rel: LinkDescriptionRelVisitor,
            title: LinkDescriptionTitleVisitor,
            targetSchema: LinkDescriptionTargetSchemaVisitor,
            mediaType: LinkDescriptionMediaTypeVisitor,
            method: LinkDescriptionMethodVisitor,
            encType: LinkDescriptionEncTypeVisitor,
            schema: LinkDescriptionSchemaVisitor,
          },
        },
      },
    },
  },
};

export default specification;
