import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { NumberElement, isParseResultElement, isSourceMapElement } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-workflows-json-1';

import File from '../../../../src/util/File';
import WorkflowsJson1Parser from '../../../../src/parse/parsers/workflows-json-1';

describe('parsers', function () {
  context('WorkflowsJson1Parser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = File({
              uri: '/path/to/workflows.json',
              mediaType: mediaTypes.latest('generic'),
            });
            const file2 = File({
              uri: '/path/to/workflows.json',
              mediaType: mediaTypes.latest('json'),
            });
            const parser = WorkflowsJson1Parser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = File({
              uri: '/path/to/workflows.json',
              mediaType: 'application/vnd.aai.asyncapi+json;version=2.6.0',
            });
            const parser = WorkflowsJson1Parser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = File({
            uri: '/path/to/workflows.yaml',
            mediaType: mediaTypes.latest('json'),
          });
          const parser = WorkflowsJson1Parser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = File({
            uri: '/path/to/workflows',
            mediaType: mediaTypes.latest('json'),
          });
          const parser = WorkflowsJson1Parser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as Workflows 1.0.0', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-workflow.json');
            const file = File({
              uri: '/path/to/workflows.json',
              data: fs.readFileSync(url),
            });
            const parser = WorkflowsJson1Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as Workflows 1.0.0', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-workflow.json');
            const file = File({
              uri: '/path/to/workflows.json',
              data: fs.readFileSync(url).toString(),
            });
            const parser = WorkflowsJson1Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given Workflows 1.0.0 JSON data', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'sample-workflow.json');
          const data = fs.readFileSync(url).toString();
          const file = File({
            url,
            data,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = WorkflowsJson1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given Workflows 1.0.0 JSON data as buffer', function () {
        specify('should return parse result', async function () {
          const url = path.join(__dirname, 'fixtures', 'sample-workflow.json');
          const data = fs.readFileSync(url);
          const file = File({
            url,
            data,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = WorkflowsJson1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given data that is not a Workflows 1.0.0 JSON data', function () {
        specify('should coerce to string and parse', async function () {
          const file = File({
            uri: '/path/to/file.json',
            data: 1,
            mediaType: mediaTypes.latest('json'),
          });
          const parser = WorkflowsJson1Parser();
          const parseResult = await parser.parse(file);
          const numberElement: NumberElement = parseResult.get(0);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(numberElement.equals(1));
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = File({
            uri: '/path/to/file.json',
            data: '',
            mediaType: mediaTypes.latest('json'),
          });
          const parser = WorkflowsJson1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-workflow.json');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: mediaTypes.latest('json'),
            });
            const parser = WorkflowsJson1Parser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(isSourceMapElement(parseResult.api?.meta.get('sourceMap')));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-workflow.json');
            const data = fs.readFileSync(url).toString();
            const file = File({
              url,
              data,
              mediaType: mediaTypes.latest('json'),
            });
            const parser = WorkflowsJson1Parser();
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.api?.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
