import { OpenAPI2 } from '../target-specs';

const documentation = [
  {
    docs: '#### [Responses Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#responsesDefinitionsObject)\n\nAn object to hold responses to be reused across operations. Response definitions can be referenced to the ones defined here.\n\nThis does *not* define global operation responses.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n{name} | [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#responseObject) | A single response definition, mapping a "name" to the response it defines.\n\n##### Responses Definitions Object Example\n\n```js\n{\n  "NotFound": {\n    "description": "Entity not found."\n  },\n  "IllegalInput": {\n  \t"description": "Illegal input for operation."\n  },\n  "GeneralError": {\n  \t"description": "General Error",\n  \t"schema": {\n  \t\t"$ref": "#/definitions/GeneralError"\n  \t}\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nNotFound:\n  description: Entity not found.\nIllegalInput:\n  description: Illegal input for operation.\nGeneralError:\n  description: General Error\n  schema:\n    $ref: \'#/definitions/GeneralError\'\n```',
    targetSpecs: OpenAPI2,
  },
];

export default documentation;
