import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ObjectElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Object', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const objectElement = ObjectElement.refract({
          a: 'b',
        });

        expect(sexprs(objectElement)).toMatchSnapshot();
      });
    });
  });
});
