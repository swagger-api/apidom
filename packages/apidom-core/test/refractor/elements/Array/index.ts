import { expect } from 'chai';

import { ArrayElement, sexprs } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Array', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const arrayElement = ArrayElement.refract(['a', 'b']);

        expect(sexprs(arrayElement)).toMatchSnapshot();
      });
    });
  });
});
