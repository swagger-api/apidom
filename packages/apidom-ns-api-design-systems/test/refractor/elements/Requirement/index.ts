import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { RequirementElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('RequirementElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const requirementElement = RequirementElement.refract({
          subject: ['http', 'message', 'body'],
          level: 'must',
          values: ['application/json'],
          follow: 'error.json',
        });

        expect(sexprs(requirementElement)).toMatchSnapshot();
      });
    });
  });
});
