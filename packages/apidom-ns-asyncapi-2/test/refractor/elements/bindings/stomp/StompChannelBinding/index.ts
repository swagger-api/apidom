import { expect } from 'chai';
import { sexprs } from 'apidom';

import { StompChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('StompChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const stompChannelBindingElement = StompChannelBindingElement.refract({});

        expect(sexprs(stompChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
