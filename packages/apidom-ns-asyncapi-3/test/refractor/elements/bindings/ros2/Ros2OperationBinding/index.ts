import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { Ros2OperationBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Ros2OperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const ros2OperationBindingElement = Ros2OperationBindingElement.refract({
          role: 'subscriber',
          node: '/turtlesim',
          qosPolicies: {
            reliability: 'reliable',
            history: 'unknown',
            durability: 'volatile',
            lifespan: -1,
            deadline: -1,
            liveliness: 'automatic',
            leaseDuration: -1,
          },
          bindingVersion: '0.1.0',
        });

        expect(sexprs(ros2OperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
