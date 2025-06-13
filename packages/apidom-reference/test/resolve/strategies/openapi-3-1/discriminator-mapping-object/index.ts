import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';
import { fileURLToPath } from 'node:url';

import { resolve } from '../../../../../src/index.ts';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError.ts';
import MaximumResolveDepthError from '../../../../../src/errors/MaximumResolveDepthError.ts';
import ResolverError from '../../../../../src/errors/ResolverError.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Discriminator Mapping Object values', function () {
        context(
          'given Discriminator Mapping values pointing internally and externally',
          function () {
            const fixturePath = path.join(rootFixturePath, 'internal-external');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });

              assert.strictEqual(refSet.size, 2);
            });
          },
        );

        context('given Discriminator Mapping values pointing internally only', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-only');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: {
                strategyOpts: {
                  'openapi-3-1': {
                    dereferenceDiscriminatorMapping: true,
                  },
                },
              },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Discriminator Mapping values pointing externally only', function () {
          const fixturePath = path.join(rootFixturePath, 'external-only');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: {
                strategyOpts: {
                  'openapi-3-1': {
                    dereferenceDiscriminatorMapping: true,
                  },
                },
              },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Discriminator Mapping values and maxDepth of dereference', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  maxDepth: 2,
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
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

        context('given Discriminator Mapping values and maxDepth of resolution', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { maxDepth: 2 },
                dereference: {
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
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

        context('given Discriminator Mapping values with unresolvable reference', function () {
          const fixturePath = path.join(rootFixturePath, 'unresolvable-reference');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });
              assert.fail('should throw ResolverError');
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given Discriminator Mapping values with invalid JSON Pointer', function () {
          const fixturePath = path.join(rootFixturePath, 'invalid-pointer');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });
              assert.fail('should throw ResolverError');
            } catch (e) {
              assert.instanceOf(e, ResolverError);
            }
          });
        });

        context('given Discriminator Mapping values with infinite recursion', function () {
          const fixturePath = path.join(rootFixturePath, 'infinite-recursion');

          specify('should resolve as internal references are ignored', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: {
                strategyOpts: {
                  'openapi-3-1': {
                    dereferenceDiscriminatorMapping: true,
                  },
                },
              },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context(
          'given Discriminator Mapping values with direct circular external reference',
          function () {
            const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });

              assert.strictEqual(refSet.size, 2);
            });
          },
        );

        context(
          'given Discriminator Mapping values with direct circular internal reference',
          function () {
            const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

            specify('should resolve as internal references are ignored', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });

              assert.strictEqual(refSet.size, 1);
            });
          },
        );

        context(
          'given Discriminator Mapping values with indirect circular external reference',
          function () {
            const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });

              assert.strictEqual(refSet.size, 4);
            });
          },
        );

        context(
          'given Discriminator Mapping values with indirect circular internal reference',
          function () {
            const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

            specify('should resolve as internal references are ignored', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-1': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });

              assert.strictEqual(refSet.size, 1);
            });
          },
        );
      });
    });
  });
});
