export const openapiSchemaString = '{\n' +
  '  "id": "https://spec.openapis.org/oas/3.0/schema/2019-04-02",\n' +
  '  "$schema": "http://json-schema.org/draft-04/schema#",\n' +
  '  "description": "Validation schema for OpenAPI Specification 3.0.X.",\n' +
  '  "type": "object",\n' +
  '  "required": [\n' +
  '    "openapi",\n' +
  '    "info",\n' +
  '    "paths"\n' +
  '  ],\n' +
  '  "properties": {\n' +
  '    "openapi": {\n' +
  '      "type": "string",\n' +
  '      "pattern": "^3\\\\.0\\\\.\\\\d(-.+)?$"\n' +
  '    },\n' +
  '    "info": {\n' +
  '      "$ref": "#/definitions/Info"\n' +
  '    },\n' +
  '    "externalDocs": {\n' +
  '      "$ref": "#/definitions/ExternalDocumentation"\n' +
  '    },\n' +
  '    "servers": {\n' +
  '      "type": "array",\n' +
  '      "items": {\n' +
  '        "$ref": "#/definitions/Server"\n' +
  '      }\n' +
  '    },\n' +
  '    "security": {\n' +
  '      "type": "array",\n' +
  '      "items": {\n' +
  '        "$ref": "#/definitions/SecurityRequirement"\n' +
  '      }\n' +
  '    },\n' +
  '    "tags": {\n' +
  '      "type": "array",\n' +
  '      "items": {\n' +
  '        "$ref": "#/definitions/Tag"\n' +
  '      },\n' +
  '      "uniqueItems": true\n' +
  '    },\n' +
  '    "paths": {\n' +
  '      "$ref": "#/definitions/Paths"\n' +
  '    },\n' +
  '    "components": {\n' +
  '      "$ref": "#/definitions/Components"\n' +
  '    }\n' +
  '  },\n' +
  '  "patternProperties": {\n' +
  '    "^x-": {\n' +
  '    }\n' +
  '  },\n' +
  '  "additionalProperties": false,\n' +
  '  "definitions": {\n' +
  '    "Reference": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "$ref"\n' +
  '      ],\n' +
  '      "patternProperties": {\n' +
  '        "^\\\\$ref$": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        }\n' +
  '      }\n' +
  '    },\n' +
  '    "Info": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "title",\n' +
  '        "version"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "title": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "summary": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "termsOfService": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "contact": {\n' +
  '          "$ref": "#/definitions/Contact"\n' +
  '        },\n' +
  '        "license": {\n' +
  '          "$ref": "#/definitions/License"\n' +
  '        },\n' +
  '        "version": {\n' +
  '          "type": "string"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Contact": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "name": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "url": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "email": {\n' +
  '          "type": "string",\n' +
  '          "format": "email"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "License": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "name"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "name": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "url": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Server": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "url"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "url": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "variables": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "$ref": "#/definitions/ServerVariable"\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "ServerVariable": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "default"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "enum": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "type": "string"\n' +
  '          }\n' +
  '        },\n' +
  '        "default": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Components": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "schemas": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Schema"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        "responses": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Response"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        "parameters": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Parameter"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        "examples": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Example"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        "requestBodies": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/RequestBody"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        "headers": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Header"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        "securitySchemes": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/SecurityScheme"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        "links": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Link"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        "callbacks": {\n' +
  '          "type": "object",\n' +
  '          "patternProperties": {\n' +
  '            "^[a-zA-Z0-9\\\\.\\\\-_]+$": {\n' +
  '              "oneOf": [\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Reference"\n' +
  '                },\n' +
  '                {\n' +
  '                  "$ref": "#/definitions/Callback"\n' +
  '                }\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Schema": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "title": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "multipleOf": {\n' +
  '          "type": "number",\n' +
  '          "minimum": 0,\n' +
  '          "exclusiveMinimum": true\n' +
  '        },\n' +
  '        "maximum": {\n' +
  '          "type": "number"\n' +
  '        },\n' +
  '        "exclusiveMaximum": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "minimum": {\n' +
  '          "type": "number"\n' +
  '        },\n' +
  '        "exclusiveMinimum": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "maxLength": {\n' +
  '          "type": "integer",\n' +
  '          "minimum": 0\n' +
  '        },\n' +
  '        "minLength": {\n' +
  '          "type": "integer",\n' +
  '          "minimum": 0,\n' +
  '          "default": 0\n' +
  '        },\n' +
  '        "pattern": {\n' +
  '          "type": "string",\n' +
  '          "format": "regex"\n' +
  '        },\n' +
  '        "maxItems": {\n' +
  '          "type": "integer",\n' +
  '          "minimum": 0\n' +
  '        },\n' +
  '        "minItems": {\n' +
  '          "type": "integer",\n' +
  '          "minimum": 0,\n' +
  '          "default": 0\n' +
  '        },\n' +
  '        "uniqueItems": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "maxProperties": {\n' +
  '          "type": "integer",\n' +
  '          "minimum": 0\n' +
  '        },\n' +
  '        "minProperties": {\n' +
  '          "type": "integer",\n' +
  '          "minimum": 0,\n' +
  '          "default": 0\n' +
  '        },\n' +
  '        "required": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "type": "string"\n' +
  '          },\n' +
  '          "minItems": 1,\n' +
  '          "uniqueItems": true\n' +
  '        },\n' +
  '        "enum": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '          },\n' +
  '          "minItems": 1,\n' +
  '          "uniqueItems": false\n' +
  '        },\n' +
  '        "type": {\n' +
  '          "type": "string",\n' +
  '          "enum": [\n' +
  '            "array",\n' +
  '            "boolean",\n' +
  '            "integer",\n' +
  '            "number",\n' +
  '            "object",\n' +
  '            "string"\n' +
  '          ]\n' +
  '        },\n' +
  '        "not": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Schema"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            }\n' +
  '          ]\n' +
  '        },\n' +
  '        "allOf": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Schema"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        },\n' +
  '        "oneOf": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Schema"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        },\n' +
  '        "anyOf": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Schema"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        },\n' +
  '        "items": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Schema"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            }\n' +
  '          ]\n' +
  '        },\n' +
  '        "properties": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Schema"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        },\n' +
  '        "additionalProperties": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Schema"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            },\n' +
  '            {\n' +
  '              "type": "boolean"\n' +
  '            }\n' +
  '          ],\n' +
  '          "default": true\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "format": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "default": {\n' +
  '        },\n' +
  '        "nullable": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "discriminator": {\n' +
  '          "$ref": "#/definitions/Discriminator"\n' +
  '        },\n' +
  '        "readOnly": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "writeOnly": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "example": {\n' +
  '        },\n' +
  '        "externalDocs": {\n' +
  '          "$ref": "#/definitions/ExternalDocumentation"\n' +
  '        },\n' +
  '        "deprecated": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "xml": {\n' +
  '          "$ref": "#/definitions/XML"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Discriminator": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "propertyName"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "propertyName": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "mapping": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "type": "string"\n' +
  '          }\n' +
  '        }\n' +
  '      }\n' +
  '    },\n' +
  '    "XML": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "name": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "namespace": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri"\n' +
  '        },\n' +
  '        "prefix": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "attribute": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "wrapped": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Response": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "description"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "headers": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Header"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        },\n' +
  '        "content": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "$ref": "#/definitions/MediaType"\n' +
  '          }\n' +
  '        },\n' +
  '        "links": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Link"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "MediaType": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "schema": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Schema"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            }\n' +
  '          ]\n' +
  '        },\n' +
  '        "example": {\n' +
  '        },\n' +
  '        "examples": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Example"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        },\n' +
  '        "encoding": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "$ref": "#/definitions/Encoding"\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false,\n' +
  '      "allOf": [\n' +
  '        {\n' +
  '          "$ref": "#/definitions/ExampleXORExamples"\n' +
  '        }\n' +
  '      ]\n' +
  '    },\n' +
  '    "Example": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "summary": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "value": {\n' +
  '        },\n' +
  '        "externalValue": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Header": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "required": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "deprecated": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "allowEmptyValue": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "style": {\n' +
  '          "type": "string",\n' +
  '          "enum": [\n' +
  '            "simple"\n' +
  '          ],\n' +
  '          "default": "simple"\n' +
  '        },\n' +
  '        "explode": {\n' +
  '          "type": "boolean"\n' +
  '        },\n' +
  '        "allowReserved": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "schema": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Schema"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            }\n' +
  '          ]\n' +
  '        },\n' +
  '        "content": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "$ref": "#/definitions/MediaType"\n' +
  '          },\n' +
  '          "minProperties": 1,\n' +
  '          "maxProperties": 1\n' +
  '        },\n' +
  '        "example": {\n' +
  '        },\n' +
  '        "examples": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Example"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false,\n' +
  '      "allOf": [\n' +
  '        {\n' +
  '          "$ref": "#/definitions/ExampleXORExamples"\n' +
  '        },\n' +
  '        {\n' +
  '          "$ref": "#/definitions/SchemaXORContent"\n' +
  '        }\n' +
  '      ]\n' +
  '    },\n' +
  '    "Paths": {\n' +
  '      "type": "object",\n' +
  '      "patternProperties": {\n' +
  '        "^\\\\/": {\n' +
  '          "$ref": "#/definitions/PathItem"\n' +
  '        },\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "PathItem": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "$ref": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "summary": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "servers": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "$ref": "#/definitions/Server"\n' +
  '          }\n' +
  '        },\n' +
  '        "parameters": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Parameter"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          },\n' +
  '          "uniqueItems": true\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^(get|put|post|delete|options|head|patch|trace)$": {\n' +
  '          "$ref": "#/definitions/Operation"\n' +
  '        },\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Operation": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "responses"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "tags": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "type": "string"\n' +
  '          }\n' +
  '        },\n' +
  '        "summary": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "externalDocs": {\n' +
  '          "$ref": "#/definitions/ExternalDocumentation"\n' +
  '        },\n' +
  '        "operationId": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "parameters": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Parameter"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          },\n' +
  '          "uniqueItems": true\n' +
  '        },\n' +
  '        "requestBody": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/RequestBody"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            }\n' +
  '          ]\n' +
  '        },\n' +
  '        "responses": {\n' +
  '          "$ref": "#/definitions/Responses"\n' +
  '        },\n' +
  '        "callbacks": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Callback"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        },\n' +
  '        "deprecated": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "security": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "$ref": "#/definitions/SecurityRequirement"\n' +
  '          }\n' +
  '        },\n' +
  '        "servers": {\n' +
  '          "type": "array",\n' +
  '          "items": {\n' +
  '            "$ref": "#/definitions/Server"\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Responses": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "default": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Response"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            }\n' +
  '          ]\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^[1-5](?:\\\\d{2}|XX)$": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Response"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            }\n' +
  '          ]\n' +
  '        },\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "minProperties": 1,\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "SecurityRequirement": {\n' +
  '      "type": "object",\n' +
  '      "additionalProperties": {\n' +
  '        "type": "array",\n' +
  '        "items": {\n' +
  '          "type": "string"\n' +
  '        }\n' +
  '      }\n' +
  '    },\n' +
  '    "Tag": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "name"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "name": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "externalDocs": {\n' +
  '          "$ref": "#/definitions/ExternalDocumentation"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "ExternalDocumentation": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "url"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "url": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "ExampleXORExamples": {\n' +
  '      "description": "Example and examples are mutually exclusive",\n' +
  '      "not": {\n' +
  '        "required": [\n' +
  '          "example",\n' +
  '          "examples"\n' +
  '        ]\n' +
  '      }\n' +
  '    },\n' +
  '    "SchemaXORContent": {\n' +
  '      "description": "Schema and content are mutually exclusive, at least one is required",\n' +
  '      "not": {\n' +
  '        "required": [\n' +
  '          "schema",\n' +
  '          "content"\n' +
  '        ]\n' +
  '      },\n' +
  '      "oneOf": [\n' +
  '        {\n' +
  '          "required": [\n' +
  '            "schema"\n' +
  '          ]\n' +
  '        },\n' +
  '        {\n' +
  '          "required": [\n' +
  '            "content"\n' +
  '          ],\n' +
  '          "description": "Some properties are not allowed if content is present",\n' +
  '          "allOf": [\n' +
  '            {\n' +
  '              "not": {\n' +
  '                "required": [\n' +
  '                  "style"\n' +
  '                ]\n' +
  '              }\n' +
  '            },\n' +
  '            {\n' +
  '              "not": {\n' +
  '                "required": [\n' +
  '                  "explode"\n' +
  '                ]\n' +
  '              }\n' +
  '            },\n' +
  '            {\n' +
  '              "not": {\n' +
  '                "required": [\n' +
  '                  "allowReserved"\n' +
  '                ]\n' +
  '              }\n' +
  '            },\n' +
  '            {\n' +
  '              "not": {\n' +
  '                "required": [\n' +
  '                  "example"\n' +
  '                ]\n' +
  '              }\n' +
  '            },\n' +
  '            {\n' +
  '              "not": {\n' +
  '                "required": [\n' +
  '                  "examples"\n' +
  '                ]\n' +
  '              }\n' +
  '            }\n' +
  '          ]\n' +
  '        }\n' +
  '      ]\n' +
  '    },\n' +
  '    "Parameter": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "name": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "in": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "required": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "deprecated": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "allowEmptyValue": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "style": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "explode": {\n' +
  '          "type": "boolean"\n' +
  '        },\n' +
  '        "allowReserved": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        },\n' +
  '        "schema": {\n' +
  '          "oneOf": [\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Schema"\n' +
  '            },\n' +
  '            {\n' +
  '              "$ref": "#/definitions/Reference"\n' +
  '            }\n' +
  '          ]\n' +
  '        },\n' +
  '        "content": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "$ref": "#/definitions/MediaType"\n' +
  '          },\n' +
  '          "minProperties": 1,\n' +
  '          "maxProperties": 1\n' +
  '        },\n' +
  '        "example": {\n' +
  '        },\n' +
  '        "examples": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "oneOf": [\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Example"\n' +
  '              },\n' +
  '              {\n' +
  '                "$ref": "#/definitions/Reference"\n' +
  '              }\n' +
  '            ]\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false,\n' +
  '      "required": [\n' +
  '        "name",\n' +
  '        "in"\n' +
  '      ],\n' +
  '      "allOf": [\n' +
  '        {\n' +
  '          "$ref": "#/definitions/ExampleXORExamples"\n' +
  '        },\n' +
  '        {\n' +
  '          "$ref": "#/definitions/SchemaXORContent"\n' +
  '        },\n' +
  '        {\n' +
  '          "$ref": "#/definitions/ParameterLocation"\n' +
  '        }\n' +
  '      ]\n' +
  '    },\n' +
  '    "ParameterLocation": {\n' +
  '      "description": "Parameter location",\n' +
  '      "oneOf": [\n' +
  '        {\n' +
  '          "description": "Parameter in path",\n' +
  '          "required": [\n' +
  '            "required"\n' +
  '          ],\n' +
  '          "properties": {\n' +
  '            "in": {\n' +
  '              "enum": [\n' +
  '                "path"\n' +
  '              ]\n' +
  '            },\n' +
  '            "style": {\n' +
  '              "enum": [\n' +
  '                "matrix",\n' +
  '                "label",\n' +
  '                "simple"\n' +
  '              ],\n' +
  '              "default": "simple"\n' +
  '            },\n' +
  '            "required": {\n' +
  '              "enum": [\n' +
  '                true\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        {\n' +
  '          "description": "Parameter in query",\n' +
  '          "properties": {\n' +
  '            "in": {\n' +
  '              "enum": [\n' +
  '                "query"\n' +
  '              ]\n' +
  '            },\n' +
  '            "style": {\n' +
  '              "enum": [\n' +
  '                "form",\n' +
  '                "spaceDelimited",\n' +
  '                "pipeDelimited",\n' +
  '                "deepObject"\n' +
  '              ],\n' +
  '              "default": "form"\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        {\n' +
  '          "description": "Parameter in header",\n' +
  '          "properties": {\n' +
  '            "in": {\n' +
  '              "enum": [\n' +
  '                "header"\n' +
  '              ]\n' +
  '            },\n' +
  '            "style": {\n' +
  '              "enum": [\n' +
  '                "simple"\n' +
  '              ],\n' +
  '              "default": "simple"\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        {\n' +
  '          "description": "Parameter in cookie",\n' +
  '          "properties": {\n' +
  '            "in": {\n' +
  '              "enum": [\n' +
  '                "cookie"\n' +
  '              ]\n' +
  '            },\n' +
  '            "style": {\n' +
  '              "enum": [\n' +
  '                "form"\n' +
  '              ],\n' +
  '              "default": "form"\n' +
  '            }\n' +
  '          }\n' +
  '        }\n' +
  '      ]\n' +
  '    },\n' +
  '    "RequestBody": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "content"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "content": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "$ref": "#/definitions/MediaType"\n' +
  '          }\n' +
  '        },\n' +
  '        "required": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "SecurityScheme": {\n' +
  '      "oneOf": [\n' +
  '        {\n' +
  '          "$ref": "#/definitions/APIKeySecurityScheme"\n' +
  '        },\n' +
  '        {\n' +
  '          "$ref": "#/definitions/HTTPSecurityScheme"\n' +
  '        },\n' +
  '        {\n' +
  '          "$ref": "#/definitions/OAuth2SecurityScheme"\n' +
  '        },\n' +
  '        {\n' +
  '          "$ref": "#/definitions/OpenIdConnectSecurityScheme"\n' +
  '        }\n' +
  '      ]\n' +
  '    },\n' +
  '    "APIKeySecurityScheme": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "type",\n' +
  '        "name",\n' +
  '        "in"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "type": {\n' +
  '          "type": "string",\n' +
  '          "enum": [\n' +
  '            "apiKey"\n' +
  '          ]\n' +
  '        },\n' +
  '        "name": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "in": {\n' +
  '          "type": "string",\n' +
  '          "enum": [\n' +
  '            "header",\n' +
  '            "query",\n' +
  '            "cookie"\n' +
  '          ]\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "HTTPSecurityScheme": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "scheme",\n' +
  '        "type"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "scheme": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "bearerFormat": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "type": {\n' +
  '          "type": "string",\n' +
  '          "enum": [\n' +
  '            "http"\n' +
  '          ]\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false,\n' +
  '      "oneOf": [\n' +
  '        {\n' +
  '          "description": "Bearer",\n' +
  '          "properties": {\n' +
  '            "scheme": {\n' +
  '              "enum": [\n' +
  '                "bearer"\n' +
  '              ]\n' +
  '            }\n' +
  '          }\n' +
  '        },\n' +
  '        {\n' +
  '          "description": "Non Bearer",\n' +
  '          "not": {\n' +
  '            "required": [\n' +
  '              "bearerFormat"\n' +
  '            ]\n' +
  '          },\n' +
  '          "properties": {\n' +
  '            "scheme": {\n' +
  '              "not": {\n' +
  '                "enum": [\n' +
  '                  "bearer"\n' +
  '                ]\n' +
  '              }\n' +
  '            }\n' +
  '          }\n' +
  '        }\n' +
  '      ]\n' +
  '    },\n' +
  '    "OAuth2SecurityScheme": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "type",\n' +
  '        "flows"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "type": {\n' +
  '          "type": "string",\n' +
  '          "enum": [\n' +
  '            "oauth2"\n' +
  '          ]\n' +
  '        },\n' +
  '        "flows": {\n' +
  '          "$ref": "#/definitions/OAuthFlows"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "OpenIdConnectSecurityScheme": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "type",\n' +
  '        "openIdConnectUrl"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "type": {\n' +
  '          "type": "string",\n' +
  '          "enum": [\n' +
  '            "openIdConnect"\n' +
  '          ]\n' +
  '        },\n' +
  '        "openIdConnectUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "OAuthFlows": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "implicit": {\n' +
  '          "$ref": "#/definitions/ImplicitOAuthFlow"\n' +
  '        },\n' +
  '        "password": {\n' +
  '          "$ref": "#/definitions/PasswordOAuthFlow"\n' +
  '        },\n' +
  '        "clientCredentials": {\n' +
  '          "$ref": "#/definitions/ClientCredentialsFlow"\n' +
  '        },\n' +
  '        "authorizationCode": {\n' +
  '          "$ref": "#/definitions/AuthorizationCodeOAuthFlow"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "ImplicitOAuthFlow": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "authorizationUrl",\n' +
  '        "scopes"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "authorizationUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "refreshUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "scopes": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "type": "string"\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "PasswordOAuthFlow": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "tokenUrl"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "tokenUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "refreshUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "scopes": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "type": "string"\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "ClientCredentialsFlow": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "tokenUrl"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "tokenUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "refreshUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "scopes": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "type": "string"\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "AuthorizationCodeOAuthFlow": {\n' +
  '      "type": "object",\n' +
  '      "required": [\n' +
  '        "authorizationUrl",\n' +
  '        "tokenUrl"\n' +
  '      ],\n' +
  '      "properties": {\n' +
  '        "authorizationUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "tokenUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "refreshUrl": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "scopes": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "type": "string"\n' +
  '          }\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    },\n' +
  '    "Link": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "operationId": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "operationRef": {\n' +
  '          "type": "string",\n' +
  '          "format": "uri-reference"\n' +
  '        },\n' +
  '        "parameters": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '          }\n' +
  '        },\n' +
  '        "requestBody": {\n' +
  '        },\n' +
  '        "description": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "server": {\n' +
  '          "$ref": "#/definitions/Server"\n' +
  '        }\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false,\n' +
  '      "not": {\n' +
  '        "description": "Operation Id and Operation Ref are mutually exclusive",\n' +
  '        "required": [\n' +
  '          "operationId",\n' +
  '          "operationRef"\n' +
  '        ]\n' +
  '      }\n' +
  '    },\n' +
  '    "Callback": {\n' +
  '      "type": "object",\n' +
  '      "additionalProperties": {\n' +
  '        "$ref": "#/definitions/PathItem"\n' +
  '      },\n' +
  '      "patternProperties": {\n' +
  '        "^x-": {\n' +
  '        }\n' +
  '      }\n' +
  '    },\n' +
  '    "Encoding": {\n' +
  '      "type": "object",\n' +
  '      "properties": {\n' +
  '        "contentType": {\n' +
  '          "type": "string"\n' +
  '        },\n' +
  '        "headers": {\n' +
  '          "type": "object",\n' +
  '          "additionalProperties": {\n' +
  '            "$ref": "#/definitions/Header"\n' +
  '          }\n' +
  '        },\n' +
  '        "style": {\n' +
  '          "type": "string",\n' +
  '          "enum": [\n' +
  '            "form",\n' +
  '            "spaceDelimited",\n' +
  '            "pipeDelimited",\n' +
  '            "deepObject"\n' +
  '          ]\n' +
  '        },\n' +
  '        "explode": {\n' +
  '          "type": "boolean"\n' +
  '        },\n' +
  '        "allowReserved": {\n' +
  '          "type": "boolean",\n' +
  '          "default": false\n' +
  '        }\n' +
  '      },\n' +
  '      "additionalProperties": false\n' +
  '    }\n' +
  '  }\n' +
  '}';
