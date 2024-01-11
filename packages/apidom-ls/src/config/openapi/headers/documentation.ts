import { OpenAPI2 } from '../target-specs';

const documentation = [
  {
    docs: '#### [Headers Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#headers-object)\n\nLists the headers that can be sent as part of a response.\n\n##### Patterned Fields\nField Pattern | Type | Description\n---|:---:|---\n{name} | [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#headerObject) | The name of the property corresponds to the name of the header. The value describes the type of the header.\n\n##### Headers Object Example\n\nRate-limit headers:\n\n```js\n{\n    "X-Rate-Limit-Limit": {\n        "description": "The number of allowed requests in the current period",\n        "type": "integer"\n    },\n    "X-Rate-Limit-Remaining": {\n        "description": "The number of remaining requests in the current period",\n        "type": "integer"\n    },\n    "X-Rate-Limit-Reset": {\n        "description": "The number of seconds left in the current period",\n        "type": "integer"\n    }\n}\n```\n\n\n\\\nYAML\n```yaml\nX-Rate-Limit-Limit:\n  description: The number of allowed requests in the current period\n  type: integer\nX-Rate-Limit-Remaining:\n  description: The number of remaining requests in the current period\n  type: integer\nX-Rate-Limit-Reset:\n  description: The number of seconds left in the current period\n  type: integer\n```',
    targetSpecs: OpenAPI2,
  },
];

export default documentation;
