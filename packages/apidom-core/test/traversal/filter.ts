import { assert } from 'chai';

import { filter, createNamespace, isMemberElement, ArraySlice, ObjectElement } from '../../src';

const namespace = createNamespace();

describe('traversal', function () {
  context('filter', function () {
    context('given ObjectElement', function () {
      // @ts-ignore
      const objElement: ObjectElement = new namespace.elements.Object({ a: 'b', c: 'd' });

      specify('should return ArraySlice instance', function () {
        const filtered = filter(isMemberElement, objElement);

        assert.instanceOf(filtered, ArraySlice);
      });

      specify('should find content matching the predicate', function () {
        const predicate = (element: any): boolean =>
          isMemberElement(element) && element.key.equals('a');
        const filtered = filter(predicate, objElement);

        assert.lengthOf(filtered, 1);
        assert.isTrue(isMemberElement(filtered.get(0)));
        // @ts-ignore
        assert.isTrue(filtered.get(0).value.equals('b'));
      });
    });
  });
});
