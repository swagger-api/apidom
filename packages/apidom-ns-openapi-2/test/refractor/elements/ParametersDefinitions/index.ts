import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ParametersDefinitionsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ParametersDefinitionsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const parametersDefinitionsElement = ParametersDefinitionsElement.refract({
          parameter1: {},
          parameter2: {},
        });

        expect(sexprs(parametersDefinitionsElement)).toMatchSnapshot();
      });
    });
  });
});
