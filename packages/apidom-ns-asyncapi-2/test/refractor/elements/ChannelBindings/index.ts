import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ChannelBindingsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ChannelBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const channelBindingsElement = ChannelBindingsElement.refract({
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

        expect(sexprs(channelBindingsElement)).toMatchSnapshot();
      });
    });
  });
});
