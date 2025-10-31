import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { Amqp1MessageBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Amqp1MessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const amqp1MessageBindingElement = Amqp1MessageBindingElement.refract({});

        expect(sexprs(amqp1MessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
