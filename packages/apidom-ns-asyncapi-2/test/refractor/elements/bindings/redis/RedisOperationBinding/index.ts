import { expect } from 'chai';
import { sexprs } from 'apidom';

import { RedisOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('RedisOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const redisOperationBindingElement = RedisOperationBindingElement.refract({});

        expect(sexprs(redisOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
