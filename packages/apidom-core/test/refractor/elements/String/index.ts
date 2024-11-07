import { expect } from 'chai';

import { StringElement, sexprs } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('String', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const stringElement = StringElement.refract('ab');

        expect(sexprs(stringElement)).toMatchSnapshot();
      });
    });
  });
});
