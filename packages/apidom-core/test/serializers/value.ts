import { assert } from 'chai';

import {
  BooleanElement,
  NumberElement,
  StringElement,
  NullElement,
  ObjectElement,
  ArrayElement,
} from '../../src';
import serializer from '../../src/serializers/value';

describe('serializers', function () {
  context('value', function () {
    context('given BooleanElement', function () {
      specify('should serialize to JavaScript value', function () {
        const booleanElement = new BooleanElement(true);

        assert.strictEqual(serializer(booleanElement), true);
      });
    });

    context('given NumberElement', function () {
      specify('should serialize to JavaScript value', function () {
        const numberElement = new NumberElement(1);

        assert.strictEqual(serializer(numberElement), 1);
      });
    });

    context('given StringElement', function () {
      specify('should serialize to JavaScript value', function () {
        const stringElement = new StringElement('string');

        assert.strictEqual(serializer(stringElement), 'string');
      });
    });

    context('given NullElement', function () {
      specify('should serialize to JavaScript value', function () {
        const nullElement = new NullElement();

        assert.isNull(serializer(nullElement));
      });
    });

    context('given ObjectElement', function () {
      specify('should serialize to JavaScript value', function () {
        const objectElement = new ObjectElement({ a: { b: { c: 'd' } } });

        assert.deepEqual(serializer(objectElement), { a: { b: { c: 'd' } } });
      });

      context('and with cycle', function () {
        specify('should serialize to JavaScript value with cycle', function () {
          const cycle = new ObjectElement({ a: 'b' });
          cycle.set('c', cycle);
          const expected: { a: string; c?: any } = { a: 'b' };
          expected.c = expected;

          assert.deepEqual(serializer(cycle), expected);
        });
      });

      context('and duplicates with no cycle', function () {
        specify('should serialize to JavaScript value', function () {
          const object = { prop: 'val' };
          const duplicates = new ObjectElement({ a: object, b: object });

          assert.deepEqual(serializer(duplicates), { a: object, b: object });
        });
      });
    });

    context('given ArrayElement', function () {
      specify('should serialize to JavaScript value', function () {
        const arrayElement = new ArrayElement([1, 'test', null, true, [1], { a: 'b' }]);

        assert.deepEqual(serializer(arrayElement), [1, 'test', null, true, [1], { a: 'b' }]);
      });

      context('and with cycle', function () {
        specify('should serialize to JavaScript value with cycle', function () {
          const cycle = new ArrayElement([1, '2']);
          cycle.set(2, cycle);
          const expected: any[] = [1, '2'];
          expected[2] = expected;

          assert.deepEqual(serializer(cycle), expected);
        });
      });

      context('and duplicates with no cycle', function () {
        specify('should serialize to JavaScript value', function () {
          const array = [1, '2'];
          const duplicates = new ArrayElement([array, array]);
          const expected = [array, array];

          assert.deepEqual(serializer(duplicates), expected);
        });
      });
    });
  });
});
