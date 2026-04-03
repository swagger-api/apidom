import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SnsOperationBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SnsOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const snsOperationBindingElement = SnsOperationBindingElement.refract({
          topic: {
            name: 'my-sns-topic',
          },
          consumers: [
            {
              protocol: 'sqs',
              endpoint: {
                name: 'my-queue',
              },
              filterPolicy: {
                eventType: ['order_placed'],
              },
              filterPolicyScope: 'MessageAttributes',
              rawMessageDelivery: true,
              redrivePolicy: {
                deadLetterQueue: {
                  arn: 'arn:aws:sqs:us-east-1:123456789012:my-dead-letter-queue',
                },
                maxReceiveCount: 10,
              },
              deliveryPolicy: {
                minDelayTarget: 20,
                maxDelayTarget: 20,
                numRetries: 3,
                numNoDelayRetries: 0,
                numMinDelayRetries: 0,
                numMaxDelayRetries: 0,
                backoffFunction: 'linear',
                maxReceivesPerSecond: 10,
              },
              displayName: 'My Queue',
            },
          ],
          deliveryPolicy: {
            minDelayTarget: 20,
            maxDelayTarget: 20,
            numRetries: 3,
            numNoDelayRetries: 0,
            numMinDelayRetries: 0,
            numMaxDelayRetries: 0,
            backoffFunction: 'linear',
            maxReceivesPerSecond: 10,
          },
          bindingVersion: '1.0.0',
        });

        expect(sexprs(snsOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
