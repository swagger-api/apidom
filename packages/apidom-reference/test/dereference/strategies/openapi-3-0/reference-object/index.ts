import path from 'node:path';
import sinon from 'sinon';
import { assert } from 'chai';
import { identity } from 'ramda';
import { Element, toValue, isRefElement, isParseResultElement } from '@swagger-api/apidom-core';
import { isParameterElement, mediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { loadJsonFile } from '../../../../helpers.ts';
import { resolve, dereference } from '../../../../../src/index.ts';
import DereferenceError from '../../../../../src/errors/DereferenceError.ts';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError.ts';
import MaximumResolveDepthError from '../../../../../src/errors/MaximumResolveDepthError.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entryFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Reference Object', function () {
        context('given Reference Objects pointing internally and externally', function () {
          const fixturePath = path.join(entryFixturePath, 'internal-external');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to external fragment', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const dereferenced = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const fragment = evaluate<Element>(
              dereferenced,
              '/0/components/parameters/externalRef',
            );

            assert.isTrue(isParameterElement(fragment));
          });

          specify(
            'should annotate transcluded element with additional metadata',
            async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const fragment = evaluate<Element>(dereferenced, '/0/components/parameters/userId');

              assert.strictEqual(
                toValue(fragment.meta.get('ref-fields').get('$ref')),
                '#/components/parameters/indirection1',
              );
            },
          );
        });

        context('given Reference Objects pointing internally only', function () {
          const fixturePath = path.join(entryFixturePath, 'internal-only');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects pointing externally only', function () {
          const fixturePath = path.join(entryFixturePath, 'external-only');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects pointing to external cycles', function () {
          const fixturePath = path.join(entryFixturePath, 'external-cycle');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const dereferenced = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/externalSchema/properties/parent',
            );
            const cyclicParent = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/externalSchema/properties/parent/properties/parent',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Reference Objects pointing to external indirections', function () {
          const fixturePath = path.join(entryFixturePath, 'external-indirections');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to eventual external fragment', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const dereferenced = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const fragment = evaluate<Element>(
              dereferenced,
              '/0/components/parameters/externalRef',
            );

            assert.isTrue(isParameterElement(fragment));
          });
        });

        context('given Reference Objects with additional ignored fields', function () {
          const fixturePath = path.join(entryFixturePath, 'additional-ignored-fields');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with internal cycles', function () {
          const fixturePath = path.join(entryFixturePath, 'cycle-internal');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const dereferenced = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/User/properties/parent',
            );
            const cyclicParent = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/User/properties/parent/properties/parent',
            );

            assert.strictEqual(parent, cyclicParent);
          });

          context('given circular=ignore', function () {
            specify('should dereference and create cycles', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { circular: 'ignore' },
              });

              assert.throws(() => JSON.stringify(toValue(dereferenced)));
            });
          });

          context('given circular=replace', function () {
            specify('should dereference and eliminate all cycles', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { circular: 'replace' },
              });

              assert.doesNotThrow(() => JSON.stringify(toValue(dereferenced)));
            });
          });

          context('given circular=replace and custom replacer is provided', function () {
            specify('should dereference and eliminate all cycles', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const circularReplacer = sinon.spy(identity);

              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  circular: 'replace',
                  circularReplacer,
                },
              });

              assert.isTrue(circularReplacer.calledOnce);
              assert.isTrue(isRefElement(circularReplacer.getCall(0).args[0]));
              assert.isTrue(isRefElement(circularReplacer.getCall(0).returnValue));
            });
          });

          context('given circular=error', function () {
            specify('should dereference and throw on first detected cycle', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');

              try {
                await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: { circular: 'error' },
                });
                assert.fail('should throw DereferenceError');
              } catch (e) {
                assert.instanceOf(e, DereferenceError);
              }
            });
          });

          context('given immutable=true', function () {
            specify('should not mutate original ApiDOM tree', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              refSet.refs.forEach((ref) => ref.value.freeze());
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: entryFilePath },
                dereference: {
                  refSet,
                  immutable: true,
                },
              });

              assert.isTrue(isParseResultElement(dereferenced));
            });
          });

          context('given immutable=false', function () {
            specify('should mutate original ApiDOM tree', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const refSet = await resolve(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              refSet.refs.forEach((ref) => ref.value.freeze());
              try {
                await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: entryFilePath },
                  dereference: {
                    refSet,
                    immutable: false,
                  },
                });
                assert.fail('should throw DereferenceError');
              } catch (e) {
                assert.instanceOf(e, DereferenceError);
              }
            });
          });
        });

        context('given Reference Objects with external resolution disabled', function () {
          const fixturePath = path.join(entryFixturePath, 'ignore-external');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { external: false },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with direct circular internal reference', function () {
          const fixturePath = path.join(entryFixturePath, 'direct-internal-circular');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = [loadJsonFile(entryFilePath)];

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given $ref field with direct circular internal reference to itself', function () {
          const fixturePath = path.join(entryFixturePath, 'direct-self-circular');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');

            try {
              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given Reference Objects with indirect circular internal reference', function () {
          const fixturePath = path.join(entryFixturePath, 'indirect-internal-circular');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = [loadJsonFile(entryFilePath)];

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with direct circular external reference', function () {
          const fixturePath = path.join(entryFixturePath, 'direct-external-circular');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = [loadJsonFile(entryFilePath)];

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with indirect circular external reference', function () {
          const fixturePath = path.join(entryFixturePath, 'indirect-external-circular');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with unresolvable reference', function () {
          const fixturePath = path.join(entryFixturePath, 'unresolvable-reference');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            try {
              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given Reference Objects with invalid JSON Pointer', function () {
          const fixturePath = path.join(entryFixturePath, 'invalid-pointer');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            try {
              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given Reference Objects with arbitrary circular references', function () {
          const fixturePath = path.join(entryFixturePath, 'ignore-arbitrary-$refs');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects with external circular dependency', function () {
          const fixturePath = path.join(entryFixturePath, 'external-circular-dependency');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects referencing Schema Object', function () {
          const fixturePath = path.join(entryFixturePath, 'referencing-schema-object');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Reference Objects and maxDepth of dereference', function () {
          const fixturePath = path.join(entryFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');

            try {
              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumDereferenceDepthError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, MaximumDereferenceDepthError);
              // @ts-ignore
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given Reference Objects and maxDepth of resolution', function () {
          const fixturePath = path.join(entryFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');

            try {
              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumResolveDepthError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, MaximumResolveDepthError);
              // @ts-ignore
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given refSet is provided as an option', function () {
          specify('should dereference without external resolution', async function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'refset-as-option');
            const uri = path.join(fixturePath, 'entry.json');
            const refSet = await resolve(uri, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const actual = await dereference(uri, {
              dereference: { refSet },
              resolve: { resolvers: [] },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given path with invalid URL characters - spaces', function () {
          const fixturePath = path.join(entryFixturePath, 'path-encoding', 'path with spaces');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
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
