import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { loadJsonFile } from '../../../../helpers';
import { dereference } from '../../../../../src';
import DereferenceError from '../../../../../src/errors/DereferenceError';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Path Item Object', function () {
        context('given in webhooks field', function () {
          const fixturePath = path.join(rootFixturePath, 'webhooks');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given in components/pathItems field', function () {
          const fixturePath = path.join(rootFixturePath, 'components-path-items');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given in Callback Object', function () {
          const fixturePath = path.join(rootFixturePath, 'callback-object');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Path Item Object $ref field', function () {
          context('given $ref field pointing internally only', function () {
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

          context('given $ref field pointing externally only', function () {
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

          context('given $ref field pointing internally and externally', function () {
            const fixturePath = path.join(rootFixturePath, 'internal-external');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field + additional fields', function () {
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

          context('given external resolution disabled', function () {
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

          context('given $ref field pointing to internal indirection', function () {
            const fixturePath = path.join(rootFixturePath, 'internal-indirections');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field pointing to external indirections', function () {
            const fixturePath = path.join(rootFixturePath, 'external-indirections');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field with invalid JSON Pointer', function () {
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

          context('given $ref field and maxDepth of dereference', function () {
            const fixturePath = path.join(rootFixturePath, 'max-depth');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: { maxDepth: 1 },
                });
                assert.fail('should throw MaximumDereferenceDepthError');
              } catch (error: any) {
                assert.instanceOf(error, DereferenceError);
                assert.instanceOf(error.cause.cause, MaximumDereferenceDepthError);
                assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex1.json"$/);
              }
            });
          });

          context('given $ref field with unresolvable JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'unresolvable-path-item');

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

          context('given $ref field  with direct circular internal reference', function () {
            const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context(
            'given $ref field with direct circular internal reference to itself',
            function () {
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
            },
          );

          context('given $ref field with indirect circular internal reference', function () {
            const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field with direct circular external reference', function () {
            const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('given $ref field with indirect circular external reference', function () {
            const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
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
