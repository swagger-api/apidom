import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { StringElement } from '../../../../src';

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
