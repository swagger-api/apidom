import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';
import { fileURLToPath } from 'node:url';

import { resolve } from '../../../../../src/index.ts';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError.ts';
import ResolverError from '../../../../../src/errors/ResolverError.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entryFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Path Item Object', function () {
        context('given Path Item Object $ref field', function () {
          context('given $ref field pointing externally only', function () {
            const fixturePath = path.join(entryFixturePath, 'external-only');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('given $ref field pointing internally and externally', function () {
            const fixturePath = path.join(entryFixturePath, 'internal-external');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('given external resolution disabled', function () {
            const fixturePath = path.join(entryFixturePath, 'ignore-external');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { external: false },
              });

              assert.strictEqual(refSet.size, 1);
            });
          });

          context('given $ref field pointing to external indirections', function () {
            const fixturePath = path.join(entryFixturePath, 'external-indirections');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 3);
            });
          });

          context('given $ref field with invalid JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'invalid-pointer');

            specify('should throw error', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');

              try {
                await resolve(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                assert.fail('should throw ResolverError');
              } catch (e) {
                assert.instanceOf(e, ResolverError);
              }
            });
          });

          context('given $ref field and maxDepth of dereference', function () {
            const fixturePath = path.join(entryFixturePath, 'max-depth');

            specify('should throw error', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');

              try {
                await resolve(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: { maxDepth: 1 },
                });
                assert.fail('should throw MaximumDereferenceDepthError');
              } catch (error: any) {
                assert.instanceOf(error, ResolverError);
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
                await resolve(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                assert.fail('should throw ResolverError');
              } catch (e) {
                assert.instanceOf(e, ResolverError);
              }
            });
          });

          context('given $ref field with with direct circular external reference', function () {
            const fixturePath = path.join(entryFixturePath, 'direct-external-circular');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('given $ref field with with indirect circular external reference', function () {
            const fixturePath = path.join(entryFixturePath, 'indirect-external-circular');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 3);
            });
          });
        });
      });
    });
  });
});
