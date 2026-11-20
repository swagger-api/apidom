import { assert } from 'chai';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';

import downgradeSchema, {
  baseURIAt,
  buildIdentifierIndex,
  createWarnings,
} from '../../../../src/strategies/json-schema-2020-12-to-openapi-3-0/downgrade/index.ts';
import {
  fragmentTokens,
  toPointerFragment,
} from '../../../../src/strategies/json-schema-2020-12-to-openapi-3-0/downgrade/refs.ts';
import { elementAt } from '../../../../src/strategies/json-schema-2020-12-to-openapi-3-0/downgrade/document.ts';
import { assertSameMeaning, downgrade } from './helpers.ts';

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
      context('JSON Pointers', function () {
        specify('should round-trip tokens through URI fragments', function () {
          const tokens = ['a/b', 'c~d', 'e?f', 'g%h', 'i j', 'x-conversion-$defs', 'é', '01', ''];
          const fragment = toPointerFragment(tokens);

          assert.strictEqual(fragment, '#/a~1b/c~0d/e?f/g%25h/i%20j/x-conversion-$defs/%C3%A9/01/');
          assert.deepEqual(fragmentTokens(fragment.slice(1)), tokens);
          assert.strictEqual(toPointerFragment([]), '#');
          assert.deepEqual(fragmentTokens(''), []);
        });

        specify('should percent-decode a fragment before splitting it (RFC 6901)', function () {
          assert.deepEqual(fragmentTokens('/a%2Fb'), ['a', 'b']);
        });

        specify('should return undefined for a fragment that is not a JSON Pointer', function () {
          assert.isUndefined(fragmentTokens('/a~2'));
          assert.isUndefined(fragmentTokens('anchor'));
          assert.isUndefined(fragmentTokens('/%E0%A4%A'));
        });

        specify('should find elements by object key and array index', function () {
          const document = new ObjectElement({ a: { '01': 'key', list: ['x', 'y'] } });

          assert.strictEqual(toValue(elementAt(document, ['a', '01'])), 'key');
          assert.strictEqual(toValue(elementAt(document, ['a', 'list', '1'])), 'y');
          assert.strictEqual(elementAt(document, []), document);
          assert.isUndefined(elementAt(document, ['a', 'missing']));
          assert.isUndefined(elementAt(document, ['a', 'list', '01']));
          assert.isUndefined(elementAt(document, ['a', 'list', '2']));
        });
      });

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

          specify('should rewrite a discriminator.mapping value to it', function () {
            const document = {
              components: {
                schemas: {
                  Dog: { $anchor: 'dog', type: 'object' },
                  Pet: {
                    oneOf: [{ $ref: '#dog' }],
                    discriminator: { propertyName: 'kind', mapping: { dog: '#dog', cat: 'Cat' } },
                  },
                },
              },
            };
            const pet = downgradeInDocument(document, ['components', 'schemas', 'Pet']);

            assert.deepEqual(pet.discriminator.mapping, {
              dog: '#/components/schemas/Dog',
              cat: 'Cat',
            });
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

        context('given a Draft 6/7 $id with a plain-name fragment', function () {
          const root = 'https://example.com/root.json';

          specify('should index a fragment-only $id as an anchor', function () {
            const document = new ObjectElement({
              $id: root,
              definitions: { A: { $id: '#foo', type: 'integer' } },
            });
            const index = buildIdentifierIndex(document, documentURI);

            assert.deepEqual(index.get(root), []);
            assert.deepEqual(index.get(`${root}#foo`), ['definitions', 'A']);
          });

          specify('should rewrite a $ref to it into a JSON Pointer', function () {
            const document = {
              $id: root,
              definitions: {
                A: { $id: '#foo', type: 'integer' },
                B: { properties: { a: { $ref: '#foo' } } },
              },
            };

            assert.deepEqual(downgradeInDocument(document, ['definitions', 'B']), {
              properties: { a: { $ref: '#/definitions/A' } },
            });
          });

          specify('should not change where JSON Pointer refs of the document point', function () {
            const document = {
              $id: root,
              definitions: {
                A: { $id: '#foo', type: 'integer' },
                B: { properties: { c: { $ref: '#/definitions/C' } } },
                C: { type: 'string' },
              },
            };

            assert.deepEqual(downgradeInDocument(document, ['definitions', 'B']), {
              properties: { c: { $ref: '#/definitions/C' } },
            });
          });

          specify('should not change the base URI', function () {
            const document = new ObjectElement({
              $id: root,
              definitions: { A: { $id: '#foo', properties: { b: {} } } },
            });

            assert.strictEqual(
              baseURIAt(document, documentURI, ['definitions', 'A', 'properties', 'b']),
              root,
            );
          });

          specify('should index both the base and the anchor of "other.json#bar"', function () {
            const document = {
              $id: root,
              definitions: {
                A: { $id: 'other.json#bar', type: 'integer' },
                B: {
                  properties: {
                    byAnchor: { $ref: 'https://example.com/other.json#bar' },
                    byId: { $ref: 'other.json' },
                  },
                },
              },
            };

            assert.deepEqual(downgradeInDocument(document, ['definitions', 'B']).properties, {
              byAnchor: { $ref: '#/definitions/A' },
              byId: { $ref: '#/definitions/A' },
            });
          });
        });

        context('given a Draft 4 id', function () {
          const root = 'https://example.com/root.json';

          specify('should rewrite a $ref to a plain-name id into a JSON Pointer', function () {
            const document = {
              id: root,
              definitions: {
                A: { id: '#a', type: 'string' },
                B: { properties: { a: { $ref: '#a' } } },
              },
            };

            assert.deepEqual(downgradeInDocument(document, ['definitions', 'B']), {
              properties: { a: { $ref: '#/definitions/A' } },
            });
          });

          specify('should use an id that is a URI as the base URI', function () {
            const document = new ObjectElement({
              id: root,
              definitions: { A: { id: 'other.json', properties: { b: {} } } },
            });

            assert.strictEqual(
              baseURIAt(document, documentURI, ['definitions', 'A', 'properties', 'b']),
              'https://example.com/other.json',
            );
          });

          specify('should prefer $id when a schema has both', function () {
            const document = new ObjectElement({ $id: root, id: 'https://example.com/id.json' });

            assert.deepEqual(buildIdentifierIndex(document, documentURI).get(root), []);
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

          context('given a nullable type', function () {
            const input = { $ref: '#/definitions/S', type: ['string', 'null'], description: 'd' };
            const withDefinitions = (schema: unknown, S: unknown) => ({
              ...(schema as object),
              definitions: { S },
            });

            specify('should move nullable together with type', function () {
              const { output } = downgrade(input);

              assert.deepEqual(output, {
                description: 'd',
                allOf: [{ type: 'string', nullable: true }, { $ref: '#/definitions/S' }],
              });
            });

            specify('should keep accepting null when the target does', function () {
              const { output } = downgrade(input);

              [{}, { minLength: 1 }, { type: 'string' }, { type: 'integer' }].forEach((S) =>
                assertSameMeaning(withDefinitions(input, S), withDefinitions(output, S)),
              );
            });

            specify('should leave nullable without type on the schema', function () {
              const { output } = downgrade({
                $ref: '#/definitions/S',
                nullable: true,
                minLength: 1,
              });

              assert.deepEqual(output, {
                nullable: true,
                allOf: [{ minLength: 1 }, { $ref: '#/definitions/S' }],
              });
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

        context('given only annotations or extensions next to a $ref', function () {
          specify('should move the $ref into allOf and keep them on the schema', function () {
            assert.deepEqual(
              downgrade({ $ref: '#/components/schemas/A', description: 'kept', 'x-a': 1 }).output,
              { description: 'kept', 'x-a': 1, allOf: [{ $ref: '#/components/schemas/A' }] },
            );
          });

          specify('should leave a $ref without siblings unchanged', function () {
            const input = { $ref: '#/components/schemas/A' };

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
