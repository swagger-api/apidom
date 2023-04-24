import { assert } from 'chai';
import { F as stubFalse } from 'ramda';

import { createNamespace, find, isMemberElement, MemberElement } from '../../src';

const namespace = createNamespace();

describe('traversal', function () {
  context('find', function () {
    context('given ObjectElement', function () {
      // @ts-ignore
      const objElement = new namespace.elements.Object({ a: 'b', c: 'd' });

      specify('should return first match', function () {
        const predicate = (element: any): boolean =>
          isMemberElement(element) && element.key.equals('c');
        // @ts-ignore
        const found = find(predicate, objElement) as MemberElement;

        assert.isTrue(isMemberElement(found));
        // @ts-ignore
        assert.isTrue(found.key.equals('c'));
        // @ts-ignore
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
});
