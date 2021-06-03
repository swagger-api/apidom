import { expect } from 'chai';
import { sexprs } from 'apidom';

import { RedisMessageBindingElement } from '../../../../../../src';

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
