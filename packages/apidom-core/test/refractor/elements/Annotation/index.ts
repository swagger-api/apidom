import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AnnotationElement } from '../../../../src';

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
