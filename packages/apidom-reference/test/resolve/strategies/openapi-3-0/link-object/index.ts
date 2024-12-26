import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';
import { fileURLToPath } from 'node:url';

import { resolve } from '../../../../../src/index.ts';
import ResolverError from '../../../../../src/errors/ResolverError.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entryFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Link Object', function () {
        context('given operationRef field', function () {
          context('and with external JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'operation-ref-external');
            const entryFilePath = path.join(fixturePath, 'entry.json');

            specify('should resolve', async function () {
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });
        });

        context('with external resolution disabled', function () {
          const fixturePath = path.join(entryFixturePath, 'operation-ref-ignore-external');

          specify('should not resolve', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { external: false },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('and with invalid JSON Pointer', function () {
          const fixturePath = path.join(entryFixturePath, 'operation-ref-invalid-pointer');

          specify('should throw error', async function () {
            try {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw ResolverError');
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('and with unresolvable URI', function () {
          const fixturePath = path.join(entryFixturePath, 'operation-ref-unresolvable');

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

        context('given both operationRef and operationId fields are defined', function () {
          const fixturePath = path.join(entryFixturePath, 'operation-ref-id-both-defined');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');

            try {
              await resolve(entryFilePath, {
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
