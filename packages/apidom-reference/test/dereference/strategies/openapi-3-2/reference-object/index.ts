import path from 'node:path';
import { assert } from 'chai';
import { ParseResultElement, Element, toValue } from '@swagger-api/apidom-core';
import { isParameterElement, isSchemaElement, mediaTypes } from '@swagger-api/apidom-ns-openapi-3-2';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { loadJsonFile } from '../../../../helpers.ts';
import { dereference, dereferenceApiDOM, resolve, parse } from '../../../../../src/index.ts';
import DereferenceError from '../../../../../src/errors/DereferenceError.ts';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError.ts';
import MaximumResolveDepthError from '../../../../../src/errors/MaximumResolveDepthError.ts';
import Reference from '../../../../../src/Reference.ts';
import ReferenceSet from '../../../../../src/ReferenceSet.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-2', function () {
      context('Reference Object', function () {
        context('given Reference Objects pointing internally and externally', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to external fragment', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const fragment = evaluate(dereferenced, '/0/components/parameters/externalRef');

            assert.isTrue(isParameterElement(fragment));
          });

          specify(
            'should annotate transcluded element with additional metadata',
            async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const fragment = evaluate<Element>(dereferenced, '/0/components/parameters/userId');

              assert.strictEqual(
                toValue(fragment.meta.get('ref-fields').get('$ref')),
                '#/components/parameters/indirection1',
              );
              assert.strictEqual(
                toValue(fragment.meta.get('ref-fields').get('description')),
                'override',
              );
            },
          );
        });

        context('given Reference Objects pointing internally only', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-only');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects pointing externally only', function () {
          const fixturePath = path.join(rootFixturePath, 'external-only');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects pointing to external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'external-cycle');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/externalSchema/properties',
            );

            const cyclicParent = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/externalSchema/properties/parent/properties',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Reference Objects pointing to external indirections', function () {
          const fixturePath = path.join(rootFixturePath, 'external-indirections');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to eventual external fragment', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const fragment = evaluate<Element>(
              dereferenced,
              '/0/components/parameters/externalRef',
            );

            assert.isTrue(isParameterElement(fragment));
          });
        });

        context('given Reference Objects with additional fields', function () {
          const fixturePath = path.join(rootFixturePath, 'additional-fields');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with additional ignored fields', function () {
          const fixturePath = path.join(rootFixturePath, 'additional-ignored-fields');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with internal cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate<Element>(
              dereferenced,
              '/0/components/parameters/param1/examples',
            );
            const cyclicParent = evaluate<Element>(
              dereferenced,
              '/0/components/parameters/param1/examples/example1/examples',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Reference Objects with external resolution disabled', function () {
          const fixturePath = path.join(rootFixturePath, 'ignore-external');

          specify('should not dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { external: false },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with direct circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given $ref field with direct circular internal reference to itself', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-self-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given Reference Objects with indirect circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = [loadJsonFile(rootFilePath)];

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with direct circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given Reference Objects with indirect circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = [loadJsonFile(rootFilePath)];

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with unresolvable reference', function () {
          const fixturePath = path.join(rootFixturePath, 'unresolvable-reference');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given Reference Objects with invalid JSON Pointer', function () {
          const fixturePath = path.join(rootFixturePath, 'invalid-pointer');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given Reference Objects with arbitrary circular references', function () {
          const fixturePath = path.join(rootFixturePath, 'ignore-arbitrary-$refs');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with external circular dependency', function () {
          const fixturePath = path.join(rootFixturePath, 'external-circular-dependency');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects and maxDepth of dereference', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumDereferenceDepthError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, MaximumDereferenceDepthError);
              // @ts-ignore
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given Reference Objects and maxDepth of resolution', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumResolveDepthError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, MaximumResolveDepthError);
              // @ts-ignore
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given refSet is provided as an option', function () {
          specify('should dereference without external resolution', async function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'refset-as-option');
            const uri = path.join(fixturePath, 'root.json');
            const refSet = await resolve(uri, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const actual = await dereference(uri, {
              dereference: { refSet },
              resolve: { resolvers: [] },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should dereference single ApiDOM fragment', async function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'refset-as-option');
            const uri = path.join(fixturePath, 'root.json');
            const parseResult = await parse(uri, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            // @ts-ignore
            const referenceElement = parseResult.api?.components.parameters.get('externalRef');
            const refSet = new ReferenceSet();
            const rootFileReference = new Reference({ uri, value: parseResult });
            const referenceElementReference = new Reference({
              uri: `${uri}#/single-reference-object`,
              value: new ParseResultElement([referenceElement]),
            });
            // referenceElementReference needs to be added as first to create rootRef
            refSet.add(referenceElementReference).add(rootFileReference);

            const actual = await dereferenceApiDOM(referenceElement, {
              parse: { mediaType: mediaTypes.latest('generic') },
              resolve: { baseURI: uri },
              dereference: { refSet },
            });

            const expected = {
              name: 'externalParameter',
              in: 'query',
              description: 'external ref',
              required: true,
            };

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given path with invalid URL characters - spaces', function () {
          const fixturePath = path.join(rootFixturePath, 'path-encoding', 'path with spaces');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('$self field - base URI resolution', function () {
          context('given OpenAPI 3.2 document with $self field', function () {
            context('and internal references', function () {
              specify('should use $self as base URI for relative references', async function () {
                /**
                 * Test that $self is used as the base URI for resolving relative references.
                 *
                 * According to OAS 3.2.0 spec:
                 * - $self provides the self-assigned URI of the document
                 * - It serves as the base URI for resolving relative references
                 * - When present, implementations MUST use it as the base URI
                 */
                const fixturePath = path.join(rootFixturePath, '$self-internal-refs', 'root.json');
                const dereferenced = await dereference(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });

                // The $self field should be preserved
                const apiDoc = evaluate<Element>(dereferenced, '/0');
                const $selfValue = toValue(apiDoc.$self);
                assert.strictEqual($selfValue, 'https://example.com/api/openapi.json');

                // Internal references should be resolved correctly
                const petSchema = evaluate<Element>(
                  dereferenced,
                  '/0/paths/~1pets/get/responses/200/content/application~1json/schema',
                );
                assert.isTrue(isSchemaElement(petSchema));
                assert.strictEqual(toValue(petSchema.type), 'array');

                // Verify the referenced schema was dereferenced
                const itemsSchema = evaluate<Element>(
                  dereferenced,
                  '/0/paths/~1pets/get/responses/200/content/application~1json/schema/items',
                );
                assert.isTrue(isSchemaElement(itemsSchema));
                assert.strictEqual(toValue(itemsSchema.type), 'object');
                assert.isDefined((itemsSchema as any).properties);
              });

              specify(
                'should resolve fragment-only references using $self as base',
                async function () {
                  /**
                   * Fragment-only references like "#/components/schemas/Pet" should resolve
                   * using $self as the base URI when present.
                   */
                  const fixturePath = path.join(rootFixturePath, '$self-fragment-refs', 'root.json');
                  const dereferenced = await dereference(fixturePath, {
                    parse: { mediaType: mediaTypes.latest('json') },
                  });

                  // Check that the reference was resolved
                  const schema = evaluate<Element>(dereferenced, '/0/components/schemas/Order');
                  assert.isTrue(isSchemaElement(schema));

                  // The pet property should be dereferenced
                  const petProperty = evaluate<Element>(
                    dereferenced,
                    '/0/components/schemas/Order/properties/pet',
                  );
                  assert.isTrue(isSchemaElement(petProperty));
                  assert.strictEqual(toValue((petProperty as any).type), 'object');
                },
              );
            });

            context('when $self is relative', function () {
              specify('should resolve $self against retrieval URI first', async function () {
                /**
                 * According to OAS 3.2.0 spec:
                 * "If $self itself is relative, it is first resolved against the next source
                 * in the Base URI calculation priority before being used for any other resolutions"
                 *
                 * NOTE: The $self field in the document remains as-is. The visitor resolves
                 * it internally for reference resolution purposes.
                 */
                const fixturePath = path.join(rootFixturePath, '$self-relative', 'root.json');

                const dereferenced = await dereference(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });

                // Extract the OpenAPI document from ParseResult
                const apiDoc = evaluate<Element>(dereferenced, '/0');

                // The original $self field is preserved as-is (relative)
                const $selfValue = toValue(apiDoc.$self);
                assert.exists($selfValue, '$self should be present');
                assert.strictEqual(
                  $selfValue,
                  './openapi.json',
                  '$self field should be preserved as specified in document',
                );

                // Verify that internal references work correctly
                // This proves the relative $self was resolved internally
                const itemSchema = evaluate<Element>(
                  dereferenced,
                  '/0/paths/~1items/get/responses/200/content/application~1json/schema',
                );
                assert.exists(itemSchema, 'Internal references should resolve correctly');
                assert.isTrue(
                  isSchemaElement(itemSchema),
                  'Dereferenced schema should be valid Schema element',
                );

                // Verify the referenced schema was dereferenced correctly
                const referencedItem = evaluate<Element>(itemSchema, '/properties/id');
                assert.exists(referencedItem, 'Schema properties should be accessible');
              });
            });

            context('when $self is absent', function () {
              specify('should fall back to retrieval URI as base', async function () {
                /**
                 * When $self is not present, the retrieval URI should be used as the base URI.
                 * This is the current behavior and should continue to work.
                 */
                const fixturePath = path.join(rootFixturePath, 'no-$self', 'root.json');
                const dereferenced = await dereference(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });

                // Extract the OpenAPI document from ParseResult
                const apiDoc = evaluate<Element>(dereferenced, '/0');

                // Should successfully dereference using retrieval URI
                assert.exists(apiDoc);
                assert.isUndefined(apiDoc.$self);

                // Internal references should still work
                const petSchema = evaluate<Element>(
                  dereferenced,
                  '/0/paths/~1pets/get/responses/200/content/application~1json/schema',
                );
                assert.isTrue(isSchemaElement(petSchema));
              });
            });

            context('when $self contains invalid URI', function () {
              specify('should handle validation error appropriately', async function () {
                /**
                 * The schema validation should catch invalid $self URIs
                 * (e.g., URIs with fragments like "https://example.com/api#fragment")
                 */
                const fixturePath = path.join(rootFixturePath, '$self-invalid-uri', 'root.json');

                // This should be caught during parsing/validation phase
                // before dereferencing even starts
                try {
                  await dereference(fixturePath, {
                    parse: { mediaType: mediaTypes.latest('json') },
                  });

                  // If we get here, validation didn't catch the error
                  assert.fail('Should have thrown validation error for invalid $self URI');
                } catch (error) {
                  // Expected: validation or parsing error
                  assert.exists(error);
                }
              });
            });

            context('$self metadata', function () {
              specify('should preserve $self in dereferenced output', async function () {
                /**
                 * The $self field should be preserved in the dereferenced output
                 * so consumers can know the document's identity.
                 */
                const fixturePath = path.join(rootFixturePath, '$self-internal-refs', 'root.json');
                const dereferenced = await dereference(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });

                // Extract the OpenAPI document from ParseResult
                const apiDoc = evaluate<Element>(dereferenced, '/0');

                assert.exists(apiDoc.$self);
                assert.strictEqual(toValue(apiDoc.$self), 'https://example.com/api/openapi.json');
              });
            });
          });

          context('edge cases', function () {
            specify('should handle $self with non-standard schemes', async function () {
              /**
               * $self can use any URI scheme (https://, http://, urn:, etc.)
               * All should be valid as long as they're proper URIs without fragments.
               *
               * URN-based $self should work for document identity and internal references.
               */
              const fixturePath = path.join(rootFixturePath, '$self-urn-scheme', 'root.json');

              const dereferenced = await dereference(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              // Extract the OpenAPI document from ParseResult
              const apiDoc = evaluate<Element>(dereferenced, '/0');

              // Verify $self with URN scheme is preserved
              const $selfValue = toValue(apiDoc.$self);
              assert.exists($selfValue, '$self should be present');
              assert.match($selfValue, /^urn:/, '$self should use URN scheme');
              assert.strictEqual($selfValue, 'urn:example:petstore:v1');

              // Verify internal references still work with URN-based $self
              const petSchema = evaluate<Element>(
                dereferenced,
                '/0/paths/~1pets/get/responses/200/content/application~1json/schema',
              );
              assert.exists(petSchema, 'Internal references should work with URN-based $self');
              assert.isTrue(
                isSchemaElement(petSchema),
                'Dereferenced schema should be valid with URN-based $self',
              );
            });

            specify('should handle $self with trailing slashes correctly', async function () {
              /**
               * URIs with and without trailing slashes are different.
               * $self: "https://example.com/api" vs "https://example.com/api/"
               * should result in different resolution for relative references.
               *
               * For example:
               * - Base: "https://example.com/api/" + Relative: "./types.json"
               *   = "https://example.com/api/types.json"
               * - Base: "https://example.com/api" + Relative: "./types.json"
               *   = "https://example.com/types.json"
               */

              const fixturePath = path.join(rootFixturePath, '$self-trailing-slash', 'root.json');

              const dereferenced = await dereference(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              // Extract the OpenAPI document
              const apiDoc = evaluate<Element>(dereferenced, '/0');

              // Verify $self is preserved with trailing slash
              const $selfValue = toValue(apiDoc.$self);
              assert.exists($selfValue, '$self should be present');
              assert.strictEqual(
                $selfValue,
                'https://example.com/api/',
                '$self should preserve trailing slash',
              );

              // Verify internal references work correctly
              const itemSchema = evaluate<Element>(
                dereferenced,
                '/0/paths/~1items/get/responses/200/content/application~1json/schema',
              );
              assert.exists(itemSchema, 'Internal references should resolve correctly');
              assert.isTrue(
                isSchemaElement(itemSchema),
                'Dereferenced schema should be valid Schema element',
              );
            });
          });
        });
      });
    });
  });
});
