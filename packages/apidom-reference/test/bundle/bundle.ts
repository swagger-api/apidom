import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { isParseResultElement } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { bundle } from '../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

  specify('should bundle a file', async function () {
    const bundled = await bundle(rootFilePath, {
      parse: { mediaType: mediaTypes.latest('json') },
    });

    assert.isTrue(isParseResultElement(bundled));
  });
});
