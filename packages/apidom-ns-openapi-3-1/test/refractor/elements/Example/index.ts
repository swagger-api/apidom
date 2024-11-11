import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ExampleElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ExampleElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const exampleElement = ExampleElement.refract({
          summary: 'A pet store manager.',
          description: 'This is a sample server for a pet store.',
          value: 1,
          externalValue: 'http://example.com/external-value',
        });

        expect(sexprs(exampleElement)).toMatchSnapshot();
      });
    });
  });
});
