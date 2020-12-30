import { assert } from 'chai';
import path from 'path';

import defaultOptions from '../src/options';
import { merge as mergeOptions } from '../src/options/util';
import resolve from '../src/resolve';
import {
  ParserError,
  ResolverError,
  UnmatchedResolverError,
  UnmatchedResolveStrategyError,
} from '../src/util/errors';
import OpenApiJson3_1Parser from '../src/parsers/apidom-reference-parser-openapi-json-3-1';

describe('resolve', function () {
  context('given URI with hash', function () {
    specify('should resolve the file', async function () {
      const uri = path.join(
        __dirname,
        'fixtures',
        'resolve',
        'external-reference-depth-4',
        'root.json',
      );
      const options = mergeOptions(defaultOptions, {
        parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
      });
      const refSet = await resolve(uri, options);

      assert.strictEqual(refSet.size, 4);
    });
  });

  context('given URI with unknown file extension', function () {
    context('and no matching parsers', function () {
      specify('should throw error', async function () {
        const uri = path.join(__dirname, 'fixtures', 'resolve', 'unknown-extension.ext');

        try {
          await resolve(uri, defaultOptions);
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
          'fixtures',
          'resolve',
          'external-reference-depth-4',
          'root.json',
        );
        const options = mergeOptions(defaultOptions, {
          resolve: {
            strategies: [],
          },
        });

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
      const options = mergeOptions(defaultOptions, {
        parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
      });

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
      const uri = path.join(__dirname, 'fixtures', 'resolve', 'empty-openapi-3-1-api.json');
      const options = mergeOptions(defaultOptions, {
        parse: {
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
          parsers: [OpenApiJson3_1Parser({ allowEmpty: false })],
        },
      });

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
      const uri = path.join(__dirname, 'fixtures', 'resolve', 'sample-openapi-3-1-api.json');
      const options = mergeOptions(defaultOptions, {
        parse: {
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
          parsers: [parser],
        },
      });

      try {
        await resolve(uri, options);
        assert.fail('Should throw ParserError');
      } catch (error) {
        assert.instanceOf(error, ParserError);
      }
    });
  });
});
