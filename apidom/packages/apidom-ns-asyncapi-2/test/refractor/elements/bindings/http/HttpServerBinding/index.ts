import { expect } from 'chai';
import { sexprs } from 'apidom';

import { HttpServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('HttpServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const httpServerBindingElement = HttpServerBindingElement.refract({});

        expect(sexprs(httpServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
