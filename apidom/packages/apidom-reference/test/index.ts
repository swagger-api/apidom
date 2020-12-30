import { assert } from 'chai';
import { isParseResultElement } from 'apidom';
import path from 'path';

import { parse, resolve } from '../src';

describe('apidom-reference', function () {
  context('parse', function () {
    context('given URI with hash', function () {
      specify('should read & parse the file', async function () {
        const uri = path.join(__dirname, 'fixtures', 'parse', 'sample-openapi-3-1-api.json#hash');
        const options = {
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        };
        const parseResult = await parse(uri, options);

        assert.isTrue(isParseResultElement(parseResult));
      });
    });
  });

  context('resolve', function () {
    context('given URI with hash', function () {
      specify('should resolve the file', async function () {
        const uri = path.join(
          __dirname,
          'fixtures',
          'resolve',
          'external-reference-depth-4',
          'root.json',
        );
        const options = {
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        };
        const refSet = await resolve(uri, options);

        assert.strictEqual(refSet.size, 4);
      });
    });
  });
});
