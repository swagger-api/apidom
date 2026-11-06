import { assert } from 'chai';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';

import downgradeSchema, {
  baseURIAt,
  buildIdentifierIndex,
  createWarnings,
} from '../../../../src/strategies/json-schema-2020-12-to-openapi-3-0/downgrade/index.ts';
import { downgrade } from './helpers.ts';

const documentURI = 'file:///specs/openapi.json';

const downgradeInDocument = (document: Record<string, unknown>, tokens: string[]) => {
  const documentElement = new ObjectElement(document);
  const index = buildIdentifierIndex(documentElement, documentURI);
  let schema: any = documentElement;
  tokens.forEach((token) => {
    schema = schema.get(token);
  });

  return toValue(
    downgradeSchema(schema, createWarnings(), {
      documentURI,
      baseURI: baseURIAt(documentElement, documentURI, tokens),
      index,
    }),
  ) as any;
};

describe('converter', function () {
  context('strategies', function () {
    context('json-schema-2020-12-to-openapi-3-0', function () {
      context('$ref handling', function () {
        context('given a $ref to an $anchor', function () {
          specify('should rewrite it to a JSON Pointer', function () {
            const document = {
              components: {
                schemas: {
                  User: { type: 'object', properties: { profile: { $ref: '#user-profile' } } },
                  UserProfile: { $anchor: 'user-profile', properties: { firstName: {} } },
                },
              },
            };
            const user = downgradeInDocument(document, ['components', 'schemas', 'User']);
            const profile = downgradeInDocument(document, ['components', 'schemas', 'UserProfile']);

            assert.deepEqual(user.properties.profile, {
              $ref: '#/components/schemas/UserProfile',
            });
            assert.deepEqual(profile, { properties: { firstName: {} } });
          });
        });

        context('given a $ref to an $id', function () {
          specify('should rewrite it to a JSON Pointer', function () {
            const id = 'urn:uuid:ee564b8a-7a87-4125-8c96-e9f123d6766f';
            const document = {
              components: {
                schemas: {
                  User: { properties: { profile: { $ref: id } } },
                  UserProfile: { $id: id, type: 'object' },
                },
              },
            };
            const user = downgradeInDocument(document, ['components', 'schemas', 'User']);

            assert.deepEqual(user.properties.profile, {
              $ref: '#/components/schemas/UserProfile',
            });
          });

          specify('should keep a JSON Pointer fragment after an $id', function () {
            const document = {
              $defs: {
                Root: {
                  $id: 'https://example.com/root',
                  $defs: {
                    A: { $id: 'a', properties: { x: { type: 'string' } } },
                  },
                  properties: { y: { $ref: 'a#/properties/x' } },
                },
              },
            };
            const root = downgradeInDocument(document, ['$defs', 'Root']);

            assert.strictEqual(root.properties.y.$ref, '#/$defs/Root/$defs/A/properties/x');
          });
        });

        context('given a $ref to another document', function () {
          specify('should leave it unchanged', function () {
            const document = {
              components: { schemas: { A: { $ref: 'https://example.com/other.json#anchor' } } },
            };

            assert.deepEqual(downgradeInDocument(document, ['components', 'schemas', 'A']), {
              $ref: 'https://example.com/other.json#anchor',
            });
          });
        });

        context('given $id-like keys in data positions', function () {
          specify('should not index them', function () {
            const document = new ObjectElement({
              components: {
                schemas: {
                  A: { example: { $id: 'urn:x', $anchor: 'data' }, 'x-meta': { $id: 'urn:y' } },
                },
              },
            });

            assert.strictEqual(buildIdentifierIndex(document, documentURI).size, 0);
          });

          specify('should index schemas whose property names match data keywords', function () {
            const document = new ObjectElement({
              properties: { example: { $anchor: 'named-example' } },
            });
            const index = buildIdentifierIndex(document, documentURI);

            assert.deepEqual(index.get(`${documentURI}#named-example`), ['properties', 'example']);
          });
        });

        context('given validation keywords next to a $ref', function () {
          specify('should move them into allOf and keep annotations on the schema', function () {
            const { output } = downgrade({
              $ref: '#/components/schemas/UserProfile',
              description: 'a user',
              'x-ext': 1,
              properties: { foo: {}, bar: {} },
              minProperties: 1,
            });

            assert.deepEqual(output, {
              description: 'a user',
              'x-ext': 1,
              allOf: [
                { properties: { foo: {}, bar: {} }, minProperties: 1 },
                { $ref: '#/components/schemas/UserProfile' },
              ],
            });
          });

          specify('should merge an existing allOf', function () {
            const { output } = downgrade({
              $ref: '#/components/schemas/A',
              allOf: [{ required: ['a'] }],
              minProperties: 1,
            });

            assert.deepEqual(output, {
              allOf: [
                { minProperties: 1 },
                { required: ['a'] },
                { $ref: '#/components/schemas/A' },
              ],
            });
          });
        });

        context('given only annotations next to a $ref', function () {
          specify('should leave the schema unchanged', function () {
            const input = { $ref: '#/components/schemas/A', description: 'kept' };

            assert.deepEqual(downgrade(input).output, input);
          });
        });

        context('given a relative ref to another document under an $id', function () {
          const convertWithWarnings = (document: Record<string, unknown>, tokens: string[]) => {
            const documentElement = new ObjectElement(document);
            let schema: any = documentElement;
            tokens.forEach((token) => {
              schema = schema.get(token);
            });
            const warnings = createWarnings();
            downgradeSchema(schema, warnings, {
              documentURI,
              baseURI: baseURIAt(documentElement, documentURI, tokens),
              index: buildIdentifierIndex(documentElement, documentURI),
            });
            return warnings.annotations.map((a) => toValue(a.attributes.get('code')));
          };

          specify('should warn when the $id base resolves it elsewhere', function () {
            const codes = convertWithWarnings(
              {
                components: {
                  schemas: {
                    A: {
                      $id: 'https://schemas.example.com/a',
                      properties: { b: { $ref: 'b.json' } },
                    },
                  },
                },
              },
              ['components', 'schemas', 'A'],
            );

            assert.include(codes, 'id-base-mismatch');
          });

          specify('should not warn without an $id', function () {
            const codes = convertWithWarnings(
              { components: { schemas: { A: { properties: { b: { $ref: 'b.json' } } } } } },
              ['components', 'schemas', 'A'],
            );

            assert.notInclude(codes, 'id-base-mismatch');
          });
        });
      });
    });
  });
});
