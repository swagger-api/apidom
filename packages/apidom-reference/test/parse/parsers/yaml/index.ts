import { Buffer } from 'node:buffer';
import { assert } from 'chai';
import {
  ObjectElement,
  NumberElement,
  isParseResultElement,
  isSourceMapElement,
} from '@swagger-api/apidom-core';

import File from '../../../../src/File';
import YamlParser from '../../../../src/parse/parsers/yaml-1-2';

describe('parsers', function () {
  context('YamlParser', function () {
    context('canParse', function () {
      context('given file with .yaml extension', function () {
        specify('should return true', async function () {
          const file = new File({ uri: '/path/to/file.yaml', data: 'key: value' });
          const parser = YamlParser();

          assert.isTrue(await parser.canParse(file));
        });
      });

      context('given file with .yml extension', function () {
        specify('should return true', async function () {
          const file = new File({ uri: '/path/to/file.yml', data: 'key: value' });
          const parser = YamlParser();

          assert.isTrue(await parser.canParse(file));
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = new File({ uri: '/path/to/file.txt' });
          const parser = YamlParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = new File({ uri: '/path/to/file' });
          const parser = YamlParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as YAML 1.2', function () {
          specify('should return true', async function () {
            const file = new File({
              uri: '/path/to/yaml.yaml',
              data: Buffer.from('key: value'),
            });
            const parser = YamlParser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as YAML 1.2', function () {
          specify('should return true', async function () {
            const file = new File({
              uri: '/path/to/yaml.yaml',
              data: 'key: value',
            });
            const parser = YamlParser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given generic YAML data', function () {
        specify('should return parse result', async function () {
          const file = new File({ uri: '/path/to/file.yaml', data: 'prop: val' });
          const parser = YamlParser();
          const result = await parser.parse(file);
          const objElement: ObjectElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(objElement.get('prop').equals('val'));
        });
      });

      context('given generic YAML data as buffer', function () {
        specify('should return parse result', async function () {
          const file = new File({ uri: '/path/to/file.yaml', data: Buffer.from('prop: val') });
          const parser = YamlParser();
          const result = await parser.parse(file);
          const objElement: ObjectElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(objElement.get('prop').equals('val'));
        });
      });

      context('given data that is not a generic YAML data', function () {
        specify('should coerce to string and parse', async function () {
          const file = new File({ uri: '/path/to/file.yaml', data: 1 as any });
          const parser = YamlParser();
          const result = await parser.parse(file);
          const numberElement: NumberElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(numberElement.equals(1));
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = new File({ uri: '/path/to/file.yaml', data: '' });
          const parser = YamlParser();
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(result.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const file = new File({ uri: '/path/to/file.yaml', data: 'prop: val' });
            const parser = YamlParser({ sourceMap: true });
            const result = await parser.parse(file);
            const objElement: ObjectElement = result.get(0);

            assert.isTrue(isSourceMapElement(objElement.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const file = new File({ uri: '/path/to/file.yaml', data: 'prop: val' });
            const parser = YamlParser({ sourceMap: false });
            const result = await parser.parse(file);
            const objElement: ObjectElement = result.get(0);

            assert.isUndefined(objElement.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
