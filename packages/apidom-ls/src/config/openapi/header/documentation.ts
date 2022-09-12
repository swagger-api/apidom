const documentation = [
  {
    docs: '#### Header Object\n\nThe Header Object follows the structure of the [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) with the following changes:\n\n 1. `name` MUST NOT be specified, it is given in the corresponding `headers` map.\n  2. `in` MUST NOT be specified, it is implicitly in `header`.\n  3. All traits that are affected by the location MUST be applicable to a location of `header` (for example, [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle)).\n\n##### Header Object Example\n\n\\\nA simple header of type `integer`:\n\n\\\nJSON\n```json\n{\n  "description": "The number of allowed requests in the current period",\n  "schema": {\n    "type": "integer"\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: The number of allowed requests in the current period\nschema:\n  type: integer\n```\n',
  },
];

export default documentation;
