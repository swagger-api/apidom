import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { KafkaMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('KafkaMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const kafkaMessageBindingElement = KafkaMessageBindingElement.refract({
          key: {},
          bindingVersion: '0.1.0',
        });

        expect(sexprs(kafkaMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
