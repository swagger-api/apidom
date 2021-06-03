import { expect } from 'chai';
import { sexprs } from 'apidom';

import { StompServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('StompServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const stompServerBindingElement = StompServerBindingElement.refract({});

        expect(sexprs(stompServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
