const documentation = [
  {
    target: 'headers',
    docs: "Map[string, any]\\\n\\\nThe value of this field MUST validate against the [Message Object's headers](https://www.asyncapi.com/docs/reference/specification/v2.6.0##messageObjectHeaders) field.",
  },
  {
    target: 'payload',
    docs: "`any`\\\n\\\nThe value of this field MUST validate against the [Message Object's payload](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectPayload) field.",
  },
  {
    target: 'name',
    docs: 'A machine-friendly name.',
  },
  {
    target: 'summary',
    docs: 'A short summary of what the example is about.',
  },
  {
    docs: '#### [Message Example Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageExampleObject)\n\nMessage Example Object represents an example of a [Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject) and MUST contain either **headers** and/or **payload** fields.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nheaders | `Map[string, any]` | The value of this field MUST validate against the [Message Object\'s headers](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectHeaders) field.\npayload | `any` | The value of this field MUST validate against the [Message Object\'s payload](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectPayload) field.\nname | `string` | A machine-friendly name.\nsummary | `string` |  A short summary of what the example is about.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\n##### Message Example Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "SimpleSignup",\n  "summary": "A simple UserSignup example message",\n  "headers": {\n    "correlationId": "my-correlation-id",\n    "applicationInstanceId": "myInstanceId"\n  },\n  "payload": {\n    "user": {\n      "someUserKey": "someUserValue"\n    },\n    "signup": {\n      "someSignupKey": "someSignupValue"\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nname: SimpleSignup\nsummary: A simple UserSignup example message\nheaders:\n  correlationId: my-correlation-id\n  applicationInstanceId: myInstanceId\npayload:\n  user:\n    someUserKey: someUserValue\n  signup:\n    someSignupKey: someSignupValue\n```',
  },
];
export default documentation;
