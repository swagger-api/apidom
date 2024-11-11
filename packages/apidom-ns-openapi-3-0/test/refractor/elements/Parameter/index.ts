import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ParameterElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ParameterElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const parameterElement = ParameterElement.refract({
          name: 'token',
          in: 'header',
          description: 'token to be passed as a header',
          required: true,
          deprecated: false,
          allowEmptyValue: false,
          style: 'simple',
          explode: false,
          allowReserved: false,
          schema: {},
          example: '342398423948',
          examples: {
            example1: {},
            example2: { $ref: '#/components/examples/Example1' },
          },
          content: {
            'application/json': {},
          },
        });

        expect(sexprs(parameterElement)).toMatchSnapshot();
      });
    });
  });
});
