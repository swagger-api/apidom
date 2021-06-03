import { expect } from 'chai';
import { sexprs } from 'apidom';

import { MercureServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MercureServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mercureServerBindingElement = MercureServerBindingElement.refract({});

        expect(sexprs(mercureServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
