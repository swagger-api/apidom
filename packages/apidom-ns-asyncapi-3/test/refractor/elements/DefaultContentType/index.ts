import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { DefaultContentTypeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('DefaultContentTypeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const defaultContentTypeElement = DefaultContentTypeElement.refract('application/json');

        expect(sexprs(defaultContentTypeElement)).toMatchSnapshot();
      });
    });
  });
});
