import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { NumberElement, isParseResultElement, hasElementSourceMap } from '@swagger-api/apidom-core';
import { isJSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-json-schema-json-2020-12';
import { fileURLToPath } from 'node:url';

import File from '../../../../src/File.ts';
import JSONSchemaJSON2020_12Parser from '../../../../src/parse/parsers/json-schema-json-2020-12/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('parsers', function () {
  context('JSONSchemaJSON2020_12Parser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = new File({
              uri: '/path/to/schema.json',
              mediaType: mediaTypes.latest('json'),
            });
            const file2 = new File({
              uri: '/path/to/schema.json',
              mediaType: mediaTypes.latest(),
            });
            const file3 = new File({
              uri: '/path/to/schema.json',
              mediaType: mediaTypes.findBy('2020-12', 'json'),
            });
            const parser = new JSONSchemaJSON2020_12Parser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
            assert.isTrue(await parser.canParse(file3));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = new File({
              uri: '/path/to/schema.json',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = new JSONSchemaJSON2020_12Parser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/schema.yaml',
            mediaType: mediaTypes.latest(),
          });
          const parser = new JSONSchemaJSON2020_12Parser({ fileExtensions: ['.json'] });

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/schema',
            mediaType: mediaTypes.latest(),
          });
          const parser = new JSONSchemaJSON2020_12Parser({ fileExtensions: ['.json'] });

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as JSON Schema 2020-12', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-schema.json');
            const file = new File({
              uri: '/path/to/schema.json',
              data: fs.readFileSync(url),
            });
            const parser = new JSONSchemaJSON2020_12Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as JSON Schema 2020-12', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-schema.json');
            const file = new File({
              uri: '/path/to/schema.json',
              data: fs.readFileSync(url).toString(),
            });
            const parser = new JSONSchemaJSON2020_12Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });

      context('given content detection is disabled', function () {
        context('and file data can be detected as JSON Schema 2020-12', function () {
          specify('should return false', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-schema.json');
            const file = new File({
              uri: '/path/to/schema.json',
              data: fs.readFileSync(url),
            });
            const parser = new JSONSchemaJSON2020_12Parser({ detectContent: false });

            assert.isFalse(await parser.canParse(file));
          });
        });

        context('and with proper media type', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-schema.json');
            const file = new File({
              uri: '/path/to/schema.json',
              data: fs.readFileSync(url),
              mediaType: mediaTypes.latest('json'),
            });
            const parser = new JSONSchemaJSON2020_12Parser({ detectContent: false });

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given JSON Schema 2020-12 JSON data', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-schema.json');
          const data = fs.readFileSync(uri).toString();
          const file = new File({
            uri,
            data,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = new JSONSchemaJSON2020_12Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(isJSONSchemaElement(parseResult.result));
        });
      });

      context('given JSON Schema 2020-12 JSON data as buffer', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-schema.json');
          const data = fs.readFileSync(uri);
          const file = new File({
            uri,
            data,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = new JSONSchemaJSON2020_12Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(isJSONSchemaElement(parseResult.result));
        });
      });

      context('given data that is not a JSON Schema 2020-12 JSON data', function () {
        specify('should coerce to string and parse', async function () {
          const file = new File({
            uri: '/path/to/file.json',
            data: 1 as any,
            mediaType: mediaTypes.latest(),
          });
          const parser = new JSONSchemaJSON2020_12Parser();
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
            mediaType: mediaTypes.latest(),
          });
          const parser = new JSONSchemaJSON2020_12Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-schema.json');
            const data = fs.readFileSync(uri).toString();
            const file = new File({
              uri,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = new JSONSchemaJSON2020_12Parser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(hasElementSourceMap(parseResult.result));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-schema.json');
            const data = fs.readFileSync(uri).toString();
            const file = new File({
              uri,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = new JSONSchemaJSON2020_12Parser({ sourceMap: false });
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
