import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { lexicalAnalysis, syntacticAnalysisDirect } from '../../src/adapter-node';
import PreOrderCursorChildrenIterator from '../../src/syntactic-analysis/PreOrderCursorChildrenIterator';
import PreOrderCursorIterator from '../../src/syntactic-analysis/PreOrderCusrorIterator';

describe('syntactic-analysis', function () {
  context('PreOrderCursorChildrenIterator', function () {
    specify('should create optimized CST', async function () {
      const cst = await lexicalAnalysis('[1, 2]');
      const cursor = cst.walk();
      const iterator = new PreOrderCursorChildrenIterator(cursor);
      const optimizedCst = { rootNode: [...iterator][0] };
      const apiDOM = syntacticAnalysisDirect(optimizedCst);

      expect(sexprs(apiDOM)).toMatchSnapshot();
    });
  });

  context('PreOrderCursorIterator', function () {
    specify('should create optimized list of surrogate syntax nodes', async function () {
      const cst = await lexicalAnalysis('[1, 2]');
      const cursor = cst.walk();
      const iterator = new PreOrderCursorIterator(cursor);
      const optimizedList = [...iterator];

      expect(optimizedList).to.have.lengthOf(7);
    });
  });
});
