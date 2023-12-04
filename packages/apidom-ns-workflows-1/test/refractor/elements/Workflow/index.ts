import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { WorkflowElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('WorkflowElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const workflowElement = WorkflowElement.refract({
          workflowId: 'uniqueWorkflowId',
          summary: 'Adopt a pet',
          description: 'Adopt a pet by calling APIs in a chain',
          inputs: {},
          steps: [{}],
          outputs: { key: '$inputs.value' },
        });

        expect(sexprs(workflowElement)).toMatchSnapshot();
      });
    });
  });
});
