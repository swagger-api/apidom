const documentation = [
  {
    target: 'description',
    docs: '**REQUIRED**. A description of the response. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'headers',
    docs: 'Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nMaps a header name to its definition. [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are case insensitive. If a response header is defined with the name `"Content-Type"`, it SHALL be ignored.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'content',
    docs: 'Map[`string`, [Media Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)]\n\\\n\\\nA map containing descriptions of potential response payloads. The key is a media type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes it. For responses that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'links',
    docs: 'Map[`string`, [Link Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#linkObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nA map of operations links that can be followed from the response. The key of the map is a short name for the link, following the naming constraints of the names for [Component Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject).',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: '#### [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#response-object)\n\nDescribes a single response from an API Operation, including design-time, static links to operations based on the response.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | **REQUIRED**. A description of the response. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nheaders | Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | Maps a header name to its definition. [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are case insensitive. If a response header is defined with the name `"Content-Type"`, it SHALL be ignored.\ncontent | Map[`string`, [Media Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)] | A map containing descriptions of potential response payloads. The key is a media type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes it. For responses that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*\nlinks | Map[`string`, [Link Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#linkObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | A map of operations links that can be followed from the response. The key of the map is a short name for the link, following the naming constraints of the names for [Component Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject).\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Response Object Example\n\n\\\nResponse of an array of a complex type:\n\n\\\nJSON\n```json\n{\n  "description": "A complex object array response",\n  "content": {\n    "application/json": {\n      "schema": {\n        "type": "array",\n        "items": {\n          "$ref": "#/components/schemas/VeryComplexType"\n        }\n      }\n    }\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: A complex object array response\ncontent:\n  application/json:\n    schema:\n      type: array\n      items:\n        $ref: \'#/components/schemas/VeryComplexType\'\n```\n\n\\\nPlain text response with headers:\n\n\\\nJSON\n```json\n{\n  "description": "A simple string response",\n  "content": {\n    "text/plain": {\n      "schema": {\n        "type": "string"\n      }\n    }\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: A simple string response\ncontent:\n  text/plain:\n    schema:\n      type: string\n```\n\n\\\nResponse with a string type:\n\n\\\nJSON\n```json\n{\n  "description": "A simple string response",\n  "content": {\n    "text/plain": {\n      "schema": {\n        "type": "string",\n        "example": "whoa!"\n      }\n    }\n  },\n  "headers": {\n    "X-Rate-Limit-Limit": {\n      "description": "The number of allowed requests in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    },\n    "X-Rate-Limit-Remaining": {\n      "description": "The number of remaining requests in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    },\n    "X-Rate-Limit-Reset": {\n      "description": "The number of seconds left in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    }\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: A simple string response\ncontent:\n  text/plain:\n    schema:\n      type: string\n    example: \'whoa!\'\nheaders:\n  X-Rate-Limit-Limit:\n    description: The number of allowed requests in the current period\n    schema:\n      type: integer\n  X-Rate-Limit-Remaining:\n    description: The number of remaining requests in the current period\n    schema:\n      type: integer\n  X-Rate-Limit-Reset:\n    description: The number of seconds left in the current period\n    schema:\n      type: integer\n```\n\n\\\nResponse with no return value:\n\n\\\nJSON\n```json\n{\n  "description": "object created"\n}\n```\n\n\\\nYAML\n```yaml\ndescription: object created\n```\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
