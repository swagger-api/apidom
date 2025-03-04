import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs.ts';

/**
 * Omitted fixed fields:
 *  - schema
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: 'example',
    docs: 'Example of the media type.  The example object SHOULD be in the correct format as specified by the media type.  The `example` field is mutually exclusive of the `examples` field.  Furthermore, if referencing a `schema` which contains an example, the `example` value SHALL _override_ the example provided by the schema.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'examples',
    docs: 'Map[ `string`, [Example Object](https://spec.openapis.org/oas/v3.0.4.html#example-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nExamples of the media type.  Each example object SHOULD  match the media type and specified schema if present.  The `examples` field is mutually exclusive of the `example` field.  Furthermore, if referencing a `schema` which contains an example, the `examples` value SHALL _override_ the example provided by the schema.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'examples',
    docs: 'Map[ `string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nExamples of the media type.  Each example object SHOULD  match the media type and specified schema if present.  The `examples` field is mutually exclusive of the `example` field.  Furthermore, if referencing a `schema` which contains an example, the `examples` value SHALL _override_ the example provided by the schema.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'encoding',
    docs: 'Map[`string`, [Encoding Object](https://spec.openapis.org/oas/v3.0.4.html#encoding-object)]\n\\\n\\\nA map between a property name and its encoding information. The key, being the property name, MUST exist in the schema as a property. The encoding object SHALL only apply to `requestBody` objects when the media type is `multipart` or `application/x-www-form-urlencoded`.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'encoding',
    docs: 'Map[`string`, [Encoding Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingObject)]\n\\\n\\\nA map between a property name and its encoding information. The key, being the property name, MUST exist in the schema as a property. The encoding object SHALL only apply to `requestBody` objects when the media type is `multipart` or `application/x-www-form-urlencoded`.',
    targetSpecs: OpenAPI31,
  },
  /**
   * The original documentation has been trimmed in this implementation for readability purposes
   * A new custom section `Additional documentation topics` has been added,
   * which adds external links back to the original documentation
   */
  {
    docs: '#### [Media Type Object](https://spec.openapis.org/oas/v3.0.4.html#media-type-object)\n\nEach Media Type Object provides schema and examples for the media type identified by its key.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nschema | [Schema Object](https://spec.openapis.org/oas/v3.0.4.html#schema-object) \\| [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object) | The schema defining the content of the request, response, or parameter.\nexample | Any | Example of the media type.  The example object SHOULD be in the correct format as specified by the media type.  The `example` field is mutually exclusive of the `examples` field.  Furthermore, if referencing a `schema` which contains an example, the `example` value SHALL _override_ the example provided by the schema.\nexamples | Map[ `string`, [Example Object](https://spec.openapis.org/oas/v3.0.4.html#example-object) \\| [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)] | Examples of the media type.  Each example object SHOULD  match the media type and specified schema if present.  The `examples` field is mutually exclusive of the `example` field.  Furthermore, if referencing a `schema` which contains an example, the `examples` value SHALL _override_ the example provided by the schema.\nencoding | Map[`string`, [Encoding Object](https://spec.openapis.org/oas/v3.0.4.html#encoding-object)] | A map between a property name and its encoding information. The key, being the property name, MUST exist in the schema as a property. The encoding object SHALL only apply to `requestBody` objects when the media type is `multipart` or `application/x-www-form-urlencoded`.\n\nThis object MAY be extended with [Specification Extensions](https://spec.openapis.org/oas/v3.0.4.html#specification-extensions).\n\n##### Media Type Examples\n\n\n\\\nJSON\n```json\n{\n  "application/json": {\n    "schema": {\n         "$ref": "#/components/schemas/Pet"\n    },\n    "examples": {\n      "cat" : {\n        "summary": "An example of a cat",\n        "value":\n          {\n            "name": "Fluffy",\n            "petType": "Cat",\n            "color": "White",\n            "gender": "male",\n            "breed": "Persian"\n          }\n      },\n      "dog": {\n        "summary": "An example of a dog with a cat\'s name",\n        "value" :  {\n          "name": "Puma",\n          "petType": "Dog",\n          "color": "Black",\n          "gender": "Female",\n          "breed": "Mixed"\n        },\n      "frog": {\n          "$ref": "#/components/examples/frog-example"\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\napplication/json:\n  schema:\n    $ref: "#/components/schemas/Pet"\n  examples:\n    cat:\n      summary: An example of a cat\n      value:\n        name: Fluffy\n        petType: Cat\n        color: White\n        gender: male\n        breed: Persian\n    dog:\n      summary: An example of a dog with a cat\'s name\n      value:\n        name: Puma\n        petType: Dog\n        color: Black\n        gender: Female\n        breed: Mixed\n    frog:\n      $ref: "#/components/examples/frog-example"\n```\n\n#### Additional documentation topics\n- [Considerations for File Uploads](https://spec.openapis.org/oas/v3.0.4.html#considerations-for-file-uploads)\n\n- [Support for x-www-form-urlencoded Request Bodies](https://spec.openapis.org/oas/v3.0.4.html#support-for-x-www-form-urlencoded-request-bodies)\n\n- [Special Considerations for multipart Content\n](https://spec.openapis.org/oas/v3.0.4.html#special-considerations-for-multipart-content)',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#media-type-object)\nEach Media Type Object provides schema and examples for the media type identified by its key.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nschema | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) | The schema defining the content of the request, response, or parameter.\nexample | Any | Example of the media type.  The example object SHOULD be in the correct format as specified by the media type.  The `example` field is mutually exclusive of the `examples` field.  Furthermore, if referencing a `schema` which contains an example, the `example` value SHALL _override_ the example provided by the schema.\nexamples | Map[ `string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | Examples of the media type.  Each example object SHOULD  match the media type and specified schema if present.  The `examples` field is mutually exclusive of the `example` field.  Furthermore, if referencing a `schema` which contains an example, the `examples` value SHALL _override_ the example provided by the schema.\nencoding | Map[`string`, [Encoding Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingObject)] | A map between a property name and its encoding information. The key, being the property name, MUST exist in the schema as a property. The encoding object SHALL only apply to `requestBody` objects when the media type is `multipart` or `application/x-www-form-urlencoded`.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Media Type Examples\n\n\n\\\nJSON\n```json\n{\n  "application/json": {\n    "schema": {\n         "$ref": "#/components/schemas/Pet"\n    },\n    "examples": {\n      "cat" : {\n        "summary": "An example of a cat",\n        "value": \n          {\n            "name": "Fluffy",\n            "petType": "Cat",\n            "color": "White",\n            "gender": "male",\n            "breed": "Persian"\n          }\n      },\n      "dog": {\n        "summary": "An example of a dog with a cat\'s name",\n        "value" :  { \n          "name": "Puma",\n          "petType": "Dog",\n          "color": "Black",\n          "gender": "Female",\n          "breed": "Mixed"\n        },\n      "frog": {\n          "$ref": "#/components/examples/frog-example"\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\napplication/json: \n  schema:\n    $ref: "#/components/schemas/Pet"\n  examples:\n    cat:\n      summary: An example of a cat\n      value:\n        name: Fluffy\n        petType: Cat\n        color: White\n        gender: male\n        breed: Persian\n    dog:\n      summary: An example of a dog with a cat\'s name\n      value:\n        name: Puma\n        petType: Dog\n        color: Black\n        gender: Female\n        breed: Mixed\n    frog:\n      $ref: "#/components/examples/frog-example"\n```\n\n#### Additional documentation topics\n- [Considerations for File Uploads](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#considerations-for-file-uploads)\n\n- [Support for x-www-form-urlencoded Request Bodies](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#support-for-x-www-form-urlencoded-request-bodies)\n\n- [Special Considerations for multipart Content\n](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#special-considerations-for-multipart-content)',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
