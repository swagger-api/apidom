import { assert } from 'chai';
import { StringElement } from 'minim';
import {call, F as stubFalse} from 'ramda';
import {
  filter,
  reject,
  find,
  some,
  traverse,
  createNamespace,
  isMemberElement,
  isNumberElement,
  isStringElement,
  ArraySlice
} from '../src';

const namespace = createNamespace();

let callbackCounter = 0;
function callback(element: unknown) {
  console.log("traverse callback", element.toValue());
  callbackCounter++;
}

const buildTokens = (element: unknown) => {
  console.log("buildTokens", element.toValue());
}

describe('traversal', function () {
  context('filter', function () {
    context('given ObjectElement', function () {
      const objElement = new namespace.elements.Object({ a: 'b', c: 'd' });

      specify('should return ArraySlice instance', function () {
        const filtered = filter(isMemberElement, objElement);

        assert.instanceOf(filtered, ArraySlice);
      });

      specify('should find content matching the predicate', function () {
        const predicate = (element: unknown): boolean =>
          isMemberElement(element) && element.key.equals('a');
        const filtered = filter(predicate, objElement);

        assert.lengthOf(filtered, 1);
        assert.isTrue(isMemberElement(filtered.get(0)));
        assert.isTrue(filtered.get(0).value.equals('b'));
      });
    });
  });

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

  context('find', function () {
    context('given ObjectElement', function () {
      const objElement = new namespace.elements.Object({ a: 'b', c: 'd' });

      specify('should return first match', function () {
        const predicate = (element: unknown): boolean =>
          isMemberElement(element) && element.key.equals('c');
        const found = find(predicate, objElement);

        assert.isTrue(isMemberElement(found));
        assert.isTrue(found.key.equals('c'));
        assert.isTrue(found.value.equals('d'));
      });

      context('given no match', function () {
        specify('should return undefined', function () {
          const found = find(stubFalse, objElement);

          assert.isUndefined(found);
        });
      });
    });
  });

  context('some', function () {
    context('given ObjectElement', function () {
      const objElement = new namespace.elements.Object({ a: 'b', c: 'd' });

      context('given match', function () {
        specify('should return true', function () {
          const isFound = some(isMemberElement, objElement);

          assert.isTrue(isFound);
        });
      });

      context('given no match', function () {
        specify('should return false', function () {
          const isFound = some(stubFalse, objElement);

          assert.isFalse(isFound);
        });
      });
    });
  });

  context('traverse', function () {
    context('given ObjectElement', function () {
      const objElement = new namespace.elements.Object({ a: 'b', c: 'd' });

      specify('should traverse', function () {
        traverse(buildTokens, objElement);
        assert.equal(callbackCounter, 7);
      });

    });
  });

});
