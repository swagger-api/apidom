import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { isParseResultElement, isSourceMapElement } from 'apidom';

import File from '../../../src/util/File';
import AsyncApiJson2_0Parser from '../../../src/parsers/apidom-reference-parser-asyncapi-json-2-0';
import { ParserError } from '../../../src/util/errors';

describe('parsers', function () {
  context('AsyncApiJson2_0Parser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        context('and with proper media type', function () {
          specify('should return true', function () {
            const file1 = File({
              uri: '/path/to/asyncapi.json',
              mediaType: 'application/vnd.aai.asyncapi+json;version=2.0.0',
            });
            const file2 = File({
              uri: '/path/to/asyncapi.json',
              mediaType: 'application/vnd.aai.asyncapi;version=2.0.0',
            });
            const parser = AsyncApiJson2_0Parser();

            assert.isTrue(parser.canParse(file1));
            assert.isTrue(parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', function () {
            const file = File({
              uri: '/path/to/asyncapi.json',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = AsyncApiJson2_0Parser();

            assert.isFalse(parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', function () {
          const file = File({
            uri: '/path/to/asyncapi.yaml',
            mediaType: 'application/vnd.aai.asyncapi;version=2.0.0',
          });
          const parser = AsyncApiJson2_0Parser();

          assert.isFalse(parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', function () {
          const file = File({
            uri: '/path/to/asyncapi',
            mediaType: 'application/vnd.aai.asyncapi;version=2.0.0',
          });
          const parser = AsyncApiJson2_0Parser();

          assert.isFalse(parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      context('given AsyncApi 2.0.x JSON data', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'sample-api.json');
          const data = fs.readFileSync(url).toString();
          const file = File({
            url,
            data,
            mediaType: 'application/vnd.aai.asyncapi+json;version=2.0.0',
          });
          const parser = AsyncApiJson2_0Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given AsyncApi 2.0.x JSON data as buffer', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'sample-api.json');
          const data = fs.readFileSync(url);
          const file = File({
            url,
            data,
            mediaType: 'application/vnd.aai.asyncapi+json;version=2.0.0',
          });
          const parser = AsyncApiJson2_0Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given data that is not an AsyncApi 2.0.x JSON data', function () {
        specify('should throw ParserError', async function () {
          try {
            const file = File({
              uri: '/path/to/file.json',
              data: 1,
              mediaType: 'application/vnd.aai.asyncapi;version=2.0.0',
            });
            const parser = AsyncApiJson2_0Parser();
            await parser.parse(file);
            assert.fail('should throw ParserError');
          } catch (e) {
            assert.instanceOf(e.cause, TypeError);
            assert.instanceOf(e, ParserError);
            assert.propertyVal(e, 'message', 'Error parsing "/path/to/file.json"');
          }
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = File({
            uri: '/path/to/file.json',
            data: '',
            mediaType: 'application/vnd.aai.asyncapi;version=2.0.0',
          });
          const parser = AsyncApiJson2_0Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-api.json');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: 'application/vnd.aai.asyncapi;version=2.0.0',
            });
            const parser = AsyncApiJson2_0Parser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(isSourceMapElement(parseResult.api?.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-api.json');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: 'application/vnd.aai.asyncapi;version=2.0.0',
            });
            const parser = AsyncApiJson2_0Parser({ sourceMap: false });
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
