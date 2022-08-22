const documentation = [
  {
    target: 'enum',
    docs: 'An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.',
  },
  {
    target: 'default',
    docs: "**REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is not supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableEnum) is defined, the value MUST exist in the enum's values.",
  },
  {
    target: 'description',
    docs: 'An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    // todo: add the full list of "Fixed Fields" table
    // also: This object MAY be extended with Specification Extensions.
    docs: '#### [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject)\n\nAn object representing a Server Variable for server URL template substitution.',
  },
];

export default documentation;
