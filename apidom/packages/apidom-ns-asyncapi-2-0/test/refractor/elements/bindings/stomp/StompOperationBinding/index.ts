import { expect } from 'chai';
import { sexprs } from 'apidom';

import { StompOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('StompOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const stompOperationBindingElement = StompOperationBindingElement.refract({});

        expect(sexprs(stompOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
