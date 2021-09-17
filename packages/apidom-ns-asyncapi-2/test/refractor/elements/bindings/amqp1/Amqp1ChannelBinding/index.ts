import { expect } from 'chai';
import { sexprs } from 'apidom';

import { Amqp1ChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Amqp1ChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const amqp1ChannelBindingElement = Amqp1ChannelBindingElement.refract({});

        expect(sexprs(amqp1ChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
