import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const documentation = [
  {
    target: 'propertyName',
    docs: '**REQUIRED**. The name of the property in the payload that will hold the discriminator value.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'mapping',
    docs: 'Map[`string`, `string`]\n\\\n\\\nAn object to hold mappings between payload values and schema names or references.',
    targetSpecs: OpenAPI3,
  },
  /**
   * The original documentation has been trimmed in this implementation for readability purposes
   * A new custom section `Additional documentation topics` has been added,
   * which refers the reader to the source documentation for additional explanations
   * Also note, we are cherry-picking the documentation section about
   * `Composition and Inheritance (Polymorphism)`from outside the Discriminator Object
   * source documentation.
   */
  {
    docs: '#### [Discriminator Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#discriminatorObject)\n\nWhen request bodies or response payloads may be one of a number of different schemas, a `discriminator` object can be used to aid in serialization, deserialization, and validation.  The discriminator is a specific object in a schema which is used to inform the consumer of the specification of an alternative schema based on the value associated with it.\n\nWhen using the discriminator, _inline_ schemas will not be considered.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\npropertyName | `string` | **REQUIRED**. The name of the property in the payload that will hold the discriminator value.\nmapping | Map[`string`, `string`] | An object to hold mappings between payload values and schema names or references.\n\nThe discriminator object is legal only when using one of the composite keywords `oneOf`, `anyOf`, `allOf`.\n\n##### [Composition and Inheritance (Polymorphism)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#composition-and-inheritance-polymorphism)\n\nThe OpenAPI Specification allows combining and extending model definitions using the `allOf` property of JSON Schema, in effect offering model composition.\n`allOf` takes an array of object definitions that are validated *independently* but together compose a single object.\n\n\\\nWhile composition offers model extensibility, it does not imply a hierarchy between the models.\nTo support polymorphism, the OpenAPI Specification adds the `discriminator` field.\nWhen used, the `discriminator` will be the name of the property that decides which schema definition validates the structure of the model.\nAs such, the `discriminator` field MUST be a required field.\nThere are two ways to define the value of a discriminator for an inheriting instance.\n- Use the schema name.\n- Override the schema name by overriding the property with a new value. If a new value exists, this takes precedence over the schema name.\nAs such, inline schema definitions, which do not have a given id, *cannot* be used in polymorphism.\n\n#### Additional documentation topics\n\nFurther explanations of usage can be found in the source documentation for the [Discriminator Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#discriminatorObject)',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Discriminator Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#discriminator-object)\n\nWhen request bodies or response payloads may be one of a number of different schemas, a `discriminator` object can be used to aid in serialization, deserialization, and validation.  The discriminator is a specific object in a schema which is used to inform the consumer of the document of an alternative schema based on the value associated with it.\n\n\\\nWhen using the discriminator, _inline_ schemas will not be considered.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\npropertyName | `string` | **REQUIRED**. The name of the property in the payload that will hold the discriminator value.\nmapping | Map[`string`, `string`] | An object to hold mappings between payload values and schema names or references.\n\n\\\nThis object MAY be extended with [Specification Extensions](#specificationExtensihttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n\\\nThe discriminator object is legal only when using one of the composite keywords `oneOf`, `anyOf`, `allOf`.\n\n##### [Composition and Inheritance (Polymorphism)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#composition-and-inheritance-polymorphism)\n\nThe OpenAPI Specification allows combining and extending model definitions using the `allOf` property of JSON Schema, in effect offering model composition.\n`allOf` takes an array of object definitions that are validated *independently* but together compose a single object.\n\n\\\nWhile composition offers model extensibility, it does not imply a hierarchy between the models.\nTo support polymorphism, the OpenAPI Specification adds the `discriminator` field.\nWhen used, the `discriminator` will be the name of the property that decides which schema definition validates the structure of the model.\nAs such, the `discriminator` field MUST be a required field.\nThere are two ways to define the value of a discriminator for an inheriting instance.\n- Use the schema name.\n- Override the schema name by overriding the property with a new value. If a new value exists, this takes precedence over the schema name.\nAs such, inline schema definitions, which do not have a given id, *cannot* be used in polymorphism.\n\n#### Additional documentation topics\n\nFurther explanations of usage can be found in the source documentation for the [Discriminator Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#discriminator-object)\n.',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
