import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AmqpOperationBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AmqpOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const amqpOperationBindingElement = AmqpOperationBindingElement.refract({
          expiration: 100000,
          userId: 'guest',
          cc: ['user.logs'],
          priority: 10,
          deliveryMode: 2,
          mandatory: false,
          bcc: ['external.audit'],
          replyTo: 'user.signedup',
          timestamp: true,
          ack: false,
          bindingVersion: '0.2.0',
        });

        expect(sexprs(amqpOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
