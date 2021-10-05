import path from 'path';
import { assert } from 'chai';

import { dereference, resolve } from '../../../../../src';
import {
  DereferenceError,
  MaximumDereferenceDepthError,
  MaximumResolverDepthError,
  ResolverError,
} from '../../../../../src/util/errors';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('asyncapi-2', function () {
      context('Reference Object', function () {
        context('given Reference Objects pointing internally and externally', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Reference Objects pointing internally only', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-only');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Reference Objects pointing externally only', function () {
          const fixturePath = path.join(rootFixturePath, 'external-only');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Reference Objects pointing to external indirections', function () {
          const fixturePath = path.join(rootFixturePath, 'external-indirections');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
            });

            assert.strictEqual(refSet.size, 4);
          });
        });

        context('given Reference Objects with external resolution disable', function () {
          const fixturePath = path.join(rootFixturePath, 'ignore-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
              resolve: { external: false },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Reference Objects with direct circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given Reference Objects with indirect circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given Reference Objects with direct circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given Reference Objects with indirect circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given Reference Objects with unresolvable reference', function () {
          const fixturePath = path.join(rootFixturePath, 'unresolvable-reference');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given Reference Objects with invalid JSON Pointer', function () {
          const fixturePath = path.join(rootFixturePath, 'invalid-pointer');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
              });
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given Reference Objects with resolvable circular references', function () {
          const fixturePath = path.join(rootFixturePath, 'circular');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Reference Objects and maxDepth of dereference', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
                dereference: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumDereferenceDepthError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              assert.instanceOf(error.cause.cause, MaximumDereferenceDepthError);
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given Reference Objects and maxDepth of resolution', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.aai.asyncapi+json;version=2.2.0' },
                resolve: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumResolverDepthError');
            } catch (error: any) {
              assert.instanceOf(error, ResolverError);
              assert.instanceOf(error.cause.cause, MaximumResolverDepthError);
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });
      });
    });
  });
});
