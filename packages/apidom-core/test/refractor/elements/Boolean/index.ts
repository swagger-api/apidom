import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { BooleanElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Boolean', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const booleanElement = BooleanElement.refract(true);

        expect(sexprs(booleanElement)).toMatchSnapshot();
      });
    });
  });
});
