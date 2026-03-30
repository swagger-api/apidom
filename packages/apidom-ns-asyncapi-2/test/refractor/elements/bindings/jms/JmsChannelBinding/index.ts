import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { JmsChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('JmsChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jmsChannelBindingElement = JmsChannelBindingElement.refract({
          destination: 'channel-name',
          destinationType: 'queue',
          bindingVersion: '0.0.1',
        });

        expect(sexprs(jmsChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
