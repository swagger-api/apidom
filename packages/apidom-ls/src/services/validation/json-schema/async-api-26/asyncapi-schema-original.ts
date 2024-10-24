export default {
  $id: 'http://asyncapi.com/definitions/2.6.0/asyncapi.json',
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'AsyncAPI 2.6.0 schema.',
  type: 'object',
  required: ['asyncapi', 'info', 'channels'],
  additionalProperties: false,
  patternProperties: {
    '^x-[\\w\\d\\.\\x2d_]+$': {
      $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
    },
  },
  properties: {
    asyncapi: {
      type: 'string',
      enum: ['2.6.0'],
      description: 'The AsyncAPI specification version of this document.',
    },
    id: {
      type: 'string',
      description: 'A unique id representing the application.',
      format: 'uri',
    },
    info: {
      $ref: 'http://asyncapi.com/definitions/2.6.0/info.json',
    },
    servers: {
      $ref: 'http://asyncapi.com/definitions/2.6.0/servers.json',
    },
    defaultContentType: {
      type: 'string',
    },
    channels: {
      $ref: 'http://asyncapi.com/definitions/2.6.0/channels.json',
    },
    components: {
      $ref: 'http://asyncapi.com/definitions/2.6.0/components.json',
    },
    tags: {
      type: 'array',
      items: {
        $ref: 'http://asyncapi.com/definitions/2.6.0/tag.json',
      },
      uniqueItems: true,
    },
    externalDocs: {
      $ref: 'http://asyncapi.com/definitions/2.6.0/externalDocs.json',
    },
  },
  definitions: {
    'http://asyncapi.com/definitions/2.6.0/specificationExtension.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
      description: 'Any property starting with x- is valid.',
      additionalProperties: true,
      additionalItems: true,
    },
    'http://asyncapi.com/definitions/2.6.0/info.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/info.json',
      type: 'object',
      description: 'General information about the API.',
      required: ['version', 'title'],
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        title: {
          type: 'string',
          description: 'A unique and precise title of the API.',
        },
        version: {
          type: 'string',
          description: 'A semantic version number of the API.',
        },
        description: {
          type: 'string',
          description:
            'A longer description of the API. Should be different from the title. CommonMark is allowed.',
        },
        termsOfService: {
          type: 'string',
          description: 'A URL to the Terms of Service for the API. MUST be in the format of a URL.',
          format: 'uri',
        },
        contact: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/contact.json',
        },
        license: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/license.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/contact.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/contact.json',
      type: 'object',
      description: 'Contact information for the owners of the API.',
      additionalProperties: false,
      properties: {
        name: {
          type: 'string',
          description: 'The identifying name of the contact person/organization.',
        },
        url: {
          type: 'string',
          description: 'The URL pointing to the contact information.',
          format: 'uri',
        },
        email: {
          type: 'string',
          description: 'The email address of the contact person/organization.',
          format: 'email',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/license.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/license.json',
      type: 'object',
      required: ['name'],
      additionalProperties: false,
      properties: {
        name: {
          type: 'string',
          description:
            "The name of the license type. It's encouraged to use an OSI compatible license.",
        },
        url: {
          type: 'string',
          description: 'The URL pointing to the license.',
          format: 'uri',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/servers.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/servers.json',
      description: 'An object representing multiple servers.',
      type: 'object',
      additionalProperties: {
        oneOf: [
          {
            $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
          },
          {
            $ref: 'http://asyncapi.com/definitions/2.6.0/server.json',
          },
        ],
      },
    },
    'http://asyncapi.com/definitions/2.6.0/Reference.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
      type: 'object',
      required: ['$ref'],
      properties: {
        $ref: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/ReferenceObject.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/ReferenceObject.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/ReferenceObject.json',
      type: 'string',
      format: 'uri-reference',
    },
    'http://asyncapi.com/definitions/2.6.0/server.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/server.json',
      type: 'object',
      description: 'An object representing a Server.',
      required: ['url', 'protocol'],
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        url: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        protocol: {
          type: 'string',
          description: 'The transfer protocol.',
        },
        protocolVersion: {
          type: 'string',
        },
        variables: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/serverVariables.json',
        },
        security: {
          type: 'array',
          items: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/SecurityRequirement.json',
          },
        },
        bindings: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
        },
        tags: {
          type: 'array',
          items: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/tag.json',
          },
          uniqueItems: true,
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/serverVariables.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/serverVariables.json',
      type: 'object',
      additionalProperties: {
        oneOf: [
          {
            $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
          },
          {
            $ref: 'http://asyncapi.com/definitions/2.6.0/serverVariable.json',
          },
        ],
      },
    },
    'http://asyncapi.com/definitions/2.6.0/serverVariable.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/serverVariable.json',
      type: 'object',
      description: 'An object representing a Server Variable for server URL template substitution.',
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        enum: {
          type: 'array',
          items: {
            type: 'string',
          },
          uniqueItems: true,
        },
        default: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        examples: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/SecurityRequirement.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/SecurityRequirement.json',
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'string',
        },
        uniqueItems: true,
      },
    },
    'http://asyncapi.com/definitions/2.6.0/bindingsObject.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
      type: 'object',
      additionalProperties: true,
      properties: {
        http: {},
        ws: {},
        amqp: {},
        amqp1: {},
        mqtt: {},
        mqtt5: {},
        kafka: {},
        anypointmq: {},
        nats: {},
        jms: {},
        sns: {},
        sqs: {},
        stomp: {},
        redis: {},
        ibmmq: {},
        solace: {},
        googlepubsub: {},
        pulsar: {},
      },
    },
    'http://asyncapi.com/definitions/2.6.0/tag.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/tag.json',
      type: 'object',
      additionalProperties: false,
      required: ['name'],
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        externalDocs: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/externalDocs.json',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/externalDocs.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/externalDocs.json',
      type: 'object',
      additionalProperties: false,
      description: 'information about external documentation',
      required: ['url'],
      properties: {
        description: {
          type: 'string',
        },
        url: {
          type: 'string',
          format: 'uri',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/channels.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/channels.json',
      type: 'object',
      propertyNames: {
        type: 'string',
        format: 'uri-template',
        minLength: 1,
      },
      additionalProperties: {
        $ref: 'http://asyncapi.com/definitions/2.6.0/channelItem.json',
      },
    },
    'http://asyncapi.com/definitions/2.6.0/channelItem.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/channelItem.json',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        $ref: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/ReferenceObject.json',
        },
        parameters: {
          type: 'object',
          additionalProperties: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/parameter.json',
          },
        },
        description: {
          type: 'string',
          description: 'A description of the channel.',
        },
        servers: {
          type: 'array',
          description:
            'The names of the servers on which this channel is available. If absent or empty then this channel must be available on all servers.',
          items: {
            type: 'string',
          },
          uniqueItems: true,
        },
        publish: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/operation.json',
        },
        subscribe: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/operation.json',
        },
        deprecated: {
          type: 'boolean',
          default: false,
        },
        bindings: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/parameter.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/parameter.json',
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        description: {
          type: 'string',
          description:
            'A brief description of the parameter. This could contain examples of use. GitHub Flavored Markdown is allowed.',
        },
        schema: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
        },
        location: {
          type: 'string',
          description: 'A runtime expression that specifies the location of the parameter value',
          pattern: '^\\$message\\.(header|payload)#(\\/(([^\\/~])|(~[01]))*)*',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/schema.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/schema.json',
      allOf: [
        {
          $ref: 'http://json-schema.org/draft-07/schema#',
        },
        {
          patternProperties: {
            '^x-[\\w\\d\\.\\x2d_]+$': {
              $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
            },
          },
          properties: {
            additionalProperties: {
              anyOf: [
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
                },
                {
                  type: 'boolean',
                },
              ],
              default: {},
            },
            items: {
              anyOf: [
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
                },
                {
                  type: 'array',
                  minItems: 1,
                  items: {
                    $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
                  },
                },
              ],
              default: {},
            },
            allOf: {
              type: 'array',
              minItems: 1,
              items: {
                $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
              },
            },
            oneOf: {
              type: 'array',
              minItems: 1,
              items: {
                $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
              },
            },
            anyOf: {
              type: 'array',
              minItems: 1,
              items: {
                $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
              },
            },
            not: {
              $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
            },
            properties: {
              type: 'object',
              additionalProperties: {
                $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
              },
              default: {},
            },
            patternProperties: {
              type: 'object',
              additionalProperties: {
                $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
              },
              default: {},
            },
            propertyNames: {
              $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
            },
            contains: {
              $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
            },
            discriminator: {
              type: 'string',
            },
            externalDocs: {
              $ref: 'http://asyncapi.com/definitions/2.6.0/externalDocs.json',
            },
            deprecated: {
              type: 'boolean',
              default: false,
            },
          },
        },
      ],
    },
    'http://json-schema.org/draft-07/schema': {
      $id: 'http://json-schema.org/draft-07/schema',
      title: 'Core schema meta-schema',
      definitions: {
        schemaArray: {
          type: 'array',
          minItems: 1,
          items: {
            $ref: '#',
          },
        },
        nonNegativeInteger: {
          type: 'integer',
          minimum: 0,
        },
        nonNegativeIntegerDefault0: {
          allOf: [
            {
              $ref: '#/definitions/nonNegativeInteger',
            },
            {
              default: 0,
            },
          ],
        },
        simpleTypes: {
          enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'],
        },
        stringArray: {
          type: 'array',
          items: {
            type: 'string',
          },
          uniqueItems: true,
          default: [],
        },
      },
      type: ['object', 'boolean'],
      properties: {
        $id: {
          type: 'string',
          format: 'uri-reference',
        },
        $schema: {
          type: 'string',
          format: 'uri',
        },
        $ref: {
          type: 'string',
          format: 'uri-reference',
        },
        $comment: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        default: true,
        readOnly: {
          type: 'boolean',
          default: false,
        },
        writeOnly: {
          type: 'boolean',
          default: false,
        },
        examples: {
          type: 'array',
          items: true,
        },
        multipleOf: {
          type: 'number',
          exclusiveMinimum: 0,
        },
        maximum: {
          type: 'number',
        },
        exclusiveMaximum: {
          type: 'number',
        },
        minimum: {
          type: 'number',
        },
        exclusiveMinimum: {
          type: 'number',
        },
        maxLength: {
          $ref: '#/definitions/nonNegativeInteger',
        },
        minLength: {
          $ref: '#/definitions/nonNegativeIntegerDefault0',
        },
        pattern: {
          type: 'string',
          format: 'regex',
        },
        additionalItems: {
          $ref: '#',
        },
        items: {
          anyOf: [
            {
              $ref: '#',
            },
            {
              $ref: '#/definitions/schemaArray',
            },
          ],
          default: true,
        },
        maxItems: {
          $ref: '#/definitions/nonNegativeInteger',
        },
        minItems: {
          $ref: '#/definitions/nonNegativeIntegerDefault0',
        },
        uniqueItems: {
          type: 'boolean',
          default: false,
        },
        contains: {
          $ref: '#',
        },
        maxProperties: {
          $ref: '#/definitions/nonNegativeInteger',
        },
        minProperties: {
          $ref: '#/definitions/nonNegativeIntegerDefault0',
        },
        required: {
          $ref: '#/definitions/stringArray',
        },
        additionalProperties: {
          $ref: '#',
        },
        definitions: {
          type: 'object',
          additionalProperties: {
            $ref: '#',
          },
          default: {},
        },
        properties: {
          type: 'object',
          additionalProperties: {
            $ref: '#',
          },
          default: {},
        },
        patternProperties: {
          type: 'object',
          additionalProperties: {
            $ref: '#',
          },
          propertyNames: {
            format: 'regex',
          },
          default: {},
        },
        dependencies: {
          type: 'object',
          additionalProperties: {
            anyOf: [
              {
                $ref: '#',
              },
              {
                $ref: '#/definitions/stringArray',
              },
            ],
          },
        },
        propertyNames: {
          $ref: '#',
        },
        const: true,
        enum: {
          type: 'array',
          items: true,
          minItems: 1,
          uniqueItems: true,
        },
        type: {
          anyOf: [
            {
              $ref: '#/definitions/simpleTypes',
            },
            {
              type: 'array',
              items: {
                $ref: '#/definitions/simpleTypes',
              },
              minItems: 1,
              uniqueItems: true,
            },
          ],
        },
        format: {
          type: 'string',
        },
        contentMediaType: {
          type: 'string',
        },
        contentEncoding: {
          type: 'string',
        },
        if: {
          $ref: '#',
        },
        then: {
          $ref: '#',
        },
        else: {
          $ref: '#',
        },
        allOf: {
          $ref: '#/definitions/schemaArray',
        },
        anyOf: {
          $ref: '#/definitions/schemaArray',
        },
        oneOf: {
          $ref: '#/definitions/schemaArray',
        },
        not: {
          $ref: '#',
        },
      },
      default: true,
    },
    'http://asyncapi.com/definitions/2.6.0/operation.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/operation.json',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        traits: {
          type: 'array',
          items: {
            oneOf: [
              {
                $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
              },
              {
                $ref: 'http://asyncapi.com/definitions/2.6.0/operationTrait.json',
              },
              {
                type: 'array',
                items: [
                  {
                    oneOf: [
                      {
                        $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
                      },
                      {
                        $ref: 'http://asyncapi.com/definitions/2.6.0/operationTrait.json',
                      },
                    ],
                  },
                  {
                    type: 'object',
                    additionalItems: true,
                  },
                ],
              },
            ],
          },
        },
        summary: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        security: {
          type: 'array',
          items: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/SecurityRequirement.json',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/tag.json',
          },
          uniqueItems: true,
        },
        externalDocs: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/externalDocs.json',
        },
        operationId: {
          type: 'string',
        },
        bindings: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
        },
        message: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/message.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/operationTrait.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/operationTrait.json',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        summary: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/tag.json',
          },
          uniqueItems: true,
        },
        externalDocs: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/externalDocs.json',
        },
        operationId: {
          type: 'string',
        },
        security: {
          type: 'array',
          items: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/SecurityRequirement.json',
          },
        },
        bindings: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/message.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/message.json',
      oneOf: [
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
        },
        {
          oneOf: [
            {
              type: 'object',
              required: ['oneOf'],
              additionalProperties: false,
              properties: {
                oneOf: {
                  type: 'array',
                  items: {
                    $ref: 'http://asyncapi.com/definitions/2.6.0/message.json',
                  },
                },
              },
            },
            {
              type: 'object',
              additionalProperties: false,
              patternProperties: {
                '^x-[\\w\\d\\.\\x2d_]+$': {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
                },
              },
              properties: {
                schemaFormat: {
                  type: 'string',
                },
                contentType: {
                  type: 'string',
                },
                headers: {
                  allOf: [
                    {
                      $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
                    },
                    {
                      properties: {
                        type: {
                          const: 'object',
                        },
                      },
                    },
                  ],
                },
                messageId: {
                  type: 'string',
                },
                payload: {},
                correlationId: {
                  oneOf: [
                    {
                      $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
                    },
                    {
                      $ref: 'http://asyncapi.com/definitions/2.6.0/correlationId.json',
                    },
                  ],
                },
                tags: {
                  type: 'array',
                  items: {
                    $ref: 'http://asyncapi.com/definitions/2.6.0/tag.json',
                  },
                  uniqueItems: true,
                },
                summary: {
                  type: 'string',
                  description: 'A brief summary of the message.',
                },
                name: {
                  type: 'string',
                  description: 'Name of the message.',
                },
                title: {
                  type: 'string',
                  description: 'A human-friendly title for the message.',
                },
                description: {
                  type: 'string',
                  description: 'A longer description of the message. CommonMark is allowed.',
                },
                externalDocs: {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/externalDocs.json',
                },
                deprecated: {
                  type: 'boolean',
                  default: false,
                },
                examples: {
                  type: 'array',
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    anyOf: [
                      {
                        required: ['payload'],
                      },
                      {
                        required: ['headers'],
                      },
                    ],
                    properties: {
                      name: {
                        type: 'string',
                        description: 'Machine readable name of the message example.',
                      },
                      summary: {
                        type: 'string',
                        description: 'A brief summary of the message example.',
                      },
                      headers: {
                        type: 'object',
                      },
                      payload: {},
                    },
                  },
                },
                bindings: {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
                },
                traits: {
                  type: 'array',
                  items: {
                    oneOf: [
                      {
                        $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
                      },
                      {
                        $ref: 'http://asyncapi.com/definitions/2.6.0/messageTrait.json',
                      },
                      {
                        type: 'array',
                        items: [
                          {
                            oneOf: [
                              {
                                $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
                              },
                              {
                                $ref: 'http://asyncapi.com/definitions/2.6.0/messageTrait.json',
                              },
                            ],
                          },
                          {
                            type: 'object',
                            additionalItems: true,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      ],
    },
    'http://asyncapi.com/definitions/2.6.0/correlationId.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/correlationId.json',
      type: 'object',
      required: ['location'],
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        description: {
          type: 'string',
          description:
            'A optional description of the correlation ID. GitHub Flavored Markdown is allowed.',
        },
        location: {
          type: 'string',
          description: 'A runtime expression that specifies the location of the correlation ID',
          pattern: '^\\$message\\.(header|payload)#(\\/(([^\\/~])|(~[01]))*)*',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/messageTrait.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/messageTrait.json',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        schemaFormat: {
          type: 'string',
        },
        contentType: {
          type: 'string',
        },
        headers: {
          allOf: [
            {
              $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
            },
            {
              properties: {
                type: {
                  const: 'object',
                },
              },
            },
          ],
        },
        messageId: {
          type: 'string',
        },
        correlationId: {
          oneOf: [
            {
              $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
            },
            {
              $ref: 'http://asyncapi.com/definitions/2.6.0/correlationId.json',
            },
          ],
        },
        tags: {
          type: 'array',
          items: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/tag.json',
          },
          uniqueItems: true,
        },
        summary: {
          type: 'string',
          description: 'A brief summary of the message.',
        },
        name: {
          type: 'string',
          description: 'Name of the message.',
        },
        title: {
          type: 'string',
          description: 'A human-friendly title for the message.',
        },
        description: {
          type: 'string',
          description: 'A longer description of the message. CommonMark is allowed.',
        },
        externalDocs: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/externalDocs.json',
        },
        deprecated: {
          type: 'boolean',
          default: false,
        },
        examples: {
          type: 'array',
          items: {
            type: 'object',
          },
        },
        bindings: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/components.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/components.json',
      type: 'object',
      description:
        'An object to hold a set of reusable objects for different aspects of the AsyncAPI Specification.',
      additionalProperties: false,
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      properties: {
        schemas: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/schemas.json',
        },
        servers: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/servers.json',
        },
        channels: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/channels.json',
        },
        serverVariables: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/serverVariables.json',
        },
        messages: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/messages.json',
        },
        securitySchemes: {
          type: 'object',
          patternProperties: {
            '^[\\w\\d\\.\\-_]+$': {
              oneOf: [
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
                },
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/SecurityScheme.json',
                },
              ],
            },
          },
        },
        parameters: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/parameters.json',
        },
        correlationIds: {
          type: 'object',
          patternProperties: {
            '^[\\w\\d\\.\\-_]+$': {
              oneOf: [
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
                },
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/correlationId.json',
                },
              ],
            },
          },
        },
        operationTraits: {
          type: 'object',
          additionalProperties: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/operationTrait.json',
          },
        },
        messageTraits: {
          type: 'object',
          additionalProperties: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/messageTrait.json',
          },
        },
        serverBindings: {
          type: 'object',
          additionalProperties: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
          },
        },
        channelBindings: {
          type: 'object',
          additionalProperties: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
          },
        },
        operationBindings: {
          type: 'object',
          additionalProperties: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
          },
        },
        messageBindings: {
          type: 'object',
          additionalProperties: {
            $ref: 'http://asyncapi.com/definitions/2.6.0/bindingsObject.json',
          },
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/schemas.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/schemas.json',
      type: 'object',
      additionalProperties: {
        $ref: 'http://asyncapi.com/definitions/2.6.0/schema.json',
      },
      description: 'JSON objects describing schemas the API uses.',
    },
    'http://asyncapi.com/definitions/2.6.0/messages.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/messages.json',
      type: 'object',
      additionalProperties: {
        $ref: 'http://asyncapi.com/definitions/2.6.0/message.json',
      },
      description: 'JSON objects describing the messages being consumed and produced by the API.',
    },
    'http://asyncapi.com/definitions/2.6.0/SecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/SecurityScheme.json',
      oneOf: [
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/userPassword.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/apiKey.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/X509.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/symmetricEncryption.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/asymmetricEncryption.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/HTTPSecurityScheme.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/oauth2Flows.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/openIdConnect.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/SaslSecurityScheme.json',
        },
      ],
    },
    'http://asyncapi.com/definitions/2.6.0/userPassword.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/userPassword.json',
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['userPassword'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/apiKey.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/apiKey.json',
      type: 'object',
      required: ['type', 'in'],
      properties: {
        type: {
          type: 'string',
          enum: ['apiKey'],
        },
        in: {
          type: 'string',
          enum: ['user', 'password'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/X509.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/X509.json',
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['X509'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/symmetricEncryption.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/symmetricEncryption.json',
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['symmetricEncryption'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/asymmetricEncryption.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/asymmetricEncryption.json',
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['asymmetricEncryption'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/HTTPSecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/HTTPSecurityScheme.json',
      oneOf: [
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/NonBearerHTTPSecurityScheme.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/BearerHTTPSecurityScheme.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/APIKeyHTTPSecurityScheme.json',
        },
      ],
    },
    'http://asyncapi.com/definitions/2.6.0/NonBearerHTTPSecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/NonBearerHTTPSecurityScheme.json',
      not: {
        type: 'object',
        properties: {
          scheme: {
            type: 'string',
            enum: ['bearer'],
          },
        },
      },
      type: 'object',
      required: ['scheme', 'type'],
      properties: {
        scheme: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        type: {
          type: 'string',
          enum: ['http'],
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/BearerHTTPSecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/BearerHTTPSecurityScheme.json',
      type: 'object',
      required: ['type', 'scheme'],
      properties: {
        scheme: {
          type: 'string',
          enum: ['bearer'],
        },
        bearerFormat: {
          type: 'string',
        },
        type: {
          type: 'string',
          enum: ['http'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/APIKeyHTTPSecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/APIKeyHTTPSecurityScheme.json',
      type: 'object',
      required: ['type', 'name', 'in'],
      properties: {
        type: {
          type: 'string',
          enum: ['httpApiKey'],
        },
        name: {
          type: 'string',
        },
        in: {
          type: 'string',
          enum: ['header', 'query', 'cookie'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/oauth2Flows.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/oauth2Flows.json',
      type: 'object',
      required: ['type', 'flows'],
      properties: {
        type: {
          type: 'string',
          enum: ['oauth2'],
        },
        description: {
          type: 'string',
        },
        flows: {
          type: 'object',
          properties: {
            implicit: {
              allOf: [
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/oauth2Flow.json',
                },
                {
                  required: ['authorizationUrl', 'scopes'],
                },
                {
                  not: {
                    required: ['tokenUrl'],
                  },
                },
              ],
            },
            password: {
              allOf: [
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/oauth2Flow.json',
                },
                {
                  required: ['tokenUrl', 'scopes'],
                },
                {
                  not: {
                    required: ['authorizationUrl'],
                  },
                },
              ],
            },
            clientCredentials: {
              allOf: [
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/oauth2Flow.json',
                },
                {
                  required: ['tokenUrl', 'scopes'],
                },
                {
                  not: {
                    required: ['authorizationUrl'],
                  },
                },
              ],
            },
            authorizationCode: {
              allOf: [
                {
                  $ref: 'http://asyncapi.com/definitions/2.6.0/oauth2Flow.json',
                },
                {
                  required: ['authorizationUrl', 'tokenUrl', 'scopes'],
                },
              ],
            },
          },
          additionalProperties: false,
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
    },
    'http://asyncapi.com/definitions/2.6.0/oauth2Flow.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/oauth2Flow.json',
      type: 'object',
      properties: {
        authorizationUrl: {
          type: 'string',
          format: 'uri',
        },
        tokenUrl: {
          type: 'string',
          format: 'uri',
        },
        refreshUrl: {
          type: 'string',
          format: 'uri',
        },
        scopes: {
          $ref: 'http://asyncapi.com/definitions/2.6.0/oauth2Scopes.json',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/oauth2Scopes.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/oauth2Scopes.json',
      type: 'object',
      additionalProperties: {
        type: 'string',
      },
    },
    'http://asyncapi.com/definitions/2.6.0/openIdConnect.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/openIdConnect.json',
      type: 'object',
      required: ['type', 'openIdConnectUrl'],
      properties: {
        type: {
          type: 'string',
          enum: ['openIdConnect'],
        },
        description: {
          type: 'string',
        },
        openIdConnectUrl: {
          type: 'string',
          format: 'uri',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/SaslSecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/SaslSecurityScheme.json',
      oneOf: [
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/SaslPlainSecurityScheme.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/SaslScramSecurityScheme.json',
        },
        {
          $ref: 'http://asyncapi.com/definitions/2.6.0/SaslGssapiSecurityScheme.json',
        },
      ],
    },
    'http://asyncapi.com/definitions/2.6.0/SaslPlainSecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/SaslPlainSecurityScheme.json',
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['plain'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/SaslScramSecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/SaslScramSecurityScheme.json',
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['scramSha256', 'scramSha512'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/SaslGssapiSecurityScheme.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/SaslGssapiSecurityScheme.json',
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['gssapi'],
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-[\\w\\d\\.\\x2d_]+$': {
          $ref: 'http://asyncapi.com/definitions/2.6.0/specificationExtension.json',
        },
      },
      additionalProperties: false,
    },
    'http://asyncapi.com/definitions/2.6.0/parameters.json': {
      $id: 'http://asyncapi.com/definitions/2.6.0/parameters.json',
      type: 'object',
      additionalProperties: {
        oneOf: [
          {
            $ref: 'http://asyncapi.com/definitions/2.6.0/Reference.json',
          },
          {
            $ref: 'http://asyncapi.com/definitions/2.6.0/parameter.json',
          },
        ],
      },
      description: 'JSON objects describing re-usable channel parameters.',
    },
  },
  description: '!!Auto generated!! \n Do not manually edit. ',
};
