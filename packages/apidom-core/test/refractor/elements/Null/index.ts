import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { NullElement } from '../../../../src';

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
