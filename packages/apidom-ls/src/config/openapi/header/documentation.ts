const documentation = [
  // todo: copy the paramter targets with the required changes.
  // but: should we copy & replace `parameter` text with `header`?
  // and do we remove links, even though there isn't a direct equivalent for the header docs?
  {
    // this "raw" doc wouldn't appear anywhere in Docs. always part of a Map
    // Link expect a link name e.g. `address` # the target link operationId
    // Media-Type expect something like `application/json`
    // Callback expect a callback name e.g. `myCallback`
    // Encoding ok.
    docs: '#### Header Object\n\nThe Header Object follows the structure of the [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) with the following changes:\n\n 1. `name` MUST NOT be specified, it is given in the corresponding `headers` map.\n  2. `in` MUST NOT be specified, it is implicitly in `header`.\n  3. All traits that are affected by the location MUST be applicable to a location of `header` (for example, [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle)).\n\n##### Header Object Example\n\n\\\nA simple header of type `integer`:\n\n\\\nJSON\n```json\n{\n  "description": "The number of allowed requests in the current period",\n  "schema": {\n    "type": "integer"\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: The number of allowed requests in the current period\nschema:\n  type: integer\n```\n',
  },
];

export default documentation;
