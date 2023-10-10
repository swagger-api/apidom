import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ExampleElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ExampleElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const exampleElement = ExampleElement.refract({
          'application/json': {
            name: 'Puma',
            type: 'Dog',
            color: 'Black',
            gender: 'Female',
            breed: 'Mixed',
          },
        });

        expect(sexprs(exampleElement)).toMatchSnapshot();
      });
    });
  });
});
