import { OpenAPI2 } from '../target-specs';

const documentation = [
  {
    docs: '#### [Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#definitions-object)\n\nAn object to hold data types that can be consumed and produced by operations. These data types can be primitives, arrays or models.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n{name} | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schemaObject) | A single definition, mapping a "name" to the schema it defines.\n\n##### Definitions Object Example\n\n```js\n{\n  "Category": {\n    "type": "object",\n    "properties": {\n      "id": {\n        "type": "integer",\n        "format": "int64"\n      },\n      "name": {\n        "type": "string"\n      }\n    }\n  },\n  "Tag": {\n    "type": "object",\n    "properties": {\n      "id": {\n        "type": "integer",\n        "format": "int64"\n      },\n      "name": {\n        "type": "string"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nCategory:\n  type: object\n  properties:\n    id:\n      type: integer\n      format: int64\n    name:\n      type: string\nTag:\n  type: object\n  properties:\n    id:\n      type: integer\n      format: int64\n    name:\n      type: string\n```',
    targetSpecs: OpenAPI2,
  },
];

export default documentation;
