import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { isOperationElement, LinkElement, mediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { loadJsonFile } from '../../../../helpers.ts';
import { dereference } from '../../../../../src/index.ts';
import DereferenceError from '../../../../../src/errors/DereferenceError.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entryFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Link Object', function () {
        context('given in components/links field', function () {
          const fixturePath = path.join(entryFixturePath, 'components-links');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify(
            'should set Operation Object as metadata of Link.operationId field',
            async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const link1 = evaluate<LinkElement>(dereferenced, '/0/components/links/link1');
              const link2 = evaluate<LinkElement>(dereferenced, '/0/components/links/link2');

              assert.isTrue(isOperationElement(link1.operationId?.meta.get('operation')));
              assert.isTrue(isOperationElement(link2.operationId?.meta.get('operation')));
            },
          );
        });

        context('given in Response Object', function () {
          const fixturePath = path.join(entryFixturePath, 'response-object');

          specify('should dereference', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');
            const actual = await dereference(entryFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify(
            'should set Operation Object as metadata of Link.operationId field',
            async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const link1 = evaluate<LinkElement>(
                dereferenced,
                '/0/components/responses/201/links/link',
              );
              const link2 = evaluate<LinkElement>(dereferenced, '/0/components/links/link1');

              assert.isTrue(isOperationElement(link1.operationId?.meta.get('operation')));
              assert.isTrue(isOperationElement(link2.operationId?.meta.get('operation')));
            },
          );
        });

        context('given operationRef field', function () {
          context('and with internal JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'operation-ref-internal');

            specify('should dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });

            specify(
              'should set Operation Object as metadata of Link.operationRef field',
              async function () {
                const entryFilePath = path.join(fixturePath, 'entry.json');
                const dereferenced = await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const link1 = evaluate<LinkElement>(dereferenced, '/0/components/links/link1');

                assert.isTrue(isOperationElement(link1.operationRef?.meta.get('operation')));
              },
            );
          });

          context('and with external JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'operation-ref-external');
            const entryFilePath = path.join(fixturePath, 'entry.json');

            specify('should dereference', async function () {
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });

            specify('should apply semantics to external fragment', async function () {
              const dereferenced = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.isTrue(
                // @ts-ignore
                isOperationElement(dereferenced.api.components.links.get('link1').operation),
              );
            });

            specify(
              'should set Operation Object as metadata of Link.operationRef field',
              async function () {
                const dereferenced = await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const link1 = evaluate<LinkElement>(dereferenced, '/0/components/links/link1');

                assert.isTrue(isOperationElement(link1.operationRef?.meta.get('operation')));
              },
            );
          });

          context('with external resolution disabled', function () {
            const fixturePath = path.join(entryFixturePath, 'operation-ref-ignore-external');

            specify('should not dereference', async function () {
              const entryFilePath = path.join(fixturePath, 'entry.json');
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { external: false },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('and with invalid JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'operation-ref-invalid-pointer');

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

          context('and with unresolvable JSON Pointer', function () {
            const fixturePath = path.join(entryFixturePath, 'operation-ref-unresolvable');

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
        });

        context('given operationId field', function () {
          context('and OperationElement with operationId exists', async function () {
            const fixturePath = path.join(entryFixturePath, 'operation-id');
            const entryFilePath = path.join(fixturePath, 'entry.json');

            specify('should dereference', async function () {
              const actual = await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });

            specify(
              'should set Operation Object as metadata of Link.operationId field',
              async function () {
                const dereferenced = await dereference(entryFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const link1 = evaluate<LinkElement>(dereferenced, '/0/components/links/link1');

                assert.isTrue(isOperationElement(link1.operationId?.meta.get('operation')));
              },
            );
          });

          context("and OperationElement with operationId doesn't exist", async function () {
            const fixturePath = path.join(entryFixturePath, 'operation-id-non-existent');

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
        });

        context('given both operationRef and operationId fields are defined', function () {
          const fixturePath = path.join(entryFixturePath, 'operation-ref-id-both-defined');

          specify('should throw error', async function () {
            const entryFilePath = path.join(fixturePath, 'entry.json');

            try {
              await dereference(entryFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (error: any) {
              assert.strictEqual(
                error.cause.cause.message,
                'LinkElement operationRef and operationId fields are mutually exclusive.',
              );
              assert.instanceOf(error, DereferenceError);
            }
          });
        });
      });
    });
  });
});
