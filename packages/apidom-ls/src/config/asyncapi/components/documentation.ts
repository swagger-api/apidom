import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'schemas',
    docs: 'Map[`string`, [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Schema Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'schemas',
    docs: 'Map[`string`, [Multi Format Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObject) | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable Schema Object. If this is a Schema Object, then the schemaFormat will be assumed to be "application/vnd.aai.asyncapi+json;version=asyncapi" where the version is equal to the AsyncAPI Version String.    ',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'servers',
    docs: 'Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject).',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'servers',
    docs: 'Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable[Server Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'serverVariables',
    docs: 'Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Variable Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'serverVariables',
    docs: 'Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Variable Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'channels',
    docs: 'Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'channels',
    docs: 'Map[`string`, [Channel Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Channel Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'messages',
    docs: 'Map[`string`, [Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'messages',
    docs: 'Map[`string`, [Message Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'securitySchemes',
    docs: 'Map[`string`, [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securitySchemeObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securitySchemeObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'securitySchemes',
    docs: 'Map[`string`, [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Security Scheme Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'parameters',
    docs: 'Map[`string`, [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parameterObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Parameter Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parameterObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'parameters',
    docs: 'Map[`string`, [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject) or [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Parameter Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'correlationIds',
    docs: 'Map[`string`, [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#correlationIdObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Correlation ID Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#correlationIdObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'correlationIds',
    docs: 'Map[`string`, [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#correlationIdObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Correlation ID Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#correlationIdObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'operationTraits',
    docs: 'Map[`string`, [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Trait Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'operationTraits',
    docs: 'Map[`string`, [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Trait Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'messageTraits',
    docs: 'Map[`string`, [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Trait Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageTraitObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'messageTraits',
    docs: 'Map[`string`, [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Trait Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'serverBindings',
    docs: 'Map[`string`, [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'serverBindings',
    docs: 'Map[`string`, [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverBindingsObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'channelBindings',
    docs: 'Map[`string`, [Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Channel Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelBindingsObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'channelBindings',
    docs: 'Map[`string`, [Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nDefines a collection of reusable [Channel Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelBindingsObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'operationBindings',
    docs: 'Map[`string`, [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'operationBindings',
    docs: 'Map[`string`, [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'messageBindings',
    docs: 'Map[`string`, [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject).',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'messageBindings',
    docs: 'Map[`string`, [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageBindingsObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'replies',
    docs: 'Map[`string`, [Operation Reply Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Reply Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'replyAddresses',
    docs: 'Map[`string`, [Operation Reply Address Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Reply Address Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'tags',
    docs: 'Map[`string`, [Tag Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Tag Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'externalDocs',
    docs: 'Map[`string`, [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [External Documentation Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject).',
    targetSpecs: AsyncAPI3,
  },
  {
    docs: '#### [Components Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#componentsObject)\n\nHolds a set of reusable objects for different aspects of the AsyncAPI specification.\nAll objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---|---\nschemas | Map[`string`, [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)] | An object to hold reusable [Schema Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject).\nservers | Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)] | An object to hold reusable [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject).\nserverVariables | Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)] | An object to hold reusable [Server Variable Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject).\nchannels | Map[`string`, [Channel Item Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelItemObject)] | An object to hold reusable [Channel Item Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelItemObject).\nmessages | Map[`string`, [Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)] | An object to hold reusable [Message Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject).\nsecuritySchemes| Map[`string`, [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securitySchemeObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)] | An object to hold reusable [Security Scheme Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securitySchemeObject).\nparameters | Map[`string`, [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parameterObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)] | An object to hold reusable [Parameter Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parameterObject).\ncorrelationIds | Map[`string`, [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#correlationIdObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)] | An object to hold reusable [Correlation ID Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#correlationIdObject).\noperationTraits | Map[`string`, [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]  | An object to hold reusable [Operation Trait Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject).\nmessageTraits | Map[`string`, [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageTraitObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]  | An object to hold reusable [Message Trait Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageTraitObject).\nserverBindings | Map[`string`, [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]  | An object to hold reusable [Server Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject).\nchannelBindings | Map[`string`, [Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]  | An object to hold reusable [Channel Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelBindingsObject).\noperationBindings | Map[`string`, [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]  | An object to hold reusable [Operation Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject).\nmessageBindings | Map[`string`, [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]  | An object to hold reusable [Message Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject).\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\\\n\\\nAll the fixed fields declared above are objects that MUST use keys that match the regular expression: `^[a-zA-Z0-9\\.\\-_]+$`.\n\\\n\\\nField Name Examples:\n\n```\nUser\nUser_1\nUser_Name\nuser-name\nmy.org.User\n```\n\n##### Components Object Example\n\n\n\\\nJSON\n\n\\\nJSON\n```json\n{\n  "components": {\n    "schemas": {\n      "Category": {\n        "type": "object",\n        "properties": {\n          "id": {\n            "type": "integer",\n            "format": "int64"\n          },\n          "name": {\n            "type": "string"\n          }\n        }\n      },\n      "Tag": {\n        "type": "object",\n        "properties": {\n          "id": {\n            "type": "integer",\n            "format": "int64"\n          },\n          "name": {\n            "type": "string"\n          }\n        }\n      }\n    },\n    "servers": {\n      "development": {\n        "url": "development.gigantic-server.com",\n        "description": "Development server",\n        "protocol": "amqp",\n        "protocolVersion": "0.9.1"\n      }\n    },\n    "channels": {\n      "user/signedupages/userSignUp"\n          }\n        }\n      }\n    },\n    "messages": {\n      "userSignUp": {\n        "summary": "Action to sign a user up.",\n        "description": "Multiline description of what this action does.\\nHere you have another line.\\n",\n        "tags": [\n          {\n            "name": "user"\n          },\n          {\n            "name": "signup"\n          }\n        ],\n        "headers": {\n          "type": "object",\n          "properties": {\n            "applicationInstanceId": {\n              "description": "Unique identifier for a given instance of the publishing application",\n              "type": "string"\n            }\n          }\n        },\n        "payload": {\n          "type": "object",\n          "properties": {\n            "user": {\n              "$ref": "#/components/schemas/userCreate"\n            },\n            "signup": {\n              "$ref": "#/components/schemas/signu: {\n        "description": "Id of the user.",\n        "schema": {\n          "type": "string"\n        }\n      }\n    },\n    "correlationIds": {\n      "default": {\n        "description": "Default Correlation ID",\n        "location": "$message.header#/correlationId"\n      }\n    },\n    "messageTraits": {\n      "commonHeaders": {\n        "headers": {\n          "type": "object",\n          "properties": {\n            "my-app-header": {\n              "type": "integer",\n              "minimum": 0,\n              "maximum": 100\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n\n\\\nYAML\n```yaml\ncomponents:\n  schemas:\n    Category:\n      type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n        name:\n          type: string\n    Tag:\n      type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n        name:\n          type: string\n  servers:\n    development:\n      url: development.gigantic-server.com\n      description: Development server\n      protocol: amqp\n      protocolVersion: 0.9.1\n  channels:\n    user/signedup:\n      subscribe:\n        message:\n          $ref: "#/components/messages/userSignUp"\n  messages:\n    userSignUp:\n      summary: Action to sign a user up.\n      description: |\n        Multiline description of what this action does.\n        Here you have another line.\n      tags:\n        - name: user\n        - name: signup\n      headers:\n        type: object\n        properties:\n          applicationInstanceId:\n            description: Unique identifier for a given instance of the publishing application\n            type: string\n      payload:\n        type: object\n        properties:\n          user:\n            $ref: "#/components/schemas/userCreate"\n          signup:\n            $ref: "#/components/schemas/signup"\n  parameters:\n    userId:\n      description: Id of the user.\n      schema:\n        type: string\n  correlationIds:\n    default:\n      description: Default Correlation ID\n      location: $message.header#/correlationId\n  messageTraits:\n    commonHeaders:\n      headers:\n        type: object\n        properties:\n          my-app-header:\n            type: integer\n            minimum: 0\n            maximum: 100\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Components Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#componentsObject)\n\nHolds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---|---\nschemas | Map[`string`, [Multi Format Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObject) \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable Schema Object. If this is a Schema Object, then the schemaFormat will be assumed to be "application/vnd.aai.asyncapi+json;version=asyncapi" where the version is equal to the AsyncAPI Version String.\nservers | Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Server Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject).\nchannels | Map[`string`, [Channel Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Channel Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject).\noperations | Map[`string`, [Operation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Operation Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject).\nmessages | Map[`string`, [Message Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Message Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject).\nsecuritySchemes | Map[`string`, [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Security Scheme Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject).\nserverVariables | Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Server Variable Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject).\nparameters | Map[`string`, [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Parameter Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject).\ncorrelationIds | Map[`string`, [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#correlationIdObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Correlation ID Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#correlationIdObject).\nreplies | Map[`string`, [Operation Reply Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Operation Reply Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject).\nreplyAddresses | Map[`string`, [Operation Reply Address Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Operation Reply Address Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject).\nexternalDocs | Map[`string`, [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [External Documentation Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject).\ntags | Map[`string`, [Tag Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Tag Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject).\noperationTraits | Map[`string`, [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Operation Trait Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject).\nmessageTraits | Map[`string`, [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Message Trait Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject).\nserverBindings | Map[`string`, [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Server Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverBindingsObject).\nchannelBindings | Map[`string`, [Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Channel Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelBindingsObject).\noperationBindings | Map[`string`, [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Operation Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject).\nmessageBindings | Map[`string`, [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | An object to hold reusable [Message Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageBindingsObject).\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#specificationExtensions).\n\\\n\\\nAll the fixed fields declared above are objects that MUST use keys that match the regular expression: `^[a-zA-Z0-9\\.\\-_]+$`.\n\\\n\\\nField Name Examples:\n\n```\nUser\nUser_1\nUser_Name\nuser-name\nmy.org.User\n\n\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
