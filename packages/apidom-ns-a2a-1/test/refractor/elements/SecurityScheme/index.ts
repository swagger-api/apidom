import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SecuritySchemeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = SecuritySchemeElement.refract({
          apiKeySecurityScheme: { name: 'X-API-Key', location: 'header' },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
