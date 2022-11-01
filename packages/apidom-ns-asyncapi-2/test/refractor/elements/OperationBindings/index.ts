import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationBindingsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('OperationBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationBindingsElement = OperationBindingsElement.refract({
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
          googlepubsub: {},
          ibmmq: {},
        });

        expect(sexprs(operationBindingsElement)).toMatchSnapshot();
      });
    });
  });
});
