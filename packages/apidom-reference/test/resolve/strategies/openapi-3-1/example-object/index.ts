import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { resolve } from '../../../../../src';
import ResolverError from '../../../../../src/errors/ResolverError';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Example Object', function () {
        context('given externalValue field', function () {
          context('and pointing to a JSON file', function () {
            const fixturePath = path.join(rootFixturePath, 'external-value-json');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and pointing to a JSON file and having JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'external-value-pointer');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and pointing to a YAML file', function () {
            const fixturePath = path.join(rootFixturePath, 'external-value-yaml');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and pointing to a text file', function () {
            const fixturePath = path.join(rootFixturePath, 'external-value-text');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and pointing to a binary file', function () {
            const fixturePath = path.join(rootFixturePath, 'external-value-binary');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and with unresolvable URI', function () {
            const fixturePath = path.join(rootFixturePath, 'external-value-unresolvable');

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

          context('with external resolution disabled', function () {
            const fixturePath = path.join(rootFixturePath, 'external-value-ignore-external');

            specify('should not resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { external: false },
              });

              assert.strictEqual(refSet.size, 1);
            });
          });

          context('given both value and externalValue fields are defined', function () {
            const fixturePath = path.join(rootFixturePath, 'external-value-value-both-defined');

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
                  'ExampleElement value and externalValue fields are mutually exclusive.',
                );
                assert.instanceOf(error, ResolverError);
              }
            });
          });
        });
      });
    });
  });
});
