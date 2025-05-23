import path from 'node:path';
import util from 'node:util';
import { assert } from 'chai';
import { Element, toValue } from '@swagger-api/apidom-core';
import { isSchemaElement, mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { dereference, parse, Reference, ReferenceSet } from '../../../../../src/index.ts';
import DereferenceError from '../../../../../src/errors/DereferenceError.ts';
import MaximumDereferenceDepthError from '../../../../../src/errors/MaximumDereferenceDepthError.ts';
import MaximumResolveDepthError from '../../../../../src/errors/MaximumResolveDepthError.ts';
import ResolveError from '../../../../../src/errors/ResolveError.ts';
import EvaluationJsonSchema$anchorError from '../../../../../src/errors/EvaluationJsonSchema$anchorError.ts';
import EvaluationJsonSchemaUriError from '../../../../../src/errors/EvaluationJsonSchemaUriError.ts';
import { loadFile, loadJsonFile } from '../../../../helpers.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Schema Object - $ref keyword from core vocabulary', function () {
        context('given Schema Objects pointing internally and externally', function () {
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
            const fragment = evaluate(dereferenced, '/0/components/schemas/Order');

            assert.isTrue(isSchemaElement(fragment));
          });

          specify(
            'should annotate transcluded element with additional metadata',
            async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const fragment = evaluate<Element>(
                dereferenced,
                '/0/components/schemas/User/properties/profile',
              );

              assert.strictEqual(
                toValue(fragment.meta.get('ref-fields').get('$ref')),
                '#/components/schemas/UserProfile',
              );
            },
          );
        });

        context('given Schema Objects pointing internally only', function () {
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

        context('given Schema Objects pointing to internal indirections', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-internal');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
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
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate(
              dereferenced,
              '/0/components/schemas/User/properties/parent/properties/parent',
            );
            const cyclicParent = evaluate(
              dereferenced,
              '/0/components/schemas/User/properties/parent/properties/parent/properties/parent/properties/parent',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Schema Objects with advanced internal cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-advanced');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate(
              dereferenced,
              '/0/components/schemas/PlatformMenuTree/properties/children/items/properties/children/items',
            );
            const cyclicParent = evaluate(
              dereferenced,
              '/0/components/schemas/PlatformMenuTree/properties/children/items/properties/children/items/properties/children/items',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Schema Objects with internal cycles in array', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-in-array');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate(dereferenced, '/0/components/schemas/User/properties/parent');
            const cyclicParent = evaluate(
              dereferenced,
              '/0/components/schemas/User/properties/parent/oneOf/0/properties/parent',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Schema Objects with external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            const parent = evaluate(
              dereferenced,
              '/0/components/schemas/User/properties/profile/properties/parent/properties/parent',
            );
            const cyclicParent = evaluate(
              dereferenced,
              '/0/components/schemas/User/properties/profile/properties/parent/properties/parent/properties/parent',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given Schema Objects with internal and external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const user = evaluate(
              dereferenced,
              '/0/components/schemas/User/properties/profile/properties/user/properties/profile',
            );
            const cyclicUserInProfile = evaluate(
              dereferenced,
              '/0/components/schemas/User/properties/profile/properties/user/properties/profile/properties/user/properties/profile',
            );

            assert.strictEqual(user, cyclicUserInProfile);
          });
        });

        context('given Schema Objects with external circular dependency', function () {
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

        context('given Schema Objects with external resolution disabled', function () {
          const fixturePath = path.join(rootFixturePath, 'ignore-external');

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

        context('given Schema Objects with overlapping keywords', function () {
          const fixturePath = path.join(rootFixturePath, 'merging-keywords');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
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
              parse: { mediaType: mediaTypes.latest('json') },
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
            const fragment = evaluate(dereferenced, '/0/components/schemas/Indirection');

            assert.isTrue(isSchemaElement(fragment));
          });
        });

        context('given Schema Objects with $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-defined');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
              });
              expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));
            });

            specify('should dereference', async function () {
              assert.deepEqual(toValue(dereferenced), expected);
            });

            specify('should retain $schema before dereferencing', function () {
              const profile = evaluate<Element>(
                dereferenced,
                '/0/components/schemas/User/properties/profile',
              );

              assert.strictEqual(
                toValue(profile.meta.get('inheritedDialectIdentifier')),
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
              parse: { mediaType: mediaTypes.latest('json') },
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
              parse: { mediaType: mediaTypes.latest('json') },
            });
            expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));
          });

          specify('should dereference', async function () {
            assert.deepEqual(toValue(dereferenced), expected);
          });

          specify('should inherit default $schema dialect for User', function () {
            const user = evaluate<Element>(dereferenced, '/0/components/schemas/User');

            assert.strictEqual(
              toValue(user.meta.get('inheritedDialectIdentifier')),
              'https://spec.openapis.org/oas/3.1/dialect/base',
            );
          });

          specify('should inherit default $schema dialect for User.login', function () {
            const user = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/User/properties/login',
            );

            assert.strictEqual(
              toValue(user.meta.get('inheritedDialectIdentifier')),
              'https://spec.openapis.org/oas/3.1/dialect/base',
            );
          });

          specify('should inherit default $schema dialect for UserProfile', function () {
            const user = evaluate<Element>(dereferenced, '/0/components/schemas/UserProfile');

            assert.strictEqual(
              toValue(user.meta.get('inheritedDialectIdentifier')),
              'https://spec.openapis.org/oas/3.1/dialect/base',
            );
          });

          specify('should inherit default $schema dialect for UserProfile.login', function () {
            const user = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/UserProfile/properties/avatar',
            );

            assert.strictEqual(
              toValue(user.meta.get('inheritedDialectIdentifier')),
              'https://spec.openapis.org/oas/3.1/dialect/base',
            );
          });
        });

        context('given Schema Objects with unrecognized $schema keyword defined', function () {
          const fixturePath = path.join(rootFixturePath, '$schema-unrecognized');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
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
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context(
          'given Schema Objects with $id keyword pointing to external files and containing cycle',
          function () {
            const fixturePath = path.join(rootFixturePath, '$id-uri-external-circular-structures');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const actualAsString = util.inspect(toValue(actual), { depth: null });
              const expected = loadFile(path.join(fixturePath, 'dereferenced.txt')).trimEnd();

              assert.strictEqual(actualAsString, expected);
            });
          },
        );

        context('given Schema Objects with unresolvable $id values', function () {
          const fixturePath = path.join(rootFixturePath, '$id-unresolvable');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, ResolveError);
              // @ts-ignore
              assert.match(error.cause.cause.message, /\/schemas\/nested\/ex\.json"$/);
            }
          });
        });

        context('given Schema Objects with $ref keyword containing URL', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-url');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context(
          'given Schema Objects with $ref keyword containing relative references',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-url-relative-reference');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $ref keyword containing URL and JSON Pointer fragment',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-url-pointer');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context('given Schema Objects with $ref keyword containing URL and $anchor', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-url-$anchor');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with $ref keyword containing URL path override', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-url-path-override');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const parseResult = await parse(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const uri = 'https://example.com/';
            const reference = new Reference({ uri, value: parseResult });
            const refSet = new ReferenceSet({ refs: [reference] });

            const actual = await dereference(uri, {
              dereference: { refSet },
              parse: { mediaType: mediaTypes.latest('json') },
            });

            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with $ref keyword containing resolvable URL', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-url-resolvable');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with $ref keyword containing unresolvable URL', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-url-unresolvable');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, ResolveError);
            }
          });
        });

        context(
          'given Schema Objects with $ref keyword containing Uniform Resource Name',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-urn');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $ref keyword containing Uniform Resource Name and JSON Pointer fragment',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-urn-pointer');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $ref keyword containing Uniform Resource Name and $anchor',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-urn-$anchor');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $ref keyword containing unresolvable Uniform Resource Name',
          function () {
            const fixturePath = path.join(rootFixturePath, '$ref-urn-unresolvable');

            specify('should throw error', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              try {
                await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                assert.fail('should throw DereferenceError');
              } catch (error: any) {
                assert.instanceOf(error, DereferenceError);
                // @ts-ignore
                assert.instanceOf(error.cause.cause, EvaluationJsonSchemaUriError);
              }
            });
          },
        );

        context(
          'given Schema Objects with $anchor keyword pointing to internal schema',
          function () {
            const fixturePath = path.join(rootFixturePath, '$anchor-internal');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $anchor keyword after $id pointing to internal schema',
          function () {
            const fixturePath = path.join(rootFixturePath, '$anchor-internal-no-embedding');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const parseResult = await parse(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const uri = 'https://example.com/';
              const reference = new Reference({ uri, value: parseResult });
              const refSet = new ReferenceSet({ refs: [reference] });

              const actual = await dereference(uri, {
                dereference: { refSet },
                parse: { mediaType: mediaTypes.latest('json') },
              });

              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $anchor keyword pointing to external schema',
          function () {
            const fixturePath = path.join(rootFixturePath, '$anchor-external');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context('given Schema Objects with various document boundaries', function () {
          const fixturePath = path.join(rootFixturePath, 'document-boundaries');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.yml');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('yaml') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with not found $anchor', function () {
          const fixturePath = path.join(rootFixturePath, '$anchor-not-found');

          specify('should throw error', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            try {
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (error: any) {
              assert.instanceOf(error, DereferenceError);
              // @ts-ignore
              assert.instanceOf(error.cause.cause, EvaluationJsonSchema$anchorError);
            }
          });
        });

        context('given Boolean JSON Schemas', function () {
          const fixturePath = path.join(rootFixturePath, 'boolean-json-schema');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects and maxDepth of dereference', function () {
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
              // @ts-ignore
              assert.instanceOf(error.cause.cause, MaximumDereferenceDepthError);
              // @ts-ignore
              assert.match(error.cause.cause.message, /fixtures\/max-depth\/ex2.json"$/);
            }
          });
        });

        context('given Schema Objects and maxDepth of resolution', function () {
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
              // @ts-ignore
              assert.instanceOf(error.cause.cause, MaximumResolveDepthError);
              // @ts-ignore
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
                parse: { mediaType: mediaTypes.latest('json') },
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
                parse: { mediaType: mediaTypes.latest('json') },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given Schema Objects with infinite recursion', function () {
          const fixturePath = path.join(rootFixturePath, 'infinite-recursion');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with direct circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with direct circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

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

        context('given Schema Objects with indirect circular external reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given Schema Objects with indirect circular internal reference', function () {
          const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

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
