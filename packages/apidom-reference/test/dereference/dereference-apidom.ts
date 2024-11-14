import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { dereferenceApiDOM, parse } from '../../src/index.ts';
import { loadJsonFile } from '../helpers.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereferenceApiDOM', function () {
  const fixturePath = path.join(
    __dirname,
    'strategies',
    'openapi-3-1',
    'reference-object',
    'fixtures',
    'internal-only',
  );
  const rootFilePath = path.join(fixturePath, 'root.json');
  const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

  context('given no baseURI is provided', function () {
    specify('should dereference an ApiDOM fragment using CWD as baseURI', async function () {
      const fragment = await parse(rootFilePath, {
        parse: { mediaType: mediaTypes.latest('json') },
      });
      const actual = await dereferenceApiDOM(fragment);

      assert.deepEqual(toValue(actual), expected);
    });
  });

  context('given fragment is instance of ParseResultElement', function () {
    specify('should dereference an ApiDOM fragment', async function () {
      const fragment = await parse(rootFilePath, {
        parse: { mediaType: mediaTypes.latest('json') },
      });
      const actual = await dereferenceApiDOM(fragment, { resolve: { baseURI: rootFilePath } });

      assert.deepEqual(toValue(actual), expected);
    });
  });

  context("given fragment isn't instance of ParseResultElement", function () {
    specify('should dereference an ApiDOM fragment', async function () {
      const { api } = await parse(rootFilePath, {
        parse: { mediaType: mediaTypes.latest('json') },
      });

      // @ts-ignore
      const actual = await dereferenceApiDOM(api, {
        resolve: { baseURI: rootFilePath },
      });

      assert.deepEqual(toValue(actual), expected[0]);
    });
  });
});
