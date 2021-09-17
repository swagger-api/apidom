import { expect } from 'chai';
import { sexprs } from 'apidom';

import { StompMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('StompMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const stompMessageBindingElement = StompMessageBindingElement.refract({});

        expect(sexprs(stompMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
