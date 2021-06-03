import { expect } from 'chai';
import { sexprs } from 'apidom';

import { Amqp1ServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Amqp1ServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const amqp1ServerBindingElement = Amqp1ServerBindingElement.refract({});

        expect(sexprs(amqp1ServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
