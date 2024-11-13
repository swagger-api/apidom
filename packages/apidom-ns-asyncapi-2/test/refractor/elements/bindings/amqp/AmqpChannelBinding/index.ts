import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AmqpChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AmqpChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const amqpChannelBindingElement = AmqpChannelBindingElement.refract({
          is: 'routingKey',
          exchange: {
            name: 'myExchange',
            type: 'topic',
            durable: true,
            autoDelete: false,
            vhost: '/',
          },
          queue: {
            name: 'my-queue-name',
            durable: true,
            exclusive: true,
            autoDelete: false,
            vhost: '/',
          },
          bindingVersion: '0.2.0',
        });

        expect(sexprs(amqpChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
