import { expect } from 'chai';
import { sexprs } from 'apidom';

import { SnsOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SnsOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const snsOperationBindingElement = SnsOperationBindingElement.refract({});

        expect(sexprs(snsOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
