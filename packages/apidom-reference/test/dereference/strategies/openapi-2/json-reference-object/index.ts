import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { isSchemaElement, mediaTypes } from '@swagger-api/apidom-ns-openapi-2';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import { loadJsonFile } from '../../../../helpers';
import { parse, dereference, Reference, ReferenceSet } from '../../../../../src';
import DereferenceError from '../../../../../src/errors/DereferenceError';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError';
import MaximumResolveDepthError from '../../../../../src/errors/MaximumResolveDepthError';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-2', function () {
      context('JSONReference Object', function () {
        context('given JSONReference Objects pointing internally and externally', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to external fragment', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const fragment = evaluate('/0/definitions/schema2', dereferenced);

            assert.isTrue(isSchemaElement(fragment));
          });

          specify(
            'should annotate transcluded element with additional metadata',
            async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const fragment = evaluate('/0/definitions/schema1', dereferenced);

              assert.strictEqual(
                toValue(fragment.meta.get('ref-fields').get('$ref')),
                '#/definitions/schema3',
              );
            },
          );
        });

        context('given JSONReference Objects pointing internally only', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-only');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given JSONReference Objects pointing externally only', function () {
          const fixturePath = path.join(rootFixturePath, 'external-only');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given JSONReference Objects pointing to external indirections', function () {
          const fixturePath = path.join(rootFixturePath, 'external-indirections');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to eventual external fragment', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const fragment = evaluate('/0/definitions/schema', dereferenced);

            assert.isTrue(isSchemaElement(fragment));
          });
        });

        context('given JSONReference Objects with additional ignored fields', function () {
          const fixturePath = path.join(rootFixturePath, 'additional-ignored-fields');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given JSONReference Objects with external resolution disabled', function () {
          const fixturePath = path.join(rootFixturePath, 'ignore-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { external: false },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given JSONReference Objects with direct circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context(
          'given JSONReference Objects with indirect circular internal reference',
          function () {
            const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              try {
                await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
              } catch (e) {
                assert.instanceOf(e, DereferenceError);
              }
            });
          },
        );

        context('given JSONReference Objects with direct circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context(
          'given JSONReference Objects with indirect circular external reference',
          function () {
            const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              try {
                await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
              } catch (e) {
                assert.instanceOf(e, DereferenceError);
              }
            });
          },
        );

        context('given JSONReference Objects with unresolvable reference', function () {
          const fixturePath = path.join(rootFixturePath, 'unresolvable-reference');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given JSONReference Objects with invalid JSON Pointer', function () {
          const fixturePath = path.join(rootFixturePath, 'invalid-pointer');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given JSONReference Objects with arbitrary circular references', function () {
          const fixturePath = path.join(rootFixturePath, 'ignore-arbitrary-$refs');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given JSONReference Objects with external circular dependency', function () {
          const fixturePath = path.join(rootFixturePath, 'external-circular-dependency');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given JSONReference Objects and maxDepth of dereference', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
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

        context('given JSONReference Objects and maxDepth of resolution', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumResolveDepthError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              assert.instanceOf(error.cause.cause, MaximumResolveDepthError);
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given refSet is provided as an option', function () {
          specify('should dereference without external resolution', async function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'refset-as-option');

            const rootURI = path.join(fixturePath, 'root.json');
            const rootParseResult = await parse(rootURI, { mediaType: mediaTypes.latest('json') });
            const rootRef = Reference({ uri: rootURI, value: rootParseResult });

            const ex1URI = path.join(fixturePath, 'ex1.json');
            const ex1ParseResult = await parse(ex1URI, { mediaType: 'application/json' });
            const ex1Ref = Reference({ uri: ex1URI, value: ex1ParseResult });

            const ex2URI = path.join(fixturePath, 'ex2.json');
            const ex2ParseResult = await parse(ex2URI, { mediaType: 'application/json' });
            const ex2Ref = Reference({ uri: ex2URI, value: ex2ParseResult });

            const ex3URI = path.join(fixturePath, 'ex3.json');
            const ex3ParseResult = await parse(ex3URI, { mediaType: 'application/json' });
            const ex3Ref = Reference({ uri: ex3URI, value: ex3ParseResult });

            const refSet = ReferenceSet({ refs: [rootRef, ex1Ref, ex2Ref, ex3Ref] });

            const actual = await dereference(rootURI, {
              dereference: { refSet },
              resolve: { resolvers: [] },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given path with invalid URL characters - spaces', function () {
          const fixturePath = path.join(rootFixturePath, 'path-encoding', 'path with spaces');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });
      });
    });
  });
});
