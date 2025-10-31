import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { HttpServerBindingElement } from '../../../../../../src/index.ts';

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
