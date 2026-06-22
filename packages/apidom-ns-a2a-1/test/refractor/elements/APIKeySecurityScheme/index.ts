import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { APIKeySecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('APIKeySecuritySchemeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = APIKeySecuritySchemeElement.refract({
          description: 'API key',
          name: 'X-API-Key',
          location: 'header',
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
