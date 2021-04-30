import path from 'path';
import { assert } from 'chai';

import { resolve } from '../../../../../src';
import {
  MaximumDereferenceDepthError,
  MaximumResolverDepthError,
  ResolverError,
} from '../../../../../src/util/errors';
import { EvaluationJsonSchema$anchorError } from '../../../../../src/dereference/strategies/openapi-3-1/selectors/errors';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('resolve', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Schema Object - $ref keyword from core vocabulary', function () {
        context('given Reference Objects pointing internally and externally', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects pointing internally only', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-only');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with internal cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects with internal and external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects with external resolution disabled', function () {
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

        context('given Schema Objects pointing externally only', function () {
          const fixturePath = path.join(rootFixturePath, 'external-only');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects pointing to external indirections', function () {
          const fixturePath = path.join(rootFixturePath, 'external-indirections');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 4);
          });
        });

        context('given Schema Objects with $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-defined');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context(
          'given Schema Objects with $schema keyword defined in enclosing Schema Object',
          function () {
            specify('should resolve', async function () {
              const fixturePath = path.join(rootFixturePath, '$schema-enclosing');
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 1);
            });
          },
        );

        context('given Schema Objects with mixed $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-mixed');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with undefined $schema keyword', function () {
          specify('should resolve', async function () {
            const fixturePath = path.join(rootFixturePath, '$schema-undefined');
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with unrecognized $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-unrecognized');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context(
          'given Schema Objects with $id keyword defined directly in referencing Schema Object',
          function () {
            const fixturePath = path.join(rootFixturePath, '$id-uri-direct');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 2);
            });
          },
        );

        context(
          'given Schema Objects with $id keyword defined in enclosing Schema Object',
          function () {
            const fixturePath = path.join(rootFixturePath, '$id-uri-enclosing');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 2);
            });
          },
        );

        context('given Schema Objects with $id keyword pointing to external files', function () {
          const fixturePath = path.join(rootFixturePath, '$id-uri-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });

            assert.strictEqual(refSet.size, 3);
          });
        });

        context('given Schema Objects with unresolvable $id values', function () {
          const fixturePath = path.join(rootFixturePath, '$id-unresolvable');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              assert.fail('should throw ResolverError');
            } catch (error) {
              assert.instanceOf(error, ResolverError);
              assert.instanceOf(error.cause.cause, ResolverError);
              assert.match(error.cause.cause.message, /\/schemas\/nested\/ex\.json"$/);
            }
          });
        });

        context(
          'given Schema Objects with $anchor keyword pointing to internal schema',
          function () {
            const fixturePath = path.join(rootFixturePath, '$anchor-internal');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 1);
            });
          },
        );

        context(
          'given Schema Objects with $anchor keyword pointing to external schema',
          function () {
            const fixturePath = path.join(rootFixturePath, '$anchor-external');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.strictEqual(refSet.size, 2);
            });
          },
        );

        context('given Schema Objects with not found $anchor', function () {
          const fixturePath = path.join(rootFixturePath, '$anchor-not-found');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              assert.fail('should throw ResolverError');
            } catch (error) {
              assert.instanceOf(error, ResolverError);
              assert.instanceOf(error.cause.cause, EvaluationJsonSchema$anchorError);
            }
          });
        });

        context('given Schema Objects and maxDepth of dereference', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await resolve(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                dereference: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumDereferenceDepthError');
            } catch (error) {
              assert.instanceOf(error, ResolverError);
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
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                resolve: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumResolverDepthError');
            } catch (error) {
              assert.instanceOf(error, ResolverError);
              assert.instanceOf(error.cause.cause, MaximumResolverDepthError);
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given Schema Objects with unresolvable reference', function () {
          const fixturePath = path.join(rootFixturePath, 'unresolvable-reference');

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

        context('given Schema Objects with invalid JSON Pointer', function () {
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

        context('given Schema Objects with infinite recursion', function () {
          const fixturePath = path.join(rootFixturePath, 'infinite-recursion');

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

        context('given Schema Objects with direct circular external reference', function () {
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

        context('given Schema Objects with direct circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

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

        context('given Reference Objects with indirect circular external reference', function () {
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

        context('given Reference Objects with indirect circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

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
