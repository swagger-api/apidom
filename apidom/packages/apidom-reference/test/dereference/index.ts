import { assert } from 'chai';
import path from 'path';
import { toValue } from 'apidom';

import { dereference, dereferenceApiDOM, parse } from '../../src';
import { loadJsonFile } from '../helpers';

const fixturePath = path.join(
  __dirname,
  'strategies',
  'openapi-3-1',
  'reference-object',
  'fixtures',
  'internal-external',
);

describe('dereference', function () {
  const rootFilePath = path.join(fixturePath, 'root.json');
  const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

  context('should export functions', function () {
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
});
