import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SchemaElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const schemaElement = SchemaElement.refract({
          // core vocabulary
          $id: '#foo',
          $comment: 'comment',
          // validation vocabulary
          // validation keywords for Applying Subschemas With Boolean Logic
          allOf: [{}, { $ref: '#/components/schemas/Schema1' }],
          anyOf: [{}, { $ref: '#/components/schemas/Schema1' }],
          oneOf: [{}, { $ref: '#/components/schemas/Schema1' }],
          // validation Keywords for Applying Subschemas Conditionally
          if: {},
          then: {},
          else: {},
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
          items: {},
          additionalItems: {},
          maxItems: 5,
          minItems: 1,
          uniqueItems: true,
          contains: {},
          // validation Keywords for Objects
          maxProperties: 5,
          minProperties: 4,
          require: ['prop1'],
          properties: {
            enabled: {},
            disabled: { $ref: '#/components/schemas/Schema1' },
          },
          patternProperties: {
            abc: {},
            abcd: { $ref: '#/components/schemas/Schema1' },
          },
          additionalProperties: {}, // additional test
          dependencies: {
            prop1: {},
            prop2: { $ref: '#/components/schemas/Schema1' },
          }, // need addtional test for [] as value of prop
          propertyNames: {}, // additional test
          // validation vocabulary for Schema Annotations
          title: 'schema-title',
          description: 'schema-description',
          default: 'test',
          readOnly: true,
          writeOnly: false,
          examples: ['a', 1],
          // validation Vocabularies for Semantic Validation With "format"
          format: 'time',
          // validation Vocabulary for String-Encoding Non-JSON Data
          contentEncoding: 'base64',
          contentMediaType: 'image/png',
          // validation Vocabulary for Schema Re-Use With "definitions"
          definitions: {
            enabledToggle: {},
            disableToggle: { $ref: '#/components/schemas/Schema1' },
          },
          // hyper-schema vocabulary
          links: [{}],
          // AsyncAPI vocabulary
          discriminator: 'schema-discriminator',
          externalDocs: {},
          deprecated: true,
        });

        expect(sexprs(schemaElement)).toMatchSnapshot();
      });

      context('given embedded SchemaElements', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const schemaElement = SchemaElement.refract({
            definitions: {
              enabledToggle: { not: {} },
            },
            allOf: [{ not: {} }],
            properties: {
              enabled: { not: {} },
            },
          });

          expect(sexprs(schemaElement)).toMatchSnapshot();
        });
      });

      context('given fields of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const schemaElement = SchemaElement.refract({
            // validation Keywords for Applying Subschemas Conditionally
            if: { $ref: '#/components/schemas/Schema1' },
            then: { $ref: '#/components/schemas/Schema1' },
            else: { $ref: '#/components/schemas/Schema1' },
            // validation Keywords for Arrays
            items: [{}, { $ref: '#/components/schemas/Schema1' }],
            additionalItems: { $ref: '#/components/schemas/Schema1' },
            contains: { $ref: '#/components/schemas/Schema1' },
            // validation Keywords for Objects
            additionalProperties: { $ref: '#/components/schemas/Schema1' },
            propertyNames: { $ref: '#/components/schemas/Schema1' },
          });

          expect(sexprs(schemaElement)).toMatchSnapshot();
        });
      });
    });
  });
});
