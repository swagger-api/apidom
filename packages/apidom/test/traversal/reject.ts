import { assert } from 'chai';
import { StringElement } from 'minim';

import { reject, createNamespace, isNumberElement, isStringElement, ArraySlice } from '../../src';

const namespace = createNamespace();

describe('traversal', function () {
  context('reject', function () {
    context('given ArrayElement', function () {
      const arrayElement = new namespace.elements.Array([1, 2, 3, 'a']);

      specify('should return ArraySlice instance', function () {
        const filtered = reject(isNumberElement, arrayElement);

        assert.instanceOf(filtered, ArraySlice);
      });

      specify('should reject content matching the predicate', function () {
        const filtered = reject(isNumberElement, arrayElement);
        const stringElement: StringElement = filtered.get(1);

        assert.lengthOf(filtered, 2);
        assert.strictEqual(filtered.get(0), arrayElement);
        assert.isTrue(isStringElement(stringElement));
        assert.isTrue(stringElement.equals('a'));
      });
    });
  });
});
