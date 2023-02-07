import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PulsarMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('PulsarMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pulsarMessageBindingElement = PulsarMessageBindingElement.refract({});

        expect(sexprs(pulsarMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
