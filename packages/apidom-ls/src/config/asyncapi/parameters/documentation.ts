import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    docs: '#### [Parameters Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parametersObject)\n\nDescribes a map of parameters included in a channel name.\n\\\n\\\nThis map MUST contain all the parameters used in the parent channel name.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n`^[A-Za-z0-9_\\-]+$` | [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parameterObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | The key represents the name of the parameter. It MUST match the parameter name used in the parent channel name.\n\n##### Parameters Object Example\n\n\n\\\nJSON\n```json\n{\n  "user/{userId}/signup": {\n    "parameters": {\n      "userId": {\n        "description": "Id of the user.",\n        "schema": {\n          "type": "string"\n        }\n      }\n    },\n    "subscribe": {\n      "message": {\n        "$ref": "#/components/messages/userSignedUp"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nuser/{userId}/signup:\n  parameters:\n    userId:\n      description: Id of the user.\n      schema:\n        type: string\n  subscribe:\n    message:\n      $ref: "#/components/messages/userSignedUp"\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Parameters Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parametersObject)\n\nDescribes a map of parameters included in a channel address.\n\\\n\\\nThis map MUST contain all the parameters used in the parent channel address.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n`^[A-Za-z0-9_\\-]+$` | [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | The key represents the name of the parameter. It MUST match the parameter name used in the parent channel address.\n\n##### Parameters Object Example\n\n\n\\\nJSON\n```json\n{\n  "address": "user/{userId}/signedup",\n  "parameters": {\n    "userId": {\n      "description": "Id of the user."\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\naddress: user/{userId}/signedup\nparameters:\n  userId:\n    description: Id of the user.\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
