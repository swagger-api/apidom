import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'enum',
    docs: '`[string]`\n\\\n\\\nAn enumeration of string values to be used if the substitution options are from a limited set.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'default',
    docs: '`string`\n\\\n\\\nThe default value to use for substitution, and to send, if an alternate value is not supplied.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'description',
    docs: 'A verbose explanation of the parameter. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'examples',
    docs: '`[string]`\n\\\n\\\nAn array of examples of the parameter value.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'location',
    docs: 'A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v2.6.0#runtimeExpression) that specifies the location of the parameter value. Even when a definition for the target field exists, it MUST NOT be used to validate this parameter but, instead, the `schema` property MUST be used.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'location',
    docs: '`string`\n\\\n\\\nA [runtime expression](https://www.asyncapi.com/docs/reference/specification/v3.0.0#runtimeExpression) that specifies the location of the parameter value.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'schema',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nDefinition of the parameter.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: '$ref',
    docs: 'A reference to a parameter.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    docs: '#### [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parameterObject)\n\nDescribes a parameter included in a channel name.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A verbose explanation of the parameter. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nschema | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | Definition of the parameter.\nlocation | `string` | A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v2.6.0#runtimeExpression) that specifies the location of the parameter value. Even when a definition for the target field exists, it MUST NOT be used to validate this parameter but, instead, the `schema` property MUST be used.\n\n\\\nThis object MAY be extendeded with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\n##### Parameter Object Example\n\n\n\\\nJSON\n```json\n{\n  "user/{userId}/signup": {\n    "parameters": {\n      "userId": {\n        "description": "Id of the user.",\n        "schema": {\n          "type": "string"\n        },\n        "location": "$message.payload#/user/id"\n      }\n    },\n    "subscribe": {\n      "message": {\n        "$ref": "#/components/messages/userSignedUp"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nuser/{userId}/signup:\n  parameters:\n    userId:\n      description: Id of the user.\n      schema:\n        type: string\n      location: $message.payload#/user/id\n  subscribe:\n    message:\n      $ref: "#/components/messages/userSignedUp"\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject)\n\nDescribes a parameter included in a channel address.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | `[string]` | An enumeration of string values to be used if the substitution options are from a limited set.\ndefault | `string` | The default value to use for substitution, and to send, if an alternate value is not supplied.\ndescription | `string` | An optional description for the parameter. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nexamples | `[string]` | An array of examples of the parameter value.\nlocation | `string` | A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v3.0.0#runtimeExpression) that specifies the location of the parameter value.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#specificationExtensions).\n\n##### Parameter Object Example\n\n\n\\\nJSON\n```json\n{\n  "address": "user/{userId}/signedup",\n  "parameters": {\n    "userId": {\n      "description": "Id of the user.",\n      "examples": [\n        "123",\n        "456"\n      ],\n      "location": "$message.payload#/user/id"\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\naddress: user/{userId}/signedup\nparameters:\n  userId:\n    description: Id of the user.\n    examples:\n      - \'123\'\n      - \'456\'\n    location: $message.payload#/user/id\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
