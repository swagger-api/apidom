import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SuccessActionElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SuccessActionElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const successActionElement = SuccessActionElement.refract({
          type: 'goto',
          workflowId: 'uniqueWorkflowId',
          stepId: 'getPetStep',
          criteria: [
            {
              context: '$statusCode',
              condition: '^200$',
              type: 'regex',
            },
          ],
        });

        expect(sexprs(successActionElement)).toMatchSnapshot();
      });
    });
  });
});
