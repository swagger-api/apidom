import path from 'node:path';
import util from 'node:util';
import { assert } from 'chai';
import { Element, toValue } from '@swagger-api/apidom-core';
import { isSchemaElement, mediaTypes } from '@swagger-api/apidom-ns-openapi-3-2';
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
    context('openapi-3-2', function () {
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
                'https://spec.openapis.org/oas/3.2/dialect/2025-09-17',
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
              'https://spec.openapis.org/oas/3.2/dialect/2025-09-17',
            );
          });

          specify('should inherit default $schema dialect for User.login', function () {
            const user = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/User/properties/login',
            );

            assert.strictEqual(
              toValue(user.meta.get('inheritedDialectIdentifier')),
              'https://spec.openapis.org/oas/3.2/dialect/2025-09-17',
            );
          });

          specify('should inherit default $schema dialect for UserProfile', function () {
            const user = evaluate<Element>(dereferenced, '/0/components/schemas/UserProfile');

            assert.strictEqual(
              toValue(user.meta.get('inheritedDialectIdentifier')),
              'https://spec.openapis.org/oas/3.2/dialect/2025-09-17',
            );
          });

          specify('should inherit default $schema dialect for UserProfile.login', function () {
            const user = evaluate<Element>(
              dereferenced,
              '/0/components/schemas/UserProfile/properties/avatar',
            );

            assert.strictEqual(
              toValue(user.meta.get('inheritedDialectIdentifier')),
              'https://spec.openapis.org/oas/3.2/dialect/2025-09-17',
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

        context(
          'given Schema Objects with $dynamicRef and $dynamicAnchor keywords pointing internally',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-internal');

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
          'given Schema Objects with $dynamicRef and $dynamicAnchor keywords pointing externally',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-external');

            specify('should dereference external dynamic anchor', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { dereferenceOpts: { skipNestedExternal: true } },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef pointing to embedded canonical $id',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-embedded-canonical-id');

            specify('should dereference embedded canonical dynamic anchor', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { external: false },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef pointing to missing external static target',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-missing-static-target');

            specify('should throw error before applying dynamic scope', async function () {
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
          },
        );

        context(
          'given Schema Objects with $dynamicRef pointing to $dynamicAnchor with no ancestor override',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-fallback');

            specify(
              'should dereference by falling back to document-level search',
              async function () {
                const rootFilePath = path.join(fixturePath, 'root.json');
                const actual = await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

                assert.deepEqual(toValue(actual), expected);
              },
            );
          },
        );

        context(
          'given Schema Objects with $dynamicRef creating recursive tree structure',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-recursive');

            specify('should dereference and detect circularity', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const children = evaluate(
                dereferenced,
                '/0/components/schemas/Category/properties/children/items',
              );
              const cyclicChildren = evaluate(
                dereferenced,
                '/0/components/schemas/Category/properties/children/items/properties/children/items',
              );

              assert.strictEqual(children, cyclicChildren);
            });
          },
        );

        context('given Schema Objects with nested $dynamicAnchor at multiple levels', function () {
          const fixturePath = path.join(rootFixturePath, '$dynamicRef-nested-scope');

          specify('should resolve $dynamicRef to outermost $dynamicAnchor', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const dataPath = '/0/components/schemas/Container/properties/inner/properties/leaf';
            const data = evaluate(actual, dataPath);

            const dataEl = data as Element;
            const dataVal = toValue(dataEl) as any;
            assert.strictEqual(dataVal?.properties?.source?.const, 'outer');
          });
        });

        context(
          'given Schema Objects with $dynamicRef targeting ordinary $anchor',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-static-anchor');

            specify('should behave like $ref and not apply dynamic scope', async function () {
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
          'given Schema Objects with $dynamicRef creating recursive tree and circular=ignore',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-recursive');

            specify('should dereference and create cycles', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { circular: 'ignore' },
              });

              assert.throws(() => JSON.stringify(toValue(dereferenced)));
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef and allOf with discriminator mapping',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-allOf-discriminator');

            specify('should dereference with discriminator mapping enabled', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  strategyOpts: {
                    'openapi-3-2': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef pointing to non-existent anchor',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-non-existent-anchor');

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
          },
        );

        context(
          'given Schema Objects with $dynamicRef resolving to boolean JSON Schema',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-boolean-json-schema');

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
          'given Schema Objects with $dynamicRef creating recursive tree and circular=error',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-circular-error');

            specify('should throw error on circular reference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              try {
                await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: { circular: 'error' },
                });
                assert.fail('should throw DereferenceError');
              } catch (e) {
                assert.instanceOf(e, DereferenceError);
              }
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef creating recursive tree and circular=replace',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-circular-replace');

            specify('should eliminate cycles', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { circular: 'replace' },
              });

              assert.doesNotThrow(() => JSON.stringify(toValue(dereferenced)));
            });
          },
        );

        context('given Schema Objects with $dynamicRef and maxDepth of dereference', function () {
          const fixturePath = path.join(rootFixturePath, '$dynamicRef-max-depth');

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
            }
          });
        });

        context(
          'given Schema Objects with $dynamicRef and internal resolution disabled',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-ignore-internal');

            specify('should not dereference internal $dynamicRef', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { internal: false },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef and external resolution disabled',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-ignore-external');

            specify('should not dereference external $dynamicRef', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { external: false },
              });
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

              assert.deepEqual(toValue(actual), expected);
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef pointing to non-existent anchor and continueOnError',
          function () {
            const fixturePath = path.join(
              rootFixturePath,
              '$dynamicRef-continue-on-error-anchor',
            );

            specify('should collect error and continue', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const errors: unknown[] = [];
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { dereferenceOpts: { continueOnError: true, errors } },
              });

              assert.isAbove(errors.length, 0);
              assert.isOk(dereferenced);
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef pointing to missing external file and continueOnError',
          function () {
            const fixturePath = path.join(
              rootFixturePath,
              '$dynamicRef-continue-on-error-missing',
            );

            specify('should collect error and continue', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const errors: unknown[] = [];
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { dereferenceOpts: { continueOnError: true, errors } },
              });

              assert.isAbove(errors.length, 0);
              assert.isOk(dereferenced);
            });
          },
        );

        context(
          'given Schema Objects with $dynamicRef creating circular reference and continueOnError',
          function () {
            const fixturePath = path.join(
              rootFixturePath,
              '$dynamicRef-continue-on-error-circular',
            );

            specify('should collect error and continue', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const errors: unknown[] = [];
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: {
                  circular: 'error',
                  dereferenceOpts: { continueOnError: true, errors },
                },
              });

              assert.isAbove(errors.length, 0);
              assert.isOk(dereferenced);
            });
          },
        );

        context(
          'given Schema Objects with external $dynamicRef and root document dynamic scope override',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-external-scope-override');

            specify(
              'should resolve $dynamicRef to root document $dynamicAnchor',
              async function () {
                const rootFilePath = path.join(fixturePath, 'root.json');
                const actual = await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: { dereferenceOpts: { skipNestedExternal: true } },
                });
                const dataPath = '/0/components/schemas/Base/properties/child/properties/source';
                const data = evaluate(actual, dataPath);
                const dataVal = toValue(data as Element) as any;

                assert.strictEqual(dataVal?.const, 'base');
              },
            );
          },
        );

        context(
          'given Schema Objects with direct self-referencing $dynamicRef',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-self-referencing');

            specify('should throw error for direct self-reference', async function () {
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
          },
        );

        context(
          'given Schema Objects with $dynamicRef and ancestor $id changing base URI',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-ancestor-id');

            specify('should dereference using ancestor schema identifiers', async function () {
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
          'given Schema Objects with $dynamicRef and $self on root OpenAPI document',
          function () {
            const fixturePath = path.join(rootFixturePath, '$dynamicRef-self-deref');

            specify('should annotate transcluded element with $self-based ref-origin', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const fragment = evaluate<Element>(
                dereferenced,
                '/0/components/schemas/User/properties/profile',
              );

              assert.strictEqual(
                toValue(fragment.meta.get('ref-origin')),
                'https://example.com/api.yaml',
              );
            });
          },
        );

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

        context('given Schema Objects with prefixItems keyword', function () {
          const fixturePath = path.join(rootFixturePath, 'prefixItems-keyword');

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
