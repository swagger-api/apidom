import { expect } from 'chai';
import { sexprs } from 'apidom';

import { Amqp1MessageBindingElement } from '../../../../../../src';

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
