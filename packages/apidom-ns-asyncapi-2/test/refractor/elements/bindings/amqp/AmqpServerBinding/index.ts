import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AmqpServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AmqpServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const amqpServerBindingElement = AmqpServerBindingElement.refract({});

        expect(sexprs(amqpServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
