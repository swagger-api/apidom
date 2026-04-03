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
          sessionExpiryInterval: 300,
          maximumPacketSize: 1024,
          bindingVersion: '0.2.0',
        });

        expect(sexprs(mqttServerBindingElement)).toMatchSnapshot();
      });

      context('given sessionExpiryInterval field of type SchemaElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttServerBindingElement = MqttServerBindingElement.refract({
            sessionExpiryInterval: {},
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttServerBindingElement)).toMatchSnapshot();
        });
      });

      context('given sessionExpiryInterval field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttServerBindingElement = MqttServerBindingElement.refract({
            sessionExpiryInterval: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttServerBindingElement)).toMatchSnapshot();
        });
      });

      context('given maximumPacketSize field of type SchemaElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttServerBindingElement = MqttServerBindingElement.refract({
            maximumPacketSize: {},
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttServerBindingElement)).toMatchSnapshot();
        });
      });

      context('given maximumPacketSize field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttServerBindingElement = MqttServerBindingElement.refract({
            maximumPacketSize: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttServerBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
