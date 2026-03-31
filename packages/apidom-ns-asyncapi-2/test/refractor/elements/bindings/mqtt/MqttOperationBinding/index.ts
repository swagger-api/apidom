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
          messageExpiryInterval: 60,
          bindingVersion: '0.2.0',
        });

        expect(sexprs(mqttOperationBindingElement)).toMatchSnapshot();
      });

      context('given messageExpiryInterval field of type SchemaElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttOperationBindingElement = MqttOperationBindingElement.refract({
            messageExpiryInterval: {},
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttOperationBindingElement)).toMatchSnapshot();
        });
      });

      context('given messageExpiryInterval field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttOperationBindingElement = MqttOperationBindingElement.refract({
            messageExpiryInterval: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttOperationBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
