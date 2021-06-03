import { expect } from 'chai';
import { sexprs } from 'apidom';

import { MqttChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MqttChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqttChannelBindingElement = MqttChannelBindingElement.refract({});

        expect(sexprs(mqttChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
