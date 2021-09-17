import { expect } from 'chai';
import { sexprs } from 'apidom';

import { MessageBindingsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MessageBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageBindingsElement = MessageBindingsElement.refract({
          http: {},
          ws: {},
          kafka: {},
          amqp: {},
          amqp1: {},
          mqtt: {},
          mqtt5: {},
          nats: {},
          jms: {},
          sns: {},
          sqs: {},
          stomp: {},
          redis: {},
          mercure: {},
          ibmmq: {},
        });

        expect(sexprs(messageBindingsElement)).toMatchSnapshot();
      });
    });
  });
});
