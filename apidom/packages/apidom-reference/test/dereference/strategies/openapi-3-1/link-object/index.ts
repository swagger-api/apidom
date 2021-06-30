import path from 'path';
import { assert } from 'chai';
import { toValue } from 'apidom';
import { isOperationElement } from 'apidom-ns-openapi-3-1';

import { loadJsonFile } from '../../../../helpers';
import { dereference } from '../../../../../src';
import { DereferenceError } from '../../../../../src/util/errors';

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
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given in Response Object', function () {
          const fixturePath = path.join(rootFixturePath, 'response-object');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given operationRef field', function () {
          context('and with internal JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-internal');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context('and with external JSON Pointer', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-external');
            const rootFilePath = path.join(fixturePath, 'root.json');

            specify('should dereference', async function () {
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });

            specify('should apply semantics to external fragment', async function () {
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });

              assert.isTrue(
                // @ts-ignore
                isOperationElement(dereferenced.api.components.links.get('link1').operation),
              );
            });
          });

          context('with external resolution disabled', function () {
            const fixturePath = path.join(rootFixturePath, 'operation-ref-ignore-external');

            specify('should not dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
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
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
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
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
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
            const fixturePath = path.join(rootFixturePath, 'operation-id');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          });

          context("and OperationElement with operationId doesn't exist", async function () {
            const fixturePath = path.join(rootFixturePath, 'operation-id-non-existent');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');

              try {
                await dereference(rootFilePath, {
                  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
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
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.strictEqual(
                e.cause.cause.message,
                'LinkElement operationRef and operationId are mutually exclusive.',
              );
              assert.instanceOf(e, DereferenceError);
            }
          });
        });
      });
    });
  });
});
