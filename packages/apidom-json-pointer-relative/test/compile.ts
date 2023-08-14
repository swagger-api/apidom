import { assert } from 'chai';

import { compile } from '../src';

describe('apidom-json-pointer-relative', function () {
  context('compile', function () {
    context(
      'given examples from https://datatracker.ietf.org/doc/html/draft-bhutton-relative-json-pointer-00',
      function () {
        specify('should compile to `0`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 0,
            indexManipulation: undefined,
            jsonPointerTokens: undefined,
            hashCharacter: false,
          });

          assert.strictEqual(relativeJsonPointer, '0');
        });

        specify('should compile to `1/0`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 1,
            indexManipulation: undefined,
            jsonPointerTokens: ['0'],
            hashCharacter: false,
          });

          assert.strictEqual(relativeJsonPointer, '1/0');
        });

        specify('should compile to `0-1`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 0,
            indexManipulation: -1,
            jsonPointerTokens: undefined,
            hashCharacter: false,
          });

          assert.strictEqual(relativeJsonPointer, '0-1');
        });

        specify('should compile to `2/highly/nested/objects`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 2,
            indexManipulation: undefined,
            jsonPointerTokens: ['highly', 'nested', 'objects'],
            hashCharacter: false,
          });

          assert.strictEqual(relativeJsonPointer, '2/highly/nested/objects');
        });

        specify('should compile to `0#`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 0,
            indexManipulation: undefined,
            jsonPointerTokens: undefined,
            hashCharacter: true,
          });

          assert.strictEqual(relativeJsonPointer, '0#');
        });

        specify('should compile to `0-1#`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 0,
            indexManipulation: -1,
            jsonPointerTokens: undefined,
            hashCharacter: true,
          });

          assert.strictEqual(relativeJsonPointer, '0-1#');
        });

        specify('should compile to `1#`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 1,
            indexManipulation: undefined,
            jsonPointerTokens: undefined,
            hashCharacter: true,
          });

          assert.strictEqual(relativeJsonPointer, '1#');
        });

        specify('should compile to `0/objects`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 0,
            indexManipulation: undefined,
            jsonPointerTokens: ['objects'],
            hashCharacter: false,
          });

          assert.strictEqual(relativeJsonPointer, '0/objects');
        });

        specify('should compile to `2/foo/0`', function () {
          const relativeJsonPointer = compile({
            nonNegativeIntegerPrefix: 2,
            indexManipulation: undefined,
            jsonPointerTokens: ['foo', '0'],
            hashCharacter: false,
          });

          assert.strictEqual('2/foo/0', relativeJsonPointer);
        });
      },
    );

    context('given special characters are included in JSON Pointer tokens', function () {
      specify('should encode and compile', function () {
        const relativeJsonPointer = compile({
          nonNegativeIntegerPrefix: 0,
          indexManipulation: undefined,
          jsonPointerTokens: ['path', '~', '/'],
          hashCharacter: false,
        });

        assert.strictEqual(relativeJsonPointer, '0/path/~0/~1');
      });
    });
  });
});
