import path from 'node:path';
import sinon from 'sinon';
import { assert } from 'chai';
import { identity } from 'ramda';
import { isParseResultElement, isRefElement, toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';
import { evaluate } from '@swagger-api/apidom-json-pointer';
import { fileURLToPath } from 'node:url';

import { loadJsonFile } from '../../../../helpers.ts';
import { dereference, resolve } from '../../../../../src/index.ts';
import DereferenceError from '../../../../../src/errors/DereferenceError.ts';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entryFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Path Item Object', function () {
        context('given in Callback Object', function () {
          const fixturePath = path.join(entryFixturePath, 'callback-object');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Path Item Object $ref field', function () {
          context('given $ref field pointing internally only', function () {
            const fixturePath = path.join(entryFixturePath, 'internal-only');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given PathItem Objects with internal cycles', function () {
            const fixturePath = path.join(entryFixturePath, 'cycle-internal');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const pathItem = evaluate('/0/paths/~1uri/get', dereferenced);
              const cyclicPathItem = evaluate(
                '/0/paths/~1uri/get/callbacks/myCallback/{$request.query.queryUrl}/get',
                dereferenced,
              );

              assert.strictEqual(pathItem, cyclicPathItem);
            });

            context('given circular=ignore', function () {
              specify('should dereference and create cycles', async function () {
                const entryFilePath = path.join(fixturePath, 'entry.json');
                const dereferenced = await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: { circular: 'ignore' },
                });

                assert.throws(() => JSON.stringify(toValue(dereferenced)));
              });
            });

            context('given circular=replace', function () {
              specify('should dereference and eliminate all cycles', async function () {
                const entryFilePath = path.join(fixturePath, 'entry.json');
                const dereferenced = await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: { circular: 'replace' },
                });

                assert.doesNotThrow(() => JSON.stringify(toValue(dereferenced)));
              });
            });

            context('given circular=replace and custom replacer is provided', function () {
              specify('should dereference and eliminate all cycles', async function () {
                const entryFilePath = path.join(fixturePath, 'entry.json');
                const circularReplacer = sinon.spy(identity);

                await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: {
                    circular: 'replace',
                    circularReplacer,
                  },
                });

                assert.isTrue(circularReplacer.calledOnce);
                assert.isTrue(isRefElement(circularReplacer.getCall(0).args[0]));
                assert.isTrue(isRefElement(circularReplacer.getCall(0).returnValue));
              });
            });

            context('given circular=error', function () {
              specify('should dereference and throw on first detected cycle', async function () {
                const entryFilePath = path.join(fixturePath, 'entry.json');

                try {
                  await dereference(entryFilePath, {
                    parse: { mediaType: mediaTypes.latest('json') },
                    dereference: { circular: 'error' },
                  });
                  assert.fail('should throw DereferenceError');
                } catch (e) {
                  assert.instanceOf(e, DereferenceError);
                }
              });
            });

            context('given immutable=true', function () {
              specify('should dereference frozen ApiDOM tree', async function () {
                const entryFilePath = path.join(fixturePath, 'entry.json');
                const refSet = await resolve(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                refSet.refs.forEach((ref) => ref.value.freeze());
                const dereferenced = await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: entryFilePath },
                  dereference: {
                    refSet,
                    immutable: true,
                  },
                });

                assert.isTrue(isParseResultElement(dereferenced));
              });
            });

            context('given immutable=false', function () {
              specify('should throw', async function () {
                const entryFilePath = path.join(fixturePath, 'entry.json');
                const refSet = await resolve(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                refSet.refs.forEach((ref) => ref.value.freeze());
                try {
                  await dereference(entryFilePath, {
                    parse: { mediaType: mediaTypes.latest('json') },
                    resolve: { baseURI: entryFilePath },
                    dereference: {
                      refSet,
                      immutable: false,
                    },
                  });
                  assert.fail('should throw DereferenceError');
                } catch (e) {
                  assert.instanceOf(e, DereferenceError);
                }
              });
            });
          });

          context('given PathItem Objects with internal and external cycles', function () {
            const fixturePath = path.join(entryFixturePath, 'cycle-internal-external');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { circular: 'ignore' },
              });
              const pathItem = evaluate('/0/paths/~1uri/get', dereferenced);
              const cyclicPathItem = evaluate(
                '/0/paths/~1uri/get/callbacks/myCallback/{$request.query.queryUrl}/get',
                dereferenced,
              );

              assert.strictEqual(pathItem, cyclicPathItem);
            });
          });

          context('given $ref field pointing externally only', function () {
            const fixturePath = path.join(entryFixturePath, 'external-only');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field pointing internally and externally', function () {
            const fixturePath = path.join(entryFixturePath, 'internal-external');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field + additional fields', function () {
            const fixturePath = path.join(entryFixturePath, 'additional-fields');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given external resolution disabled', function () {
            const fixturePath = path.join(entryFixturePath, 'ignore-external');

            specify('should not dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { external: false },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field pointing to internal indirection', function () {
            const fixturePath = path.join(entryFixturePath, 'internal-indirections');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field pointing to external cycles', function () {
            const fixturePath = path.join(entryFixturePath, 'external-cycle');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              const parent = evaluate(
                '/0/paths/~1path1/get/callbacks/myCallback/{$request.query.queryUrl}',
                dereferenced,
              );
              const cyclicParent = evaluate(
                '/0/paths/~1path1/get/callbacks/myCallback/{$request.query.queryUrl}/get/callbacks/myCallback/{$request.query.queryUrl}',
                dereferenced,
              );

              assert.strictEqual(parent, cyclicParent);
            });
          });

          context('given $ref field pointing to external indirections', function () {
            const fixturePath = path.join(entryFixturePath, 'external-indirections');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field with invalid JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'invalid-pointer');

            specify('should throw error', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');

              try {
                await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                assert.fail('should throw DereferenceError');
              } catch (e) {
                assert.instanceOf(e, DereferenceError);
              }
            });
          });

          context('given $ref field and maxDepth of dereference', function () {
            const fixturePath = path.join(entryFixturePath, 'max-depth');

            specify('should throw error', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');

              try {
                await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: { maxDepth: 1 },
                });
                assert.fail('should throw MaximumDereferenceDepthError');
              } catch (error: any) {
                assert.instanceOf(error, DereferenceError);
                // @ts-ignore
                assert.instanceOf(error.cause.cause, MaximumDereferenceDepthError);
                // @ts-ignore
                assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex1.json"$/);
              }
            });
          });

          context('given $ref field with unresolvable JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'unresolvable-path-item');

            specify('should throw error', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');

              try {
                await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                assert.fail('should throw DereferenceError');
              } catch (e) {
                assert.instanceOf(e, DereferenceError);
              }
            });
          });

          context('given $ref field with direct circular internal reference', function () {
            const fixturePath = path.join(entryFixturePath, 'direct-internal-circular');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context(
            'given $ref field with direct circular internal reference to itself',
            function () {
              const fixturePath = path.join(entryFixturePath, 'direct-self-circular');

              specify('should throw error', async function () {
                const entryFilePath = path.join(fixturePath, 'entry.json');

                try {
                  await dereference(entryFilePath, {
                    parse: { mediaType: mediaTypes.latest('json') },
                  });
                  assert.fail('should throw DereferenceError');
                } catch (e) {
                  assert.instanceOf(e, DereferenceError);
                }
              });
            },
          );

          context('given $ref field with indirect circular internal reference', function () {
            const fixturePath = path.join(entryFixturePath, 'indirect-internal-circular');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field with direct circular external reference', function () {
            const fixturePath = path.join(entryFixturePath, 'direct-external-circular');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field with indirect circular external reference', function () {
            const fixturePath = path.join(entryFixturePath, 'indirect-external-circular');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });
        });
      });
    });
  });
});
