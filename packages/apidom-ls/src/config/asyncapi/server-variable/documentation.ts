import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'enum',
    docs: 'An enumeration of string values to be used if the substitution options are from a limited set.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'default',
    docs: 'The default value to use for substitution, and to send, if an alternate value is not supplied.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'description',
    docs: 'An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) **MAY** be used for rich text representation.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'examples',
    docs: 'An array of examples of the server variable.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    docs: '#### [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject)\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set.\ndefault | `string` | The default value to use for substitution, and to send, if an alternate value is _not_ supplied.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexamples | [`string`] | An array of examples of the server variable.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject)\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set.\ndefault | `string` | The default value to use for substitution, and to send, if an alternate value is _not_ supplied.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexamples | [`string`] | An array of examples of the server variable.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#specificationExtensions).',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
