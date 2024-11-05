import { expect } from 'chai';

import { NullElement, sexprs } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Null', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const nullElement = NullElement.refract(null);

        expect(sexprs(nullElement)).toMatchSnapshot();
      });
    });
  });
});
