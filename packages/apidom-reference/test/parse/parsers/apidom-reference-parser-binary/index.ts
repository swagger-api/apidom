import { assert } from 'chai';
import { isParseResultElement, isStringElement } from '@swagger-api/apidom-core';

import File from '../../../../src/util/File';
import BinaryParser from '../../../../src/parse/parsers/apidom-reference-parser-binary';
import { ParserError } from '../../../../src/util/errors';

describe('parsers', function () {
  context('BinaryParser', function () {
    context('canParse', function () {
      context('given file with .bin extension', function () {
        specify('should return true', function () {
          const file = File({ uri: '/path/to/file.bin', data: Buffer.from('data') });
          const parser = BinaryParser();

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with unknown extension', function () {
        specify('should return true', function () {
          const file = File({ uri: '/path/to/file.bin', data: Buffer.from('data') });
          const parser = BinaryParser();

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return true', function () {
          const file = File({ uri: '/path/to/file', data: Buffer.from('data') });
          const parser = BinaryParser();

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with string data', function () {
        specify('should return true', function () {
          const file = File({ uri: '/path/to/file.bin', data: 'data' });
          const parser = BinaryParser();

          assert.isTrue(parser.canParse(file));
        });
      });

      context('given file with no data', function () {
        specify('should return false', function () {
          const file = File({ uri: '/path/to/file.bin' });
          const parser = BinaryParser();

          assert.isFalse(parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      context('given string data', function () {
        specify('should return parse result', async function () {
          const file = File({ uri: '/path/to/file.bin', data: 'data' });
          const parser = BinaryParser();
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(isStringElement(result.result));
          assert.isTrue(result.result?.equals(Buffer.from('data').toString('base64')));
        });
      });

      context('given generic JSON data as buffer', function () {
        specify('should return parse result', async function () {
          const file = File({ uri: '/path/to/file.bin', data: Buffer.from('data') });
          const parser = BinaryParser();
          const result = await parser.parse(file);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(isStringElement(result.result));
          assert.isTrue(result.result?.equals(file.data.toString('base64')));
        });
      });

      context('given data that is not recognized', function () {
        specify('should throw ParserError', async function () {
          try {
            const file = File({ uri: '/path/to/file.bin', data: 1 });
            const parser = BinaryParser();
            await parser.parse(file);
            assert.fail('should throw ParserError');
          } catch (error: any) {
            assert.instanceOf(error.cause, TypeError);
            assert.instanceOf(error, ParserError);
            assert.propertyVal(error, 'message', 'Error parsing "/path/to/file.bin"');
          }
        });
      });

      context('allowEmpty', function () {
        context('given allowEmpty enabled and empty file provided', function () {
          specify('should return empty parse result', async function () {
            const file = File({ uri: '/path/to/file.json', data: '' });
            const parser = BinaryParser({ allowEmpty: true });
            const result = await parser.parse(file);

            assert.isTrue(isParseResultElement(result));
            assert.isTrue(result.isEmpty);
          });
        });

        context('given allowEmpty disabled and empty file provided', function () {
          specify('should return empty parse result', async function () {
            const file = File({ uri: '/path/to/file.json', data: '' });
            const parser = BinaryParser({ allowEmpty: false });
            const result = await parser.parse(file);

            assert.isTrue(isParseResultElement(result));
            assert.isTrue(result.isEmpty);
          });
        });
      });
    });
  });
});
