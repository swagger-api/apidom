import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { always } from 'ramda';
import { isPathItemElement, PathItemElement } from 'apidom-ns-openapi-3-1';
import { isParseResultElement, isSourceMapElement } from 'apidom';

import File from '../../../src/util/File';
import OpenApiYaml3_1Parser from '../../../src/parsers/apidom-reference-parser-openapi-yaml-3-1';
import { ParserError } from '../../../src/util/errors';

describe('parsers', function () {
  context('JsonParser', function () {
    context('canParse', function () {
      context('given file with .yaml extension', function () {
        specify('should return true', function () {
          const file = File({ url: '/path/to/openapi.yaml' });
          const specPath = always(['document', 'objects', 'PathItem']);
          const parser = OpenApiYaml3_1Parser({ specPath });

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with .yml extension', function () {
        specify('should return true', function () {
          const file = File({ url: '/path/to/openapi.yaml' });
          const specPath = always(['document', 'objects', 'PathItem']);
          const parser = OpenApiYaml3_1Parser({ specPath });

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', function () {
          const file = File({ url: '/path/to/openapi.txt' });
          const specPath = always(['document', 'objects', 'PathItem']);
          const parser = OpenApiYaml3_1Parser({ specPath });

          assert.isFalse(parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', function () {
          const file = File({ url: '/path/to/openapi' });
          const specPath = always(['document', 'objects', 'PathItem']);
          const parser = OpenApiYaml3_1Parser({ specPath });

          assert.isFalse(parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      context('given OpenApi 3.1.x YAML data', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'path-item.yaml');
          const data = fs.readFileSync(url).toString();
          const file = File({ url, data });
          const specPath = always(['document', 'objects', 'PathItem']);
          const parser = OpenApiYaml3_1Parser({ specPath });
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
        });

        specify('should result in proper ApiDOM fragment', async function () {
          const url = path.join(__dirname, 'fixtures', 'path-item.yaml');
          const data = fs.readFileSync(url).toString();
          const file = File({ url, data });
          const specPath = always(['document', 'objects', 'PathItem']);
          const parser = OpenApiYaml3_1Parser({ specPath });
          const result = await parser.parse(file);

          assert.lengthOf(result, 1);
          assert.isTrue(isPathItemElement(result.get(0)));
        });
      });

      context('given data that is not a generic JSON data', function () {
        specify('should throw ParserError', async function () {
          try {
            const file = File({ url: '/path/to/file.yaml', data: 1 });
            const specPath = always(['document', 'objects', 'PathItem']);
            const parser = OpenApiYaml3_1Parser({ specPath });
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
          const file = File({ url: '/path/to/file.yaml', data: '' });
          const specPath = always(['document', 'objects', 'PathItem']);
          const parser = OpenApiYaml3_1Parser({ specPath });
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(result.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'path-item.yaml');
            const data = fs.readFileSync(url).toString();
            const file = File({ url, data });
            const specPath = always(['document', 'objects', 'PathItem']);
            const parser = OpenApiYaml3_1Parser({ specPath, sourceMap: true });
            const result = await parser.parse(file);
            const pathItem: PathItemElement = result.get(0);

            assert.isTrue(isSourceMapElement(pathItem.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'path-item.yaml');
            const data = fs.readFileSync(url).toString();
            const file = File({ url, data });
            const specPath = always(['document', 'objects', 'PathItem']);
            const parser = OpenApiYaml3_1Parser({ specPath, sourceMap: false });
            const result = await parser.parse(file);
            const pathItem: PathItemElement = result.get(0);

            assert.isUndefined(pathItem.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
