import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { RequirementLevelElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('RequirementLevelElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const requirementLevelElement = RequirementLevelElement.refract('must');

        expect(sexprs(requirementLevelElement)).toMatchSnapshot();
      });
    });
  });
});
