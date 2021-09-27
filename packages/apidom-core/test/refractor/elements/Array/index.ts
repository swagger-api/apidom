import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ArrayElement } from '../../../../src';

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
