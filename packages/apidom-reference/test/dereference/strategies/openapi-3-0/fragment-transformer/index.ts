import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import {
  Element,
  ObjectElement,
  cloneDeep,
  isObjectElement,
  toValue,
} from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';

import { dereference } from '../../../../../src/index.ts';
import DereferenceError from '../../../../../src/errors/DereferenceError.ts';
import type {
  FragmentTransformer,
  FragmentTransformerInput,
} from '../../../../../src/dereference/strategies/openapi-3-0/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');
const fileAndFragment = (uri: string) => uri.slice(uri.lastIndexOf('/ex.json') + 1);

const markingTransformer =
  (calls: FragmentTransformerInput[]): FragmentTransformer =>
  (input) => {
    calls.push(input);
    const transformed = cloneDeep(input.fragment) as Element;
    if (isObjectElement(transformed)) {
      (transformed as ObjectElement).set('x-transformed', input.referencedElementType);
    }
    return transformed;
  };

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('fragmentTransformer', function () {
        context('given external Schema and Path Item references', function () {
          const fixturePath = path.join(rootFixturePath, 'basic');
          const entryFilePath = path.join(fixturePath, 'entry.json');

          specify('should transform every referenced fragment', async function () {
            const calls: FragmentTransformerInput[] = [];
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: {
                strategyOpts: { 'openapi-3-0': { fragmentTransformer: markingTransformer(calls) } },
              },
            });
            const [api] = toValue(actual) as any[];

            assert.strictEqual(api.components.schemas.Pet['x-transformed'], 'schema');
            assert.strictEqual(
              api.components.schemas.Pet.properties.tag['x-transformed'],
              'schema',
            );
            assert.strictEqual(api.paths['/pets']['x-transformed'], 'pathItem');
            assert.deepEqual(api.paths['/pets'].get.responses['200'], { description: 'ok' });
          });

          specify(
            'should pass fragment, containing document, URI and element type',
            async function () {
              const calls: FragmentTransformerInput[] = [];
              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-0': { fragmentTransformer: markingTransformer(calls) },
                  },
                },
              });
              const byUri = Object.fromEntries(
                calls.map((call) => [fileAndFragment(call.uri), call]),
              );

              assert.hasAllKeys(byUri, ['ex.json#/Pet', 'ex.json#/Tag', 'ex.json#/PetsPath']);
              assert.strictEqual(byUri['ex.json#/Pet'].referencedElementType, 'schema');
              assert.strictEqual(byUri['ex.json#/Tag'].referencedElementType, 'schema');
              assert.strictEqual(byUri['ex.json#/PetsPath'].referencedElementType, 'pathItem');
              assert.deepEqual(toValue(byUri['ex.json#/Tag'].fragment), { type: 'string' });
              assert.hasAllKeys(toValue(byUri['ex.json#/Tag'].document), [
                'Pet',
                'Tag',
                'PetsPath',
              ]);
            },
          );
        });

        context('given references into a subdirectory', function () {
          const fixturePath = path.join(rootFixturePath, 'subdirectory');
          const entryFilePath = path.join(fixturePath, 'entry.json');

          specify('should pass the resolved URI of each reference', async function () {
            const calls: FragmentTransformerInput[] = [];
            await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: {
                strategyOpts: { 'openapi-3-0': { fragmentTransformer: markingTransformer(calls) } },
              },
            });
            const ex = path.join(fixturePath, 'nested', 'ex.json');

            assert.sameMembers(
              calls.map((call) => call.uri),
              [
                `${ex}#/Pet`,
                `${ex}#/Tag`,
                `${ex}#/PetsPath`,
                path.join(fixturePath, 'nested', 'whole.json'),
              ],
            );
          });
        });

        context('given a circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'circular');
          const entryFilePath = path.join(fixturePath, 'entry.json');

          specify('should transform the fragment once', async function () {
            const calls: FragmentTransformerInput[] = [];
            await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: {
                strategyOpts: { 'openapi-3-0': { fragmentTransformer: markingTransformer(calls) } },
              },
            });

            assert.lengthOf(calls, 1);
            assert.strictEqual(fileAndFragment(calls[0].uri), 'ex.json#/Node');
          });
        });

        context('given an internal reference whose fragment is transformed', function () {
          const entryFilePath = path.join(rootFixturePath, 'internal', 'entry.json');

          specify(
            'should resolve the references inside the transformed fragment',
            async function () {
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: { 'openapi-3-0': { fragmentTransformer: markingTransformer([]) } },
                },
              });
              const [api] = toValue(actual) as any[];

              assert.deepEqual(api.components.schemas.A.properties.c, {
                type: 'string',
                'x-transformed': 'schema',
              });
            },
          );
        });

        context('given internal references to a fragment that gets replaced', function () {
          const entryFilePath = path.join(rootFixturePath, 'internal-chain', 'entry.json');

          specify('should transform each referenced fragment once', async function () {
            const calls: FragmentTransformerInput[] = [];
            await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: {
                strategyOpts: { 'openapi-3-0': { fragmentTransformer: markingTransformer(calls) } },
              },
            });
            const fragments = calls.map(({ uri }) => uri.slice(uri.indexOf('#')));

            assert.lengthOf(
              fragments.filter((fragment) => fragment === '#/components/schemas/B'),
              1,
            );
          });
        });

        context('given fragmentTransformer throws', function () {
          const fixturePath = path.join(rootFixturePath, 'basic');
          const entryFilePath = path.join(fixturePath, 'entry.json');

          specify('should throw DereferenceError', async function () {
            try {
              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-0': {
                      fragmentTransformer: () => {
                        throw new Error('transform failed');
                      },
                    },
                  },
                },
              });
              assert.fail('should throw DereferenceError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
            }
          });
        });
      });
    });
  });
});
