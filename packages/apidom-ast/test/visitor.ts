import sinon from 'sinon';
import { assert } from 'chai';

import { visit } from '../src';

describe('visitor', function () {
  context('given structure with cycle', function () {
    specify('should skip over a sub-tree to avoid recursion', function () {
      const visitor = {
        enter() {},
      };
      const structure = {
        type: 'object',
        children: [
          { type: 'number', value: 1 },
          { type: 'string', value: 2 },
          { type: 'object', children: [] },
        ],
      };
      // @ts-ignore
      structure.children[2].children.push(structure);

      sinon.spy(visitor, 'enter');
      // @ts-ignore
      visit(structure, visitor, { keyMap: { object: ['children'] } });

      // @ts-ignore
      assert.strictEqual(visitor.enter.callCount, 4);
    });
  });
});
