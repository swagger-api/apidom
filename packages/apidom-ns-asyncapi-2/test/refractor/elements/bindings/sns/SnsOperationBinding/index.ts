import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SnsOperationBindingElement } from '../../../../../../src/index.ts';

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
