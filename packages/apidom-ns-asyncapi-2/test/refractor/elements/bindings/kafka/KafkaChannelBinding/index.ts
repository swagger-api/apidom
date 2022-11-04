import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { KafkaChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('KafkaChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const kafkaChannelBindingElement = KafkaChannelBindingElement.refract({
          topic: 'my-specific-topic-name',
          partitions: 20,
          replicas: 3,
          bindingVersion: '0.3.0',
        });

        expect(sexprs(kafkaChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
