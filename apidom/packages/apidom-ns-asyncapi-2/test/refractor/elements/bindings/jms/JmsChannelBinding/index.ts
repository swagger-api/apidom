import { expect } from 'chai';
import { sexprs } from 'apidom';

import { JmsChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('JmsChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jmsChannelBindingElement = JmsChannelBindingElement.refract({});

        expect(sexprs(jmsChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
