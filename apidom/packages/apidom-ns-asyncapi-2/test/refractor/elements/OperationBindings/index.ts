import { expect } from 'chai';
import { sexprs } from 'apidom';

import { OperationBindingsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('OperationBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationBindingsElement = OperationBindingsElement.refract({
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

        expect(sexprs(operationBindingsElement)).toMatchSnapshot();
      });
    });
  });
});
