import { assert } from 'chai';

import { lexicalAnalysis } from '../../src/adapter-node';
import PreOrderCursorIterator from '../../src/syntactic-analysis/PreOrderCusrorIterator';

describe('syntactic-analysis', function () {
  context('PreOrderCursorIterator', function () {
    specify('should create optimized list of surrogate syntax nodes', async function () {
      const cst = await lexicalAnalysis('{"a":"b"}');
      const cursor = cst.walk();
      const iterator = new PreOrderCursorIterator(cursor);
      const optimizedList = [...iterator];

      assert.lengthOf(optimizedList, 14);
    });
  });
});
