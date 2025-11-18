import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { IbmmqChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('IbmmqChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const ibmmqChannelBindingElement = IbmmqChannelBindingElement.refract({
          destinationType: 'topic',
          topic: {
            objectName: 'myTopicName',
            durablePermitted: true,
            lastMsgRetained: true,
          },
          queue: {
            objectName: 'myQueueName',
            isPartitioned: true,
            exclusive: true,
          },
          maxMsgLength: 20,
          bindingVersion: '0.1.0',
        });

        expect(sexprs(ibmmqChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
