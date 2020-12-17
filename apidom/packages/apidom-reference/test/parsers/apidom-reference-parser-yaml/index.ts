import { assert } from 'chai';
import { ObjectElement, isParseResultElement, isSourceMapElement } from 'apidom';

import File from '../../../src/util/File';
import YamlParser from '../../../src/parsers/apidom-reference-parser-yaml';
import { ParserError } from '../../../src/util/errors';

describe('parsers', function () {
  context('YamlParser', function () {
    context('canParse', function () {
      context('given file with .yaml extension', function () {
        specify('should return true', function () {
          const file = File({ uri: '/path/to/file.yaml' });
          const parser = YamlParser();

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with .yml extension', function () {
        specify('should return true', function () {
          const file = File({ uri: '/path/to/file.yml' });
          const parser = YamlParser();

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', function () {
          const file = File({ uri: '/path/to/file.txt' });
          const parser = YamlParser();

          assert.isFalse(parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', function () {
          const file = File({ uri: '/path/to/file' });
          const parser = YamlParser();

          assert.isFalse(parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      context('given generic YAML data', function () {
        specify('should return parse result', async function () {
          const file = File({ uri: '/path/to/file.yaml', data: 'prop: val' });
          const parser = YamlParser();
          const result = await parser.parse(file);
          const objElement: ObjectElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(objElement.get('prop').equals('val'));
        });
      });

      context('given data that is not a generic YAML data', function () {
        specify('should throw ParserError', async function () {
          try {
            const file = File({ uri: '/path/to/file.yaml', data: 1 });
            const parser = YamlParser();
            await parser.parse(file);
            assert.fail('should throw ParserError');
          } catch (e) {
            assert.instanceOf(e.cause, TypeError);
            assert.instanceOf(e, ParserError);
            assert.propertyVal(e, 'message', 'Error parsing "/path/to/file.yaml"');
          }
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = File({ uri: '/path/to/file.yaml', data: '' });
          const parser = YamlParser();
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(result.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const file = File({ uri: '/path/to/file.yaml', data: 'prop: val' });
            const parser = YamlParser({ sourceMap: true });
            const result = await parser.parse(file);
            const objElement: ObjectElement = result.get(0);

            assert.isTrue(isSourceMapElement(objElement.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const file = File({ uri: '/path/to/file.yaml', data: 'prop: val' });
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
