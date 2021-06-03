import { expect } from 'chai';
import { sexprs } from 'apidom';

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
    });
  });
});
