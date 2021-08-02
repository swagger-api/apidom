import { expect } from 'chai';
import { sexprs } from 'apidom';

import { MqttMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MqttMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqttMessageBindingElement = MqttMessageBindingElement.refract({
          bindingVersion: '0.1.0',
        });

        expect(sexprs(mqttMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
