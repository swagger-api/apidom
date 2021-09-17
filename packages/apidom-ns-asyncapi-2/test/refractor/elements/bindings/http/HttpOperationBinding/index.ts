import { expect } from 'chai';
import { sexprs } from 'apidom';

import { HttpOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('HttpOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const httpOperationBindingElement = HttpOperationBindingElement.refract({
          type: 'request',
          method: 'GET',
          query: {},
          bindingVersion: '0.1.0',
        });

        expect(sexprs(httpOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
