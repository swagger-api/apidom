/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  console.log(JSON.stringify(str.trim().replace(/(\r\n|\n|\r)/gm, '\n')));
};

transform(
  `#### Operation Object

Describes a publish or a subscribe operation. This provides a place to document how and why messages are sent and received.
\\
\\
For example, an operation might describe a chat application use case where a user sends a text message to a group. A publish operation describes messages that are received by the chat application, whereas a subscribe operation describes messages that are sent by the chat application.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
operationId | \`string\` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.
summary | \`string\` | A short summary of what the operation is about.
description | \`string\` | A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.
tags | [Tags Object](https://www.asyncapi.com/docs/specifications/v2.3.0#tagsObject) | A list of tags for API documentation control. Tags can be used for logical grouping of operations.
externalDocs | [External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.3.0#externalDocumentationObject) | Additional external documentation for this operation.
bindings | [Operation Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.
traits | [[Operation Trait Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationTraitObject) &#124; [Reference Object](#referenceObject) ] | A list of traits to apply to the operation object. Traits MUST be merged into the operation object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here.
message | [Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) &#124; Map["oneOf", [[Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]] | A definition of the message that will be published or received by this operation. Map containing a single \`oneOf\` key is allowed here to specify multiple messages. However, **a message MUST be valid only against one of the message objects.**

\\
This object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions).

##### Operation Object Example

\`\`\`json
{
  "operationId": "registerUser",
  "summary": "Action to sign a user up.",
  "description": "A longer description",
  "tags": [
    { "name": "user" },
    { "name": "signup" },
    { "name": "register" }
  ],
  "message": {
    "headers": {
      "type": "object",
      "properties": {
        "applicationInstanceId": {
          "description": "Unique identifier for a given instance of the publishing application",
          "type": "string"
        }
      }
    },
    "payload": {
      "type": "object",
      "properties": {
        "user": {
          "$ref": "#/components/schemas/userCreate"
        },
        "signup": {
          "$ref": "#/components/schemas/signup"
        }
      }
    }
  },
  "bindings": {
    "amqp": {
      "ack": false
    }
  },
  "traits": [
    { "$ref": "#/components/operationTraits/kafka" }
  ]
}
\`\`\`

\`\`\`yaml
operationId: registerUser
summary: Action to sign a user up.
description: A longer description
tags:
  - name: user
  - name: signup
  - name: register
message:
  headers:
    type: object
    properties:
      applicationInstanceId:
        description: Unique identifier for a given instance of the publishing application
        type: string
  payload:
    type: object
    properties:
      user:
        $ref: "#/components/schemas/userCreate"
      signup:
        $ref: "#/components/schemas/signup"
bindings:
  amqp:
    ack: false
traits:
  - $ref: "#/components/operationTraits/kafka"
\`\`\``,
);
