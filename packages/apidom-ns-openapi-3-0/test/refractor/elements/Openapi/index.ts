import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OpenapiElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('OpenapiElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openapiElement = OpenapiElement.refract('3.0.3');

        expect(sexprs(openapiElement)).toMatchSnapshot();
      });
    });
  });
});
