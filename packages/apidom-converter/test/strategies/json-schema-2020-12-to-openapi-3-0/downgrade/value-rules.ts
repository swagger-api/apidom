import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';

import { assertLosslessRule, assertSameMeaning, downgrade } from './helpers.ts';

describe('converter', function () {
  context('strategies', function () {
    context('json-schema-2020-12-to-openapi-3-0', function () {
      context('value rules', function () {
        specify('semantic comparison should detect a difference', function () {
          assert.throws(() => assertSameMeaning({ type: 'string' }, {}));
        });

        context('type', function () {
          specify('should convert a one-item type array to a string', function () {
            assertLosslessRule({ type: ['string'] }, { type: 'string' });
          });

          specify('should convert [X, "null"] to nullable X', function () {
            assertLosslessRule({ type: ['string', 'null'] }, { type: 'string', nullable: true });
          });

          specify('should split several types into anyOf with type-specific keywords', function () {
            assertLosslessRule(
              {
                type: ['string', 'object', 'array'],
                format: 'email',
                items: {},
                properties: {},
                description: 'stays on the parent',
              },
              {
                description: 'stays on the parent',
                anyOf: [
                  { type: 'string', format: 'email' },
                  { type: 'object', properties: {} },
                  { type: 'array', items: {} },
                ],
              },
            );
          });

          specify('should make every branch nullable when "null" is listed', function () {
            assertLosslessRule(
              { type: ['string', 'integer', 'null'], minimum: 1 },
              {
                anyOf: [
                  { type: 'string', nullable: true },
                  { type: 'integer', minimum: 1, nullable: true },
                ],
              },
            );
          });

          specify('should wrap the split in allOf when anyOf already exists', function () {
            assertLosslessRule(
              { type: ['string', 'integer'], anyOf: [{ minimum: 5 }, { minLength: 1 }] },
              {
                anyOf: [{ minimum: 5 }, { minLength: 1 }],
                allOf: [{ anyOf: [{ type: 'string' }, { type: 'integer' }] }],
              },
            );
          });

          specify('should convert a null-only type to the null-only form', function () {
            assertLosslessRule({ type: 'null' }, { type: 'string', nullable: true, enum: [null] });
            assertLosslessRule(
              { type: ['null'] },
              { type: 'string', nullable: true, enum: [null] },
            );
          });
        });

        context('const and enum', function () {
          specify('should convert const to a one-item enum', function () {
            assertLosslessRule({ const: 'test' }, { enum: ['test'] });
          });

          specify('should keep an existing enum and add const through allOf', function () {
            assertLosslessRule(
              { enum: ['a', 'b'], const: 'a' },
              { enum: ['a', 'b'], allOf: [{ enum: ['a'] }] },
            );
          });

          specify('should convert const null to the null-only form', function () {
            assertLosslessRule({ const: null }, { type: 'string', nullable: true, enum: [null] });
          });

          specify('should remove a null the type does not allow from enum', function () {
            assertLosslessRule(
              { type: 'string', enum: ['a', null] },
              { type: 'string', enum: ['a'] },
            );
          });
        });

        context('exclusive bounds', function () {
          const cases: Array<[string, Record<string, number>, Record<string, unknown>]> = [
            [
              'exclusiveMinimum only',
              { exclusiveMinimum: 5 },
              { minimum: 5, exclusiveMinimum: true },
            ],
            [
              'minimum == exclusiveMinimum',
              { minimum: 5, exclusiveMinimum: 5 },
              { minimum: 5, exclusiveMinimum: true },
            ],
            [
              'minimum < exclusiveMinimum',
              { minimum: 0, exclusiveMinimum: 5 },
              { minimum: 5, exclusiveMinimum: true },
            ],
            ['minimum > exclusiveMinimum', { minimum: 5, exclusiveMinimum: 0 }, { minimum: 5 }],
            [
              'exclusiveMaximum only',
              { exclusiveMaximum: 5 },
              { maximum: 5, exclusiveMaximum: true },
            ],
            [
              'maximum > exclusiveMaximum',
              { maximum: 5, exclusiveMaximum: 0 },
              { maximum: 0, exclusiveMaximum: true },
            ],
            ['maximum < exclusiveMaximum', { maximum: 0, exclusiveMaximum: 5 }, { maximum: 0 }],
          ];

          cases.forEach(([name, input, expected]) => {
            specify(`should convert ${name}`, function () {
              assertLosslessRule(input, expected);
            });
          });

          specify('should leave boolean exclusive bounds unchanged', function () {
            const input = { minimum: 1, exclusiveMinimum: true };

            assert.deepEqual(downgrade(input).output, input);
          });
        });

        context('required', function () {
          specify('should remove an empty required', function () {
            assertLosslessRule({ required: [] }, {});
          });
        });

        context('examples', function () {
          specify('should convert examples to example', function () {
            const { output, warnings } = downgrade({ type: 'string', examples: ['a'] });

            assert.deepEqual(output, { type: 'string', example: 'a' });
            assert.lengthOf(warnings, 0);
          });

          specify('should replace an existing example and warn about dropped entries', function () {
            const { output, warnings } = downgrade({
              type: 'string',
              example: 'old',
              examples: ['a', 'b'],
            });

            assert.deepEqual(output, { type: 'string', example: 'a' });
            assert.lengthOf(warnings, 1);
            assert.strictEqual(toValue(warnings[0].attributes.get('code')), 'examples-truncated');
            assert.isTrue(warnings[0].classes.includes('warning'));
          });
        });

        context('boolean subschemas', function () {
          specify('should convert true and false to object schemas', function () {
            assertLosslessRule(
              { properties: { foo: true, bar: false }, items: false },
              { properties: { foo: {}, bar: { not: {} } }, items: { not: {} } },
            );
          });

          specify('should keep boolean additionalProperties', function () {
            const input = { properties: { a: {} }, additionalProperties: false };

            assert.deepEqual(downgrade(input).output, input);
          });
        });

        context('dropped keywords', function () {
          specify('should drop each keyword with a warning', function () {
            const { output, warnings } = downgrade({
              $schema: 'https://json-schema.org/draft/2020-12/schema',
              $id: 'https://example.com/s',
              $comment: 'note',
              contentEncoding: 'base64',
              contentMediaType: 'image/png',
              type: 'string',
            });

            assert.deepEqual(output, { type: 'string' });
            assert.lengthOf(warnings, 5);
            warnings.forEach((warning) =>
              assert.strictEqual(toValue(warning.attributes.get('code')), 'dropped-keyword'),
            );
          });
        });

        context('nested schemas', function () {
          specify('should apply the rules at every depth', function () {
            const input = {
              type: 'object',
              properties: {
                a: { type: ['integer', 'null'], examples: [1] },
                b: { items: { const: 'x' } },
              },
            };
            const { output } = downgrade(input);

            assert.deepEqual(output, {
              type: 'object',
              properties: {
                a: { type: 'integer', nullable: true, example: 1 },
                b: { items: { enum: ['x'] } },
              },
            });
            assertSameMeaning(input, output);
          });
        });

        context('format', function () {
          specify('should keep every format value', function () {
            const input = { type: 'string', format: 'idn-email' };

            assert.deepEqual(downgrade(input).output, input);
          });
        });
      });
    });
  });
});
