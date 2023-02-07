import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PulsarOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('PulsarOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pulsarOperationBindingElement = PulsarOperationBindingElement.refract({});

        expect(sexprs(pulsarOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
