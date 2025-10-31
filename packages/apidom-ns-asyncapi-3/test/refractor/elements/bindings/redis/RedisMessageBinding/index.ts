import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { RedisMessageBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('RedisMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const redisMessageBindingElement = RedisMessageBindingElement.refract({});

        expect(sexprs(redisMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
