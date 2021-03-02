import path from 'path';
import { assert } from 'chai';
import { toValue } from 'apidom';
import { isParameterElement } from 'apidom-ns-openapi-3-1';

import { loadJsonFile } from '../../../../helpers';
import { dereference } from '../../../../../src';
import { evaluate } from '../../../../../src/selectors/json-pointer';
import { DereferenceError } from '../../../../../src/util/errors';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('openapi-3-1', function () {
    context('Reference Object', function () {
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
          const fragment = evaluate('/0/components/parameters/externalRef', dereferenced);

          assert.isTrue(isParameterElement(fragment));
        });
      });
    });

    context('given Reference Objects pointing internally only', function () {
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

    context('given Reference Objects pointing externally only', function () {
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

    context('given Reference Objects pointing to external indirections', function () {
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
        const fragment = evaluate('/0/components/parameters/externalRef', dereferenced);

        assert.isTrue(isParameterElement(fragment));
      });
    });

    context('given Reference Objects with additional props', function () {
      const fixturePath = path.join(rootFixturePath, 'additional-props');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        const actual = await dereference(rootFilePath, {
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        });
        const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

        assert.deepEqual(toValue(actual), expected);
      });
    });

    context('given Reference Objects with additional ignored props', function () {
      const fixturePath = path.join(rootFixturePath, 'additional-ignored-props');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        const actual = await dereference(rootFilePath, {
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        });
        const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

        assert.deepEqual(toValue(actual), expected);
      });
    });

    context('given Reference Objects with direct circular internal reference', function () {
      const fixturePath = path.join(rootFixturePath, 'direct-internal-circular');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        try {
          await dereference(rootFilePath, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
          });
        } catch (e) {
          assert.instanceOf(e, DereferenceError);
        }
      });
    });

    context('given Reference Objects with indirect circular internal reference', function () {
      const fixturePath = path.join(rootFixturePath, 'indirect-internal-circular');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        try {
          await dereference(rootFilePath, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
          });
        } catch (e) {
          assert.instanceOf(e, DereferenceError);
        }
      });
    });

    context('given Reference Objects with direct circular external reference', function () {
      const fixturePath = path.join(rootFixturePath, 'direct-external-circular');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        try {
          await dereference(rootFilePath, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
          });
        } catch (e) {
          assert.instanceOf(e, DereferenceError);
        }
      });
    });

    context('given Reference Objects with indirect circular external reference', function () {
      const fixturePath = path.join(rootFixturePath, 'indirect-external-circular');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        try {
          await dereference(rootFilePath, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
          });
        } catch (e) {
          assert.instanceOf(e, DereferenceError);
        }
      });
    });

    context('given Reference Objects with unresolvable reference', function () {
      const fixturePath = path.join(rootFixturePath, 'unresolvable-reference');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        try {
          await dereference(rootFilePath, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
          });
        } catch (e) {
          assert.instanceOf(e, DereferenceError);
        }
      });
    });

    context('given Reference Objects with invalid JSON Pointer', function () {
      const fixturePath = path.join(rootFixturePath, 'invalid-pointer');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        try {
          await dereference(rootFilePath, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
          });
        } catch (e) {
          assert.instanceOf(e, DereferenceError);
        }
      });
    });

    context('given Reference Objects with resolvable circular references', function () {
      const fixturePath = path.join(rootFixturePath, 'circular');

      specify('should dereference', async function () {
        const rootFilePath = path.join(fixturePath, 'root.json');
        const actual = await dereference(rootFilePath, {
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        });
        const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

        assert.deepEqual(toValue(actual), expected);
      });
    });
  });
});
