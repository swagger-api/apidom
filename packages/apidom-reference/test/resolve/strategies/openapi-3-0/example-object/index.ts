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
      context('Example Object', function () {
        context('given externalValue field', function () {
          context('and pointing to a JSON file', function () {
            const fixturePath = path.join(entryFixturePath, 'external-value-json');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and pointing to a JSON file and having JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'external-value-pointer');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and pointing to a YAML file', function () {
            const fixturePath = path.join(entryFixturePath, 'external-value-yaml');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and pointing to a text file', function () {
            const fixturePath = path.join(entryFixturePath, 'external-value-text');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and pointing to a binary file', function () {
            const fixturePath = path.join(entryFixturePath, 'external-value-binary');

            specify('should resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 2);
            });
          });

          context('and with unresolvable URI', function () {
            const fixturePath = path.join(entryFixturePath, 'external-value-unresolvable');

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

          context('with external resolution disabled', function () {
            const fixturePath = path.join(entryFixturePath, 'external-value-ignore-external');

            specify('should not resolve', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { external: false },
              });

              assert.strictEqual(refSet.size, 1);
            });
          });

          context('given both value and externalValue fields are defined', function () {
            const fixturePath = path.join(entryFixturePath, 'external-value-value-both-defined');

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
