import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { isOperationElement, LinkElement, mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import { loadJsonFile } from '../../../../helpers';
import { dereference } from '../../../../../src';
import DereferenceError from '../../../../../src/errors/DereferenceError';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Link Object', function () {
        context('given in components/links field', function () {
          const fixturePath = path.join(rootFixturePath, 'components-links');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify(
            'should set Operation Object as metadata of Link.operationId field',
            async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const link1 = evaluate('/0/components/links/link1', dereferenced) as LinkElement;
              const link2 = evaluate('/0/components/links/link2', dereferenced) as LinkElement;

              assert.isTrue(isOperationElement(link1.operationId?.meta.get('operation')));
              assert.isTrue(isOperationElement(link2.operationId?.meta.get('operation')));
            },
          );
        });

        context('given in Response Object', function () {
          const fixturePath = path.join(rootFixturePath, 'response-object');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify(
            'should set Operation Object as metadata of Link.operationId field',
            async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const link1 = evaluate(
                '/0/components/responses/201/links/link',
                dereferenced,
              ) as LinkElement;
              const link2 = evaluate('/0/components/links/link1', dereferenced) as LinkElement;

              assert.isTrue(isOperationElement(link1.operationId?.meta.get('operation')));
              assert.isTrue(isOperationElement(link2.operationId?.meta.get('operation')));
            },
          );
        });

        context('given operationRef field', function () {
          context('and with internal JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-internal');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });

            specify(
              'should set Operation Object as metadata of Link.operationRef field',
              async function () {
                const rootFilePath = path.join(fixturePath, 'root.json');
                const dereferenced = await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const link1 = evaluate('/0/components/links/link1', dereferenced) as LinkElement;

                assert.isTrue(isOperationElement(link1.operationRef?.meta.get('operation')));
              },
            );
          });

          context('and with external JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-external');
            const rootFilePath = path.join(fixturePath, 'root.json');

            specify('should dereference', async function () {
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });

            specify('should apply semantics to external fragment', async function () {
              const dereferenced = await dereference(rootFilePath, {
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
                const dereferenced = await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const link1 = evaluate('/0/components/links/link1', dereferenced) as LinkElement;

                assert.isTrue(isOperationElement(link1.operationRef?.meta.get('operation')));
              },
            );
          });

          context('with external resolution disabled', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-ignore-external');

            specify('should not dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { external: false },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('and with invalid JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-invalid-pointer');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                assert.fail('should throw DereferenceError');
              } catch (e) {
                assert.instanceOf(e, DereferenceError);
              }
            });
          });

          context('and with unresolvable JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-unresolvable');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await dereference(rootFilePath, {
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
          context('and OperationElement with operationId exists', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-id');
            const rootFilePath = path.join(fixturePath, 'root.json');

            specify('should dereference', async function () {
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });

            specify(
              'should set Operation Object as metadata of Link.operationId field',
              async function () {
                const dereferenced = await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const link1 = evaluate('/0/components/links/link1', dereferenced) as LinkElement;

                assert.isTrue(isOperationElement(link1.operationId?.meta.get('operation')));
              },
            );
          });

          context("and OperationElement with operationId doesn't exist", function () {
            const fixturePath = path.join(rootFixturePath, 'operation-id-non-existent');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await dereference(rootFilePath, {
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
          const fixturePath = path.join(rootFixturePath, 'operation-ref-id-both-defined');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await dereference(rootFilePath, {
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
