import { OpenAPI2 } from '../target-specs';

const documentation = [
  {
    docs: '#### [Parameters Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md)\n\nAn object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.\n\nThis does *not* define global operation parameters.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n{name} | [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterObject) | A single parameter definition, mapping a "name" to the parameter it defines.\n\n##### Parameters Definition Object Example\n\n```js\n{\n  "skipParam": {\n    "name": "skip",\n    "in": "query",\n    "description": "number of items to skip",\n    "required": true,\n    "type": "integer",\n    "format": "int32"\n  },\n  "limitParam": {\n    "name": "limit",\n    "in": "query",\n    "description": "max records to return",\n    "required": true,\n    "type": "integer",\n    "format": "int32"\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nskipParam:\n  name: skip\n  in: query\n  description: number of items to skip\n  required: true\n  type: integer\n  format: int32\nlimitParam:\n  name: limit\n  in: query\n  description: max records to return\n  required: true\n  type: integer\n  format: int32\n```',
    targetSpecs: OpenAPI2,
  },
];

export default documentation;
