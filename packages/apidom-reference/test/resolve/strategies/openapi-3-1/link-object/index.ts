import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { resolve } from '../../../../../src';
import ResolverError from '../../../../../src/errors/ResolverError';

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
                parse: { mediaType: mediaTypes.latest('json') },
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
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { external: false },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('and with invalid JSON Pointer', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-ref-invalid-pointer');

          specify('should throw error', async function () {
            try {
              const rootFilePath = path.join(fixturePath, 'root.json');
              await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw ResolverError');
            } catch (error: any) {
              assert.strictEqual(
                error.cause.cause.message,
                'JSON Pointer evaluation failed while parsing the pointer "invalid-pointer".',
              );
              assert.instanceOf(error, ResolverError);
            }
          });
        });

        context('and with unresolvable URI', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-ref-unresolvable');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw ResolverError');
            } catch (error: any) {
              assert.strictEqual(
                error.cause.cause.message,
                'LinkElement operationRef and operationId fields are mutually exclusive.',
              );
              assert.instanceOf(error, ResolverError);
            }
          });
        });
      });
    });
  });
});
