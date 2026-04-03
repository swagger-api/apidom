import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MqttMessageBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MqttMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqttMessageBindingElement = MqttMessageBindingElement.refract({
          payloadFormatIndicator: 1,
          contentType: 'application/json',
          responseTopic: '/response',
          bindingVersion: '0.2.0',
        });

        expect(sexprs(mqttMessageBindingElement)).toMatchSnapshot();
      });

      context('given correlationData field of type SchemaElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttMessageBindingElement = MqttMessageBindingElement.refract({
            correlationData: {},
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttMessageBindingElement)).toMatchSnapshot();
        });
      });

      context('given correlationData field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttMessageBindingElement = MqttMessageBindingElement.refract({
            correlationData: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttMessageBindingElement)).toMatchSnapshot();
        });
      });

      context('given responseTopic field of type SchemaElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttMessageBindingElement = MqttMessageBindingElement.refract({
            responseTopic: {},
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttMessageBindingElement)).toMatchSnapshot();
        });
      });

      context('given responseTopic field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqttMessageBindingElement = MqttMessageBindingElement.refract({
            responseTopic: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqttMessageBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
