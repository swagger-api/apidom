import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { KafkaMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('KafkaMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const kafkaMessageBindingElement = KafkaMessageBindingElement.refract({
          key: {},
          schemaIdLocation: 'payload',
          schemaIdPayloadEncoding: '4',
          bindingVersion: '0.3.0',
        });

        expect(sexprs(kafkaMessageBindingElement)).toMatchSnapshot();
      });

      context('given query field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const kafkaMessageBindingElement = KafkaMessageBindingElement.refract({
            key: {
              $ref: '#/pointer',
            },
            schemaIdLocation: 'payload',
            schemaIdPayloadEncoding: '4',
            bindingVersion: '0.3.0',
          });

          expect(sexprs(kafkaMessageBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
