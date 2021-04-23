import path from 'path';
import { assert } from 'chai';
import { toValue } from 'apidom';
import { isSchemaElement } from 'apidom-ns-openapi-3-1';

import { dereference } from '../../../../../src';
import {
  DereferenceError,
  MaximumDereferenceDepthError,
  ResolverError,
} from '../../../../../src/util/errors';
import { loadJsonFile } from '../../../../helpers';
import { evaluate } from '../../../../../src/selectors/json-pointer';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Schema Object - $ref keyword from core vocabulary', function () {
        context('given Reference Objects pointing internally and externally', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to external fragment', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const fragment = evaluate('/0/components/schemas/Order', dereferenced);

            assert.isTrue(isSchemaElement(fragment));
          });
        });

        context('given Schema Objects pointing internally only', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-only');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with internal cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const parent = evaluate('/0/components/schemas/User/properties/parent', dereferenced);
            const cyclicParent = evaluate(
              '/0/components/schemas/User/properties/parent/properties/parent',
              dereferenced,
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Schema Objects with external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const parent = evaluate(
              '/0/components/schemas/User/properties/profile/properties/parent',
              dereferenced,
            );
            const cyclicParent = evaluate(
              '/0/components/schemas/User/properties/profile/properties/parent/properties/parent',
              dereferenced,
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Schema Objects with internal and external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const user = evaluate(
              '/0/components/schemas/User/properties/profile/properties/user',
              dereferenced,
            );
            const cyclicUserInProfile = evaluate(
              '/0/components/schemas/User/properties/profile/properties/user/properties/profile/properties/user',
              dereferenced,
            );

            assert.strictEqual(user, cyclicUserInProfile);
          });
        });

        context('given Schema Objects with external resolution disabled', function () {
          const fixturePath = path.join(rootFixturePath, 'ignore-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              resolve: { external: false },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with overlapping keywords', function () {
          const fixturePath = path.join(rootFixturePath, 'merging-keywords');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects pointing externally only', function () {
          const fixturePath = path.join(rootFixturePath, 'external-only');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects pointing to external indirections', function () {
          const fixturePath = path.join(rootFixturePath, 'external-indirections');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to eventual external fragment', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const fragment = evaluate('/0/components/schemas/Indirection', dereferenced);

            assert.isTrue(isSchemaElement(fragment));
          });
        });

        context('given Schema Objects with $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-defined');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context(
          'given Schema Objects with $schema keyword defined in enclosing Schema Object',
          function () {
            let dereferenced: any;
            let expected: any;

            beforeEach(async function () {
              const fixturePath = path.join(rootFixturePath, '$schema-enclosing');
              const rootFilePath = path.join(fixturePath, 'root.json');
              dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));
            });

            specify('should dereference', async function () {
              assert.deepEqual(toValue(dereferenced), expected);
            });

            specify('should retain $schema before dereferencing', function () {
              const profile = evaluate(
                '/0/components/schemas/User/properties/profile',
                dereferenced,
              );

              assert.strictEqual(
                profile.meta.get('inherited$schema').toValue(),
                'https://spec.openapis.org/oas/3.1/dialect/base',
              );
            });
          },
        );

        context('given Schema Objects with mixed $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-mixed');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with undefined $schema keyword', function () {
          let dereferenced: any;
          let expected: any;

          beforeEach(async function () {
            const fixturePath = path.join(rootFixturePath, '$schema-undefined');
            const rootFilePath = path.join(fixturePath, 'root.json');
            dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));
          });

          specify('should dereference', async function () {
            assert.deepEqual(toValue(dereferenced), expected);
          });

          specify('should inherit default $schema dialect for User', function () {
            const user = evaluate('/0/components/schemas/User', dereferenced);

            assert.strictEqual(
              user.meta.get('inherited$schema').toValue(),
              'https://spec.openapis.org/oas/3.1/dialect/base',
            );
          });

          specify('should inherit default $schema dialect for User.login', function () {
            const user = evaluate('/0/components/schemas/User/properties/login', dereferenced);

            assert.strictEqual(
              user.meta.get('inherited$schema').toValue(),
              'https://spec.openapis.org/oas/3.1/dialect/base',
            );
          });

          specify('should inherit default $schema dialect for UserProfile', function () {
            const user = evaluate('/0/components/schemas/UserProfile', dereferenced);

            assert.strictEqual(
              user.meta.get('inherited$schema').toValue(),
              'https://spec.openapis.org/oas/3.1/dialect/base',
            );
          });

          specify('should inherit default $schema dialect for UserProfile.login', function () {
            const user = evaluate(
              '/0/components/schemas/UserProfile/properties/avatar',
              dereferenced,
            );

            assert.strictEqual(
              user.meta.get('inherited$schema').toValue(),
              'https://spec.openapis.org/oas/3.1/dialect/base',
            );
          });
        });

        context('given Schema Objects with unrecognized $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-unrecognized');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context(
          'given Schema Objects with $id keyword defined directly in referencing Schema Object',
          function () {
            const fixturePath = path.join(rootFixturePath, '$id-uri-direct');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $id keyword defined in enclosing Schema Object',
          function () {
            const fixturePath = path.join(rootFixturePath, '$id-uri-enclosing');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context('given Schema Objects with $id keyword pointing to external files', function () {
          const fixturePath = path.join(rootFixturePath, '$id-uri-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with unresolvable $id values', function () {
          const fixturePath = path.join(rootFixturePath, '$id-unresolvable');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
              });
              assert.fail('should throw DereferenceError');
            } catch (error) {
              assert.instanceOf(error, DereferenceError);
              assert.instanceOf(error.cause.cause, ResolverError);
              assert.match(error.cause.cause.message, /\/schemas\/nested\/ex\.json"$/);
            }
          });
        });

        context('given Schema Objects and maxDepth of dereference', function () {
          const fixturePath = path.join(rootFixturePath, 'max-depth');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');

            try {
              await dereference(rootFilePath, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
                dereference: { maxDepth: 2 },
              });
              assert.fail('should throw MaximumDereferenceDepthError');
            } catch (error) {
              assert.instanceOf(error, DereferenceError);
              assert.instanceOf(error.cause.cause, MaximumDereferenceDepthError);
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given Schema Objects with unresolvable reference', function () {
          const fixturePath = path.join(rootFixturePath, 'unresolvable-reference');

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

        context('given Schema Objects with invalid JSON Pointer', function () {
          const fixturePath = path.join(rootFixturePath, 'invalid-pointer');

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

        context('given Schema Objects with infinite recursion', function () {
          const fixturePath = path.join(rootFixturePath, 'infinite-recursion');

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

        context('given Schema Objects with direct circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

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

        context('given Schema Objects with direct circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

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

        context('given Reference Objects with indirect circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

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

        context('given Reference Objects with indirect circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

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
    });
  });
});
