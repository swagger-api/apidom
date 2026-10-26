import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { NumberElement, isParseResultElement, hasElementSourceMap } from '@swagger-api/apidom-core';
import { isJSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-json-schema-yaml-2020-12';
import { fileURLToPath } from 'node:url';

import File from '../../../../src/File.ts';
import JSONSchemaYAML2020_12Parser from '../../../../src/parse/parsers/json-schema-yaml-2020-12/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('parsers', function () {
  context('JSONSchemaYAML2020_12Parser', function () {
    context('canParse', function () {
      context('given file with .yaml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = new File({
              uri: '/path/to/schema.yaml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const file2 = new File({
              uri: '/path/to/schema.yaml',
              mediaType: mediaTypes.latest(),
            });
            const file3 = new File({
              uri: '/path/to/schema.yaml',
              mediaType: mediaTypes.findBy('2020-12', 'yaml'),
            });
            const parser = new JSONSchemaYAML2020_12Parser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
            assert.isTrue(await parser.canParse(file3));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = new File({
              uri: '/path/to/schema.yaml',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = new JSONSchemaYAML2020_12Parser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with .yml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = new File({
              uri: '/path/to/schema.yml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const file2 = new File({
              uri: '/path/to/schema.yml',
              mediaType: mediaTypes.latest(),
            });
            const parser = new JSONSchemaYAML2020_12Parser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = new File({
              uri: '/path/to/schema.yml',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = new JSONSchemaYAML2020_12Parser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/schema.txt',
            mediaType: mediaTypes.latest(),
          });
          const parser = new JSONSchemaYAML2020_12Parser({ fileExtensions: ['.yaml', '.yml'] });

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/schema',
            mediaType: mediaTypes.latest(),
          });
          const parser = new JSONSchemaYAML2020_12Parser({ fileExtensions: ['.yaml', '.yml'] });

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as JSON Schema 2020-12', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-schema.yaml');
            const file = new File({
              uri: '/path/to/schema.yaml',
              data: fs.readFileSync(url),
            });
            const parser = new JSONSchemaYAML2020_12Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as JSON Schema 2020-12', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-schema.yaml');
            const file = new File({
              uri: '/path/to/schema.yaml',
              data: fs.readFileSync(url).toString(),
            });
            const parser = new JSONSchemaYAML2020_12Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });

      context('given content detection is disabled', function () {
        context('and file data can be detected as JSON Schema 2020-12', function () {
          specify('should return false', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-schema.yaml');
            const file = new File({
              uri: '/path/to/schema.yaml',
              data: fs.readFileSync(url),
            });
            const parser = new JSONSchemaYAML2020_12Parser({ detectContent: false });

            assert.isFalse(await parser.canParse(file));
          });
        });

        context('and with proper media type', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-schema.yaml');
            const file = new File({
              uri: '/path/to/schema.yaml',
              data: fs.readFileSync(url),
              mediaType: mediaTypes.latest('yaml'),
            });
            const parser = new JSONSchemaYAML2020_12Parser({ detectContent: false });

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given JSON Schema 2020-12 YAML data', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-schema.yaml');
          const data = fs.readFileSync(uri).toString();
          const file = new File({
            uri,
            data,
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new JSONSchemaYAML2020_12Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(isJSONSchemaElement(parseResult.result));
        });
      });

      context('given JSON Schema 2020-12 YAML data as buffer', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-schema.yaml');
          const data = fs.readFileSync(uri);
          const file = new File({
            uri,
            data,
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new JSONSchemaYAML2020_12Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(isJSONSchemaElement(parseResult.result));
        });
      });

      context('given data that is not a JSON Schema 2020-12 YAML data', function () {
        specify('should coerce to string and parse', async function () {
          const file = new File({
            uri: '/path/to/file.yaml',
            data: 1 as any,
            mediaType: mediaTypes.latest(),
          });
          const parser = new JSONSchemaYAML2020_12Parser();
          const parseResult = await parser.parse(file);
          const numberElement: NumberElement = parseResult.get(0);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(numberElement.equals(1));
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = new File({
            uri: '/path/to/file.yaml',
            data: '',
            mediaType: mediaTypes.latest(),
          });
          const parser = new JSONSchemaYAML2020_12Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-schema.yaml');
            const data = fs.readFileSync(uri).toString();
            const file = new File({
              uri,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = new JSONSchemaYAML2020_12Parser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(hasElementSourceMap(parseResult.result));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-schema.yaml');
            const data = fs.readFileSync(uri).toString();
            const file = new File({
              uri,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = new JSONSchemaYAML2020_12Parser({ sourceMap: false });
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
