import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { KafkaChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('KafkaChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const kafkaChannelBindingElement = KafkaChannelBindingElement.refract({});

        expect(sexprs(kafkaChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
