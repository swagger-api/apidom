import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { toValue, Element } from '@swagger-api/apidom-core';
import { isSchemaElement } from '@swagger-api/apidom-ns-openapi-3-2';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';

// Import saturated configuration to load default resolvers and parsers
import '../../../../src/configuration/saturated.ts';
import { dereference } from '../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-2', function () {
      context('$self field', function () {
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
              const fixturePath = path.join(__dirname, 'fixtures', '$self-internal-refs.json');
              const dereferenced = await dereference(fixturePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
                const fixturePath = path.join(__dirname, 'fixtures', '$self-fragment-refs.json');
                const dereferenced = await dereference(fixturePath, {
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
              const fixturePath = path.join(__dirname, 'fixtures', '$self-relative.json');

              const dereferenced = await dereference(fixturePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
              const fixturePath = path.join(__dirname, 'fixtures', 'no-$self.json');
              const dereferenced = await dereference(fixturePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
              const fixturePath = path.join(__dirname, 'fixtures', '$self-invalid-uri.json');

              // This should be caught during parsing/validation phase
              // before dereferencing even starts
              try {
                await dereference(fixturePath, {
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
              const fixturePath = path.join(__dirname, 'fixtures', '$self-internal-refs.json');
              const dereferenced = await dereference(fixturePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
            const fixturePath = path.join(__dirname, 'fixtures', '$self-urn-scheme.json');

            const dereferenced = await dereference(fixturePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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

            const fixturePath = path.join(__dirname, 'fixtures', '$self-trailing-slash.json');

            const dereferenced = await dereference(fixturePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
