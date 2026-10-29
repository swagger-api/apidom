import path from 'node:path';
import { assert } from 'chai';
import {
  toValue,
  BooleanElement,
  Element,
  ParseResultElement,
  ObjectElement,
  isBooleanElement,
} from '@swagger-api/apidom-core';
import {
  JSONSchemaElement,
  mediaTypes,
  isJSONSchemaElement,
  refract,
} from '@swagger-api/apidom-ns-json-schema-2020-12';
import {
  SchemaElement,
  mediaTypes as openAPI3_1MediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-1';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { parse, dereference, dereferenceApiDOM } from '../../../../../src/index.ts';
import File from '../../../../../src/File.ts';
import JSONSchema2020_12DereferenceStrategy from '../../../../../src/dereference/strategies/json-schema-2020-12/index.ts';
import { loadJsonFile } from '../../../../helpers.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereference', function () {
  context('strategies', function () {
    context('json-schema-2020-12', function () {
      context('JSON Schema', function () {
        context(
          'given single JSONSchemaElement passed to dereferenceApiDOM with internal references',
          function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'root.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const schemaElement = evaluate<JSONSchemaElement>(
                parseResult.result!,
                '/$defs/User/properties/profile',
              );
              const dereferenced = await dereferenceApiDOM(schemaElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `${fixturePath}#/$defs/User/properties/profile` },
              });

              assert.isTrue(isJSONSchemaElement(dereferenced));
            });

            specify('should dereference and contain metadata about origin', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const schemaElement = evaluate<JSONSchemaElement>(
                parseResult.result!,
                '/$defs/User/properties/profile',
              );
              const dereferenced = await dereferenceApiDOM(schemaElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `${fixturePath}#/$defs/User/properties/profile` },
              });

              assert.match(
                toValue(dereferenced.meta.get('ref-origin')),
                /internal-only\/root\.json$/,
              );
            });
          },
        );

        context(
          'given single JSONSchemaElement passed to dereferenceApiDOM with external references',
          function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'root.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const schemaElement = evaluate<JSONSchemaElement>(
                parseResult.result!,
                '/$defs/User/properties/profile',
              );
              const dereferenced = await dereferenceApiDOM(schemaElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: fixturePath },
              });

              assert.isTrue(isJSONSchemaElement(dereferenced));
            });

            specify('should dereference and contain metadata about origin', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const schemaElement = evaluate<JSONSchemaElement>(
                parseResult.result!,
                '/$defs/User/properties/profile',
              );
              const dereferenced = await dereferenceApiDOM(schemaElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: fixturePath },
              });

              assert.match(
                toValue(dereferenced.meta.get('ref-origin')),
                /external-only\/ex\.json$/,
              );
            });
          },
        );

        context('given parse result passed to dereferenceApiDOM without media type', function () {
          const fixturePath = path.join(__dirname, 'fixtures', 'internal-external');

          specify('should dereference internal and external references', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const parseResult = await parse(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const dereferenced = await dereferenceApiDOM(parseResult, {
              resolve: { baseURI: rootFilePath },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(dereferenced), expected);
          });
        });

        context(
          'given Boolean JSON Schema parse result passed to dereferenceApiDOM without media type',
          function () {
            specify('should return the schema unchanged', async function () {
              const rootFilePath = path.join(__dirname, 'fixtures', 'boolean-root', 'root.json');
              const parseResult = await parse(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const dereferenced = await dereferenceApiDOM(parseResult, {
                resolve: { baseURI: rootFilePath },
              });

              assert.deepEqual(toValue(dereferenced), [true]);
            });

            specify(
              'should accept the Boolean result of root $ref dereferencing',
              async function () {
                const rootFilePath = path.join(
                  __dirname,
                  'fixtures',
                  'root-ref-boolean',
                  'root.json',
                );
                const parseResult = await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const dereferenced = await dereferenceApiDOM(parseResult, {
                  resolve: { baseURI: rootFilePath },
                });

                assert.deepEqual(toValue(dereferenced), [false]);
                assert.isTrue(isBooleanElement((dereferenced as ParseResultElement).result));
              },
            );
          },
        );

        context('given Link Description Objects with schemas', function () {
          specify('should dereference $ref keyword in their schemas', async function () {
            const jsonSchemaElement = refract<JSONSchemaElement>({
              $schema: 'https://json-schema.org/draft/2020-12/schema',
              $defs: { string: { type: 'string' }, number: { type: 'number' } },
              links: [
                {
                  rel: 'self',
                  href: '/items/{id}',
                  hrefSchema: { $ref: '#/$defs/string' },
                  targetSchema: { $ref: '#/$defs/number' },
                  headerSchema: { $ref: '#/$defs/string' },
                  submissionSchema: { $ref: '#/$defs/number' },
                },
              ],
            });
            const dereferenced = await dereferenceApiDOM(jsonSchemaElement, {
              resolve: { baseURI: '/path/to/schema.json' },
            });

            assert.deepEqual(toValue((dereferenced as ObjectElement).get('links')), [
              {
                rel: 'self',
                href: '/items/{id}',
                hrefSchema: { type: 'string' },
                targetSchema: { type: 'number' },
                headerSchema: { type: 'string' },
                submissionSchema: { type: 'number' },
              },
            ]);
          });
        });

        context('canDereference', function () {
          const toFile = (element: Element, mediaType?: string) => {
            element.classes.push('result');
            return new File({
              uri: '/path/to/schema.json',
              parseResult: new ParseResultElement([element]),
              mediaType,
            });
          };

          specify('should accept JSON Schema 2020-12 media types', function () {
            const strategy = new JSONSchema2020_12DereferenceStrategy();

            mediaTypes.forEach((mediaType) => {
              assert.isTrue(strategy.canDereference(toFile(new ObjectElement(), mediaType)));
            });
          });

          specify('should reject other media types', function () {
            const strategy = new JSONSchema2020_12DereferenceStrategy();
            const file = toFile(new JSONSchemaElement(), openAPI3_1MediaTypes.latest('json'));

            assert.isFalse(strategy.canDereference(file));
          });

          specify('should accept parsed JSON Schema 2020-12 without media type', function () {
            const strategy = new JSONSchema2020_12DereferenceStrategy();

            assert.isTrue(strategy.canDereference(toFile(new JSONSchemaElement())));
          });

          specify('should accept Boolean JSON Schema without media type', function () {
            const strategy = new JSONSchema2020_12DereferenceStrategy();
            const element = new BooleanElement(true);
            element.classes.push('boolean-json-schema');

            assert.isTrue(strategy.canDereference(toFile(element)));
          });

          specify('should reject generic boolean without media type', function () {
            const strategy = new JSONSchema2020_12DereferenceStrategy();

            assert.isFalse(strategy.canDereference(toFile(new BooleanElement(true))));
          });

          specify('should reject OpenAPI 3.1 Schema Object without media type', function () {
            const strategy = new JSONSchema2020_12DereferenceStrategy();

            assert.isFalse(strategy.canDereference(toFile(new SchemaElement())));
          });

          specify('should reject generic object without media type', function () {
            const strategy = new JSONSchema2020_12DereferenceStrategy();

            assert.isFalse(strategy.canDereference(toFile(new ObjectElement())));
          });
        });
      });
    });
  });
});
