import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { Ros2MessageBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Ros2MessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const ros2MessageBindingElement = Ros2MessageBindingElement.refract({});

        expect(sexprs(ros2MessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
