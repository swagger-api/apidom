import { expect } from 'chai';
import { sexprs } from 'apidom';

import { Amqp1OperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Amqp1OperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const amqp1OperationBindingElement = Amqp1OperationBindingElement.refract({});

        expect(sexprs(amqp1OperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
