import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { isParseResultElement } from '@swagger-api/apidom-core';

import { ParserError, File } from '../../../../src';
import ApiDOMJsonParser from '../../../../src/parse/parsers/apidom-json';

describe('parsers', function () {
  context('ApiDOMJsonParser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = File({
              uri: '/path/to/apidom.json',
              mediaType: 'application/vnd.apidom',
            });
            const file2 = File({
              uri: '/path/to/apidom.json',
              mediaType: 'application/vnd.apidom+json',
            });
            const parser = ApiDOMJsonParser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = File({
              uri: '/path/to/apidom.json',
              mediaType: 'application/vnd.aai.asyncapi+json;version=2.6.0',
            });
            const parser = ApiDOMJsonParser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = File({
            uri: '/path/to/apidom.yaml',
            mediaType: 'application/vnd.apidom',
          });
          const parser = ApiDOMJsonParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = File({
            uri: '/path/to/apidom',
            mediaType: 'application/vnd.apidom',
          });
          const parser = ApiDOMJsonParser();

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as ApiDOM', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'apidom.json');
            const file = File({
              uri: '/path/to/apidom.json',
              data: fs.readFileSync(url),
            });
            const parser = ApiDOMJsonParser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as ApiDOM', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'apidom.json');
            const file = File({
              uri: '/path/to/apidom.json',
              data: fs.readFileSync(url).toString(),
            });
            const parser = ApiDOMJsonParser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given ApiDOM JSON data', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'apidom.json');
          const data = fs.readFileSync(uri).toString();
          const file = File({
            uri,
            data,
            mediaType: 'application/vnd.apidom+json',
          });
          const parser = ApiDOMJsonParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given ApiDOM JSON data as buffer', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'apidom.json');
          const data = fs.readFileSync(uri);
          const file = File({
            uri,
            data,
            mediaType: 'application/vnd.apidom+json',
          });
          const parser = ApiDOMJsonParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
        });
      });

      context('given data that is not an ApiDOM JSON data', function () {
        specify('should throw error', async function () {
          const file = File({
            uri: '/path/to/file.json',
            data: 1,
            mediaType: 'application/vnd.apidom+json',
          });
          const parser = ApiDOMJsonParser();

          try {
            await parser.parse(file);
            assert.fail('Should throw ParserError');
          } catch (e) {
            assert.instanceOf(e, ParserError);
          }
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = File({
            uri: '/path/to/file.json',
            data: '',
            mediaType: 'application/vnd.apidom+json',
          });
          const parser = ApiDOMJsonParser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });
    });
  });
});
