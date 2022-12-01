import { Buffer } from 'node:buffer';
import { assert } from 'chai';
import { StringElement, isParseResultElement, isStringElement } from '@swagger-api/apidom-core';

import File from '../../../../src/util/File';
import BinaryParser from '../../../../src/parse/parsers/binary/index-node';

describe('parsers', function () {
  context('BinaryParser - node', function () {
    context('canParse', function () {
      context('given file with .bin extension', function () {
        specify('should return true', async function () {
          const file = File({ uri: '/path/to/file.bin', data: Buffer.from('data') });
          const parser = BinaryParser();

          assert.isTrue(await parser.canParse(file));
        });
      });

      context('given file with unknown extension', function () {
        specify('should return true', async function () {
          const file = File({ uri: '/path/to/file.bin', data: Buffer.from('data') });
          const parser = BinaryParser();

          assert.isTrue(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return true', async function () {
          const file = File({ uri: '/path/to/file', data: Buffer.from('data') });
          const parser = BinaryParser();

          assert.isTrue(await parser.canParse(file));
        });
      });

      context('given file with string data', function () {
        specify('should return true', async function () {
          const file = File({ uri: '/path/to/file.bin', data: 'data' });
          const parser = BinaryParser();

          assert.isTrue(await parser.canParse(file));
        });
      });

      context('given file with no data', function () {
        specify('should return true', async function () {
          const file = File({ uri: '/path/to/file.bin', data: '' });
          const parser = BinaryParser();

          assert.isTrue(await parser.canParse(file));
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
        specify('should coerce to string and parse', async function () {
          const file = File({ uri: '/path/to/file.bin', data: 1 });
          const parser = BinaryParser();
          const result = await parser.parse(file);
          const stringElement: StringElement = result.get(0);

          assert.isTrue(isParseResultElement(result));
          assert.isTrue(stringElement.equals(Buffer.from(String(file.data)).toString('base64')));
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
