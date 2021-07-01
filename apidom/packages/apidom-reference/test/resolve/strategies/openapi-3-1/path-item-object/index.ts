import path from 'path';
import { assert } from 'chai';

import { resolve } from '../../../../../src';
import { MaximumDereferenceDepthError, ResolverError } from '../../../../../src/util/errors';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Path Item Object', function () {
        context('given Path Item Object $ref field', function () {
          context('given $ref field pointing externally only', function () {
            const fixturePath = path.join(rootFixturePath, 'external-only');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('given $ref field pointing internally and externally', function () {
            const fixturePath = path.join(rootFixturePath, 'internal-external');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('given external resolution disabled', function () {
            const fixturePath = path.join(rootFixturePath, 'ignore-external');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                resolve: { external: false },
              });

              assert.strictEqual(refSet.size, 1);
            });
          });

          context('given $ref field pointing to external indirections', function () {
            const fixturePath = path.join(rootFixturePath, 'external-indirections');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 3);
            });
          });

          context('given $ref field with invalid JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'invalid-pointer');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await resolve(rootFilePath, {
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                });
                assert.fail('should throw ResolverError');
              } catch (e) {
                assert.instanceOf(e, ResolverError);
              }
            });
          });

          context('given $ref field and maxDepth of dereference', function () {
            const fixturePath = path.join(rootFixturePath, 'max-depth');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await resolve(rootFilePath, {
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                  dereference: { maxDepth: 1 },
                });
                assert.fail('should throw MaximumDereferenceDepthError');
              } catch (error) {
                assert.instanceOf(error, ResolverError);
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
                await resolve(rootFilePath, {
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                });
                assert.fail('should throw ResolverError');
              } catch (e) {
                assert.instanceOf(e, ResolverError);
              }
            });
          });

          context('given $ref field with with direct circular external reference', function () {
            const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await resolve(rootFilePath, {
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                });
                assert.fail('should throw ResolverError');
              } catch (e) {
                assert.instanceOf(e, ResolverError);
              }
            });
          });

          context('given $ref field with with indirect circular external reference', function () {
            const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await resolve(rootFilePath, {
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                });
                assert.fail('should throw ResolverError');
              } catch (e) {
                assert.instanceOf(e, ResolverError);
              }
            });
          });
        });
      });
    });
  });
});
