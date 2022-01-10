const parameterDocs = [
  {
    target: 'description',
    docs: 'A verbose explanation of the parameter. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'location',
    docs: 'A [runtime expression](https://www.asyncapi.com/docs/specifications/v2.2.0#runtimeExpression) that specifies the location of the parameter value. Even when a definition for the target field exists, it **MUST NOT** be used to validate this parameter but, instead, the `schema` property **MUST** be used.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
  {
    target: 'schema',
    docs: '[Schema Object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.2.0#referenceObject)\n\n ---- \n\nDefinition of the parameter.',
  },
  {
    target: '$ref',
    docs: 'A reference to a parameter.',
  },
];
export default parameterDocs;
