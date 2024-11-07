import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { JSONReferenceElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('JSONReference', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonReferenceElement = JSONReferenceElement.refract({
          $ref: 'https://example.com/#/json/pointer',
        });

        expect(sexprs(jsonReferenceElement)).toMatchSnapshot();
      });
    });
  });
});
