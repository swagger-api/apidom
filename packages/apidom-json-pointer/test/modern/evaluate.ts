import { assert } from 'chai';
import { ObjectElement, MemberElement } from '@swagger-api/apidom-core';

import {
  evaluate,
  JSONPointerKeyError,
  JSONPointerIndexError,
  JSONPointerParseError,
} from '../../src/index.ts';

describe('apidom-json-pointer modern', function () {
  context('evaluate', function () {
    const objectElement = new ObjectElement({ foo: ['bar', 'baz'], '': 0 });

    specify('should evaluate against ApiDOM', function () {
      assert.strictEqual(evaluate(objectElement, ''), objectElement);
      assert.strictEqual(evaluate(objectElement, '/foo/0'), objectElement.get('foo').get(0));
      assert.strictEqual(evaluate(objectElement, '/'), objectElement.get(''));
    });

    specify('should pass options through to the evaluation', function () {
      assert.isUndefined(evaluate(objectElement, '/missing', { strictObjects: false }));
    });

    specify('should throw on a missing key', function () {
      assert.throws(() => evaluate(objectElement, '/missing'), JSONPointerKeyError);
    });

    specify('should throw on an array index out of bounds', function () {
      assert.throws(() => evaluate(objectElement, '/foo/5'), JSONPointerIndexError);
    });

    specify('should throw on an invalid JSON Pointer', function () {
      assert.throws(() => evaluate(objectElement, 'foo'), JSONPointerParseError);
    });

    specify('should throw on non-unique member names', function () {
      const duplicates = new ObjectElement({ a: 1 });
      duplicates.content.push(new MemberElement('a', 2));

      assert.throws(() => evaluate(duplicates, '/a'), JSONPointerKeyError, /is not unique/);
    });
  });
});
