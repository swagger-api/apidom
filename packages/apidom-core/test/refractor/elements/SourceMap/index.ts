import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SourceMapElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Annotation', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const arrayElement = SourceMapElement.refract([
          [0, 1, 2],
          [0, 1, 2],
        ]);

        expect(sexprs(arrayElement)).toMatchSnapshot();
      });
    });
  });
});
