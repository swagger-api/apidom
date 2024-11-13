import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AmqpMessageBindingElement } from '../../../../../../src/index.ts';

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
