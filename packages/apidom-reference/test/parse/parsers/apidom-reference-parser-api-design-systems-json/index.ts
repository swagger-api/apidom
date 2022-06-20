import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { isParseResultElement, isSourceMapElement } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-api-design-systems-json';

import File from '../../../../src/util/File';
import ApiDesignSystemsJsonParser from '../../../../src/parse/parsers/apidom-reference-parser-api-design-systems-json';
import { ParserError } from '../../../../src/util/errors';

describe('parsers', function () {
  context('ApiDesignSystemsJsonParser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = File({
              uri: '/path/to/api-design-systems.json',
              mediaType: mediaTypes.latest('json'),
              data: '{"version": "2021-05-07"}',
            });
            const file2 = File({
              uri: '/path/to/api-design-systems.json',
              mediaType: mediaTypes.latest(),
              data: '{"version": "2021-05-07"}',
            });
            const parser = ApiDesignSystemsJsonParser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = File({
              uri: '/path/to/api-design-systems.json',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = ApiDesignSystemsJsonParser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = File({
            uri: '/path/to/api-design-systems.yaml',
            mediaType: mediaTypes.latest(),
          });
          const parser = ApiDesignSystemsJsonParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = File({
            uri: '/path/to/api-design-systems',
            mediaType: mediaTypes.latest(),
          });
          const parser = ApiDesignSystemsJsonParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as API Design Systems', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'api-design-systems.json');
            const file = File({
              uri: '/path/to/api-design-systems.json',
              data: fs.readFileSync(url),
            });
            const parser = ApiDesignSystemsJsonParser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as API Design Systems', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'api-design-systems.json');
            const file = File({
              uri: '/path/to/api-design-systems.json',
              data: fs.readFileSync(url).toString(),
            });
            const parser = ApiDesignSystemsJsonParser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given API Design Systems JSON data', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'api-design-systems.json');
          const data = fs.readFileSync(url).toString();
          const file = File({
            url,
            data,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = ApiDesignSystemsJsonParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given API Design Systems JSON data as buffer', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'api-design-systems.json');
          const data = fs.readFileSync(url);
          const file = File({
            url,
            data,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = ApiDesignSystemsJsonParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given data that is not an API Design Systems JSON data', function () {
        specify('should throw ParserError', async function () {
          try {
            const file = File({
              uri: '/path/to/file.json',
              data: 1,
              mediaType: mediaTypes.latest(),
            });
            const parser = ApiDesignSystemsJsonParser();
            await parser.parse(file);
            assert.fail('should throw ParserError');
          } catch (error: any) {
            assert.instanceOf(error.cause, TypeError);
            assert.instanceOf(error, ParserError);
            assert.propertyVal(error, 'message', 'Error parsing "/path/to/file.json"');
          }
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = File({
            uri: '/path/to/file.json',
            data: '',
            mediaType: mediaTypes.latest(),
          });
          const parser = ApiDesignSystemsJsonParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'api-design-systems.json');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = ApiDesignSystemsJsonParser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(isSourceMapElement(parseResult.result?.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'api-design-systems.json');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = ApiDesignSystemsJsonParser({ sourceMap: false });
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
