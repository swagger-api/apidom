import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MqttServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MqttServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqttServerBindingElement = MqttServerBindingElement.refract({
          clientId: 'guest',
          cleanSession: true,
          lastWill: {
            topic: '/last-wills',
            qos: 2,
            message: 'Guest gone offline.',
            retain: false,
          },
          keepAlive: 60,
          bindingVersion: '0.1.0',
        });

        expect(sexprs(mqttServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
