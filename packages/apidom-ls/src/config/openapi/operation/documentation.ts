const documentation = [
  {
    target: 'tags',
    docs: '#### [`string`]\n\nA list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.',
  },
  {
    target: 'summary',
    docs: 'A short summary of what the operation does.',
  },
  {
    target: 'description',
    docs: 'A verbose explanation of the operation behavior. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'operationId',
    docs: 'Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.',
  },
  {
    target: 'deprecated',
    docs: 'Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.',
  },
  {
    target: 'parameters',
    docs: "[[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\nA list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemParameters), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object's components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'requestBody',
    docs: '[[Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#requestBodyObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\nThe request body applicable for this operation. The requestBody is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies. In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'callbacks',
    docs: 'Map[`string`, [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]]\n\nA map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) that describes a request that may be initiated by the API provider and the expected responses.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'security',
    docs: '#### [[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\nA declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasSecurity). To remove a top-level security declaration, an empty array can be used.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'servers',
    docs: '#### [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\nAn alternative `server` array to service this operation. If an alternative `server` object is specified at the Path Item Object or Root level, it will be overridden by this value.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nDescribes a single API operation on a path.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntags | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.\nsummary | `string` | A short summary of what the operation does.\ndescription | `string` | A verbose explanation of the operation behavior. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\texternalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject) | Additional external documentation for this operation.\noperationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\nparameters | [[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemParameters), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object\'s components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).\nrequestBody | [[Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#requestBodyObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | The request body applicable for this operation. The requestBody is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies. In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.\nresponses | [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responsesObject) | The list of possible responses as they are returned from executing this operation.\ncallbacks | Map[`string`, [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]] | A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) that describes a request that may be initiated by the API provider and the expected responses.\ndeprecated |`boolean` | Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.\nsecurity | [[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)] | A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasSecurity). To remove a top-level security declaration, an empty array can be used.\nservers | [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)] | An alternative server array to service this operation. If an alternative server object is specified at the Path Item Object or Root level, it will be overridden by this value.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Operation Object Example\n\n\n\\\nJSON\n```json\n{\n  "tags": [\n    "pet"\n  ],\n  "summary": "Updates a pet in the store with form data",\n  "operationId": "updatePetWithForm",\n  "parameters": [\n    {\n      "name": "petId",\n      "in": "path",\n      "description": "ID of pet that needs to be updated",\n      "required": true,\n      "schema": {\n        "type": "string"\n      }\n    }\n  ],\n  "requestBody": {\n    "content": {\n      "application/x-www-form-urlencoded": {\n        "schema": {\n          "type": "object",\n          "properties": {\n            "name": {\n              "description": "Updated name of the pet",\n              "type": "string"\n            },\n            "status": {\n              "description": "Updated status of the pet",\n              "type": "string"\n            }\n          },\n          "required": ["status"]\n        }\n      }\n    }\n  },\n  "responses": {\n    "200": {\n      "description": "Pet updated.",\n        "content": {\n        "application/json": {},\n        "application/xml": {}\n      }\n    },\n    "405": {\n      "description": "Method Not Allowed",\n        "content": {\n        "application/json": {},\n        "application/xml": {}\n      }\n    }\n  },\n  "security": [\n    {\n      "petstore_auth": [\n        "write:pets",\n        "read:pets"\n      ]\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\ntags:\n- pet\nsummary: Updates a pet in the store with form data\noperationId: updatePetWithForm\nparameters:\n- name: petId\n  in: path\n  description: ID of pet that needs to be updated\n  required: true\n  schema:\n    type: string\nrequestBody:\n  content:\n    \'application/x-www-form-urlencoded\':\n      schema:\n        type: object\n        properties:\n          name:\n            description: Updated name of the pet\n            type: string\n          status:\n            description: Updated status of the pet\n            type: string\n        required:\n          - status\nresponses:\n  \'200\':\n    description: Pet updated.\n    content:\n      \'application/json\': {}\n      \'application/xml\': {}\n  \'405\':\n    description: Method Not Allowed\n    content:\n      \'application/json\': {}\n      \'application/xml\': {}\nsecurity:\n- petstore_auth:\n  - write: pets\n  - read:pets\n```\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
