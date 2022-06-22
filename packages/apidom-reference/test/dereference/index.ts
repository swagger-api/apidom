import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { dereference, dereferenceApiDOM, parse } from '../../src';
import { loadJsonFile } from '../helpers';

describe('dereference', function () {
  context('should export functions', function () {
    let fixturePath = path.join(
      __dirname,
      'strategies',
      'openapi-3-1',
      'reference-object',
      'fixtures',
      'internal-external',
    );
    let rootFilePath = path.join(fixturePath, 'root.json');
    let expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

    context('dereference', function () {
      specify('should dereference a file', async function () {
        const actual = await dereference(rootFilePath, {
          parse: { mediaType: mediaTypes.latest('json') },
        });

        assert.deepEqual(toValue(actual), expected);
      });
    });

    context('dereferenceApiDOM', function () {
      context('given no baseURI is provided', function () {
        fixturePath = path.join(
          __dirname,
          'strategies',
          'openapi-3-1',
          'reference-object',
          'fixtures',
          'internal-only',
        );
        rootFilePath = path.join(fixturePath, 'root.json');
        expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

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
  });
});
