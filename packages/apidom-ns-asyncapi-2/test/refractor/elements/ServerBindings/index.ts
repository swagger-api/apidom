import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ServerBindingsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ServerBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serverBindingsElement = ServerBindingsElement.refract({
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
          pulsar: {},
        });

        expect(sexprs(serverBindingsElement)).toMatchSnapshot();
      });
    });
  });
});
