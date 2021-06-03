import { expect } from 'chai';
import { sexprs } from 'apidom';

import { MercureMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MercureMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mercureMessageBindingElement = MercureMessageBindingElement.refract({});

        expect(sexprs(mercureMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
