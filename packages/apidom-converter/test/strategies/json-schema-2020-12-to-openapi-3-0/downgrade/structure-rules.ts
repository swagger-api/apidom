import { assert } from 'chai';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';

import downgradeSchemasInDocument from '../../../../src/strategies/json-schema-2020-12-to-openapi-3-0/downgrade/document.ts';
import { createWarnings } from '../../../../src/strategies/json-schema-2020-12-to-openapi-3-0/downgrade/index.ts';
import {
  assertLosslessRule,
  assertNeverStricter,
  assertSameMeaning,
  downgrade,
} from './helpers.ts';

const codes = (warnings: any[]) => warnings.map((w) => toValue(w.attributes.get('code')));

const convertDocument = (document: Record<string, unknown>, pointers: string[][]) => {
  const element = new ObjectElement(document);
  const warnings = createWarnings();
  downgradeSchemasInDocument(element, 'file:///specs/openapi.json', pointers, warnings);

  return { document: toValue(element) as any, warnings: warnings.annotations };
};

describe('converter', function () {
  context('strategies', function () {
    context('json-schema-2020-12-to-openapi-3-0', function () {
      context('structure rules', function () {
        context('conditionals', function () {
          const ifSchema = { properties: { A: { const: 1 } } };
          const ifConverted = { properties: { A: { enum: [1] } } };

          specify('should fold if + then + else into oneOf', function () {
            assertLosslessRule(
              { if: ifSchema, then: { required: ['B'] }, else: { required: ['C'] } },
              {
                oneOf: [
                  { allOf: [ifConverted, { required: ['B'] }] },
                  { allOf: [{ not: ifConverted }, { required: ['C'] }] },
                ],
              },
            );
          });

          specify('should fold if + then into anyOf', function () {
            assertLosslessRule(
              { if: ifSchema, then: { required: ['B'] } },
              { anyOf: [{ not: ifConverted }, { allOf: [ifConverted, { required: ['B'] }] }] },
            );
          });

          specify('should fold if + else into anyOf', function () {
            assertLosslessRule(
              { if: ifSchema, else: { required: ['B'] } },
              { anyOf: [ifConverted, { allOf: [{ not: ifConverted }, { required: ['B'] }] }] },
            );
          });

          specify('should wrap the fold in allOf when anyOf already exists', function () {
            const input = {
              anyOf: [{ required: ['A'] }, { required: ['C'] }],
              if: ifSchema,
              then: { required: ['B'] },
            };
            const { output } = downgrade(input);

            assert.deepEqual(output, {
              anyOf: [{ required: ['A'] }, { required: ['C'] }],
              allOf: [
                { anyOf: [{ not: ifConverted }, { allOf: [ifConverted, { required: ['B'] }] }] },
              ],
            });
            assertSameMeaning(input, output);
          });

          specify('should move a lone if, then or else with a warning', function () {
            const input = { then: ifSchema, else: { required: ['B'] } };
            const { output, warnings } = downgrade(input);

            assert.deepEqual(output, {
              'x-conversion-then': ifConverted,
              'x-conversion-else': { required: ['B'] },
            });
            assert.deepEqual(codes(warnings), ['moved-keyword', 'moved-keyword']);
            assertSameMeaning(input, output);
          });
        });

        context('dependencies', function () {
          specify('should fold dependentRequired', function () {
            assertLosslessRule(
              { type: 'object', dependentRequired: { license: ['age'] } },
              {
                type: 'object',
                anyOf: [
                  { not: { type: 'object', required: ['license'] } },
                  { required: ['license', 'age'] },
                ],
              },
            );
          });

          specify('should fold dependentSchemas', function () {
            assertLosslessRule(
              {
                dependentSchemas: {
                  license: { properties: { age: { type: 'number' } }, required: ['age'] },
                },
              },
              {
                anyOf: [
                  { not: { type: 'object', required: ['license'] } },
                  {
                    allOf: [
                      { required: ['license'] },
                      { properties: { age: { type: 'number' } }, required: ['age'] },
                    ],
                  },
                ],
              },
            );
          });

          specify('should fold Draft 4 dependencies in both forms', function () {
            const input = { dependencies: { license: ['age'], age: { required: ['name'] } } };
            const { output, warnings } = downgrade(input);

            assert.deepEqual(output, {
              anyOf: [
                { not: { type: 'object', required: ['license'] } },
                { required: ['license', 'age'] },
              ],
              allOf: [
                {
                  anyOf: [
                    { not: { type: 'object', required: ['age'] } },
                    { allOf: [{ required: ['age'] }, { required: ['name'] }] },
                  ],
                },
              ],
            });
            assert.lengthOf(warnings, 0);
          });

          specify('should not apply a dependent schema to non-object values', function () {
            const input = { dependentSchemas: { license: { type: 'object', required: ['age'] } } };

            assertSameMeaning(input, downgrade(input).output);
          });

          specify('should fold a boolean dependent schema', function () {
            const input = { dependentSchemas: { license: false } };
            const { output } = downgrade(input);

            assertSameMeaning(input, output);
          });
        });

        context('moves', function () {
          specify('should move prefixItems together with items', function () {
            const input = { prefixItems: [{ type: 'string' }], items: { type: 'integer' } };
            const { output, warnings } = downgrade(input);

            assert.deepEqual(output, {
              'x-conversion-prefixItems': [{ type: 'string' }],
              'x-conversion-items': { type: 'integer' },
            });
            assert.deepEqual(codes(warnings), ['moved-keyword']);
            assertNeverStricter(input, output);
          });

          specify('should move patternProperties together with additionalProperties', function () {
            const input = { patternProperties: { '^x-': {} }, additionalProperties: false };
            const { output } = downgrade(input);

            assert.deepEqual(output, {
              'x-conversion-patternProperties': { '^x-': {} },
              'x-conversion-additionalProperties': false,
            });
            assertNeverStricter(input, output);
          });

          specify('should move Draft 4 tuple items together with additionalItems', function () {
            const input = { items: [{ type: 'string' }], additionalItems: false };
            const { output } = downgrade(input);

            assert.deepEqual(output, {
              'x-conversion-items': [{ type: 'string' }],
              'x-conversion-additionalItems': { not: {} },
            });
          });

          specify('should move unevaluatedProperties and contains', function () {
            const input = {
              unevaluatedProperties: false,
              contains: { type: 'integer' },
              minContains: 2,
            };
            const { output, warnings } = downgrade(input);

            assert.deepEqual(output, {
              'x-conversion-contains': { type: 'integer' },
              'x-conversion-unevaluatedProperties': { not: {} },
            });
            assert.sameMembers(codes(warnings), [
              'moved-keyword',
              'moved-keyword',
              'dropped-keyword',
            ]);
            assertNeverStricter(input, output);
          });

          specify('should downgrade schemas inside a stash', function () {
            const { output } = downgrade({ $defs: { A: { const: 1, type: ['string', 'null'] } } });

            assert.deepEqual(output, {
              'x-conversion-$defs': { A: { enum: [1], type: 'string', nullable: true } },
            });
          });
        });

        context('references into moved keywords', function () {
          specify('should rewrite refs to $defs as in the doc example', function () {
            const { document } = convertDocument(
              {
                $ref: '#/$defs/def1',
                $defs: { def1: { type: 'string' }, def2: { $ref: '#/$defs/def1' } },
              },
              [[]],
            );

            assert.deepEqual(document, {
              $ref: '#/x-conversion-$defs/def1',
              'x-conversion-$defs': {
                def1: { type: 'string' },
                def2: { $ref: '#/x-conversion-$defs/def1' },
              },
            });
          });

          specify('should rewrite refs from other schemas of the document', function () {
            const { document } = convertDocument(
              {
                components: {
                  schemas: {
                    A: { $defs: { B: { type: 'string' } } },
                    C: { $ref: '#/components/schemas/A/$defs/B' },
                  },
                },
              },
              [
                ['components', 'schemas', 'A'],
                ['components', 'schemas', 'C'],
              ],
            );

            assert.strictEqual(
              document.components.schemas.C.$ref,
              '#/components/schemas/A/x-conversion-$defs/B',
            );
          });

          specify('should follow subschemas relocated by a parent rule', function () {
            const { document } = convertDocument(
              {
                components: {
                  schemas: {
                    Base: { type: 'object' },
                    A: {
                      $ref: '#/components/schemas/Base',
                      properties: { p: { $defs: { T: { type: 'string' } } } },
                    },
                    D: { $ref: '#/components/schemas/A/properties/p/$defs/T' },
                  },
                },
              },
              [['components', 'schemas', 'A']],
            );

            assert.strictEqual(
              document.components.schemas.D.$ref,
              '#/components/schemas/A/allOf/0/properties/p/x-conversion-$defs/T',
            );
            assert.strictEqual(
              document.components.schemas.A.allOf[1].$ref,
              '#/components/schemas/Base',
            );
          });

          specify('should rewrite an $anchor ref whose target moved', function () {
            const { document } = convertDocument(
              {
                components: {
                  schemas: {
                    A: { $defs: { F: { $anchor: 'foo', type: 'string' } } },
                    C: { $ref: '#foo' },
                  },
                },
              },
              [
                ['components', 'schemas', 'A'],
                ['components', 'schemas', 'C'],
              ],
            );

            assert.strictEqual(
              document.components.schemas.C.$ref,
              '#/components/schemas/A/x-conversion-$defs/F',
            );
          });

          specify('should leave no internal metadata behind', function () {
            const element = new ObjectElement({
              components: {
                schemas: { A: { $defs: { B: {} } }, C: { $ref: '#/components/schemas/A/$defs/B' } },
              },
            });
            downgradeSchemasInDocument(
              element,
              'file:///x.json',
              [['components', 'schemas', 'A']],
              createWarnings(),
            );
            const target: any = (element as any)
              .get('components')
              .get('schemas')
              .get('A')
              .get('x-conversion-$defs')
              .get('B');

            assert.isFalse(target.meta.hasKey('downgrade-ref-targets'));
          });
        });
      });
    });
  });
});
