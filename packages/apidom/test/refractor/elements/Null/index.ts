import { expect } from 'chai';
import { sexprs } from 'apidom';

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
