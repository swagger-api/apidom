import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { isParseResultElement, isSourceMapElement } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-asyncapi-2';

import File from '../../../../src/util/File';
import AsyncApiYaml2Parser from '../../../../src/parse/parsers/apidom-reference-parser-asyncapi-yaml-2';
import { ParserError } from '../../../../src/util/errors';

describe('parsers', function () {
  context('AsyncApiYaml2Parser', function () {
    context('canParse', function () {
      context('given file with .yaml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', function () {
            const file1 = File({
              uri: '/path/to/asyncapi.yaml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const file2 = File({
              uri: '/path/to/asyncapi.yaml',
              mediaType: mediaTypes.latest(),
            });
            const parser = AsyncApiYaml2Parser();

            assert.isTrue(parser.canParse(file1));
            assert.isTrue(parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', function () {
            const file = File({
              uri: '/path/to/asyncapi.yaml',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = AsyncApiYaml2Parser();

            assert.isFalse(parser.canParse(file));
          });
        });
      });

      context('given file with .yml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', function () {
            const file1 = File({
              uri: '/path/to/asyncapi.yml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const file2 = File({
              uri: '/path/to/asyncapi.yml',
              mediaType: mediaTypes.latest(),
            });
            const parser = AsyncApiYaml2Parser();

            assert.isTrue(parser.canParse(file1));
            assert.isTrue(parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', function () {
            const file = File({
              uri: '/path/to/asyncapi.yaml',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = AsyncApiYaml2Parser();

            assert.isFalse(parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', function () {
          const file = File({
            uri: '/path/to/asyncapi.txt',
            mediaType: mediaTypes.latest(),
          });
          const parser = AsyncApiYaml2Parser();

          assert.isFalse(parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', function () {
          const file = File({
            uri: '/path/to/asyncapi',
            mediaType: mediaTypes.latest(),
          });
          const parser = AsyncApiYaml2Parser();

          assert.isFalse(parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      context('given AsyncApi 2.2.0 YAML data', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'sample-api.yaml');
          const data = fs.readFileSync(url).toString();
          const file = File({ url, data, mediaType: mediaTypes.latest() });
          const parser = AsyncApiYaml2Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given AsyncApi 2.2.0 YAML data as buffer', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'sample-api.yaml');
          const data = fs.readFileSync(url);
          const file = File({ url, data, mediaType: mediaTypes.latest() });
          const parser = AsyncApiYaml2Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given data that is not an AsyncApi 2.2.0 YAML data', function () {
        specify('should throw ParserError', async function () {
          try {
            const file = File({
              uri: '/path/to/file.yaml',
              data: 1,
              mediaType: mediaTypes.latest(),
            });
            const parser = AsyncApiYaml2Parser();
            await parser.parse(file);
            assert.fail('should throw ParserError');
          } catch (error: any) {
            assert.instanceOf(error.cause, TypeError);
            assert.instanceOf(error, ParserError);
            assert.propertyVal(error, 'message', 'Error parsing "/path/to/file.yaml"');
          }
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = File({
            uri: '/path/to/file.yaml',
            data: '',
            mediaType: mediaTypes.latest(),
          });
          const parser = AsyncApiYaml2Parser();
          const parsceResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parsceResult));
          assert.isTrue(parsceResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-api.yaml');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = AsyncApiYaml2Parser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(isSourceMapElement(parseResult.api?.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-api.yaml');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = AsyncApiYaml2Parser({ sourceMap: false });
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.api?.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
