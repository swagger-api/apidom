const documentation = [
  {
    target: 'description',
    docs: 'A brief description of the parameter. This could contain examples of use. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'required',
    docs: 'Determines whether this header is mandatory. This property MAY be included and its default value is `false`.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'deprecated',
    docs: 'Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is `false`.',
  },
  {
    target: 'allowEmptyValue',
    docs: 'Sets the ability to pass empty-valued headers.  Default value is `false`. If [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle) is used, and if behavior is `n/a` (cannot be serialized), the value of `allowEmptyValue` SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'style',
    docs: 'Describes how the header value will be serialized. Default value: `simple`.',
  },
  {
    target: 'explode',
    docs: 'When this is true, header values of type array or object generate separate headers for each value of the array or key-value pair of the map. The default value is `false`.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'allowReserved',
    docs: "Determines whether the header value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'()*+,;=` to be included without percent - encoding. This property has no effect and the default value is `false`.",
  },
  {
    target: 'example',
    docs: "Example of the header's potential value. The example SHOULD match the specified schema and encoding properties if present. The `example` field is mutually exclusive of the `examples` field. Furthermore, if referencing a `schema` that contains an example, the `example` value SHALL *override* the example provided by the schema. To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.",
  },
  {
    target: 'examples',
    docs: "Map[`string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nExamples of the parameter's potential value. Each example SHOULD contain a value in the correct format as specified in the header encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL *override* the example provided by the schema",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: '#### Header Object\n\nThe Header Object follows the structure of the [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) with the following changes:\n\n 1. `name` MUST NOT be specified, it is given in the corresponding `headers` map.\n  2. `in` MUST NOT be specified, it is implicitly in `header`.\n  3. All traits that are affected by the location MUST be applicable to a location of `header` (for example, [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle)).\n\n##### Header Object Example\n\n\\\nA simple header of type `integer`:\n\n\\\nJSON\n```json\n{\n  "description": "The number of allowed requests in the current period",\n  "schema": {\n    "type": "integer"\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: The number of allowed requests in the current period\nschema:\n  type: integer\n```\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
