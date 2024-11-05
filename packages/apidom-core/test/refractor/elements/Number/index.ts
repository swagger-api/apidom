import { expect } from 'chai';

import { NumberElement, sexprs } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Number', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const numberElement = NumberElement.refract(1);

        expect(sexprs(numberElement)).toMatchSnapshot();
      });
    });
  });
});
