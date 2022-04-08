const operationDocs = [
  {
    target: 'operationId',
    docs: 'Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.',
  },
  {
    target: 'summary',
    docs: 'A short summary of what the operation is about.',
  },
  {
    target: 'description',
    docs: 'A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'tags',
    docs: '[Tags Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageBindingsObject#tagsObject)\n\\\n\\\nA list of tags for API documentation control. Tags can be used for logical grouping of operations.',
  },
  {
    target: 'externalDocs',
    docs: '[External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.3.0#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this operation.',
  },
  {
    target: 'bindings',
    docs: '[Operation Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.',
  },
  {
    target: 'traits',
    docs: '[[Operation Trait Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) ]\n\\\n\\\nA list of traits to apply to the operation object. Traits MUST be merged into the operation object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here.',
  },
  {
    target: 'message',
    docs: '[Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) &#124; Map["oneOf", [[Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]]\n\\\n\\\nA definition of the message that will be published or received by this operation. Map containing a single `oneOf` key is allowed here to specify multiple messages. However, **a message MUST be valid only against one of the message objects.**',
  },
  {
    docs: '#### Operation Object\n\nDescribes a publish or a subscribe operation. This provides a place to document how and why messages are sent and received.\n\\\n\\\nFor example, an operation might describe a chat application use case where a user sends a text message to a group. A publish operation describes messages that are received by the chat application, whereas a subscribe operation describes messages that are sent by the chat application.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\noperationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\nsummary | `string` | A short summary of what the operation is about.\ndescription | `string` | A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\ntags | [Tags Object](https://www.asyncapi.com/docs/specifications/v2.3.0#tagsObject) | A list of tags for API documentation control. Tags can be used for logical grouping of operations.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.3.0#externalDocumentationObject) | Additional external documentation for this operation.\nbindings | [Operation Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.\ntraits | [[Operation Trait Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationTraitObject) &#124; [Reference Object](#referenceObject) ] | A list of traits to apply to the operation object. Traits MUST be merged into the operation object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here.\nmessage | [Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) &#124; Map["oneOf", [[Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]] | A definition of the message that will be published or received by this operation. Map containing a single `oneOf` key is allowed here to specify multiple messages. However, **a message MUST be valid only against one of the message objects.**\n\n\\\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions).\n\n##### Operation Object Example\n\n```json\n{\n  "operationId": "registerUser",\n  "summary": "Action to sign a user up.",\n  "description": "A longer description",\n  "tags": [\n    { "name": "user" },\n    { "name": "signup" },\n    { "name": "register" }\n  ],\n  "message": {\n    "headers": {\n      "type": "object",\n      "properties": {\n        "applicationInstanceId": {\n          "description": "Unique identifier for a given instance of the publishing application",\n          "type": "string"\n        }\n      }\n    },\n    "payload": {\n      "type": "object",\n      "properties": {\n        "user": {\n          "$ref": "#/components/schemas/userCreate"\n        },\n        "signup": {\n          "$ref": "#/components/schemas/signup"\n        }\n      }\n    }\n  },\n  "bindings": {\n    "amqp": {\n      "ack": false\n    }\n  },\n  "traits": [\n    { "$ref": "#/components/operationTraits/kafka" }\n  ]\n}\n```\n\n```yaml\noperationId: registerUser\nsummary: Action to sign a user up.\ndescription: A longer description\ntags:\n  - name: user\n  - name: signup\n  - name: register\nmessage:\n  headers:\n    type: object\n    properties:\n      applicationInstanceId:\n        description: Unique identifier for a given instance of the publishing application\n        type: string\n  payload:\n    type: object\n    properties:\n      user:\n        $ref: "#/components/schemas/userCreate"\n      signup:\n        $ref: "#/components/schemas/signup"\nbindings:\n  amqp:\n    ack: false\ntraits:\n  - $ref: "#/components/operationTraits/kafka"\n```',
  },
];
export default operationDocs;
