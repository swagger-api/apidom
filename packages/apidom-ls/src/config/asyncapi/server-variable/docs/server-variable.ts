const serverVariableDocs = [
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
    docs: 'An array of examples of the server variable.\n\n ---- \n\nThis object **MAY** be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
  {
    docs: 'An object representing a Server Variable for server URL template substitution.\n\n ---- \n\nThis object **MAY** be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
];
export default serverVariableDocs;
