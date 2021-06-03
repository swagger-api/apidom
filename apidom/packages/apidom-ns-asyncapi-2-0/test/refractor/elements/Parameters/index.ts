import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ParametersElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ParametersElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const parametersElement = ParametersElement.refract({
          userId: {},
          orderId: {},
        });

        expect(sexprs(parametersElement)).toMatchSnapshot();
      });
    });

    context('given field is of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const parametersElement = ParametersElement.refract({
          userId: {},
          orderId: {
            $ref: '#/path/to/parameter',
          },
        });

        expect(sexprs(parametersElement)).toMatchSnapshot();
      });
    });
  });
});
