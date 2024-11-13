import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ParameterElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ParameterElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const parameterElement = ParameterElement.refract({
          description: 'parameter-description',
          location: 'parameter-location',
        });

        expect(sexprs(parameterElement)).toMatchSnapshot();
      });

      context('given schema field of type SchemaElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const parameterElement = ParameterElement.refract({
            schema: {},
          });

          expect(sexprs(parameterElement)).toMatchSnapshot();
        });
      });

      context('given schema field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const parameterElement = ParameterElement.refract({
            schema: {
              $ref: '#/path/to/schema',
            },
          });

          expect(sexprs(parameterElement)).toMatchSnapshot();
        });
      });
    });
  });
});
