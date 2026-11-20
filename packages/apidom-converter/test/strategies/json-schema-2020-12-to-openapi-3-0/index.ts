import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';
import {
  isOpenapiElement,
  mediaTypes as openAPI30MediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-0';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';
import { File, Reference, ReferenceSet, parse } from '@swagger-api/apidom-reference';

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

        specify(
          'should convert the entry when dereference.refSet already has it',
          async function () {
            const entryPath = path.join(fixtures, 'root-only.json');
            const cached = new Reference({
              uri: entryPath,
              value: await parse(entryPath, { parse: { mediaType: target } }),
            });
            const refSet = new ReferenceSet({ refs: [cached] });

            const result: any = await convert(entryPath, {
              convert: { targetMediaType: target },
              dereference: { refSet },
            });

            assert.deepEqual(toValue(result.api).components.schemas.Name, {
              type: 'string',
              nullable: true,
              example: 'a',
            });
            assert.deepEqual(refSet.refs, [cached]);
            assert.strictEqual(cached.refSet, refSet);
          },
        );
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

      context('given bare $refs to $ids', function () {
        let schemas: any;
        let codes: string[];

        before(async function () {
          const result: any = await convertFixture('id-refs.json');
          schemas = toValue(result.api).components.schemas;
          codes = warningCodes(result);
        });

        specify('should rewrite a $ref to a URN $id into a JSON Pointer', function () {
          assert.deepEqual(schemas.ByUrn, { $ref: '#/components/schemas/Urn' });
          assert.deepEqual(schemas.ByUrnInProperty, {
            type: 'object',
            properties: { a: { $ref: '#/components/schemas/Urn' } },
          });
        });

        specify('should rewrite a $ref to an https $id without fetching it', function () {
          assert.deepEqual(schemas.ByHttps, { $ref: '#/components/schemas/Https' });
        });

        specify('should resolve a relative $id against its parent $id', function () {
          assert.deepEqual(schemas.ByNestedId, {
            $ref: '#/components/schemas/Root/properties/nested',
          });
          assert.deepEqual(schemas.Root.properties.nested, { type: 'boolean' });
        });

        specify('should point at an $id whose schema was moved to x-conversion-*', function () {
          assert.deepEqual(schemas.ByMovedId, {
            $ref: '#/components/schemas/Holder/x-conversion-$defs/Moved',
          });
          assert.deepEqual(schemas.Holder['x-conversion-$defs'].Moved, { type: 'number' });
        });

        specify('should leave other refs as before', function () {
          assert.deepEqual(schemas.ByPointer, { $ref: '#/components/schemas/Urn' });
          assert.deepEqual(schemas.ByPointerWithDescription, {
            $ref: '#/components/schemas/Urn',
            description: 'kept',
          });
          assert.deepEqual(schemas.ByRelative, { type: 'string', minLength: 1 });
        });

        specify('should rewrite them in an external OpenAPI 3.0 file too', function () {
          assert.deepEqual(schemas.ByExternalId, {
            type: 'object',
            properties: { ext: { type: 'object', properties: { x: { type: 'string' } } } },
          });
        });

        specify('should leave no unresolved references', function () {
          assert.notInclude(codes, 'unresolved-reference');
        });
      });

      context('given keywords next to a $ref', function () {
        const targetSchema = { type: 'object', properties: { id: { type: 'integer' } } };
        let schemas: any;

        before(async function () {
          const result: any = await convertFixture('siblings-entry.json');
          schemas = toValue(result.api).components.schemas;
        });

        specify('should keep annotations of an inlined JSON Schema $ref', function () {
          assert.deepEqual(schemas.Owner, { description: 'The owner', allOf: [targetSchema] });
        });

        specify('should keep a stash next to an inlined JSON Schema $ref', function () {
          assert.deepEqual(schemas.WithStash, {
            'x-conversion-$defs': { Local: { type: 'string' } },
            allOf: [{ type: 'string' }],
          });
        });

        specify('should convert a $ref with validation siblings', function () {
          assert.deepEqual(schemas.InternalValidation, {
            allOf: [{ minProperties: 1 }, { $ref: '#/components/schemas/Target' }],
          });
          assert.deepEqual(schemas.ExternalValidation, {
            allOf: [{ minProperties: 1 }, targetSchema],
          });
        });

        specify('should leave an OpenAPI 3.0 $ref with annotations unchanged', function () {
          assert.deepEqual(schemas.PlainAnnotation, {
            $ref: '#/components/schemas/Target',
            description: 'kept as is',
          });
        });
      });

      context('given discriminator.mapping references', function () {
        let result: any;
        let schemas: any;

        before(async function () {
          result = await convertFixture('mapping-entry.json');
          schemas = toValue(result.api).components.schemas;
        });

        specify('should rebase mapping values of an inlined external schema', function () {
          assert.deepEqual(schemas.Pet.discriminator.mapping, {
            cat: `${path.join(fixtures, 'mapping-ext.json')}#/$defs/Cat`,
            back: '#/components/schemas/Back',
            named: 'Cat',
          });
          assert.include(warningCodes(result), 'discriminator-mapping-external');
        });

        specify('should follow a mapping target moved to x-conversion-*', function () {
          assert.deepEqual(schemas.Local.discriminator.mapping, {
            fish: '#/components/schemas/Local/x-conversion-$defs/Fish',
            named: 'Fish',
            missing: '#/components/schemas/Missing',
          });
        });

        specify('should report a mapping value that does not resolve', function () {
          const unresolved = result.annotations
            .filter((a: any) => toValue(a.attributes.get('code')) === 'unresolved-reference')
            .map((a: any) => toValue(a));

          assert.deepEqual(unresolved, [
            'The reference "#/components/schemas/Missing" does not resolve',
          ]);
        });
      });

      context('given data and extensions that look like references', function () {
        const dataRef = { $ref: '#/components/schemas/WithDefs/$defs/T' };
        let result: any;
        let api: any;

        before(async function () {
          result = await convertFixture('data-refs.json');
          api = toValue(result.api);
        });

        specify('should rewrite only schema refs in the entry document', function () {
          const { WithDefs, DataRef, UserExtension } = api.components.schemas;

          assert.deepEqual(WithDefs.properties.x, {
            $ref: '#/components/schemas/WithDefs/x-conversion-$defs/T',
          });
          assert.deepEqual(WithDefs.example, dataRef);
          assert.deepEqual(WithDefs.default, dataRef);
          assert.deepEqual(WithDefs['x-meta'], dataRef);
          assert.deepEqual(DataRef.example, dataRef);
          assert.deepEqual(UserExtension['x-conversion-$defs'].T, dataRef);
          assert.deepEqual(
            api.paths['/pets'].get.responses['200'].content['application/json'].examples.inline
              .value,
            dataRef,
          );
        });

        specify('should not rebase data and extensions of inlined schemas', function () {
          const pet = api.paths['/pets'].get.responses['200'].content['application/json'].schema;

          assert.deepEqual(pet.example, {
            $ref: '#/data',
            externalValue: './data.json',
            operationRef: './op.json#/paths/~1x/get',
          });
          assert.deepEqual(pet['x-meta'], { $ref: '#/user-extension' });
          assert.deepEqual(pet['x-conversion-note'], { $ref: '#/user-extension' });
          assert.deepEqual(pet.properties.name.example, { $ref: '#/data-in-stash' });
          assert.deepEqual(pet['x-conversion-$defs'].Inner.example, { $ref: '#/data-in-stash' });
        });

        specify('should still make refs inside converter stashes absolute', function () {
          const pet = api.paths['/pets'].get.responses['200'].content['application/json'].schema;

          assert.strictEqual(
            pet['x-conversion-$defs'].ToOther.$ref,
            `${path.join(fixtures, 'data-refs-external.json')}#/$defs/Other`,
          );
        });

        specify('should not report data as unresolved references', function () {
          assert.notInclude(warningCodes(result), 'unresolved-reference');
        });

        specify('should leave no internal metadata behind', function () {
          const stash = result.api
            .get('components')
            .get('schemas')
            .get('WithDefs')
            .get('x-conversion-$defs');

          assert.isFalse(stash.meta.hasKey('conversion-stash'));
        });
      });

      context('given a chain of external references across directories', function () {
        specify(
          'should rebase the last file of the chain against its own location',
          async function () {
            const result: any = await convertFixture(path.join('alias-chain', 'entry.json'));
            const { Pet } = toValue(result.api).components.schemas;

            assert.strictEqual(Pet.properties.cat.$ref, '#/components/schemas/Cat');
            assert.deepEqual(Pet.discriminator.mapping, { cat: '#/components/schemas/Cat' });
            assert.deepEqual(warningCodes(result), ['dropped-keyword']);
          },
        );

        specify('should leave no internal metadata behind', async function () {
          const result: any = await convertFixture(path.join('alias-chain', 'entry.json'));
          const pet = result.api.get('components').get('schemas').get('Pet');

          assert.isFalse(pet.meta.hasKey('conversion-source'));
        });
      });

      context('given an $id repeated in a Link requestBody', function () {
        specify('should resolve the $ref to the schema, not to the data', async function () {
          const result: any = await convertFixture('link-data-id.json');
          const { PetAlias } = toValue(result.api).components.schemas;

          assert.deepEqual(PetAlias, { $ref: '#/components/schemas/Pet' });
        });
      });

      context('given a reference into the document spelled with its file name', function () {
        specify('should follow its target when the target moves', async function () {
          const result: any = await convertFixture('self-uri-ref.json');
          const { Pet } = toValue(result.api).components.schemas;

          assert.deepEqual(Pet.properties.name, {
            $ref: '#/components/schemas/Pet/x-conversion-$defs/Name',
          });
          assert.notInclude(warningCodes(result), 'unresolved-reference');
        });
      });

      context('given a Draft 7 schema with keywords next to $ref', function () {
        specify('should remove the keywords Draft 7 ignores', async function () {
          const result: any = await convertFixture(path.join('draft7-ref-siblings', 'entry.json'));
          const { Count } = toValue(result.api).components.schemas;

          assert.deepEqual(Count, { description: 'A count', allOf: [{ type: 'integer' }] });
          assert.include(warningCodes(result), 'dropped-keyword');
        });
      });

      context('given an $id with a URN base', function () {
        specify('should convert and fall back to the file location', async function () {
          const result: any = await convertFixture(path.join('urn-id-base', 'entry.json'));
          const { Pet } = toValue(result.api).components.schemas;

          assert.deepEqual(Pet.properties.name, {
            $ref: '#/components/schemas/Pet/x-conversion-$defs/Name',
          });
          assert.deepEqual(Pet.properties.owner, { type: 'object' });
          assert.include(warningCodes(result), 'id-base-mismatch');
        });
      });

      context(
        'given an external discriminator alternative with keywords next to $ref',
        function () {
          specify('should report the inlined alternative', async function () {
            const result: any = await convertFixture(
              path.join('discriminator-wrapped', 'entry.json'),
            );
            const pet = result.api.get('components').get('schemas').get('Pet');

            assert.include(warningCodes(result), 'discriminator-inlined');
            assert.isFalse(pet.get('oneOf').get(0).meta.hasKey('conversion-ref-split'));
          });
        },
      );

      context('given external Path Items referring back into the entry document', function () {
        let api: any;

        before(async function () {
          const result: any = await convertFixture(path.join('path-back-references', 'entry.json'));
          api = toValue(result.api);
        });

        specify('should keep a back reference reached through an alias', function () {
          assert.deepEqual(
            api.paths['/pets'].get.responses['200'].content['application/json'].schema,
            { $ref: '#/components/schemas/Error' },
          );
        });

        specify('should keep a Path Item back reference', function () {
          assert.deepEqual(api.paths['/pets-alias'], { $ref: '#/paths/~1owners' });
        });
      });

      context('given a target version', function () {
        specify('should set openapi and keep its element type', async function () {
          const result: any = await convertFixture('root-only.json', {
            targetMediaType: openAPI30MediaTypes.findBy('3.0.4', 'json'),
          });
          const openapi = result.api.get('openapi');

          assert.isTrue(isOpenapiElement(openapi));
          assert.strictEqual(toValue(openapi), '3.0.4');
        });
      });

      context('given references across directories and a path with a space', function () {
        const entry = path.join(fixtures, 'sub dir', 'entry.json');
        let result: any;
        let api: any;

        before(async function () {
          result = await convert(entry, { convert: { targetMediaType: target } });
          api = toValue(result.api);
        });

        specify('should keep references back into the entry document internal', function () {
          const { Pet, PetAgain } = api.components.schemas;

          [Pet, PetAgain].forEach((schema) => {
            assert.strictEqual(schema.properties.owner.$ref, '#/components/schemas/Cat');
            assert.strictEqual(
              schema['x-conversion-$defs'].Friend.$ref,
              '#/components/schemas/Cat',
            );
            assert.deepEqual(schema.discriminator.mapping, { cat: '#/components/schemas/Cat' });
          });
        });

        specify('should name the external file in warnings', function () {
          const moved = result.annotations
            .map((annotation: any) => toValue(annotation))
            .find((message: string) => message.includes('x-conversion-$defs'));

          assert.include(moved, 'sub%20dir/shared/schemas.json#/$defs/Pet');
        });

        specify('should inline references whose target is a reference', function () {
          assert.deepEqual(api.components.schemas.Commented, { type: 'integer' });
          assert.deepEqual(api.paths['/callback'].get.parameters, [
            { name: 'q', in: 'query', schema: { type: 'string' } },
          ]);
        });

        specify('should rebase only the referenced fields of a Path Item', function () {
          const local = api.paths['/local'];

          assert.deepEqual(local.get, { responses: { '200': { description: 'ok' } } });
          assert.strictEqual(
            local.post.responses['200'].content['application/json'].schema.$ref,
            '#/components/schemas/Cat',
          );
          assert.strictEqual(
            api.paths['/callback'].get.callbacks.onEvent['{$request.body#/url}'].$ref,
            '#/paths/~1target',
          );
        });

        specify('should report nothing but the moved keyword', function () {
          assert.sameMembers(warningCodes(result), ['dropped-keyword', 'moved-keyword']);
        });

        specify('should convert the same way from a relative path', async function () {
          const relative: any = await convert(path.relative(process.cwd(), entry), {
            convert: { targetMediaType: target },
          });

          assert.deepEqual(toValue(relative.api), api);
        });
      });

      context('given an external Draft 7 file with a fragment-only $id', function () {
        specify('should resolve refs to the anchor and to JSON Pointers', async function () {
          const result: any = await convertFixture('draft7-entry.json');
          const schema = toValue(result.api).components.schemas.B;

          assert.deepEqual(schema, {
            type: 'object',
            properties: { a: { type: 'integer' }, c: { type: 'string' } },
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

        specify('should warn about an internal ref that is not a JSON Pointer', async function () {
          const result: any = await convertFixture('malformed-ref.json');

          assert.deepEqual(warningCodes(result), ['unresolved-reference']);
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
