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
          enum: ['value1', 'value2'],
          default: 'value1',
          examples: ['value1', 'value2'],
        });

        expect(sexprs(parameterElement)).toMatchSnapshot();
      });
    });
  });
});
