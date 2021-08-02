import { expect } from 'chai';
import { sexprs } from 'apidom';

import { HttpMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('HttpMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const httpMessageBindingElement = HttpMessageBindingElement.refract({
          headers: {},
          bindingVersion: '0.1.0',
        });

        expect(sexprs(httpMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
