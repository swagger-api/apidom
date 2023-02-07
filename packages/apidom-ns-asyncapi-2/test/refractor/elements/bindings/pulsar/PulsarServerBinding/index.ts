import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PulsarServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('PulsarServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pulsarServerBindingElement = PulsarServerBindingElement.refract({
          tenant: 'public',
          version: '0.1.0',
        });

        expect(sexprs(pulsarServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
