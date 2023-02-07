import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PulsarChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('PulsarChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pulsarChannelBindingElement = PulsarChannelBindingElement.refract({
          namespace: 'namespace',
          persistence: 'persistent',
          compaction: 1,
          'geo-replication': ['europe', 'north america'],
          retention: {
            time: 0,
            size: 0,
          },
          ttl: 20,
          deduplication: true,
          bindingVersion: '0.1.0',
        });

        expect(sexprs(pulsarChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
