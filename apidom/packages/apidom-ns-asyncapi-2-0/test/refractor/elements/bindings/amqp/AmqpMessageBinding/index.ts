import { expect } from 'chai';
import { sexprs } from 'apidom';

import { AmqpMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('AmqpMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const amqpMessageBindingElement = AmqpMessageBindingElement.refract({
          contentEncoding: 'gzip',
          messageType: 'user.signup',
          bindingVersion: '0.2.0',
        });

        expect(sexprs(amqpMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
