import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { IbmmqOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('IbmmqOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const ibmmqOperationBindingElement = IbmmqOperationBindingElement.refract({});

        expect(sexprs(ibmmqOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
