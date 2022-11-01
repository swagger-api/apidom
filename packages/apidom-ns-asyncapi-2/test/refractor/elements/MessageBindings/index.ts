import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MessageBindingsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MessageBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageBindingsElement = MessageBindingsElement.refract({
          http: {},
          ws: {},
          kafka: {},
          anypointmq: {},
          amqp: {},
          amqp1: {},
          mqtt: {},
          mqtt5: {},
          nats: {},
          jms: {},
          sns: {},
          solace: {},
          sqs: {},
          stomp: {},
          redis: {},
          mercure: {},
          ibmmq: {},
          googlepubsub: {},
        });

        expect(sexprs(messageBindingsElement)).toMatchSnapshot();
      });
    });
  });
});
