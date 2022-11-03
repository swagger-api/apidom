const documentation = [
  {
    target: 'description',
    docs: 'A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'location',
    docs: '**REQUIRED.** A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v2.5.0#runtimeExpression) that specifies the location of the correlation ID.',
  },
  {
    docs: '#### [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#correlationIdObject)\n\nAn object that specifies an identifier at design time that can used for message tracing and correlation.\n\nFor specifying and computing the location of a Correlation ID, a [runtime expression](https://www.asyncapi.com/docs/reference/specification/v2.5.0#runtimeExpression) is used.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---|---\ndescription | `string` | An optional description of the identifier. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nlocation | `string` | **REQUIRED.** A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v2.5.0#runtimeExpression) that specifies the location of the correlation ID.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).\n\n##### Examples\n\n\n\\\nJSON\n```json\n{\n  "description": "Default Correlation ID",\n  "location": "$message.header#/correlationId"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Default Correlation ID\nlocation: $message.header#/correlationId\n```',
  },
  {
    target: '$ref',
    docs: 'A reference to a correlation ID.',
  },
];
export default documentation;
