const documentation = [
  {
    target: 'enum',
    docs: 'An enumeration of string values to be used if the substitution options are from a limited set. The array SHOULD NOT be empty.',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'enum',
    docs: 'An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'default',
    docs: "**REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableEnum) is defined, the value SHOULD exist in the enum's values.",
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'default',
    docs: "**REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableEnum) is defined, the value MUST exist in the enum's values.",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'description',
    docs: 'An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    docs: "#### [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverVariableObject)\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set. The array SHOULD NOT be empty.\ndefault | `string` |  **REQUIRED**. The default value to use for substitution, which SHALL be sent if an alternate value is _not_ supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) treatment of default values, because in those cases parameter values are optional. If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverVariableEnum) is defined, the value SHOULD exist in the enum's values.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).",
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    docs: "#### [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject)\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.\ndefault | `string` | **REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableEnum) is defined, the value MUST exist in the enum's values.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
