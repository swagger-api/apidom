import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { JSONSchemaElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('JSONSchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          // core vocabulary
          $schema: 'https://example.com/',
          $id: 'https://example.com',
          $vocabulary: {
            'https://json-schema.org/draft/2020-12/vocab/core': true,
          },
          $anchor: 'anchor',
          $dynamicAnchor: 'dynamicAnchor',
          $dynamicRef: '#node',
          $ref: '#/components/Schemas/Schema1',
          $defs: {
            enabledToggle: {},
          },
          $comment: 'comment',
          // applicator vocabulary
          allOf: [{}],
          anyOf: [{}],
          oneOf: [{}],
          not: {},
          if: {},
          then: {},
          else: {},
          dependentSchemas: {
            key: {},
          },
          prefixItems: [{}],
          items: {},
          contains: {},
          properties: {
            enabled: {},
          },
          patternProperties: {
            abc: {},
          },
          additionalProperties: {},
          propertyNames: {},
          // unevaluated Locations vocabulary
          unevaluatedItems: {},
          unevaluatedProperties: {},
          // validation vocabulary
          // validation Keywords for Any Instance Type
          type: 'object',
          enum: ['a', 1],
          const: null,
          // validation Keywords for Numeric Instances (number and integer)
          multipleOf: 2,
          maximum: 100,
          exclusiveMaximum: 99,
          minimum: 20,
          exclusiveMinimum: 19,
          // validation Keywords for Strings
          maxLength: 20,
          minLength: 10,
          pattern: 'abc',
          // validation Keywords for Arrays
          maxItems: 5,
          minItems: 1,
          uniqueItems: true,
          maxContains: 4,
          minContains: 2,
          // validation Keywords for Objects
          maxProperties: 5,
          minProperties: 4,
          require: ['prop1'],
          dependentRequired: {
            prop: ['prop1'],
          },
          // basic Meta-Data Annotations vocabulary
          title: 'schema-title',
          description: 'schema-description',
          default: 'test',
          deprecated: true,
          readOnly: true,
          writeOnly: false,
          examples: ['a', 1],
          // semantic Content With "format" vocabulary
          format: 'time',
          // contents of String-Encoded Data vocabulary
          contentEncoding: 'base64',
          contentMediaType: 'image/png',
          contentSchema: {},
        });

        expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
      });

      context('given embedded JSONSchemaElements', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const schemaElement = JSONSchemaElement.refract({
            $defs: {
              enabledToggle: { not: {} },
            },
            allOf: [{ not: {} }],
            dependentSchemas: {
              key: { not: {} },
            },
            contentSchema: { not: {} },
          });

          expect(sexprs(schemaElement)).toMatchSnapshot();
        });
      });

      context('given Boolean JSON Schemas', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const schemaElement = JSONSchemaElement.refract({
            $defs: {
              enabledToggle: { not: true },
            },
            allOf: [true, false],
            dependentSchemas: {
              key: { not: false },
            },
          });

          expect(sexprs(schemaElement)).toMatchSnapshot();
        });
      });
    });
  });
});
