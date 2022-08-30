import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SchemaElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const schemaElement = SchemaElement.refract({
          // JSON Schema vocabulary
          id: 'http://x.y.z/rootschema.json#',
          $schema: 'http://json-schema.org/draft-04/schema#',
          multipleOf: 1,
          maximum: 2,
          exclusiveMaximum: true,
          minimum: 4,
          exclusiveMinimum: false,
          maxLength: 6,
          minLength: 7,
          pattern: '[a-z]+',
          additionalItems: {},
          items: [{}],
          maxItems: 8,
          minItems: 9,
          uniqueItems: true,
          maxProperties: 10,
          minProperties: 11,
          required: ['prop1', 'prop2'],
          properties: { prop1: {} },
          additionalProperties: {},
          patternProperties: { '[a-z]+': {} },
          dependencies: { dep1: {} },
          enum: [1, '2', null],
          type: 'string',
          allOf: [{}],
          anyOf: [{}],
          oneOf: [{}],
          not: {},
          definitions: { def1: {} },
          title: 'title',
          description: 'description',
          default: 3,
          format: 'url',
          base: '/object/{id}',
          links: [{}],
          media: {},
          readOnly: false,
          // OpenAPI vocabulary,
          nullable: true,
          discriminator: {},
          writeOnly: false,
          xml: {},
          externalDocs: {},
          example: 1,
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
          });

          expect(sexprs(schemaElement)).toMatchSnapshot();
        });
      });
    });
  });
});
