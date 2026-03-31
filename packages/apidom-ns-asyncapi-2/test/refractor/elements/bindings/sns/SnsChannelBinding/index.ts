import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SnsChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SnsChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const snsChannelBindingElement = SnsChannelBindingElement.refract({
          name: 'my-sns-topic',
          ordering: {
            type: 'FIFO',
            contentBasedDeduplication: true,
          },
          policy: {
            statements: [
              {
                effect: 'Allow',
                principal: '*',
                action: 'sns:Publish',
              },
            ],
          },
          tags: {
            project: 'my-project',
          },
          bindingVersion: '0.2.0',
        });

        expect(sexprs(snsChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
