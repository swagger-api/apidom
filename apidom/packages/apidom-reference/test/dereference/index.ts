import { assert } from 'chai';
import path from 'path';
import { toValue } from 'apidom';

import { dereference, dereferenceApiDOM, parse, resolve } from '../../src';
import { loadJsonFile } from '../helpers';

describe('dereference', function () {
  context('should export functions', function () {
    const fixturePath = path.join(
      __dirname,
      'strategies',
      'openapi-3-1',
      'reference-object',
      'fixtures',
      'internal-external',
    );
    const rootFilePath = path.join(fixturePath, 'root.json');
    const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

    context('dereference', function () {
      specify('should dereference a file', async function () {
        const actual = await dereference(rootFilePath, {
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        });

        assert.deepEqual(toValue(actual), expected);
      });
    });

    context('dereferenceApiDOM', function () {
      specify('should dereference an ApiDOM fragment', async function () {
        const fragment = await parse(rootFilePath, {
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        });
        const actual = await dereferenceApiDOM(fragment, { resolve: { baseURI: rootFilePath } });

        assert.deepEqual(toValue(actual), expected);
      });
    });
  });

  context('given refSet is provided as an option', function () {
    specify('should dereference without external resolution', async function () {
      const fixturePath = path.join(__dirname, 'fixtures', 'refset-as-option');
      const uri = path.join(fixturePath, 'root.json');
      const refSet = await resolve(uri, {
        parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
      });
      const actual = await dereference(uri, { dereference: { refSet } });
      const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

      assert.deepEqual(toValue(actual), expected);
    });
  });
});
