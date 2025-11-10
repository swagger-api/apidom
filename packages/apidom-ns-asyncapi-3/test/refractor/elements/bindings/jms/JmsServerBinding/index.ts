import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { JmsServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('JmsServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jmsServerBindingElement = JmsServerBindingElement.refract({});

        expect(sexprs(jmsServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
