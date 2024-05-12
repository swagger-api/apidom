import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { resolve, resolveApiDOM, parse } from '../../src';
import FileResolver from '../../src/resolve/resolvers/file/index-node';
import UnmatchedResolveStrategyError from '../../src/errors/UnmatchedResolveStrategyError';
import ResolveError from '../../src/errors/ResolveError';
import ParseError from '../../src/errors/ParseError';
import OpenApiJson3_1Parser from '../../src/parse/parsers/openapi-json-3-1';

const fixturePath = path.join(
  __dirname,
  'strategies',
  'openapi-3-1',
  'reference-object',
  'fixtures',
  'internal-external',
);

describe('resolve', function () {
  const rootFilePath = path.join(fixturePath, 'root.json');

  context('should export functions', function () {
    context('resolve', function () {
      specify('should resolve a file', async function () {
        const refSet = await resolve(rootFilePath, {
          parse: { mediaType: mediaTypes.latest('json') },
        });

        assert.strictEqual(refSet.size, 2);
      });
    });

    context('resolveApiDOM', function () {
      context('given fragment is instance of ParseResultElement', function () {
        specify('should resolve an ApiDOM fragment', async function () {
          const fragment = await parse(rootFilePath, {
            parse: { mediaType: mediaTypes.latest('json') },
          });
          const refSet = await resolveApiDOM(fragment, {
            resolve: { baseURI: rootFilePath },
          });

          assert.strictEqual(refSet.size, 2);
        });
      });

      context("given fragment isn't instance of ParseResultElement", function () {
        specify('should resolve an ApiDOM fragment', async function () {
          const { api } = await parse(rootFilePath, {
            parse: { mediaType: mediaTypes.latest('json') },
          });
          // @ts-ignore
          const refSet = await resolveApiDOM(api, {
            resolve: { baseURI: rootFilePath },
          });

          assert.strictEqual(refSet.size, 2);
        });
      });
    });
  });

  context('given URI with hash', function () {
    specify('should resolve the file', async function () {
      const uri = path.join(
        __dirname,
        'strategies',
        'openapi-3-1',
        'reference-object',
        'fixtures',
        'external-indirections',
        'root.json',
      );
      const refSet = await resolve(uri, {
        parse: { mediaType: mediaTypes.latest('json') },
      });

      assert.strictEqual(refSet.size, 4);
    });
  });

  context('given URI with unknown file extension', function () {
    context('and matching binary parser', function () {
      specify('should throw error', async function () {
        const uri = path.join(__dirname, 'fixtures', 'unknown-extension.ext');

        try {
          await resolve(uri);
          assert.fail('Should throw UnmatchedResolveStrategyError');
        } catch (error) {
          assert.instanceOf(error, UnmatchedResolveStrategyError);
        }
      });
    });
  });

  context('given URI with unknown media type', function () {
    context('and no matching resolve strategies', function () {
      specify('should throw error', async function () {
        const uri = path.join(
          __dirname,
          'strategies',
          'openapi-3-1',
          'reference-object',
          'fixtures',
          'external-indirections',
          'root.json',
        );
        const options = {
          resolve: {
            strategies: [],
          },
        };

        try {
          await resolve(uri, options);
          assert.fail('Should throw UnmatchedResolveStrategyError');
        } catch (error) {
          assert.instanceOf(error, UnmatchedResolveStrategyError);
        }
      });
    });
  });

  context('given URI with non existing file', function () {
    specify('should throw error', async function () {
      const uri = '/path/to/non-existing-file.json';
      const options = {
        parse: { mediaType: mediaTypes.latest('json') },
      };

      try {
        await resolve(uri, options);
        assert.fail('Should throw ResolveError');
      } catch (error) {
        assert.instanceOf(error, ResolveError);
      }
    });
  });

  context('given file allow list is provided as resolver option', function () {
    specify('should resolve the file', async function () {
      const uri = path.join(
        __dirname,
        'strategies',
        'openapi-3-1',
        'reference-object',
        'fixtures',
        'external-indirections',
        'root.json',
      );
      const refSet = await resolve(uri, {
        parse: { mediaType: mediaTypes.latest('json') },
        resolve: {
          resolvers: [new FileResolver()],
          resolverOpts: {
            fileAllowList: ['*'],
          },
        },
      });

      assert.strictEqual(refSet.size, 4);
    });
  });

  context("given suitable parser doesn't allow empty files", function () {
    specify('should throw error', async function () {
      const uri = path.join(__dirname, 'fixtures', 'empty-openapi-3-1-api.json');
      const options = {
        parse: {
          mediaType: mediaTypes.latest('json'),
          parsers: [OpenApiJson3_1Parser({ allowEmpty: false })],
        },
      };

      try {
        await resolve(uri, options);
        assert.fail('Should throw ParseError');
      } catch (error: any) {
        assert.instanceOf(error, ParseError);
        assert.match(error.message, /File is empty\.$/);
      }
    });
  });

  context('given parser plugin throws error', function () {
    const parser = {
      allowEmpty: true,
      sourceMaps: false,
      canParse() {
        return true;
      },
      parse() {
        throw Error('I will not parse anything!');
      },
    };

    specify('should throw error', async function () {
      const uri = path.join(__dirname, 'fixtures', 'sample-openapi-3-1-api.json');
      const options = {
        parse: {
          mediaType: mediaTypes.latest('json'),
          parsers: [parser],
        },
      };

      try {
        await resolve(uri, options);
        assert.fail('Should throw ParseError');
      } catch (error) {
        assert.instanceOf(error, ParseError);
      }
    });
  });
});
