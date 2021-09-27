import { assert } from 'chai';
import { F as stubFalse } from 'ramda';

import { createNamespace, find, isMemberElement } from '../../src';

const namespace = createNamespace();

describe('traversal', function () {
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
});
