const documentation = [
  {
    docs: '#### [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responses-object)\n\nA container for the expected responses of an operation.\nThe container maps a HTTP response code to the expected response.\n\nThe documentation is not necessarily expected to cover all possible HTTP response codes because they may not be known in advance.\nHowever, documentation is expected to cover a successful operation response and any known errors.\n\nThe `default` MAY be used as a default response object for all HTTP codes\nthat are not covered individually by the specification.\n\nThe `Responses Object` MUST contain at least one response code, and it\nSHOULD be the response for a successful operation call.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\ndefault | [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responseObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject) | The documentation of responses other than the ones declared for specific HTTP response codes. Use this field to cover undeclared responses. A [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject) can link to a response that the [OpenAPI Object\'s components/responses](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsResponses) section defines.\n\n##### Patterned Fields\nField Pattern | Type | Description\n---|:---:|---\n[HTTP Status Code](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#httpCodes) | [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responseObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject) | Any [HTTP status code](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#httpCodes) can be used as the property name, but only one property per code, to describe the expected response for that HTTP status code.  A [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject) can link to a response that is defined in the [OpenAPI Object\'s components/responses](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsResponses) section. This field MUST be enclosed in quotation marks (for example, "200") for compatibility between JSON and YAML. To define a range of response codes, this field MAY contain the uppercase wildcard character `X`. For example, `2XX` represents all response codes between `[200-299]`. Only the following range definitions are allowed: `1XX`, `2XX`, `3XX`, `4XX`, and `5XX`. If a response is defined using an explicit code, the explicit code definition takes precedence over the range definition for that code.\n\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### Responses Object Example\n\nA 200 response for a successful operation and a default response for others (implying an error):\n\n\n\\\nJSON\n```json\n{\n  "200": {\n    "description": "a pet to be returned",\n    "content": {\n      "application/json": {\n        "schema": {\n          "$ref": "#/components/schemas/Pet"\n        }\n      }\n    }\n  },\n  "default": {\n    "description": "Unexpected error",\n    "content": {\n      "application/json": {\n        "schema": {\n          "$ref": "#/components/schemas/ErrorModel"\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\n\'200\':\n  description: a pet to be returned\n  content:\n    application/json:\n      schema:\n        $ref: \'#/components/schemas/Pet\'\ndefault:\n  description: Unexpected error\n  content:\n    application/json:\n      schema:\n        $ref: \'#/components/schemas/ErrorModel\'\n```',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    docs: '#### [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responses-object)\n\nA container for the expected responses of an operation. The container maps a HTTP response code to the expected response.\n\n\\\nThe documentation is not necessarily expected to cover all possible HTTP response codes because they may not be known in advance. However, documentation is expected to cover a successful operation response and any known errors.\n\n\\\nThe `default` MAY be used as a default response object for all HTTP codes that are not covered individually by the `Responses Object`.\n\n\\\nThe `Responses Object` MUST contain at least one response code, and if only one response code is provided it SHOULD be the response for a successful operation call.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndefault | [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responseObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) | The documentation of responses other than the ones declared for specific HTTP response codes. Use this field to cover undeclared responses.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n[HTTP Status Code](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#httpCodes) | [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responseObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) | Any [HTTP status code](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#httpCodes) can be used as the property name, but only one property per code, to describe the expected response for that HTTP status code. This field MUST be enclosed in quotation marks (for example, "200") for compatibility between JSON and YAML. To define a range of response codes, this field MAY contain the uppercase wildcard character `X`. For example, `2XX` represents all response codes between `[200-299]`. Only the following range definitions are allowed: `1XX`, `2XX`, `3XX`, `4XX`, and `5XX`. If a response is defined using an explicit code, the explicit code definition takes precedence over the range definition for that code.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Responses Object Example\n\n\n\\\nA 200 response for a successful operation and a default response for others (implying an error):\n\n\\\nJSON\n```json\n{\n  "200": {\n    "description": "a pet to be returned",\n    "content": {\n      "application/json": {\n        "schema": {\n          "$ref": "#/components/schemas/Pet"\n        }\n      }\n    }\n  },\n  "default": {\n    "description": "Unexpected error",\n    "content": {\n      "application/json": {\n        "schema": {\n          "$ref": "#/components/schemas/ErrorModel"\n        }\n      }\n    }\n  }\n```\n\n\n\\\nYAML\n```yaml\n\'200\':\n  description: a pet to be returned\n  content:\n    application/json:\n    schema:\n      $ref: \'#/components/schemas/Pet\'\ndefault:\n  description: Unexpected error\n  content:\n    application/json:\n    schema:\n      $ref: \'#/components/schemas/ErrorModel\'\n```\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
