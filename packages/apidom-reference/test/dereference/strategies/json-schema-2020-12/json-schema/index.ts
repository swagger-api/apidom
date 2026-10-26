import path from 'node:path';
import util from 'node:util';
import { assert } from 'chai';
import { Element, toValue, isBooleanElement } from '@swagger-api/apidom-core';
import {
  isJSONSchemaElement,
  mediaTypes,
  JSONSchemaElement,
} from '@swagger-api/apidom-ns-json-schema-2020-12';
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
    context('json-schema-2020-12', function () {
      context('$ref keyword from core vocabulary', function () {
        context('given schemas pointing internally and externally', function () {
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
            const fragment = evaluate(dereferenced, '/0/$defs/Order');

            assert.isTrue(isJSONSchemaElement(fragment));
          });

          specify(
            'should annotate transcluded element with additional metadata',
            async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const dereferenced = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const fragment = evaluate<Element>(dereferenced, '/0/$defs/User/properties/profile');

              assert.strictEqual(
                toValue(fragment.meta.get('ref-fields').get('$ref')),
                '#/$defs/UserProfile',
              );
            },
          );
        });

        context('given schemas pointing internally only', function () {
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

        context('given schemas pointing to internal indirections', function () {
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

        context('given schemas with internal cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate(
              dereferenced,
              '/0/$defs/User/properties/parent/properties/parent',
            );
            const cyclicParent = evaluate(
              dereferenced,
              '/0/$defs/User/properties/parent/properties/parent/properties/parent/properties/parent',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given schemas with advanced internal cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-advanced');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate(
              dereferenced,
              '/0/$defs/PlatformMenuTree/properties/children/items/properties/children/items',
            );
            const cyclicParent = evaluate(
              dereferenced,
              '/0/$defs/PlatformMenuTree/properties/children/items/properties/children/items/properties/children/items',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given schemas with internal cycles in array', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-in-array');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const parent = evaluate(dereferenced, '/0/$defs/User/properties/parent');
            const cyclicParent = evaluate(
              dereferenced,
              '/0/$defs/User/properties/parent/oneOf/0/properties/parent',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given schemas with external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            const parent = evaluate(
              dereferenced,
              '/0/$defs/User/properties/profile/properties/parent/properties/parent',
            );
            const cyclicParent = evaluate(
              dereferenced,
              '/0/$defs/User/properties/profile/properties/parent/properties/parent/properties/parent',
            );

            assert.strictEqual(parent, cyclicParent);
          });
        });

        context('given schemas with internal and external cycles', function () {
          const fixturePath = path.join(rootFixturePath, 'cycle-internal-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const user = evaluate(
              dereferenced,
              '/0/$defs/User/properties/profile/properties/user/properties/profile',
            );
            const cyclicUserInProfile = evaluate(
              dereferenced,
              '/0/$defs/User/properties/profile/properties/user/properties/profile/properties/user/properties/profile',
            );

            assert.strictEqual(user, cyclicUserInProfile);
          });
        });

        context('given schemas with external circular dependency', function () {
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

        context('given schemas with external resolution disabled', function () {
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

        context('given schemas with overlapping keywords', function () {
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

        context('given schemas pointing externally only', function () {
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

        context('given schemas pointing to external indirections', function () {
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
            const fragment = evaluate(dereferenced, '/0/$defs/Indirection');

            assert.isTrue(isJSONSchemaElement(fragment));
          });
        });

        context(
          'given schemas with $id keyword defined directly in referencing schema',
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

        context('given schemas with $id keyword defined in enclosing schema', function () {
          const fixturePath = path.join(rootFixturePath, '$id-uri-enclosing');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given schemas with $id keyword pointing to external files', function () {
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
          'given schemas with $id keyword pointing to external files and containing cycle',
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

        context('given schemas with unresolvable $id values', function () {
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

        context('given schemas with $ref keyword containing URL', function () {
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

        context('given schemas with $ref keyword containing relative references', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-url-relative-reference');

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
          'given schemas with $ref keyword containing URL and JSON Pointer fragment',
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

        context('given schemas with $ref keyword containing URL and $anchor', function () {
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

        context('given schemas with $ref keyword containing URL path override', function () {
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

        context('given schemas with $ref keyword containing resolvable URL', function () {
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

        context('given schemas with $ref keyword containing unresolvable URL', function () {
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

        context('given schemas with $ref keyword containing Uniform Resource Name', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-urn');

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
          'given schemas with $ref keyword containing Uniform Resource Name and JSON Pointer fragment',
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
          'given schemas with $ref keyword containing Uniform Resource Name and $anchor',
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
          'given schemas with $ref keyword containing unresolvable Uniform Resource Name',
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

        context('given schemas with $anchor keyword pointing to internal schema', function () {
          const fixturePath = path.join(rootFixturePath, '$anchor-internal');

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
          'given schemas with $anchor keyword after $id pointing to internal schema',
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

        context('given schemas with $anchor keyword pointing to external schema', function () {
          const fixturePath = path.join(rootFixturePath, '$anchor-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given schemas with not found $anchor', function () {
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

        context('given schemas and maxDepth of dereference', function () {
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

        context('given schemas and maxDepth of resolution', function () {
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

        context('given schemas with unresolvable reference', function () {
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

        context('given schemas with invalid JSON Pointer', function () {
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

        context('given schemas with infinite recursion', function () {
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

        context('given schemas with direct circular external reference', function () {
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

        context('given schemas with direct circular internal reference', function () {
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

        context('given schemas with indirect circular external reference', function () {
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

        context('given schemas with indirect circular internal reference', function () {
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

        context('given $ref keyword in every keyword that holds schemas', function () {
          const fixturePath = path.join(rootFixturePath, 'keywords');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given $ref keyword in the root schema', function () {
          const fixturePath = path.join(rootFixturePath, 'root-ref');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should keep the dereferenced root as parse result', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });

            assert.isTrue(isJSONSchemaElement(actual.result));
            assert.strictEqual(
              toValue(actual.result!.meta.get('ref-fields'))?.$ref,
              '#/$defs/user',
            );
          });
        });

        context(
          'given $ref keyword in the root schema pointing to Boolean JSON Schema',
          function () {
            const fixturePath = path.join(rootFixturePath, 'root-ref-boolean');

            specify('should dereference', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });

              assert.deepEqual(toValue(actual), [false]);
              assert.isTrue(isBooleanElement(actual.result));
            });
          },
        );

        context('given JSON Schema 2020-12 document in YAML format', function () {
          const fixturePath = path.join(rootFixturePath, 'yaml');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.yaml');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('yaml') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });

          specify('should apply semantics to external fragment', async function () {
            const rootFilePath = path.join(fixturePath, 'root.yaml');
            const dereferenced = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('yaml') },
            });
            const fragment = evaluate(dereferenced, '/0/properties/external');

            assert.isTrue(isJSONSchemaElement(fragment));
          });
        });

        context('given $ref keyword pointing to $dynamicAnchor', function () {
          const fixturePath = path.join(rootFixturePath, '$ref-$dynamicAnchor');

          specify('should dereference like a $ref to an $anchor', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given unresolvable references and continueOnError option', function () {
          specify('should collect an error for every unresolvable reference', async function () {
            const fixturePath = path.join(rootFixturePath, 'reference-errors');
            const rootFilePath = path.join(fixturePath, 'root.json');
            const errors: { error: unknown; refEl: Element }[] = [];
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: { dereferenceOpts: { continueOnError: true, errors } },
            });
            const failedRefs = new Set(
              errors.map(({ refEl }) => toValue((refEl as JSONSchemaElement).$ref)),
            );

            assert.sameMembers(
              [...failedRefs],
              [
                '#/$defs/missing',
                '#/$defs/hasMissing',
                '#/$defs/missingInIndirection',
                '#missing-anchor',
                './missing.json',
                './ex.json#/$defs/missing',
                './broken.json',
              ],
            );
            assert.deepEqual(toValue(evaluate(actual, '/0/properties/internal')), {
              type: 'string',
            });
            assert.deepEqual(toValue(evaluate(actual, '/0/properties/anchor')), {
              $anchor: 'name',
              type: 'boolean',
            });
            assert.deepEqual(toValue(evaluate(actual, '/0/properties/external')), {
              type: 'number',
            });
          });

          specify(
            'should report errors of referenced schemas on the referencing schema',
            async function () {
              const fixturePath = path.join(rootFixturePath, 'reference-errors');
              const rootFilePath = path.join(fixturePath, 'root.json');
              const errors: { error: unknown; refEl: Element }[] = [];
              await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
                dereference: { dereferenceOpts: { continueOnError: true, errors } },
              });
              const errorsOf = ($ref: string) =>
                errors
                  .filter(({ refEl }) => toValue((refEl as JSONSchemaElement).$ref) === $ref)
                  .map(({ error }) => error);
              const [nestedError] = errorsOf('#/$defs/missingInIndirection');

              assert.isDefined(nestedError);
              assert.include(errorsOf('#/$defs/hasMissing'), nestedError);
            },
          );

          /**
           * Same errors, in the same order, as the OpenAPI 3.1 strategy collects for the
           * equivalent Schema Objects, including the errors propagated to referencing schemas
           * once the document has been traversed.
           */
          [
            [
              false,
              [
                '#/$defs/missing',
                '#/$defs/hasMissing',
                '#/$defs/missingInIndirection',
                '#missing-anchor',
                './missing.json',
                './ex.json#/$defs/missing',
                './broken.json',
                '#/$defs/missingInIndirection',
                '#/$defs/hasMissing',
              ],
            ],
            [
              true,
              [
                '#/$defs/missing',
                '#/$defs/hasMissing',
                '#/$defs/missingInIndirection',
                '#missing-anchor',
                './missing.json',
                './ex.json#/$defs/missing',
                './broken.json',
                '#/$defs/missingInIndirection',
                './broken.json',
                '#/$defs/hasMissing',
              ],
            ],
          ].forEach(([skipNestedExternal, expected]) => {
            specify(
              `should collect errors in order with skipNestedExternal=${skipNestedExternal}`,
              async function () {
                const fixturePath = path.join(rootFixturePath, 'reference-errors');
                const rootFilePath = path.join(fixturePath, 'root.json');
                const errors: { error: unknown; refEl: Element }[] = [];
                await dereference(rootFilePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  dereference: {
                    dereferenceOpts: {
                      continueOnError: true,
                      errors,
                      skipNestedExternal: skipNestedExternal as boolean,
                    },
                  },
                });

                assert.deepEqual(
                  errors.map(({ refEl }) => toValue((refEl as JSONSchemaElement).$ref)),
                  expected as string[],
                );
              },
            );
          });

          specify('should collect no error for resolvable references', async function () {
            const fixturePath = path.join(rootFixturePath, 'reference-errors-none');
            const rootFilePath = path.join(fixturePath, 'root.json');
            const errors: { error: unknown; refEl: Element }[] = [];
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
              dereference: { dereferenceOpts: { continueOnError: true, errors } },
            });

            assert.lengthOf(errors, 0);
            assert.deepEqual(toValue(evaluate(actual, '/0/properties')), {
              internal: { type: 'string' },
              anchor: { $anchor: 'name', type: 'boolean' },
              external: { type: 'number' },
            });
          });
        });
      });

      context('given the default parsers', function () {
        const rootFilePath = path.join(rootFixturePath, 'internal-only', 'root.json');

        specify('should parse JSON Schema 2020-12 document by its media type', async function () {
          const parseResult = await parse(rootFilePath, {
            parse: { mediaType: mediaTypes.latest('json') },
          });

          assert.isTrue(isJSONSchemaElement(parseResult.result));
        });

        /**
         * The JSON Schema 2020-12 parsers of the default configuration don't detect documents
         * by content: other specifications reference files with a root $schema and expect
         * them as generic ApiDOM.
         */
        specify('should not detect JSON Schema 2020-12 document by its content', async function () {
          const parseResult = await parse(rootFilePath, {});

          assert.isFalse(isJSONSchemaElement(parseResult.result));
        });
      });

      context('$dynamicRef keyword from core vocabulary', function () {
        const collect$dynamicRefs = (value: unknown, acc: string[] = []): string[] => {
          if (Array.isArray(value)) {
            value.forEach((item) => collect$dynamicRefs(item, acc));
          } else if (value !== null && typeof value === 'object') {
            Object.entries(value).forEach(([key, item]) => {
              if (key === '$dynamicRef') acc.push(item as string);
              collect$dynamicRefs(item, acc);
            });
          }
          return acc;
        };

        [
          ['$dynamicRef pointing to $dynamicAnchor', '$dynamicRef-$dynamicAnchor'],
          ['$dynamicRef pointing to $anchor', '$dynamicRef-$anchor'],
          ['$dynamicRef with JSON Pointer fragment', '$dynamicRef-json-pointer'],
          ['$dynamicRef pointing to Boolean JSON Schema', '$dynamicRef-boolean-schema'],
        ].forEach(([title, fixture]) => {
          context(`given ${title}`, function () {
            const fixturePath = path.join(rootFixturePath, fixture);

            specify('should leave every $dynamicRef unchanged', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const actual = await dereference(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const original = loadJsonFile(rootFilePath);
              const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));
              const actual$dynamicRefs = collect$dynamicRefs(toValue(actual));

              assert.deepEqual(toValue(actual), expected);
              assert.isNotEmpty(actual$dynamicRefs);
              assert.sameMembers([...new Set(actual$dynamicRefs)], collect$dynamicRefs(original));
            });
          });
        });
      });
    });
  });
});
