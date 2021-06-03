import { expect } from 'chai';
import { sexprs } from 'apidom';

import { MercureOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MercureOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mercureOperationBindingElement = MercureOperationBindingElement.refract({});

        expect(sexprs(mercureOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
