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
    specify('should replace MemberElement in ObjectElement', function () {
      const objectElement = new ObjectElement({ key1: 'value1', key2: 'value2' });
      const visitor = {
        Member(memberElement: MemberElement) {
          // @ts-ignore
          if (memberElement.key.toValue() === 'key1') {
            return new MemberElement('key3', 'value3');
          }
          return undefined;
        },
      };
      const newObjectElement = visit(objectElement, visitor);

      assert.deepEqual({ key3: 'value3', key2: 'value2' }, toValue(newObjectElement));
    });

    specify('should remove MemberElement from ObjectElement', function () {
      const objectElement = new ObjectElement({ key1: 'value1', key2: 'value2' });
      const visitor = {
        Member(memberElement: MemberElement) {
          // @ts-ignore
          if (memberElement.key.toValue() === 'key1') {
            return null;
          }
          return undefined;
        },
      };
      const newObjectElement = visit(objectElement, visitor);

      assert.deepEqual({ key2: 'value2' }, toValue(newObjectElement));
    });

    specify('should replace value in MemberElement', function () {
      const objectElement = new ObjectElement({ key: 'search' });
      const visitor = {
        String(stringElement: StringElement) {
          if (stringElement.toValue() === 'search') {
            return new StringElement('replace');
          }
          return undefined;
        },
      };
      const newObjectElement = visit(objectElement, visitor);

      assert.deepEqual({ key: 'replace' }, toValue(newObjectElement));
    });

    specify('should replace item in ArrayElement', function () {
      const arrayElement = new ArrayElement([1, 'search']);
      const visitor = {
        String() {
          return new StringElement('replace');
        },
      };
      const newArrayElement = visit(arrayElement, visitor);

      assert.deepEqual([1, 'replace'], toValue(newArrayElement));
    });

    specify('should remove item from ArrayElement', function () {
      const arrayElement = new ArrayElement([1, 'search']);
      const visitor = {
        String() {
          return null;
        },
      };
      const newArrayElement = visit(arrayElement, visitor);

      assert.deepEqual([1], toValue(newArrayElement));
    });
  });
});
