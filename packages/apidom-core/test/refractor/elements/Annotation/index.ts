import { expect } from 'chai';

import { AnnotationElement, sexprs } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Annotation', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const arrayElement = AnnotationElement.refract('warning');

        expect(sexprs(arrayElement)).toMatchSnapshot();
      });
    });
  });
});
