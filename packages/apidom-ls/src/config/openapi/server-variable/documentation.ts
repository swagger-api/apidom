import { OpenAPI30, OpenAPI31, OpenAPI32, OpenAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'enum',
    docs: 'An enumeration of string values to be used if the substitution options are from a limited set. The array SHOULD NOT be empty.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'enum',
    docs: 'An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'enum',
    docs: 'An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.',
    targetSpecs: OpenAPI32,
  },
  {
    target: 'default',
    docs: "**REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://spec.openapis.org/oas/v3.0.4.html#schema-object) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://spec.openapis.org/oas/v3.0.4.html#server-variable-enum) is defined, the value SHOULD exist in the enum's values.",
    targetSpecs: OpenAPI30,
  },
  {
    target: 'default',
    docs: "**REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableEnum) is defined, the value MUST exist in the enum's values.",
    targetSpecs: OpenAPI31,
  },
  {
    target: 'default',
    docs: "**REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional. If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#serverVariableEnum) is defined, the value MUST exist in the enum's values.",
    targetSpecs: OpenAPI32,
  },
  {
    target: 'description',
    docs: 'An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    docs: "#### [Server Variable Object](https://spec.openapis.org/oas/v3.0.4.html#server-variable-object)\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set. The array SHOULD NOT be empty.\ndefault | `string` |  **REQUIRED**. The default value to use for substitution, which SHALL be sent if an alternate value is _not_ supplied. Note this behavior is different than the [Schema Object's](https://spec.openapis.org/oas/v3.0.4.html#schema-object) treatment of default values, because in those cases parameter values are optional. If the [`enum`](https://spec.openapis.org/oas/v3.0.4.html#server-variable-enum) is defined, the value SHOULD exist in the enum's values.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\n\nThis object MAY be extended with [Specification Extensions](https://spec.openapis.org/oas/v3.0.4.html#specification-extensions).",
    targetSpecs: OpenAPI30,
  },
  {
    docs: "#### [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject)\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.\ndefault | `string` | **REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableEnum) is defined, the value MUST exist in the enum's values.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n",
    targetSpecs: OpenAPI31,
  },
  {
    docs: "#### [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#serverVariableObject)\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.\ndefault | `string` | **REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional. If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#serverVariableEnum) is defined, the value MUST exist in the enum's values.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#specificationExtensions).\n\n",
    targetSpecs: OpenAPI32,
  },
];

export default documentation;
