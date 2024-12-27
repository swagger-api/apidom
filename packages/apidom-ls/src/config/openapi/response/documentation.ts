import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'description',
    docs: '**REQUIRED**. A description of the response. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'description',
    docs: '**Required.** A short description of the response. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'schema',
    docs: '[Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schemaObject)\n\\\n\\\nA definition of the response structure. It can be a primitive, an array or an object. If this field does not exist, it means no content is returned as part of the response. As an extension to the [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schemaObject), its root `type` value may also be `"file"`. This SHOULD be accompanied by a relevant `produces` mime-type.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'headers',
    docs: '[Headers Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#headersObject)\n\\\n\\\nA list of headers that are sent with the response.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'headers',
    docs: 'Map[`string`, [Header Object](https://spec.openapis.org/oas/v3.0.4.html#header-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nMaps a header name to its definition. [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are case insensitive. If a response header is defined with the name `"Content-Type"`, it SHALL be ignored.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'headers',
    docs: 'Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nMaps a header name to its definition. [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are case insensitive. If a response header is defined with the name `"Content-Type"`, it SHALL be ignored.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'examples',
    docs: '[Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#exampleObject)\n\\\n\\\nAn example of the response message.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'content',
    docs: 'Map[`string`, [Media Object](https://spec.openapis.org/oas/v3.0.4.html#media-type-object)]\n\\\n\\\nA map containing descriptions of potential response payloads. The key is a media type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes it. For responses that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'content',
    docs: 'Map[`string`, [Media Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)]\n\\\n\\\nA map containing descriptions of potential response payloads. The key is a media type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes it. For responses that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'links',
    docs: 'Map[`string`, [Link Object](https://spec.openapis.org/oas/v3.0.4.html#link-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nA map of operations links that can be followed from the response. The key of the map is a short name for the link, following the naming constraints of the names for [Component Objects](https://spec.openapis.org/oas/v3.0.4.html#components-object).',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'links',
    docs: 'Map[`string`, [Link Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#linkObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nA map of operations links that can be followed from the response. The key of the map is a short name for the link, following the naming constraints of the names for [Component Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject).',
    targetSpecs: OpenAPI31,
  },
  {
    docs: '#### [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#response-object)\n\nDescribes a single response from an API Operation.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | **Required.** A short description of the response. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.\nschema | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schemaObject) | A definition of the response structure. It can be a primitive, an array or an object. If this field does not exist, it means no content is returned as part of the response. As an extension to the [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schemaObject), its root `type` value may also be `"file"`. This SHOULD be accompanied by a relevant `produces` mime-type.\nheaders | [Headers Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#headersObject) | A list of headers that are sent with the response.\nexamples | [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#exampleObject) | An example of the response message.\n\n##### Patterned Objects\n\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### Response Object Examples\n\nResponse of an array of a complex type:\n\n```js\n{\n  "description": "A complex object array response",\n  "schema": {\n    "type": "array",\n    "items": {\n      "$ref": "#/definitions/VeryComplexType"\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: A complex object array response\nschema:\n  type: array\n  items:\n    $ref: \'#/definitions/VeryComplexType\'\n```\n\nResponse with a string type:\n\n```js\n{\n  "description": "A simple string response",\n  "schema": {\n    "type": "string"\n  }\n}\n```\n\n```yaml\ndescription: A simple string response\nschema:\n  type: string\n```\n\nResponse with headers:\n\n```js\n{\n  "description": "A simple string response",\n  "schema": {\n    "type": "string"\n  },\n  "headers": {\n    "X-Rate-Limit-Limit": {\n      "description": "The number of allowed requests in the current period",\n      "type": "integer"\n    },\n    "X-Rate-Limit-Remaining": {\n      "description": "The number of remaining requests in the current period",\n      "type": "integer"\n    },\n    "X-Rate-Limit-Reset": {\n      "description": "The number of seconds left in the current period",\n      "type": "integer"\n    }\n  }\n}\n```\n\n```yaml\ndescription: A simple string response\nschema:\n  type: string\nheaders:\n  X-Rate-Limit-Limit:\n    description: The number of allowed requests in the current period\n    type: integer\n  X-Rate-Limit-Remaining:\n    description: The number of remaining requests in the current period\n    type: integer\n  X-Rate-Limit-Reset:\n    description: The number of seconds left in the current period\n    type: integer\n```\n\nResponse with no return value:\n\n```js\n{\n  "description": "object created"\n}\n```\n\n```yaml\ndescription: object created\n```',
    targetSpecs: OpenAPI2,
  },
  {
    docs: '#### [Response Object](https://spec.openapis.org/oas/v3.0.4.html#response-object)\nDescribes a single response from an API Operation, including design-time, static\n`links` to operations based on the response.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | **REQUIRED**. A short description of the response. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nheaders | Map[`string`, [Header Object](https://spec.openapis.org/oas/v3.0.4.html#header-object)  \\| [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)] |  Maps a header name to its definition. [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are case insensitive. If a response header is defined with the name `"Content-Type"`, it SHALL be ignored.\ncontent | Map[`string`, [Media Type Object](https://spec.openapis.org/oas/v3.0.4.html#media-type-object)] | A map containing descriptions of potential response payloads. The key is a media type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes it.  For responses that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*\nlinks | Map[`string`, [Link Object](https://spec.openapis.org/oas/v3.0.4.html#link-object) \\| [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)] | A map of operations links that can be followed from the response. The key of the map is a short name for the link, following the naming constraints of the names for [Component Objects](https://spec.openapis.org/oas/v3.0.4.html#components-object).\n\nThis object MAY be extended with [Specification Extensions](https://spec.openapis.org/oas/v3.0.4.html#specification-extensions).\n\n##### Response Object Examples\n\nResponse of an array of a complex type:\n\n\n\\\nJSON\n```json\n{\n  "description": "A complex object array response",\n  "content": {\n    "application/json": {\n      "schema": {\n        "type": "array",\n        "items": {\n          "$ref": "#/components/schemas/VeryComplexType"\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: A complex object array response\ncontent:\n  application/json:\n    schema:\n      type: array\n      items:\n        $ref: \'#/components/schemas/VeryComplexType\'\n```\n\nResponse with a string type:\n\n```json\n{\n  "description": "A simple string response",\n  "content": {\n    "text/plain": {\n      "schema": {\n        "type": "string"\n      }\n    }\n  }\n\n}\n```\n\n```yaml\ndescription: A simple string response\ncontent:\n  text/plain:\n    schema:\n      type: string\n```\n\nPlain text response with headers:\n\n```json\n{\n  "description": "A simple string response",\n  "content": {\n    "text/plain": {\n      "schema": {\n        "type": "string",\n        "example": "whoa!"\n      }\n    }\n  },\n  "headers": {\n    "X-Rate-Limit-Limit": {\n      "description": "The number of allowed requests in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    },\n    "X-Rate-Limit-Remaining": {\n      "description": "The number of remaining requests in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    },\n    "X-Rate-Limit-Reset": {\n      "description": "The number of seconds left in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    }\n  }\n}\n```\n\n```yaml\ndescription: A simple string response\ncontent:\n  text/plain:\n    schema:\n      type: string\n    example: \'whoa!\'\nheaders:\n  X-Rate-Limit-Limit:\n    description: The number of allowed requests in the current period\n    schema:\n      type: integer\n  X-Rate-Limit-Remaining:\n    description: The number of remaining requests in the current period\n    schema:\n      type: integer\n  X-Rate-Limit-Reset:\n    description: The number of seconds left in the current period\n    schema:\n      type: integer\n```\n\nResponse with no return value:\n\n```json\n{\n  "description": "object created"\n}\n```\n\n```yaml\ndescription: object created\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#response-object)\n\nDescribes a single response from an API Operation, including design-time, static links to operations based on the response.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | **REQUIRED**. A description of the response. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nheaders | Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | Maps a header name to its definition. [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are case insensitive. If a response header is defined with the name `"Content-Type"`, it SHALL be ignored.\ncontent | Map[`string`, [Media Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)] | A map containing descriptions of potential response payloads. The key is a media type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes it. For responses that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*\nlinks | Map[`string`, [Link Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#linkObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | A map of operations links that can be followed from the response. The key of the map is a short name for the link, following the naming constraints of the names for [Component Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject).\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Response Object Example\n\n\\\nResponse of an array of a complex type:\n\n\\\nJSON\n```json\n{\n  "description": "A complex object array response",\n  "content": {\n    "application/json": {\n      "schema": {\n        "type": "array",\n        "items": {\n          "$ref": "#/components/schemas/VeryComplexType"\n        }\n      }\n    }\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: A complex object array response\ncontent:\n  application/json:\n    schema:\n      type: array\n      items:\n        $ref: \'#/components/schemas/VeryComplexType\'\n```\n\n\\\nPlain text response with headers:\n\n\\\nJSON\n```json\n{\n  "description": "A simple string response",\n  "content": {\n    "text/plain": {\n      "schema": {\n        "type": "string"\n      }\n    }\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: A simple string response\ncontent:\n  text/plain:\n    schema:\n      type: string\n```\n\n\\\nResponse with a string type:\n\n\\\nJSON\n```json\n{\n  "description": "A simple string response",\n  "content": {\n    "text/plain": {\n      "schema": {\n        "type": "string",\n        "example": "whoa!"\n      }\n    }\n  },\n  "headers": {\n    "X-Rate-Limit-Limit": {\n      "description": "The number of allowed requests in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    },\n    "X-Rate-Limit-Remaining": {\n      "description": "The number of remaining requests in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    },\n    "X-Rate-Limit-Reset": {\n      "description": "The number of seconds left in the current period",\n      "schema": {\n        "type": "integer"\n      }\n    }\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: A simple string response\ncontent:\n  text/plain:\n    schema:\n      type: string\n    example: \'whoa!\'\nheaders:\n  X-Rate-Limit-Limit:\n    description: The number of allowed requests in the current period\n    schema:\n      type: integer\n  X-Rate-Limit-Remaining:\n    description: The number of remaining requests in the current period\n    schema:\n      type: integer\n  X-Rate-Limit-Reset:\n    description: The number of seconds left in the current period\n    schema:\n      type: integer\n```\n\n\\\nResponse with no return value:\n\n\\\nJSON\n```json\n{\n  "description": "object created"\n}\n```\n\n\\\nYAML\n```yaml\ndescription: object created\n```\n',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
