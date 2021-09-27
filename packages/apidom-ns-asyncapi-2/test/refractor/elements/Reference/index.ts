import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ReferenceElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const referenceElement = ReferenceElement.refract({
          $ref: '#/path/to/somewhere',
        });

        expect(sexprs(referenceElement)).toMatchSnapshot();
      });
    });
  });
});
