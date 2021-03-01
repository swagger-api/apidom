import { assert } from 'chai';
import path from 'path';
import { toValue } from 'apidom';

import dereferencedBasic from './strategies/openapi-3-1/fixtures/basic/dereferenced.json';
import { dereference } from '../../src';

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
    const dereferenced = await dereference(rootFilePath, {
      parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
    });

    assert.deepEqual(toValue(dereferenced), dereferencedBasic);
  });
});
