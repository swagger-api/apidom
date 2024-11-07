import { expect } from 'chai';

import { BooleanElement, sexprs } from '../../../../src/index.ts';

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
