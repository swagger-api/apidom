import { assert } from 'chai';
import path from 'path';
import { toValue } from 'apidom';

import { dereference } from '../../src';
import { loadJsonFile } from '../helpers';

describe('dereference', function () {
  it('should dereference a file', async function () {
    const rootFilePath = path.join(
      __dirname,
      'strategies',
      'openapi-3-1',
      'fixtures',
      'basic',
      'root.json',
    );
    const expected = loadJsonFile(
      path.join(__dirname, 'strategies', 'openapi-3-1', 'fixtures', 'basic', 'dereferenced.json'),
    );

    const actual = await dereference(rootFilePath, {
      parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
    });

    assert.deepEqual(toValue(actual), expected);
  });
});
