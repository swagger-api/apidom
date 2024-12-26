import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-2';
import { fileURLToPath } from 'node:url';

import { resolve } from '../../../../../src/index.ts';
import MaximumResolveDepthError from '../../../../../src/errors/MaximumResolveDepthError.ts';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError.ts';
import ResolverError from '../../../../../src/errors/ResolverError.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entryFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('openapi-2', function () {
      context('JSONReference Object', function () {
        context('given JSONReference Objects pointing internally and externally', function () {
          const fixturePath = path.join(entryFixturePath, 'internal-external');

          specify('should resolve', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given JSONReference Objects pointing internally only', function () {
          const fixturePath = path.join(entryFixturePath, 'internal-only');

          specify('should resolve', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given JSONReference Objects pointing externally only', function () {
          const fixturePath = path.join(entryFixturePath, 'external-only');

          specify('should resolve', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given JSONReference Objects pointing to external indirections', function () {
          const fixturePath = path.join(entryFixturePath, 'external-indirections');

          specify('should resolve', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 4);
          });
        });

        context('given JSONReference Objects with external circular dependency', function () {
          const fixturePath = path.join(entryFixturePath, 'external-circular-dependency');

          specify('should resolve', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given JSONReference Objects with external resolution disabled', function () {
          const fixturePath = path.join(entryFixturePath, 'ignore-external');

          specify('should not resolve', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { external: false },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given JSONReference Objects with direct circular internal reference', function () {
          const fixturePath = path.join(entryFixturePath, 'direct-internal-circular');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            try {
              await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context(
          'given JSONReference Objects with indirect circular internal reference',
          function () {
            const fixturePath = path.join(entryFixturePath, 'indirect-internal-circular');

            specify('should throw error', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              try {
                await resolve(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
              } catch (e) {
                assert.instanceOf(e, ResolverError);
              }
            });
          },
        );

        context('given JSONReference Objects with direct circular external reference', function () {
          const fixturePath = path.join(entryFixturePath, 'direct-external-circular');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            try {
              await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context(
          'given JSONReference Objects with indirect circular external reference',
          function () {
            const fixturePath = path.join(entryFixturePath, 'indirect-external-circular');

            specify('should throw error', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              try {
                await resolve(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
              } catch (e) {
                assert.instanceOf(e, ResolverError);
              }
            });
          },
        );

        context('given JSONReference Objects with unresolvable reference', function () {
          const fixturePath = path.join(entryFixturePath, 'unresolvable-reference');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            try {
              await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given JSONReference Objects with invalid JSON Pointer', function () {
          const fixturePath = path.join(entryFixturePath, 'invalid-pointer');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            try {
              await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given JSONReference Objects with arbitrary circular references', function () {
          const fixturePath = path.join(entryFixturePath, 'ignore-arbitrary-$refs');

          specify('should resolve', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given JSONReference Objects and maxDepth of dereference', function () {
          const fixturePath = path.join(entryFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');

            try {
              await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumDereferenceDepthError');
            } catch (error: any) {
              assert.instanceOf(error, ResolverError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, MaximumDereferenceDepthError);
              // @ts-ignore
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given JSONReference Objects and maxDepth of resolution', function () {
          const fixturePath = path.join(entryFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');

            try {
              await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumResolveDepthError');
            } catch (error: any) {
              assert.instanceOf(error, ResolverError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, MaximumResolveDepthError);
              // @ts-ignore
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given path with invalid URL characters - spaces', function () {
          const fixturePath = path.join(entryFixturePath, 'path-encoding', 'path with spaces');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 4);
          });
        });
      });
    });
  });
});
