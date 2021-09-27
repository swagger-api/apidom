import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { KafkaServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('KafkaServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const kafkaServerBindingElement = KafkaServerBindingElement.refract({});

        expect(sexprs(kafkaServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
