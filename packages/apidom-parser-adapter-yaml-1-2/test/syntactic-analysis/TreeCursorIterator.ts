import { expect } from 'chai';

import { lexicalAnalysis } from '../../src/adapter-node.ts';
import TreeCursorIterator from '../../src/syntactic-analysis/TreeCursorIterator.ts';

describe('syntactic-analysis', function () {
  context('TreeCursorIterator', function () {
    specify('should create optimized CST', async function () {
      const cst = await lexicalAnalysis('[1, 2]');
      const cursor = cst.walk();
      const iterator = new TreeCursorIterator(cursor);

      expect(Array.from(iterator).at(0)).toMatchSnapshot();
    });
  });
});
