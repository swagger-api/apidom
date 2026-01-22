import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OpenapiElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OpenapiElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openapiElement = OpenapiElement.refract('3.1.0');

        expect(sexprs(openapiElement)).toMatchSnapshot();
      });
    });
  });
});
