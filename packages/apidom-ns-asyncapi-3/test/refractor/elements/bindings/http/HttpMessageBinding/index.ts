import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { HttpMessageBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('HttpMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const httpMessageBindingElement = HttpMessageBindingElement.refract({
          headers: {},
          statusCode: 200,
          bindingVersion: '0.3.0',
        });

        expect(sexprs(httpMessageBindingElement)).toMatchSnapshot();
      });

      context('given query field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const httpMessageBindingElement = HttpMessageBindingElement.refract({
            headers: {
              $ref: '#/pointer',
            },
            statusCode: 200,
            bindingVersion: '0.3.0',
          });

          expect(sexprs(httpMessageBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
