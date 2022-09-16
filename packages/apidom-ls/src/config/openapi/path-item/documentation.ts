const documentation = [
  {
    target: '$ref',
    docs: 'Allows for an external definition of this path item. The referenced structure MUST be in the format of a [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject). In case a Path Item Object field appears both in the defined object and the referenced object, the behavior is undefined. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'summary',
    docs: 'An optional string summary, intended to apply to all operations in this path.',
  },
  {
    target: 'description',
    docs: 'An optional string description, intended to apply to all operations in this path. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'servers',
    docs: '#### [[ServerObject](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nAn alternative `server` array to service all operations in this path.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'parameters',
    docs: "#### [[Parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nA list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object's components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  /**
   * The following Fixed Fields are provided as reference, but are more
   * comprehensively described by parent Operation Object meta documentation
   */
  // {
  //   target: 'get',
  //   docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a GET operation on this path.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'put',
  //   docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a PUT operation on this path.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'post',
  //   docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a POST operation on this path.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'delete',
  //   docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a DELETE operation on this path.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'options',
  //   docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a OPTIONS operation on this path.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'head',
  //   docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a HEAD operation on this path.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'patch',
  //   docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a PATCH operation on this path.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'trace',
  //   docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a TRACE operation on this path.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  {
    docs: '#### [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject)\n\nDescribes the operations available on a single path. A Path Item MAY be empty, due to [ACL constraints](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityFiltering). The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n$ref | `string` | Allows for a referenced definition of this path item. The referenced structure MUST be in the form of a [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject). In case a Path Item Object field appears both in the defined object and the referenced object, the behavior is undefined. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).\nsummary | `string` | An optional, string summary, intended to apply to all operations in this path.\ndescription | `string` | A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\tget | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a GET operation on this path.\nput | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a PUT operation on this path.\npost | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a POST operation on this path.\ndelete | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a DELETE operation on this path.\noptions | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a OPTIONS operation on this path.\nhead | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a HEAD operation on this path.\npatch | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a PATCH operation on this path.\nget | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a GET operation on this path.\ntrace | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a TRACE operation on this path.\nservers | [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)] | An alternative `server` array to service all operations in this path.\nparamenters | [[Parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object\'s components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Paths Object Example\n\n\n\\\nJSON\n```json\n{\n  "get": {\n    "description": "Returns pets based on ID",\n    "summary": "Find pets by ID",\n    "operationId": "getPetsById",\n    "responses": {\n      "200": {\n        "description": "pet response",\n        "content": {\n          "*/*": {\n            "schema": {\n              "type": "array",\n              "items": {\n                "$ref": "#/components/schemas/Pet"\n              }\n            }\n          }\n        }\n      },\n      "default": {\n        "description": "error payload",\n        "content": {\n          "text/html": {\n            "schema": {\n              "$ref": "#/components/schemas/ErrorModel"\n            }\n          }\n        }\n      }\n    }\n  },\n  "parameters": [\n    {\n      "name": "id",\n      "in": "path",\n      "description": "ID of pet to use",\n      "required": true,\n      "schema": {\n        "type": "array",\n        "items": {\n          "type": "string"\n        }\n      },\n      "style": "simple"\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\nget:\n  description: Returns pets based on ID\n  summary: Find pets by ID\n  operationId: getPetsById\n  responses:\n    \'200\':\n      description: pet response\n      content:\n        \'*/*\' :\n          schema:\n          type: array\n          items:\n            $ref: \'#/components/schemas/Pet\'\n    default:\n      description: error payload\n      content:\n        \'text/html\':\n        schema:\n          $ref: \'#/components/schemas/ErrorModel\'\nparameters:\n- name: id\n  in: path\n  description: ID of pet to use\n  required: true\n  schema:\n    type: array\n    items:\n      type: string\n  style: simple\n```\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
