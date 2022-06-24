import { expect } from 'chai';

import { ParseResultElement, sexprs } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Annotation', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const arrayElement = ParseResultElement.refract([]);

        expect(sexprs(arrayElement)).toMatchSnapshot();
      });
    });
  });
});
