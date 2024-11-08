import { assert } from 'chai';
import sinon from 'sinon';

import {
  ArrayElement,
  ObjectElement,
  traverse,
  createNamespace,
  isStringElement,
} from '../../src/index.ts';

const namespace = createNamespace();

describe('traversal', function () {
  context('traverse', function () {
    context('given ObjectElement', function () {
      let objElement: ObjectElement;
      let callback: any;

      beforeEach(function () {
        // @ts-ignore
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
        const predicate = (element: any) => isStringElement(element) && element.equals('a');
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
      let arrayElement: ArrayElement;
      let callback: any;

      beforeEach(function () {
        // @ts-ignore
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
        const predicate = (element: any) => isStringElement(element) && element.equals('a');

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
