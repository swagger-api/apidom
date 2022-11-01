import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SolaceOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SolaceOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const solaceOperationBindingElement = SolaceOperationBindingElement.refract({
          bindingVersion: '0.2.0',
          destinations: [{}],
        });

        expect(sexprs(solaceOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
