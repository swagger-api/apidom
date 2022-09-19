const documentation = [
  /**
   * The following Fixed Field is provided as reference, but is more
   * comprehensively described by parent Schema Object meta documentation
   */
  // {
  //   target: 'schema',
  //   docs: '#### [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)\nThe schema defining the content of the request, response, or parameter.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  {
    target: 'example',
    docs: 'Example of the media type.  The example object SHOULD be in the correct format as specified by the media type.  The `example` field is mutually exclusive of the `examples` field.  Furthermore, if referencing a `schema` which contains an example, the `example` value SHALL _override_ the example provided by the schema.',
  },
  {
    target: 'examples',
    docs: 'Map[ `string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nExamples of the media type.  Each example object SHOULD  match the media type and specified schema if present.  The `examples` field is mutually exclusive of the `example` field.  Furthermore, if referencing a `schema` which contains an example, the `examples` value SHALL _override_ the example provided by the schema.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'encoding',
    docs: 'Map[`string`, [Encoding Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingObject)]\n\\\n\\\nA map between a property name and its encoding information. The key, being the property name, MUST exist in the schema as a property. The encoding object SHALL only apply to `requestBody` objects when the media type is `multipart` or `application/x-www-form-urlencoded`.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: '#### [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#media-type-object)\nEach Media Type Object provides schema and examples for the media type identified by its key.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nschema | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) | The schema defining the content of the request, response, or parameter.\nexample | Any | Example of the media type.  The example object SHOULD be in the correct format as specified by the media type.  The `example` field is mutually exclusive of the `examples` field.  Furthermore, if referencing a `schema` which contains an example, the `example` value SHALL _override_ the example provided by the schema.\nexamples | Map[ `string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | Examples of the media type.  Each example object SHOULD  match the media type and specified schema if present.  The `examples` field is mutually exclusive of the `example` field.  Furthermore, if referencing a `schema` which contains an example, the `examples` value SHALL _override_ the example provided by the schema.\nencoding | Map[`string`, [Encoding Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingObject)] | A map between a property name and its encoding information. The key, being the property name, MUST exist in the schema as a property. The encoding object SHALL only apply to `requestBody` objects when the media type is `multipart` or `application/x-www-form-urlencoded`.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Media Type Examples\n\n\n\\\nJSON\n```json\n{\n  "application/json": {\n    "schema": {\n         "$ref": "#/components/schemas/Pet"\n    },\n    "examples": {\n      "cat" : {\n        "summary": "An example of a cat",\n        "value": \n          {\n            "name": "Fluffy",\n            "petType": "Cat",\n            "color": "White",\n            "gender": "male",\n            "breed": "Persian"\n          }\n      },\n      "dog": {\n        "summary": "An example of a dog with a cat\'s name",\n        "value" :  { \n          "name": "Puma",\n          "petType": "Dog",\n          "color": "Black",\n          "gender": "Female",\n          "breed": "Mixed"\n        },\n      "frog": {\n          "$ref": "#/components/examples/frog-example"\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\napplication/json: \n  schema:\n    $ref: "#/components/schemas/Pet"\n  examples:\n    cat:\n      summary: An example of a cat\n      value:\n        name: Fluffy\n        petType: Cat\n        color: White\n        gender: male\n        breed: Persian\n    dog:\n      summary: An example of a dog with a cat\'s name\n      value:\n        name: Puma\n        petType: Dog\n        color: Black\n        gender: Female\n        breed: Mixed\n    frog:\n      $ref: "#/components/examples/frog-example"\n```',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
