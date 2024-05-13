import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { NumberElement, isParseResultElement, isSourceMapElement } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-2';

import File from '../../../../src/File';
import OpenAPIJSON2Parser from '../../../../src/parse/parsers/openapi-json-2';

describe('parsers', function () {
  context('OpenAPIJSON2Parser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = new File({
              uri: '/path/to/openapi.json',
              mediaType: mediaTypes.latest('generic'),
            });
            const file2 = new File({
              uri: '/path/to/openapi.json',
              mediaType: mediaTypes.latest('json'),
            });
            const parser = new OpenAPIJSON2Parser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = new File({
              uri: '/path/to/openapi.json',
              mediaType: 'application/vnd.aai.asyncapi+json;version=2.6.0',
            });
            const parser = new OpenAPIJSON2Parser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/openapi.yaml',
            mediaType: mediaTypes.latest('json'),
          });
          const parser = new OpenAPIJSON2Parser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/openapi',
            mediaType: mediaTypes.latest('json'),
          });
          const parser = new OpenAPIJSON2Parser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as OpenAPI 2.0', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-api.json');
            const file = new File({
              uri: '/path/to/open-api.json',
              data: fs.readFileSync(url),
            });
            const parser = new OpenAPIJSON2Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as OpenAPI 2.0', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-api.json');
            const file = new File({
              uri: '/path/to/open-api.json',
              data: fs.readFileSync(url).toString(),
            });
            const parser = new OpenAPIJSON2Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given OpenApi 2.0 JSON data', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-api.json');
          const data = fs.readFileSync(uri).toString();
          const file = new File({
            uri,
            data,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = new OpenAPIJSON2Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given OpenApi 2.0 JSON data as buffer', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-api.json');
          const data = fs.readFileSync(uri);
          const file = new File({
            uri,
            data,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = new OpenAPIJSON2Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given data that is not an OpenApi 2.0 JSON data', function () {
        specify('should coerce to string and parse', async function () {
          const file = new File({
            uri: '/path/to/file.json',
            data: 1 as any,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = new OpenAPIJSON2Parser();
          const parseResult = await parser.parse(file);
          const numberElement: NumberElement = parseResult.get(0);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(numberElement.equals(1));
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = new File({
            uri: '/path/to/file.json',
            data: '',
            mediaType: mediaTypes.latest('json'),
          });
          const parser = new OpenAPIJSON2Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-api.json');
            const data = fs.readFileSync(uri).toString();
            const file = new File({
              uri,
              data,
              mediaType: mediaTypes.latest('json'),
            });
            const parser = new OpenAPIJSON2Parser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(isSourceMapElement(parseResult.api?.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-api.json');
            const data = fs.readFileSync(uri).toString();
            const file = new File({
              uri,
              data,
              mediaType: mediaTypes.latest('json'),
            });
            const parser = new OpenAPIJSON2Parser();
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.api?.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
