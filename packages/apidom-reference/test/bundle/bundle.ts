import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { bundle, UnmatchedBundleStrategyError } from '../../src';

describe('bundle', function () {
  const fixturePath = path.join(
    __dirname,
    'strategies',
    'openapi-3-1',
    'reference-object',
    'fixtures',
    'internal-external',
  );
  const rootFilePath = path.join(fixturePath, 'root.json');

  context('bundle', function () {
    specify('should bundle a file', async function () {
      try {
        await bundle(rootFilePath, {
          parse: { mediaType: mediaTypes.latest('json') },
        });
        assert.fail('should throw UnmatchedBundleStrategyError');
      } catch (error) {
        assert.instanceOf(error, UnmatchedBundleStrategyError);
      }
    });
  });
});
