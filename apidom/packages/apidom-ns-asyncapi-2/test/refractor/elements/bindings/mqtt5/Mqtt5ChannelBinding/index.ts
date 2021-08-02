import { expect } from 'chai';
import { sexprs } from 'apidom';

import { Mqtt5ChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Mqtt5ChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqtt5ChannelBindingElement = Mqtt5ChannelBindingElement.refract({});

        expect(sexprs(mqtt5ChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
