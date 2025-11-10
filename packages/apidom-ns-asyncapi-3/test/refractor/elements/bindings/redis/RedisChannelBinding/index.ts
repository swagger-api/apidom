import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { RedisChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('RedisChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const redisChannelBindingElement = RedisChannelBindingElement.refract({});

        expect(sexprs(redisChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
