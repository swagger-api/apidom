import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { NumberElement, isParseResultElement, isSourceMapElement } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-api-design-systems-yaml';

import File from '../../../../src/util/File';
import ApiDesignSystemsYamlParser from '../../../../src/parse/parsers/apidom-reference-parser-api-design-systems-yaml';

describe('parsers', function () {
  context('ApiDesignSystemsYamlParser', function () {
    context('canParse', function () {
      context('given file with .yaml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = File({
              uri: '/path/to/api-design-systems.yaml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const file2 = File({
              uri: '/path/to/api-design-systems.yaml',
              mediaType: mediaTypes.latest(),
            });
            const parser = ApiDesignSystemsYamlParser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = File({
              uri: '/path/to/api-design-systems.yaml',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = ApiDesignSystemsYamlParser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with .yml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = File({
              uri: '/path/to/api-design-systems.yml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const file2 = File({
              uri: '/path/to/api-design-systems.yml',
              mediaType: mediaTypes.latest(),
            });
            const parser = ApiDesignSystemsYamlParser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = File({
              uri: '/path/to/api-design-systems.yaml',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });
            const parser = ApiDesignSystemsYamlParser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = File({
            uri: '/path/to/api-design-systems.txt',
            mediaType: mediaTypes.latest(),
          });
          const parser = ApiDesignSystemsYamlParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = File({
            uri: '/path/to/api-design-systems',
            mediaType: mediaTypes.latest(),
          });
          const parser = ApiDesignSystemsYamlParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as API Design Systems', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'api-design-systems.yaml');
            const file = File({
              uri: '/path/to/api-design-systems.yaml',
              data: fs.readFileSync(url),
            });
            const parser = ApiDesignSystemsYamlParser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as API Design Systems', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'api-design-systems.yaml');
            const file = File({
              uri: '/path/to/api-design-systems.yaml',
              data: fs.readFileSync(url).toString(),
            });
            const parser = ApiDesignSystemsYamlParser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given API Design Systems YAML data', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'api-design-systems.yaml');
          const data = fs.readFileSync(url).toString();
          const file = File({ url, data, mediaType: mediaTypes.latest() });
          const parser = ApiDesignSystemsYamlParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given API Design Systems YAML data as buffer', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'api-design-systems.yaml');
          const data = fs.readFileSync(url);
          const file = File({ url, data, mediaType: mediaTypes.latest() });
          const parser = ApiDesignSystemsYamlParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given data that is not an API Design Systems YAML data', function () {
        specify('should coerce to string and parse', async function () {
          const file = File({
            uri: '/path/to/file.yaml',
            data: 1,
            mediaType: mediaTypes.latest(),
          });
          const parser = ApiDesignSystemsYamlParser();
          const parseResult = await parser.parse(file);
          const numberElement: NumberElement = parseResult.get(0);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(numberElement.equals(1));
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = File({
            uri: '/path/to/file.yaml',
            data: '',
            mediaType: mediaTypes.latest(),
          });
          const parser = ApiDesignSystemsYamlParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'api-design-systems.yaml');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = ApiDesignSystemsYamlParser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(isSourceMapElement(parseResult.result?.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'api-design-systems.yaml');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: mediaTypes.latest(),
            });
            const parser = ApiDesignSystemsYamlParser({ sourceMap: false });
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.result?.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
