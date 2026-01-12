import { AsyncAPI2, AsyncAPI3 } from "../target-specs.ts";

const documentation = [
  {
    docs: '#### [Channels Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelsObject)\n\nHolds the relative paths to the individual channel and their operations. Channel paths are relative to servers.\n\\\n\\\nChannels are also known as "topics", "routing keys", "event types" or "paths".\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n{channel} | [Channel Item Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelItemObject) | A relative path to an individual channel. The field name MUST be in the form of a [RFC 6570 URI template](https://tools.ietf.org/html/rfc6570). Query parameters and fragments SHALL NOT be used, instead use [bindings](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelBindingsObject) to define them.\n\n##### Channels Object Example\n\n\n\\\nJSON\n```json\n{\n  "user/signedup": {\n    "subscribe": {\n      "message": {\n        "$ref": "#/components/messages/userSignedUp"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nuser/signedup:\n  subscribe:\n    message:\n      $ref: "#/components/messages/userSignedUp"\n```',
    targetSpecs: AsyncAPI2
  },

  {
    docs: '#### [Channels Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelsObject)\n\n\nAn identifier for the described channel. The channelId value is case-sensitive. Tools and libraries MAY use the channelId to uniquely identify a channel, therefore, it is RECOMMENDED to follow common programming naming conventions.\n\n##### Channels Object Example\n\n\n\\\nJSON\n```json\n{\n  "userSignedUp": {\n    "address": "user.signedup",\n    "messages": {\n      "userSignedUp": {\n        "$ref": "#/components/messages/userSignedUp"\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nuserSignedUp:\n  address: \'user.signedup\'\n  messages:\n    userSignedUp:\n      $ref: \'#/components/messages/userSignedUp\'\n```',
    targetSpecs: AsyncAPI3
  }
];
export default documentation;
