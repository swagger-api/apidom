import { assert } from 'chai';

import {
  from,
  toValue,
  NumberElement,
  MemberElement,
  ArrayElement,
  StringElement,
} from '../../src';
import Transcluder from '../../src/transcluder';

describe('transcluder', function () {
  context('Transcluder', function () {
    context('transclude', function () {
      context('given parent is Array Element', function () {
        specify('should transclude', function () {
          const element = from([1, 2, 3]) as ArrayElement;
          const search = element.get(1);
          const replace = new NumberElement(4);
          const transcluder = Transcluder({ element });
          const transcludedElement = transcluder.transclude(search, replace);
          // @ts-ignore
          const transcludedValue = toValue(transcludedElement);

          assert.deepEqual(transcludedValue, [1, 4, 3]);
        });
      });

      context('given parent is Member Element', function () {
        specify('should transclude', function () {
          const element = from([1, { prop: 'value' }, 3]) as ArrayElement;
          const search = element.get(1).get('prop');
          const replace = new NumberElement(4);
          const transcluder = Transcluder({ element });
          const transcludedElement = transcluder.transclude(search, replace);
          // @ts-ignore
          const transcludedValue = toValue(transcludedElement);

          assert.deepEqual(transcludedValue, [1, { prop: 4 }, 3]);
        });
      });

      context('given parent is Object Element', function () {
        specify('should transclude', function () {
          const element = from([1, { prop: 'value', prop2: 'value2' }, 3]) as ArrayElement;
          const search = element.get(1).getMember('prop');
          const replace = new MemberElement(
            new StringElement('prop1'),
            new StringElement('value1'),
          );
          const transcluder = Transcluder({ element });
          const transcludedElement = transcluder.transclude(search, replace);
          // @ts-ignore
          const transcludedValue = toValue(transcludedElement);

          assert.deepEqual(transcludedValue, [1, { prop1: 'value1', prop2: 'value2' }, 3]);
        });
      });

      context('given multiple transclude operations', function () {
        specify('should transclude all', function () {
          const element = from([1, { prop: 'value', prop2: 'value2' }, 3]) as ArrayElement;
          const search1 = element.get(1).getMember('prop');
          const replace1 = new MemberElement(
            new StringElement('prop1'),
            new StringElement('value1'),
          );
          const search2 = element.get(2);
          const replace2 = new NumberElement(4);
          const transcluder = Transcluder({ element });

          const transcludedElementV1 = transcluder.transclude(search1, replace1);
          // @ts-ignore
          const transcludedValueV1 = toValue(transcludedElementV1);

          const transcludedElementV2 = transcluder.transclude(search2, replace2);
          // @ts-ignore
          const transcludedValueV2 = toValue(transcludedElementV2);

          assert.deepEqual(transcludedValueV1, [1, { prop1: 'value1', prop2: 'value2' }, 3]);
          assert.deepEqual(transcludedValueV2, [1, { prop1: 'value1', prop2: 'value2' }, 4]);
        });
      });

      context('given frozen element tree', function () {
        specify('should throw error', function () {
          const element = from([1, { prop: 'value', prop2: 'value2' }, 3]) as ArrayElement;
          element.freeze();
          const search = element.get(1).getMember('prop');
          const replace = new MemberElement(
            new StringElement('prop1'),
            new StringElement('value1'),
          );
          const transcluder = Transcluder({ element });

          assert.throw(() => transcluder.transclude(search, replace), TypeError);
        });
      });

      context('shorcuts', function () {
        context('given search parameter is identical with transcluding element', function () {
          specify('should return replace element', function () {
            const search = new StringElement('test');
            const replace = new NumberElement(1);
            const element = search;
            const transcluder = Transcluder({ element });
            const transcluded = transcluder.transclude(search, replace);

            assert.strictEqual(transcluded, replace);
          });
        });

        context('given search parameter is identical replace parameter', function () {
          specify('should return transcluding element', function () {
            const search = new StringElement('test');
            const replace = search;
            const element = new NumberElement(1);
            const transcluder = Transcluder({ element });
            const transcluded = transcluder.transclude(search, replace);

            assert.strictEqual(transcluded, element);
          });
        });
      });
    });
  });
});
