import path from 'path';
import { assert } from 'chai';

import { resolve } from '../../../../../src';
import { ResolverError } from '../../../../../src/util/errors';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Link Object', function () {
        context('given operationRef field', function () {
          context('and with external JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-external');
            const rootFilePath = path.join(fixturePath, 'root.json');

            specify('should resolve', async function () {
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });
        });

        context('with external resolution disabled', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-ref-ignore-external');

          specify('should not resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              resolve: { external: false },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('and with invalid JSON Pointer', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-ref-invalid-pointer');

          specify('should resolve', async function () {
            // external resolution of Link Object is not concerned with validity of JSON Pointer (if defined)
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('and with unresolvable URI', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-ref-unresolvable');

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

        context('given both operationRef and operationId fields are defined', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-ref-id-both-defined');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              assert.fail('should throw ResolverError');
            } catch (e) {
              assert.strictEqual(
                e.cause.cause.message,
                'LinkElement operationRef and operationId are mutually exclusive.',
              );
              assert.instanceOf(e, ResolverError);
            }
          });
        });
      });
    });
  });
});
