import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { KafkaOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('KafkaOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const kafkaOperationBindingElement = KafkaOperationBindingElement.refract({
          groupId: {},
          clientId: {},
          bindingVersion: '0.1.0',
        });

        expect(sexprs(kafkaOperationBindingElement)).toMatchSnapshot();
      });

      context('given query field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const kafkaOperationBindingElement = KafkaOperationBindingElement.refract({
            groupId: {
              $ref: '#/pointer',
            },
            clientId: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.1.0',
          });

          expect(sexprs(kafkaOperationBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
