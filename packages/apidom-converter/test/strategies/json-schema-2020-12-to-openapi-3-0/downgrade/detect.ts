import { assert } from 'chai';
import { BooleanElement, ObjectElement } from '@swagger-api/apidom-core';
import { SchemaElement } from '@swagger-api/apidom-ns-openapi-3-0';

import needsDowngrade from '../../../../src/strategies/json-schema-2020-12-to-openapi-3-0/downgrade/detect.ts';

const schema = (value: Record<string, unknown>) => new ObjectElement(value);

describe('converter', function () {
  context('strategies', function () {
    context('json-schema-2020-12-to-openapi-3-0', function () {
      context('needsDowngrade', function () {
        context('given a valid OpenAPI 3.0 Schema Object', function () {
          specify('should return false', function () {
            const plain = schema({
              type: 'object',
              nullable: true,
              required: ['id'],
              properties: {
                id: { type: 'integer', minimum: 0, exclusiveMinimum: true, format: 'int64' },
                ref: { $ref: '#/components/schemas/Other', description: 'ignored sibling' },
                tags: { type: 'array', items: { type: 'string', format: 'uuid' } },
              },
              additionalProperties: false,
              allOf: [{ $ref: '#/components/schemas/Base' }],
              example: { id: 1 },
              discriminator: { propertyName: 'kind' },
              'x-vendor': { if: true, const: 1 },
            });

            assert.isFalse(needsDowngrade(plain));
            assert.isFalse(needsDowngrade(SchemaElement.refract(plain)));
          });
        });

        context('given 2020-12 or OAS-invalid constructs', function () {
          const cases: Array<[string, Record<string, unknown>]> = [
            ['const', { const: 1 }],
            ['examples', { examples: [1] }],
            ['$defs', { $defs: { A: { type: 'string' } } }],
            ['definitions', { definitions: { A: { type: 'string' } } }],
            ['if/then', { if: { required: ['a'] }, then: { required: ['b'] } }],
            ['dependentRequired', { dependentRequired: { a: ['b'] } }],
            ['dependencies', { dependencies: { a: ['b'] } }],
            ['prefixItems', { prefixItems: [{ type: 'string' }] }],
            ['patternProperties', { patternProperties: { '^x': { type: 'string' } } }],
            ['unevaluatedProperties', { unevaluatedProperties: false }],
            ['$id', { $id: 'https://example.com/s' }],
            ['id', { id: 'https://example.com/s' }],
            ['$schema', { $schema: 'https://json-schema.org/draft/2020-12/schema' }],
            ['contentEncoding', { contentEncoding: 'base64' }],
            ['type array', { type: ['string', 'null'] }],
            ['type null', { type: 'null' }],
            ['numeric exclusiveMinimum', { exclusiveMinimum: 5 }],
            ['empty required', { required: [] }],
            ['empty enum', { enum: [] }],
            ['tuple items', { items: [{ type: 'string' }] }],
            ['$ref to an $anchor', { $ref: '#user-profile' }],
            ['$ref with validation siblings', { $ref: '#/a', minProperties: 1 }],
            ['$ref with a type sibling', { $ref: '#/a', type: 'object', description: 'd' }],
            ['boolean subschema', { properties: { a: true } }],
            ['nested construct', { properties: { a: { allOf: [{ const: 1 }] } } }],
          ];

          cases.forEach(([name, value]) => {
            specify(`should return true for ${name}`, function () {
              assert.isTrue(needsDowngrade(schema(value)));
            });
          });

          specify('should return true for a boolean schema', function () {
            assert.isTrue(needsDowngrade(new BooleanElement(true)));
          });
        });

        context('given 2020-12 keywords only inside data positions', function () {
          specify('should return false', function () {
            const dataOnly = schema({
              type: 'object',
              example: { const: 1, $defs: {}, type: ['a', 'b'] },
              default: { if: true },
              enum: [{ examples: [] }],
              'x-extension': { prefixItems: [], type: 'null' },
            });

            assert.isFalse(needsDowngrade(dataOnly));
          });
        });

        context('given only annotations and extensions next to a $ref', function () {
          specify('should return false', function () {
            const ref = schema({
              $ref: '#/a',
              description: 'd',
              readOnly: true,
              nullable: true,
              'x-a': { minProperties: 1 },
            });

            assert.isFalse(needsDowngrade(ref));
          });
        });

        context('given additionalProperties: false', function () {
          specify('should return false', function () {
            assert.isFalse(needsDowngrade(schema({ additionalProperties: false })));
          });
        });
      });
    });
  });
});
