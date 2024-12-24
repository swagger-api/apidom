import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OpenapiElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OpenapiElement 3.0.0', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openapiElement = OpenapiElement.refract('3.0.0');

        expect(sexprs(openapiElement)).toMatchSnapshot();
      });
    });

    context('OpenapiElement 3.0.1', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openapiElement = OpenapiElement.refract('3.0.1');

        expect(sexprs(openapiElement)).toMatchSnapshot();
      });
    });

    context('OpenapiElement 3.0.2', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openapiElement = OpenapiElement.refract('3.0.2');

        expect(sexprs(openapiElement)).toMatchSnapshot();
      });
    });

    context('OpenapiElement 3.0.3', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openapiElement = OpenapiElement.refract('3.0.3');

        expect(sexprs(openapiElement)).toMatchSnapshot();
      });
    });

    context('OpenapiElement 3.0.4', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openapiElement = OpenapiElement.refract('3.0.4');

        expect(sexprs(openapiElement)).toMatchSnapshot();
      });
    });
  });
});
