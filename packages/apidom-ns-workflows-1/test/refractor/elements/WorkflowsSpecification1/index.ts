import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { WorkflowsSpecification1Element } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('WorkflowsSpecification1Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const workflowsSpecification1Element = WorkflowsSpecification1Element.refract({
          workflowsSpec: '1.0.0',
          info: {},
          sourceDescriptions: [{}],
          workflows: [{}],
          components: {},
        });

        expect(sexprs(workflowsSpecification1Element)).toMatchSnapshot();
      });
    });
  });
});
