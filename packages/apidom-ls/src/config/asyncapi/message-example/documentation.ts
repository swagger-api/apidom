import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'headers',
    docs: "Map[string, any]\\\n\\\nThe value of this field MUST validate against the [Message Object's headers](https://www.asyncapi.com/docs/reference/specification/v2.6.0##messageObjectHeaders) field.",
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'headers',
    docs: "Map[string, any]\\\n\\\nThe value of this field MUST validate against the [Message Object's headers](https://www.asyncapi.com/docs/reference/specification/v3.0.0##messageObjectHeaders) field.",
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'payload',
    docs: "`any`\\\n\\\nThe value of this field MUST validate against the [Message Object's payload](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectPayload) field.",
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'payload',
    docs: "`any`\\\n\\\nThe value of this field MUST validate against the [Message Object's payload](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObjectPayload) field.",
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'name',
    docs: 'A machine-friendly name.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'summary',
    docs: 'A short summary of what the example is about.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    docs: '#### [Message Example Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageExampleObject)\n\nMessage Example Object represents an example of a [Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject) and MUST contain either **headers** and/or **payload** fields.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nheaders | `Map[string, any]` | The value of this field MUST validate against the [Message Object\'s headers](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectHeaders) field.\npayload | `any` | The value of this field MUST validate against the [Message Object\'s payload](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectPayload) field.\nname | `string` | A machine-friendly name.\nsummary | `string` |  A short summary of what the example is about.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\n##### Message Example Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "SimpleSignup",\n  "summary": "A simple UserSignup example message",\n  "headers": {\n    "correlationId": "my-correlation-id",\n    "applicationInstanceId": "myInstanceId"\n  },\n  "payload": {\n    "user": {\n      "someUserKey": "someUserValue"\n    },\n    "signup": {\n      "someSignupKey": "someSignupValue"\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nname: SimpleSignup\nsummary: A simple UserSignup example message\nheaders:\n  correlationId: my-correlation-id\n  applicationInstanceId: myInstanceId\npayload:\n  user:\n    someUserKey: someUserValue\n  signup:\n    someSignupKey: someSignupValue\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Message Example Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageExampleObject)\n\nMessage Example Object represents an example of a [Message Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject) and MUST contain either **headers** and/or **payload** fields.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nheaders | `Map[string, any]` | The value of this field MUST validate against the [Message Object\'s headers](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObjectHeaders) field.\npayload | `any` | The value of this field MUST validate against the [Message Object\'s payload](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObjectPayload) field.\nname | `string` | A machine-friendly name.\nsummary | `string` |  A short summary of what the example is about.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#specificationExtensions).\n\n##### Message Example Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "SimpleSignup",\n  "summary": "A simple UserSignup example message",\n  "headers": {\n    "correlationId": "my-correlation-id",\n    "applicationInstanceId": "myInstanceId"\n  },\n  "payload": {\n    "user": {\n      "someUserKey": "someUserValue"\n    },\n    "signup": {\n      "someSignupKey": "someSignupValue"\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nname: SimpleSignup\nsummary: A simple UserSignup example message\nheaders:\n  correlationId: my-correlation-id\n  applicationInstanceId: myInstanceId\npayload:\n  user:\n    someUserKey: someUserValue\n  signup:\n    someSignupKey: someSignupValue\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
