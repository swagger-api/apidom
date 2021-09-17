import { assert } from 'chai';
import path from 'path';
import { isParseResultElement } from 'apidom';

import defaultOptions from '../../src/options';
import { merge as mergeOptions } from '../../src/options/util';
import parse from '../../src/parse';
import { ParserError, ResolverError, UnmatchedResolverError } from '../../src/util/errors';
import OpenApiJson3_1Parser from '../../src/parse/parsers/apidom-reference-parser-openapi-json-3-1';

describe('parse', function () {
  context('given URI with hash', function () {
    specify('should read & parse the file', async function () {
      const uri = path.join(__dirname, 'fixtures', 'sample-openapi-3-1-api.json#hash');
      const options = mergeOptions(defaultOptions, {
        parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
      });
      const parseResult = await parse(uri, options);

      assert.isTrue(isParseResultElement(parseResult));
    });
  });

  context('given parserOpts as provided', function () {
    specify('should respect parserOpts during parsing; sourceMap = on', async function () {
      const uri = path.join(__dirname, 'fixtures', 'sample-openapi-3-1-api.json#hash');
      const options = mergeOptions(defaultOptions, {
        parse: {
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
          parserOpts: { sourceMap: true },
        },
      });
      const parseResult = await parse(uri, options);
      const { api } = parseResult;

      assert.isTrue(api?.meta.hasKey('sourceMap'));
    });

    specify('should respect parserOpts during parsing; sourceMap = off', async function () {
      const uri = path.join(__dirname, 'fixtures', 'sample-openapi-3-1-api.json#hash');
      const options = mergeOptions(defaultOptions, {
        parse: {
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
          parserOpts: { sourceMap: false },
        },
      });
      const parseResult = await parse(uri, options);
      const { api } = parseResult;

      assert.isFalse(api?.meta.hasKey('sourceMap'));
    });
  });

  context('given URI with unknown file extension', function () {
    context('and matching binary parser', function () {
      specify('should read & parse the file', async function () {
        const uri = path.join(__dirname, 'fixtures', 'unknown-extension.ext');
        const parseResult = await parse(uri, defaultOptions);
        const { result } = parseResult;
        const actual = Buffer.from(result?.toValue(), 'base64').toString('utf8');

        assert.strictEqual(actual, 'possibly binary content\n');
      });
    });
  });

  context('given URI with no matching parser', function () {
    specify('should throw error', async function () {
      const uri = path.join(__dirname, 'fixtures', 'unknown-extension.ext');
      const options = mergeOptions(defaultOptions, {
        parse: {
          parsers: [],
        },
      });

      try {
        await parse(uri, options);
        assert.fail('Should throw UnmatchedResolverError');
      } catch (error) {
        assert.instanceOf(error, UnmatchedResolverError);
      }
    });
  });

  context('given URI with non existing file', function () {
    specify('should throw error', async function () {
      const uri = '/path/to/non-existing-file.json';
      const options = mergeOptions(defaultOptions, {
        parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
      });

      try {
        await parse(uri, options);
        assert.fail('Should throw ResolverError');
      } catch (error) {
        assert.instanceOf(error, ResolverError);
      }
    });
  });

  context("given suitable parser doesn't allow empty files", function () {
    specify('should throw error', async function () {
      const uri = path.join(__dirname, 'fixtures', 'empty-openapi-3-1-api.json');
      const options = mergeOptions(defaultOptions, {
        parse: {
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
          parsers: [OpenApiJson3_1Parser({ allowEmpty: false })],
        },
      });

      try {
        await parse(uri, options);
        assert.fail('Should throw ParserError');
      } catch (error: any) {
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
      const options = mergeOptions(defaultOptions, {
        parse: {
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
          parsers: [parser],
        },
      });

      try {
        await parse(uri, options);
        assert.fail('Should throw ParserError');
      } catch (error) {
        assert.instanceOf(error, ParserError);
      }
    });
  });
});
