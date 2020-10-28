import { assert } from 'chai';
import sinon from 'sinon';
import { StringElement } from 'minim';
import { F as stubFalse } from 'ramda';
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
  ArraySlice,
} from '../src';

const namespace = createNamespace();

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
      let objElement;
      let callback;

      beforeEach(function () {
        objElement = new namespace.elements.Object({ a: 'b', c: 'd' });
        callback = sinon.spy();
      });

      specify('should execute callback seven times', function () {
        traverse(callback, objElement);
        assert.strictEqual(callback.callCount, 7);
      });

      specify('should execute callback on this object', function () {
        traverse(callback, objElement);
        const { args } = callback.getCall(0);

        assert.strictEqual(args[0], objElement);
      });

      context('and first key value pair', function () {
        specify('should execute callback on pair', function () {
          traverse(callback, objElement);
          const { args } = callback.getCall(1);

          assert.strictEqual(args[0], objElement.getMember('a'));
        });

        specify('should execute callback on key', function () {
          traverse(callback, objElement);
          const { args } = callback.getCall(2);

          assert.strictEqual(args[0], objElement.getMember('a').key);
        });

        specify('should execute callback on value', function () {
          traverse(callback, objElement);
          const { args } = callback.getCall(3);

          assert.strictEqual(args[0], objElement.get('a'));
        });
      });

      context('and second key value pair', function () {
        specify('should execute callback on pair', function () {
          traverse(callback, objElement);
          const { args } = callback.getCall(4);

          assert.strictEqual(args[0], objElement.getMember('c'));
        });

        specify('should execute callback on key', function () {
          traverse(callback, objElement);
          const { args } = callback.getCall(5);

          assert.strictEqual(args[0], objElement.getMember('c').key);
        });

        specify('should execute callback on value', function () {
          traverse(callback, objElement);
          const { args } = callback.getCall(6);

          assert.strictEqual(args[0], objElement.get('c'));
        });
      });

      context('given predicate', function () {
        const predicate = (element) => isStringElement(element) && element.equals('a');
        specify('should execute callback once', function () {
          traverse({ callback, predicate }, objElement);
          assert.strictEqual(callback.callCount, 1);
        });

        specify('should execute callback on filtered element', function () {
          traverse({ callback, predicate }, objElement);
          const { args } = callback.getCall(0);

          assert.strictEqual(args[0], objElement.getMember('a').key);
        });
      });
    });

    context('given ArrayElement', function () {
      let arrayElement;
      let callback;

      beforeEach(function () {
        arrayElement = new namespace.elements.Array(['a', 'b']);
        callback = sinon.spy();
      });

      specify('should execute callback three times', function () {
        traverse(callback, arrayElement);

        assert.strictEqual(callback.callCount, 3);
      });

      specify('should execute callback on this object', function () {
        traverse(callback, arrayElement);
        const { args } = callback.getCall(0);

        assert.strictEqual(args[0], arrayElement);
      });

      specify('should execute callback on first array item', function () {
        traverse(callback, arrayElement);
        const { args } = callback.getCall(1);

        assert.strictEqual(args[0], arrayElement.get(0));
      });

      specify('should execute callback on second array item', function () {
        traverse(callback, arrayElement);
        const { args } = callback.getCall(2);

        assert.strictEqual(args[0], arrayElement.get(1));
      });

      context('given predicate', function () {
        const predicate = (element) => isStringElement(element) && element.equals('a');

        specify('should execute callback once', function () {
          traverse({ callback, predicate }, arrayElement);
          assert.strictEqual(callback.callCount, 1);
        });

        specify('should execute callback on filtered element', function () {
          traverse({ callback, predicate }, arrayElement);
          const { args } = callback.getCall(0);

          assert.strictEqual(args[0], arrayElement.get(0));
        });
      });
    });
  });
});
