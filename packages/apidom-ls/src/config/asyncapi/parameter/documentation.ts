const documentation = [
  {
    target: 'description',
    docs: 'A verbose explanation of the parameter. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'location',
    docs: 'A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v2.5.0#runtimeExpression) that specifies the location of the parameter value. Even when a definition for the target field exists, it MUST NOT be used to validate this parameter but, instead, the `schema` property MUST be used.',
  },
  {
    target: 'schema',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)\n\\\n\\\nDefinition of the parameter.',
  },
  {
    target: '$ref',
    docs: 'A reference to a parameter.',
  },
  {
    docs: '#### [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#parameterObject)\n\nDescribes a parameter included in a channel name.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A verbose explanation of the parameter. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nschema | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject) | Definition of the parameter.\nlocation | `string` | A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v2.5.0#runtimeExpression) that specifies the location of the parameter value. Even when a definition for the target field exists, it MUST NOT be used to validate this parameter but, instead, the `schema` property MUST be used.\n\n\\\nThis object MAY be extendeded with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).\n\n##### Parameter Object Example\n\n\n\\\nJSON\n```json\n{\n  "user/{userId}/signup": {\n    "parameters": {\n      "userId": {\n        "description": "Id of the user.",\n        "schema": {\n          "type": "string"\n        },\n        "location": "$message.payload#/user/id"\n      }\n    },\n    "subscribe": {\n      "message": {\n        "$ref": "#/components/messages/userSignedUp"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nuser/{userId}/signup:\n  parameters:\n    userId:\n      description: Id of the user.\n      schema:\n        type: string\n      location: $message.payload#/user/id\n  subscribe:\n    message:\n      $ref: "#/components/messages/userSignedUp"\n```',
  },
];
export default documentation;
