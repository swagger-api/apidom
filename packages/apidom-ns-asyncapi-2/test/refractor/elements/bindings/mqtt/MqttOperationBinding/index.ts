import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MqttOperationBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MqttOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqttOperationBindingElement = MqttOperationBindingElement.refract({
          qos: 2,
          retain: true,
          bindingVersion: '0.1.0',
        });

        expect(sexprs(mqttOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
