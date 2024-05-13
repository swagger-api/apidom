import { Buffer } from 'node:buffer';
import path from 'node:path';
import { assert } from 'chai';
import { isParseResultElement, toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import defaultOptions from '../../src/options';
import { merge as mergeOptions } from '../../src/options/util';
import parse from '../../src/parse';
import ParseError from '../../src/errors/ParseError';
import ResolveError from '../../src/errors/ResolveError';
import UnmatchedResolverError from '../../src/errors/UnmatchedResolverError';
import OpenAPIJSON3_1Parser from '../../src/parse/parsers/openapi-json-3-1';

describe('parse', function () {
  context('given URI with hash', function () {
    specify('should read & parse the file', async function () {
      const uri = path.join(__dirname, 'fixtures', 'sample-openapi-3-1-api.json#hash');
      const options = mergeOptions(defaultOptions, {
        parse: { mediaType: mediaTypes.latest('json') },
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
          mediaType: mediaTypes.latest('json'),
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
          mediaType: mediaTypes.latest('json'),
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
        const actual = Buffer.from(toValue(result), 'base64').toString('utf8');

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
        parse: { mediaType: mediaTypes.latest('json') },
      });

      try {
        await parse(uri, options);
        assert.fail('Should throw ResolveError');
      } catch (error) {
        assert.instanceOf(error, ResolveError);
      }
    });
  });

  context("given suitable parser doesn't allow empty files", function () {
    specify('should throw error', async function () {
      const uri = path.join(__dirname, 'fixtures', 'empty-openapi-3-1-api.json');
      const options = mergeOptions(defaultOptions, {
        parse: {
          mediaType: mediaTypes.latest('json'),
          parsers: [new OpenAPIJSON3_1Parser({ allowEmpty: false })],
        },
      });

      try {
        await parse(uri, options);
        assert.fail('Should throw ParserError');
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
      const options = mergeOptions(defaultOptions, {
        parse: {
          mediaType: mediaTypes.latest('json'),
          parsers: [parser],
        },
      });

      try {
        await parse(uri, options);
        assert.fail('Should throw ParseError');
      } catch (error) {
        assert.instanceOf(error, ParseError);
      }
    });
  });
});
