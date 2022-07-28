import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { dereference } from '../../src';
import { loadJsonFile } from '../helpers';

describe('dereference', function () {
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
        parse: { mediaType: mediaTypes.latest('json') },
      });

      assert.deepEqual(toValue(actual), expected);
    });
  });
});
