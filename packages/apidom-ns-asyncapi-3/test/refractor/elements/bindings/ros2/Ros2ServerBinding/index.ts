import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { Ros2ServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Ros2ServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const ros2ServerBindingElement = Ros2ServerBindingElement.refract({
          rmwImplementation: 'rmw_fastrtps_cpp',
          domainId: 0,
          bindingVersion: '0.1.0',
        });

        expect(sexprs(ros2ServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
