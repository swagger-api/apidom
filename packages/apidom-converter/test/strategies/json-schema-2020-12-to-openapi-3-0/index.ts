import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';
import { File } from '@swagger-api/apidom-reference';

import convert, { ConvertError } from '../../../src/index.ts';
import defaultOptions from '../../../src/options/index.ts';
import JSONSchema202012ToOpenAPI30ConvertStrategy from '../../../src/strategies/json-schema-2020-12-to-openapi-3-0/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(__dirname, 'fixtures');
const target = openAPI30MediaTypes.findBy('3.0.3', 'json');

const convertFixture = (name: string, options: Record<string, unknown> = {}) =>
  convert(path.join(fixtures, name), { convert: { targetMediaType: target, ...options } });

const warningCodes = (parseResult: any) =>
  parseResult.annotations.map((annotation: any) => toValue(annotation.attributes.get('code')));

describe('converter', function () {
  context('strategies', function () {
    context('json-schema-2020-12-to-openapi-3-0', function () {
      context('canConvert', function () {
        const strategy = new JSONSchema202012ToOpenAPI30ConvertStrategy();
        const file = new File({ uri: '/x.json' });

        specify('should accept OpenAPI 3.0.x source and target media types', function () {
          ['3.0.0', '3.0.1', '3.0.2', '3.0.3', '3.0.4'].forEach((version) => {
            const options = {
              ...defaultOptions,
              convert: {
                ...defaultOptions.convert,
                sourceMediaType: openAPI30MediaTypes.findBy(version, 'json'),
                targetMediaType: target,
              },
            };
            assert.isTrue(strategy.canConvert(file, options), version);
          });
        });

        specify('should reject an OpenAPI 3.1 source', function () {
          const options = {
            ...defaultOptions,
            convert: {
              ...defaultOptions.convert,
              sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
              targetMediaType: target,
            },
          };
          assert.isFalse(strategy.canConvert(file, options));
        });
      });

      context('given 2020-12 keywords in the root document only', function () {
        specify('should convert those schemas and leave plain ones untouched', async function () {
          const result: any = await convertFixture('root-only.json');
          const { schemas } = toValue(result.api).components;

          assert.deepEqual(schemas.Name, { type: 'string', nullable: true, example: 'a' });
          assert.deepEqual(schemas.Plain, {
            $ref: '#/components/schemas/Other',
            description: 'kept as is',
          });
          assert.deepEqual(warningCodes(result), []);
        });
      });

      context('given an external standalone JSON Schema 2020-12 file', function () {
        specify('should inline and convert the referenced schemas', async function () {
          const result: any = await convertFixture('external-entry.yaml');
          const api = toValue(result.api);
          const pet = api.paths['/pets'].get.responses['200'].content['application/json'].schema;

          assert.strictEqual(pet.type, 'object');
          assert.deepEqual(pet.properties.id, { type: 'integer', example: 10 });
          assert.deepEqual(pet.properties.category, {
            type: 'object',
            nullable: true,
            properties: { name: { type: 'string' } },
          });
          assert.deepEqual(pet.properties.tag, { type: 'string' });
          assert.deepEqual(pet.anyOf, [
            { not: { properties: { status: { enum: ['available'] } } } },
            {
              allOf: [
                { properties: { status: { enum: ['available'] } } },
                { required: ['category'] },
              ],
            },
          ]);
          assert.notProperty(pet, '$schema');
          assert.include(warningCodes(result), 'dropped-keyword');
        });

        specify('should leave Examples and Links untouched', async function () {
          const result: any = await convertFixture('external-entry.yaml');
          const response = toValue(result.api).paths['/pets'].get.responses['200'];

          assert.deepEqual(response.content['application/json'].examples.missing, {
            externalValue: './does-not-exist.json',
          });
          assert.deepEqual(response.links.missing, {
            operationRef: './does-not-exist.json#/paths/~1x/get',
          });
        });
      });

      context('given an external http:// reference with default options', function () {
        specify('should throw ConvertError', async function () {
          try {
            await convertFixture('http-ref.json');
            assert.fail('should throw ConvertError');
          } catch (error: any) {
            assert.instanceOf(error, ConvertError);
          }
        });
      });

      context('given an external reference to plain text', function () {
        specify('should throw ConvertError', async function () {
          try {
            await convertFixture('text-ref.json');
            assert.fail('should throw ConvertError');
          } catch (error: any) {
            assert.instanceOf(error, ConvertError);
          }
        });
      });

      context('post-pass', function () {
        specify(
          'should rebase refs back to the entry document and relative URIs',
          async function () {
            const result: any = await convertFixture(path.join('split', 'entry.yaml'));
            const content = toValue(result.api).paths['/pets'].get.responses['200'].content[
              'application/json'
            ];

            assert.deepEqual(content.schema, { $ref: '#/components/schemas/Error' });
            assert.strictEqual(
              content.examples.sample.externalValue,
              path.join(fixtures, 'split', 'paths', 'sample.json'),
            );
          },
        );

        specify('should warn about a discriminator broken by inlining', async function () {
          const result: any = await convertFixture('discriminator-entry.yaml');
          const codes = warningCodes(result);

          assert.include(codes, 'discriminator-inlined');
          assert.include(codes, 'discriminator-mapping-external');
          assert.lengthOf(
            codes.filter((code: string) => code === 'discriminator-mapping-external'),
            1,
          );
        });

        specify('should set openapi to the target version', async function () {
          const result: any = await convertFixture('discriminator-entry.yaml');

          assert.strictEqual(toValue(result.api).openapi, '3.0.3');
          const result304: any = await convert(path.join(fixtures, 'root-only.json'), {
            convert: { targetMediaType: openAPI30MediaTypes.findBy('3.0.4', 'json') },
          });
          assert.strictEqual(toValue(result304.api).openapi, '3.0.4');
        });

        specify('should warn about an internal ref that does not resolve', async function () {
          const result: any = await convertFixture('unresolved.json');

          assert.include(warningCodes(result), 'unresolved-reference');
        });

        context('given a circular external schema', function () {
          specify('should warn under circular "ignore"', async function () {
            const result: any = await convertFixture('cycle-entry.json');

            assert.include(warningCodes(result), 'circular-reference');
          });

          specify('should throw ConvertError under circular "error"', async function () {
            try {
              await convert(path.join(fixtures, 'cycle-entry.json'), {
                convert: { targetMediaType: target },
                dereference: { circular: 'error' },
              });
              assert.fail('should throw ConvertError');
            } catch (error: any) {
              assert.instanceOf(error, ConvertError);
            }
          });

          specify(
            'should produce a serializable document under circular "replace"',
            async function () {
              const result: any = await convert(path.join(fixtures, 'cycle-entry.json'), {
                convert: { targetMediaType: target },
                dereference: {
                  circular: 'replace',
                  circularReplacer: (refElement: any) =>
                    new ObjectElement({
                      $ref: `${toValue(refElement.meta.get('uri'))}${String(
                        toValue(refElement.meta.get('$ref')),
                      ).slice(String(toValue(refElement.meta.get('$ref'))).indexOf('#'))}`,
                    }),
                },
              });
              const node = toValue(result.api).components.schemas.Node;

              assert.doesNotThrow(() => JSON.stringify(node));
              assert.notInclude(warningCodes(result), 'circular-reference');
              assert.match(node.properties.children.items.$ref, /tree\.json#\/\$defs\/Node$/);
            },
          );
        });
      });
    });
  });
});
