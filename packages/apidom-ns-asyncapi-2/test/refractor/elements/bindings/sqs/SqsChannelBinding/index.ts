import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SqsChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SqsChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const sqsChannelBindingElement = SqsChannelBindingElement.refract({
          queue: {
            name: 'MyQueue',
            fifoQueue: false,
          },
          deadLetterQueue: {
            name: 'MyDeadLetterQueue',
          },
          bindingVersion: '0.2.0',
        });

        expect(sexprs(sqsChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
