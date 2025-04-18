import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { NumberElement, isParseResultElement, isSourceMapElement } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-arazzo-yaml-1';
import { fileURLToPath } from 'node:url';

import File from '../../../../src/File.ts';
import ArazzoYAML1Parser from '../../../../src/parse/parsers/arazzo-yaml-1/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('parsers', function () {
  context('new ArazzoYAML1Parser', function () {
    context('canParse', function () {
      context('given file with .yaml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = new File({
              uri: '/path/to/arazzo.yaml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const file2 = new File({
              uri: '/path/to/arazzo.yaml',
              mediaType: mediaTypes.latest('generic'),
            });
            const parser = new ArazzoYAML1Parser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = new File({
              uri: '/path/to/arazzo.yaml',
              mediaType: 'application/vnd.aai.asyncapi;version=2.6.0',
            });
            const parser = new ArazzoYAML1Parser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with .yml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = new File({
              uri: '/path/to/arazzo.yml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const file2 = new File({
              uri: '/path/to/arazzo.yml',
              mediaType: mediaTypes.latest('generic'),
            });
            const parser = new ArazzoYAML1Parser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = new File({
              uri: '/path/to/arazzo.yaml',
              mediaType: 'application/vnd.aai.asyncapi;version=2.6.0',
            });
            const parser = new ArazzoYAML1Parser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/arazzo.txt',
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new ArazzoYAML1Parser({ fileExtensions: ['.yaml', '.yml'] });

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/arazzo',
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new ArazzoYAML1Parser({ fileExtensions: ['.yaml', '.yml'] });

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as Arazzo 1.0.0', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-workflow.yaml');
            const file = new File({
              uri: '/path/to/arazzo.yaml',
              data: fs.readFileSync(url),
            });
            const parser = new ArazzoYAML1Parser({ fileExtensions: ['.yaml', '.yml'] });

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as Arazzo 1.0.0', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-workflow.yaml');
            const file = new File({
              uri: '/path/to/arazzo.yaml',
              data: fs.readFileSync(url).toString(),
            });
            const parser = new ArazzoYAML1Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given Arazzo 1.0.0 YAML data', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-workflow.yaml');
          const data = fs.readFileSync(uri).toString();
          const file = new File({
            uri,
            data,
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new ArazzoYAML1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given Arazzo 1.0.0 YAML data as buffer', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-workflow.yaml');
          const data = fs.readFileSync(uri);
          const file = new File({
            uri,
            data,
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new ArazzoYAML1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given data that is not an Arazzo YAML data', function () {
        specify('should coerce to string and parse', async function () {
          const file = new File({
            uri: '/path/to/file.yaml',
            data: 1 as any,
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new ArazzoYAML1Parser();
          const result = await parser.parse(file);
          const numberElement: NumberElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(numberElement.equals(1));
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = new File({
            uri: '/path/to/file.yaml',
            data: '',
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new ArazzoYAML1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-workflow.yaml');
            const data = fs.readFileSync(uri).toString();
            const file = new File({
              uri,
              data,
              mediaType: mediaTypes.latest('yaml'),
            });
            const parser = new ArazzoYAML1Parser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(isSourceMapElement(parseResult.api?.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-workflow.yaml');
            const data = fs.readFileSync(uri).toString();
            const file = new File({ uri, data });
            const parser = new ArazzoYAML1Parser({ sourceMap: false });
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.api?.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
