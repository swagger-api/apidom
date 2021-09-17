import { expect } from 'chai';
import { sexprs } from 'apidom';

import { RedisServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('RedisServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const redisServerBindingElement = RedisServerBindingElement.refract({});

        expect(sexprs(redisServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
