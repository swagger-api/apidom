import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { resolve } from '../../../../../src';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError';
import MaximumResolverDepthError from '../../../../../src/errors/MaximumResolverDepthError';
import ResolverError from '../../../../../src/errors/ResolverError';
import EvaluationJsonSchema$anchorError from '../../../../../src/errors/EvaluationJsonSchema$anchorError';

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
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects pointing internally only', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-only');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with internal cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects with internal and external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects with external circular dependency', function () {
          const fixturePath = path.join(rootFixturePath, 'external-circular-dependency');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects with external resolution disabled', function () {
          const fixturePath = path.join(rootFixturePath, 'ignore-external');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
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
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context('given Schema Objects pointing to external indirections', function () {
          const fixturePath = path.join(rootFixturePath, 'external-indirections');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 4);
          });
        });

        context('given Schema Objects with $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-defined');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
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
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with undefined $schema keyword', function () {
          specify('should resolve', async function () {
            const fixturePath = path.join(rootFixturePath, '$schema-undefined');
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with unrecognized $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-unrecognized');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
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
              parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw ResolverError');
            } catch (error: any) {
              assert.instanceOf(error, ResolverError);
              assert.instanceOf(error.cause.cause, ResolverError);
              assert.match(error.cause.cause.message, /\/schemas\/nested\/ex\.json"$/);
            }
          });
        });

        context('given Schema Objects with $ref keyword containing URL', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-url');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('given Schema Objects with $ref keyword containing resolvable URL', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-url-resolvable');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });

        context(
          'given Schema Objects with $ref keyword containing Uniform Resource Name',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-urn');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 1);
            });
          },
        );

        context(
          'given Schema Objects with $ref keyword containing Uniform Resource Name and JSON Pointer fragment',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-urn-pointer');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 1);
            });
          },
        );

        context(
          'given Schema Objects with $ref keyword containing Uniform Resource Name and $anchor',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-urn-$anchor');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 1);
            });
          },
        );

        context(
          'given Schema Objects with $anchor keyword pointing to internal schema',
          function () {
            const fixturePath = path.join(rootFixturePath, '$anchor-internal');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.strictEqual(refSet.size, 1);
            });
          },
        );

        context(
          'given Schema Objects with $anchor keyword pointing to external schema',
          function () {
            const fixturePath = path.join(rootFixturePath, '$anchor-external');

            specify('should resolve', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const refSet = await resolve(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw ResolverError');
            } catch (error: any) {
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
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumDereferenceDepthError');
            } catch (error: any) {
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
                parse: { mediaType: mediaTypes.latest('json') },
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

        context('given Schema Objects with unresolvable reference', function () {
          const fixturePath = path.join(rootFixturePath, 'unresolvable-reference');

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

        context('given Schema Objects with invalid JSON Pointer', function () {
          const fixturePath = path.join(rootFixturePath, 'invalid-pointer');

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

        context('given Schema Objects with infinite recursion', function () {
          const fixturePath = path.join(rootFixturePath, 'infinite-recursion');

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

        context('given Schema Objects with direct circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

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

        context('given Schema Objects with direct circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

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

        context('given Schema Objects with various document boundaries', function () {
          const fixturePath = path.join(rootFixturePath, 'document-boundaries');

          specify('should resolve', async function () {
            const rootFilePath = path.join(fixturePath, 'root.yml');
            const refSet = await resolve(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('yaml') },
            });

            assert.strictEqual(refSet.size, 6);
          });
        });

        context('given Reference Objects with indirect circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

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

        context('given Reference Objects with indirect circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

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
      });
    });
  });
});
