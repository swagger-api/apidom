import { AnyObject } from '../../apidom-language-types';

// eslint-disable-next-line import/prefer-default-export
export const defaultSchema: AnyObject = {
  id: 'https://spec.openapis.org/oas/3.0/schema/2019-04-02',
  $schema: 'http://json-schema.org/draft-04/schema#',
  description: 'Validation schema for OpenAPI Specification 3.0.X.',
  type: 'object',
  required: ['openapi', 'info', 'paths'],
  properties: {
    openapi: {
      type: 'string',
      pattern: '^3\\.[01]\\.\\d(-.+)?$',
    },
    info: {
      $ref: '#/definitions/Info',
    },
    paths: {
      $ref: '#/definitions/Paths',
    },
    components: {
      $ref: '#/definitions/Components',
    },
  },
  patternProperties: {
    '^x-': {},
  },
  additionalProperties: false,
  definitions: {
    Reference: {
      type: 'object',
      required: ['$ref'],
      patternProperties: {
        '^\\$ref$': {
          type: 'string',
          format: 'uri-reference',
        },
      },
    },
    Info: {
      type: 'object',
      required: ['title', 'version'],
      properties: {
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        termsOfService: {
          type: 'string',
          format: 'uri-reference',
        },
        contact: {
          $ref: '#/definitions/Contact',
        },
        license: {
          $ref: '#/definitions/License',
        },
        version: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-': {},
      },
      additionalProperties: false,
    },
    Contact: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        url: {
          type: 'string',
          format: 'uri-reference',
        },
        email: {
          type: 'string',
          format: 'email',
        },
      },
      patternProperties: {
        '^x-': {},
      },
      additionalProperties: false,
    },
    License: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
        },
        url: {
          type: 'string',
          format: 'uri-reference',
        },
      },
      patternProperties: {
        '^x-': {},
      },
      additionalProperties: false,
    },
    Server: {
      type: 'object',
      required: ['url'],
      properties: {
        url: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        variables: {
          type: 'object',
          additionalProperties: {
            $ref: '#/definitions/ServerVariable',
          },
        },
      },
      patternProperties: {
        '^x-': {},
      },
      additionalProperties: false,
    },
    ServerVariable: {
      type: 'object',
      required: ['default'],
      properties: {
        enum: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        default: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
      patternProperties: {
        '^x-': {},
      },
      additionalProperties: false,
    },
    Components: {
      type: 'object',
      properties: {
        schemas: {
          type: 'object',
          properties: {
            key: {
              $ref: '#/definitions/Schema',
            },
          },
        },
      },
      additionalProperties: false,
    },
    Schema: {
      type: 'object',
      properties: {
        $ref: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        multipleOf: {
          type: 'number',
          minimum: 0,
          exclusiveMinimum: true,
        },
        maximum: {
          type: 'number',
        },
        exclusiveMaximum: {
          type: 'boolean',
          default: false,
        },
        minimum: {
          type: 'number',
        },
        exclusiveMinimum: {
          type: 'boolean',
          default: false,
        },
        maxLength: {
          type: 'integer',
          minimum: 0,
        },
        minLength: {
          type: 'integer',
          minimum: 0,
          default: 0,
        },
        pattern: {
          type: 'string',
          format: 'regex',
        },
        maxItems: {
          type: 'integer',
          minimum: 0,
        },
        minItems: {
          type: 'integer',
          minimum: 0,
          default: 0,
        },
        uniqueItems: {
          type: 'boolean',
          default: false,
        },
        maxProperties: {
          type: 'integer',
          minimum: 0,
        },
        minProperties: {
          type: 'integer',
          minimum: 0,
          default: 0,
        },
        required: {
          type: 'array',
          items: {
            type: 'string',
          },
          minItems: 1,
          uniqueItems: true,
        },
        enum: {
          type: 'array',
          items: {},
          minItems: 1,
          uniqueItems: false,
        },
        type: {
          type: 'string',
          enum: ['array', 'boolean', 'integer', 'number', 'object', 'string'],
        },
        allOf: {
          type: 'array',
          items: {
            $ref: '#/definitions/Schema',
          },
        },
        oneOf: {
          type: 'array',
          items: {
            $ref: '#/definitions/Schema',
          },
        },
        anyOf: {
          type: 'array',
          items: {
            $ref: '#/definitions/Schema',
          },
        },
        items: {
          $ref: '#/definitions/Schema',
        },
        properties: {
          type: 'object',
          properties: {
            key: {
              $ref: '#/definitions/Schema',
            },
          },
        },
        description: {
          type: 'string',
        },
        format: {
          type: 'string',
        },
        default: {},
        nullable: {
          type: 'boolean',
          default: false,
        },
        readOnly: {
          type: 'boolean',
          default: false,
        },
        writeOnly: {
          type: 'boolean',
          default: false,
        },
        example: {},
        deprecated: {
          type: 'boolean',
          default: false,
        },
      },
      patternProperties: {
        '^x-': {},
      },
      additionalProperties: false,
    },
    Paths: {
      type: 'object',
      properties: {
        key: {
          $ref: '#/definitions/PathItem',
        },
      },
      additionalProperties: false,
    },
    PathItem: {
      type: 'object',
      properties: {
        $ref: {
          type: 'string',
        },
        summary: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        parameters: {
          type: 'array',
          items: {
            $ref: '#/definitions/Parameter',
          },
          uniqueItems: true,
        },
        get: {
          $ref: '#/definitions/Operation',
        },
        post: {
          $ref: '#/definitions/Operation',
        },
      },
      additionalProperties: false,
    },
    Operation: {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        summary: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        operationId: {
          type: 'string',
        },
        parameters: {
          type: 'array',
          items: {
            $ref: '#/definitions/Parameter',
          },
          uniqueItems: true,
        },
        deprecated: {
          type: 'boolean',
          default: false,
        },
      },
      additionalProperties: false,
    },
    Parameter: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        in: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        required: {
          type: 'boolean',
          default: false,
        },
        deprecated: {
          type: 'boolean',
          default: false,
        },
        allowEmptyValue: {
          type: 'boolean',
          default: false,
        },
        style: {
          type: 'string',
        },
        explode: {
          type: 'boolean',
        },
        allowReserved: {
          type: 'boolean',
          default: false,
        },
        schema: {
          $ref: '#/definitions/Schema',
        },
        example: {},
      },
      patternProperties: {
        '^x-': {},
      },
      additionalProperties: false,
      required: ['name', 'in'],
    },
  },
};
