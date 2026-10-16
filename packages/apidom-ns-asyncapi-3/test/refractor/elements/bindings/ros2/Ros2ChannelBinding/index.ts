import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { Ros2ChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Ros2ChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const ros2ChannelBindingElement = Ros2ChannelBindingElement.refract({});

        expect(sexprs(ros2ChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
