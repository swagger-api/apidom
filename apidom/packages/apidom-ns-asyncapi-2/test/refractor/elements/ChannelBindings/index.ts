import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ChannelBindingsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ChannelBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const channelBindingsElement = ChannelBindingsElement.refract({
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
        });

        expect(sexprs(channelBindingsElement)).toMatchSnapshot();
      });
    });
  });
});
