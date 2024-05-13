import { Buffer } from 'node:buffer';
import { assert } from 'chai';
import {
  NumberElement,
  ObjectElement,
  isParseResultElement,
  isSourceMapElement,
} from '@swagger-api/apidom-core';

import File from '../../../../src/File';
import JSONParser from '../../../../src/parse/parsers/json';

describe('parsers', function () {
  context('JSONParser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        specify('should return true', async function () {
          const file = new File({ uri: '/path/to/file.json', data: '{"a":"b"}' });
          const parser = new JSONParser();

          assert.isTrue(await parser.canParse(file));
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = new File({ uri: '/path/to/file.yaml' });
          const parser = new JSONParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = new File({ uri: '/path/to/file' });
          const parser = new JSONParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as JSON', function () {
          specify('should return true', async function () {
            const file = new File({
              uri: '/path/to/json-file.json',
              data: Buffer.from('{"a":"b"}'),
            });
            const parser = new JSONParser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as JSON', function () {
          specify('should return true', async function () {
            const file = new File({
              uri: '/path/to/json-file.json',
              data: '{"a":"b"}',
            });
            const parser = new JSONParser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given generic JSON data', function () {
        specify('should return parse result', async function () {
          const file = new File({ uri: '/path/to/file.json', data: '{"prop": "val"}' });
          const parser = new JSONParser();
          const result = await parser.parse(file);
          const objElement: ObjectElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(objElement.get('prop').equals('val'));
        });
      });

      context('given generic JSON data as buffer', function () {
        specify('should return parse result', async function () {
          const file = new File({
            uri: '/path/to/file.json',
            data: Buffer.from('{"prop": "val"}'),
          });
          const parser = new JSONParser();
          const result = await parser.parse(file);
          const objElement: ObjectElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(objElement.get('prop').equals('val'));
        });
      });

      context('given data that is not a generic JSON data', function () {
        specify('should coerce to string and parse', async function () {
          const file = new File({ uri: '/path/to/file.json', data: 1 as any });
          const parser = new JSONParser();
          const result = await parser.parse(file);
          const numberElement: NumberElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(numberElement.equals(1));
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = new File({ uri: '/path/to/file.json', data: '' });
          const parser = new JSONParser();
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(result.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const file = new File({ uri: '/path/to/file.json', data: '{"prop": "val"}' });
            const parser = new JSONParser({ sourceMap: true });
            const result = await parser.parse(file);
            const objElement: ObjectElement = result.get(0);

            assert.isTrue(isSourceMapElement(objElement.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const file = new File({ uri: '/path/to/file.json', data: '{"prop": "val"}' });
            const parser = new JSONParser({ sourceMap: false });
            const result = await parser.parse(file);
            const objElement: ObjectElement = result.get(0);

            assert.isUndefined(objElement.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
