import { assert } from 'chai';

import { parse, InvalidRelativeJsonPointerError } from '../src';

describe('apidom-json-pointer-relative', function () {
  context('parse', function () {
    context(
      'given examples from https://datatracker.ietf.org/doc/html/draft-bhutton-relative-json-pointer-00',
      function () {
        specify('should parse `0`', function () {
          const relativeJsonPointer = parse('0');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 0,
            indexManipulation: undefined,
            jsonPointerTokens: undefined,
            hashCharacter: false,
          });
        });

        specify('should parse `1/0`', function () {
          const relativeJsonPointer = parse('1/0');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 1,
            indexManipulation: undefined,
            jsonPointerTokens: ['0'],
            hashCharacter: false,
          });
        });

        specify('should parse `0-1`', function () {
          const relativeJsonPointer = parse('0-1');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 0,
            indexManipulation: -1,
            jsonPointerTokens: undefined,
            hashCharacter: false,
          });
        });

        specify('should parse `2/highly/nested/objects`', function () {
          const relativeJsonPointer = parse('2/highly/nested/objects');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 2,
            indexManipulation: undefined,
            jsonPointerTokens: ['highly', 'nested', 'objects'],
            hashCharacter: false,
          });
        });

        specify('should parse `0#`', function () {
          const relativeJsonPointer = parse('0#');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 0,
            indexManipulation: undefined,
            jsonPointerTokens: undefined,
            hashCharacter: true,
          });
        });

        specify('should parse `0-1#`', function () {
          const relativeJsonPointer = parse('0-1#');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 0,
            indexManipulation: -1,
            jsonPointerTokens: undefined,
            hashCharacter: true,
          });
        });

        specify('should parse `1#`', function () {
          const relativeJsonPointer = parse('1#');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 1,
            indexManipulation: undefined,
            jsonPointerTokens: undefined,
            hashCharacter: true,
          });
        });

        specify('should parse `0/objects`', function () {
          const relativeJsonPointer = parse('0/objects');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 0,
            indexManipulation: undefined,
            jsonPointerTokens: ['objects'],
            hashCharacter: false,
          });
        });

        specify('should parse `2/foo/0`', function () {
          const relativeJsonPointer = parse('2/foo/0');

          assert.deepEqual(relativeJsonPointer, {
            nonNegativeIntegerPrefix: 2,
            indexManipulation: undefined,
            jsonPointerTokens: ['foo', '0'],
            hashCharacter: false,
          });
        });
      },
    );

    context('given JSON Pointer followed by hash character', function () {
      specify('test', function () {
        const relativeJsonPointer = parse('0/path#');

        assert.deepEqual(relativeJsonPointer, {
          nonNegativeIntegerPrefix: 0,
          indexManipulation: undefined,
          jsonPointerTokens: ['path#'],
          hashCharacter: false,
        });
      });
    });

    context('given hash character followed by JSON Pointer', function () {
      specify('should throw InvalidRelativeJsonPointerError', function () {
        assert.throws(() => parse('0#/path'), InvalidRelativeJsonPointerError);
      });
    });

    context('given invalid Relative JSON Pointer', function () {
      specify('should throw InvalidRelativeJsonPointerError', function () {
        assert.throws(() => parse('0+a/path'), InvalidRelativeJsonPointerError);
      });
    });

    context('given special characters are included in JSON Pointer', function () {
      specify('should parse and decode', function () {
        const relativeJsonPointer = parse('0/path/~0/~1');

        assert.deepEqual(relativeJsonPointer, {
          nonNegativeIntegerPrefix: 0,
          indexManipulation: undefined,
          jsonPointerTokens: ['path', '~', '/'],
          hashCharacter: false,
        });
      });
    });
  });
});
