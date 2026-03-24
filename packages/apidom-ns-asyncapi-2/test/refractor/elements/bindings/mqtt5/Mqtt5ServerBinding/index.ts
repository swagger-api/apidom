import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { Mqtt5ServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Mqtt5ServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqtt5ServerBindingElement = Mqtt5ServerBindingElement.refract({
          sessionExpiryInterval: 120,
          bindingVersion: '0.2.0',
        });

        expect(sexprs(mqtt5ServerBindingElement)).toMatchSnapshot();
      });

      context('given sessionExpiryInterval field of type SchemaElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqtt5ServerBindingElement = Mqtt5ServerBindingElement.refract({
            sessionExpiryInterval: {},
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqtt5ServerBindingElement)).toMatchSnapshot();
        });
      });

      context('given sessionExpiryInterval field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const mqtt5ServerBindingElement = Mqtt5ServerBindingElement.refract({
            sessionExpiryInterval: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.2.0',
          });

          expect(sexprs(mqtt5ServerBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
