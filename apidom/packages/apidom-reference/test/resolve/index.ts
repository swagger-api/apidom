import path from 'path';
import { assert } from 'chai';

import { resolve, resolveApiDOM, parse } from '../../src';
import {
  UnmatchedResolverError,
  UnmatchedResolveStrategyError,
  ResolverError,
  ParserError,
} from '../../src/util/errors';
import OpenApiJson3_1Parser from '../../src/parse/parsers/apidom-reference-parser-openapi-json-3-1';

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
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        });

        assert.strictEqual(refSet.size, 2);
      });
    });

    context('resolveApiDOM', function () {
      specify('should resolve an ApiDOM fragment', async function () {
        const fragment = await parse(rootFilePath, {
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
        });
        const refSet = await resolveApiDOM(fragment, {
          resolve: { baseURI: rootFilePath },
        });

        assert.strictEqual(refSet.size, 2);
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
        parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
      });

      assert.strictEqual(refSet.size, 4);
    });
  });

  context('given URI with unknown file extension', function () {
    context('and no matching parsers', function () {
      specify('should throw error', async function () {
        const uri = path.join(__dirname, 'fixtures', 'unknown-extension.ext');

        try {
          await resolve(uri);
          assert.fail('Should throw UnmatchedResolverError');
        } catch (error) {
          assert.instanceOf(error, UnmatchedResolverError);
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
        parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
      };

      try {
        await resolve(uri, options);
        assert.fail('Should throw ResolverError');
      } catch (error) {
        assert.instanceOf(error, ResolverError);
      }
    });
  });

  context("given suitable parser doesn't allow empty files", function () {
    specify('should throw error', async function () {
      const uri = path.join(__dirname, 'fixtures', 'empty-openapi-3-1-api.json');
      const options = {
        parse: {
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
          parsers: [OpenApiJson3_1Parser({ allowEmpty: false })],
        },
      };

      try {
        await resolve(uri, options);
        assert.fail('Should throw ParserError');
      } catch (error) {
        assert.instanceOf(error, ParserError);
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
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
          parsers: [parser],
        },
      };

      try {
        await resolve(uri, options);
        assert.fail('Should throw ParserError');
      } catch (error) {
        assert.instanceOf(error, ParserError);
      }
    });
  });
});
