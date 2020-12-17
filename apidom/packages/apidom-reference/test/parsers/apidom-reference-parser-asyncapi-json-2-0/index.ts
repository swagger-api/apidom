import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { always } from 'ramda';
import { isParameterElement, ParameterElement } from 'apidom-ns-asyncapi-2-0';
import { isParseResultElement, isSourceMapElement } from 'apidom';

import File from '../../../src/util/File';
import AsyncApiJson2_0Parser from '../../../src/parsers/apidom-reference-parser-asyncapi-json-2-0';
import { ParserError } from '../../../src/util/errors';

describe('parsers', function () {
  context('AsyncApiJson2_0Parser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        specify('should return true', function () {
          const file = File({ uri: '/path/to/openapi.json' });
          const specPath = always(['document', 'objects', 'Parameter']);
          const parser = AsyncApiJson2_0Parser({ specPath });

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', function () {
          const file = File({ uri: '/path/to/openapi.yaml' });
          const specPath = always(['document', 'objects', 'Parameter']);
          const parser = AsyncApiJson2_0Parser({ specPath });

          assert.isFalse(parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', function () {
          const file = File({ uri: '/path/to/openapi' });
          const specPath = always(['document', 'objects', 'Parameter']);
          const parser = AsyncApiJson2_0Parser({ specPath });

          assert.isFalse(parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      context('given AsyncApi 2.0.x JSON data', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'parameter.json');
          const data = fs.readFileSync(url).toString();
          const file = File({ url, data });
          const specPath = always(['document', 'objects', 'Parameter']);
          const parser = AsyncApiJson2_0Parser({ specPath });
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
        });

        specify('should result in proper ApiDOM fragment', async function () {
          const url = path.join(__dirname, 'fixtures', 'parameter.json');
          const data = fs.readFileSync(url).toString();
          const file = File({ url, data });
          const specPath = always(['document', 'objects', 'Parameter']);
          const parser = AsyncApiJson2_0Parser({ specPath });
          const result = await parser.parse(file);

          assert.lengthOf(result, 1);
          assert.isTrue(isParameterElement(result.get(0)));
        });
      });

      context('given data that is not a generic JSON data', function () {
        specify('should throw ParserError', async function () {
          try {
            const file = File({ uri: '/path/to/file.json', data: 1 });
            const specPath = always(['document', 'objects', 'Parameter']);
            const parser = AsyncApiJson2_0Parser({ specPath });
            await parser.parse(file);
            assert.fail('should throw ParserError');
          } catch (e) {
            assert.instanceOf(e.cause, TypeError);
            assert.instanceOf(e, ParserError);
            assert.propertyVal(e, 'message', 'Error parsing "/path/to/file.json"');
          }
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = File({ uri: '/path/to/file.json', data: '' });
          const specPath = always(['document', 'objects', 'Parameter']);
          const parser = AsyncApiJson2_0Parser({ specPath });
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(result.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'parameter.json');
            const data = fs.readFileSync(url).toString();
            const file = File({ url, data });
            const specPath = always(['document', 'objects', 'Parameter']);
            const parser = AsyncApiJson2_0Parser({ specPath, sourceMap: true });
            const result = await parser.parse(file);
            const parameter: ParameterElement = result.get(0);

            assert.isTrue(isSourceMapElement(parameter.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'parameter.json');
            const data = fs.readFileSync(url).toString();
            const file = File({ url, data });
            const specPath = always(['document', 'objects', 'Parameter']);
            const parser = AsyncApiJson2_0Parser({ specPath, sourceMap: false });
            const result = await parser.parse(file);
            const parameter: ParameterElement = result.get(0);

            assert.isUndefined(parameter.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
