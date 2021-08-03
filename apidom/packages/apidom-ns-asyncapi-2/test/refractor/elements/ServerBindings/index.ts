import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ServerBindingsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ServerBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serverBindingsElement = ServerBindingsElement.refract({
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

        expect(sexprs(serverBindingsElement)).toMatchSnapshot();
      });
    });
  });
});
