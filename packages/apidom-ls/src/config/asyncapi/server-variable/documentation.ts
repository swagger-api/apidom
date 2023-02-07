const documentation = [
  {
    target: 'enum',
    docs: 'An enumeration of string values to be used if the substitution options are from a limited set.',
  },
  {
    target: 'default',
    docs: 'The default value to use for substitution, and to send, if an alternate value is not supplied.',
  },
  {
    target: 'description',
    docs: 'An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) **MAY** be used for rich text representation.',
  },
  {
    target: 'examples',
    docs: 'An array of examples of the server variable.',
  },
  {
    docs: '#### [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject)\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set.\ndefault | `string` | The default value to use for substitution, and to send, if an alternate value is _not_ supplied.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexamples | [`string`] | An array of examples of the server variable.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).',
  },
];
export default documentation;
