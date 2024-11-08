import { assert } from 'chai';
import { F as stubFalse } from 'ramda';

import { some, createNamespace, isMemberElement } from '../../src/index.ts';

const namespace = createNamespace();

describe('traversal', function () {
  context('some', function () {
    context('given ObjectElement', function () {
      // @ts-ignore
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
});
