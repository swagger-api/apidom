import { assert } from 'chai';

import {
  ObjectElement,
  ArrayElement,
  StringElement,
  visit,
  MemberElement,
  toValue,
} from '../../src';

describe('traversal', function () {
  context('visitor', function () {
    specify('should replace root', function () {
      const objectElement = new ObjectElement({ key1: 'value1', key2: 'value2' });
      const replacement = new ObjectElement({ prop: 'val' });
      const visitor = {
        ObjectElement() {
          return replacement;
        },
      };
      const newRoot = visit(objectElement, visitor);

      assert.strictEqual(newRoot, replacement);
    });

    specify('should replace MemberElement in ObjectElement', function () {
      const objectElement = new ObjectElement({ key1: 'value1', key2: 'value2' });
      const visitor = {
        MemberElement(memberElement: MemberElement) {
          if (toValue(memberElement.key) === 'key1') {
            return new MemberElement('key3', 'value3');
          }
          return undefined;
        },
      };
      const newObjectElement = visit(objectElement, visitor);

      assert.deepEqual(toValue(newObjectElement), { key3: 'value3', key2: 'value2' });
    });

    specify('should remove MemberElement from ObjectElement', function () {
      const objectElement = new ObjectElement({ key1: 'value1', key2: 'value2' });
      const visitor = {
        MemberElement(memberElement: MemberElement) {
          if (toValue(memberElement.key) === 'key1') {
            return null;
          }
          return undefined;
        },
      };
      const newObjectElement = visit(objectElement, visitor);

      assert.deepEqual(toValue(newObjectElement), { key2: 'value2' });
    });

    specify('should replace value in MemberElement', function () {
      const objectElement = new ObjectElement({ key: 'search' });
      const visitor = {
        StringElement(stringElement: StringElement) {
          if (toValue(stringElement) === 'search') {
            return new StringElement('replace');
          }
          return undefined;
        },
      };
      const newObjectElement = visit(objectElement, visitor);

      assert.deepEqual(toValue(newObjectElement), { key: 'replace' });
    });

    specify('should replace item in ArrayElement', function () {
      const arrayElement = new ArrayElement([1, 'search']);
      const visitor = {
        StringElement() {
          return new StringElement('replace');
        },
      };
      const newArrayElement = visit(arrayElement, visitor);

      assert.deepEqual(toValue(newArrayElement), [1, 'replace']);
    });

    specify('should remove item from ArrayElement', function () {
      const arrayElement = new ArrayElement([1, 'search']);
      const visitor = {
        StringElement() {
          return null;
        },
      };
      const newArrayElement = visit(arrayElement, visitor);

      assert.deepEqual(toValue(newArrayElement), [1]);
    });
  });
});
