import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { isParseResultElement } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { parse, resolve, resolveApiDOM } from '../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('apidom-reference', function () {
  context('parse', function () {
    context('given URI with hash', function () {
      specify('should read & parse the file', async function () {
        const uri = path.join(__dirname, 'parse', 'fixtures', 'sample-openapi-3-1-api.json#hash');
        const options = {
          parse: { mediaType: mediaTypes.latest('json') },
        };
        const parseResult = await parse(uri, options);

        assert.isTrue(isParseResultElement(parseResult));
      });
    });
  });

  context('resolve', function () {
    context('given URI with hash', function () {
      specify('should resolve the file', async function () {
        const uri = path.join(__dirname, 'resolve', 'fixtures', 'sample-openapi-3-1-api.json');
        const options = {
          parse: { mediaType: mediaTypes.latest('json') },
        };
        const refSet = await resolve(uri, options);

        assert.strictEqual(refSet.size, 1);
      });
    });
  });

  context('resolveApiDOM', function () {
    context('given ApiDOM data', function () {
      specify('should resolve ApiDOM', async function () {
        const uri = path.join(__dirname, 'resolve', 'fixtures', 'sample-openapi-3-1-api.json');
        const options = {
          parse: { mediaType: mediaTypes.latest('json') },
          resolve: { baseURI: uri },
        };
        const parseResult = await parse(uri, options);
        const refSet = await resolveApiDOM(parseResult, options);

        assert.strictEqual(refSet.size, 1);
      });
    });
  });
});
