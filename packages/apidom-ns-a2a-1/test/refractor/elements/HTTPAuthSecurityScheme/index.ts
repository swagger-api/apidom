import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { HTTPAuthSecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('HTTPAuthSecuritySchemeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = HTTPAuthSecuritySchemeElement.refract({
          description: 'Bearer',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
