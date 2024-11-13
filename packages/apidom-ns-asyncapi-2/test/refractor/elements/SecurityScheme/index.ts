import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SecurityScheme', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const securitySchemeElement = SecuritySchemeElement.refract({
          type: 'security-scheme-type',
          description: 'security-scheme-description',
          name: 'security-scheme-name',
          in: 'security-scheme-in',
          scheme: 'security-scheme-scheme',
          bearerFormat: 'security-scheme-bearerFormat',
          flows: {},
          openIdConnectUrl: 'security-scheme-openIdConnectUrl',
        });

        expect(sexprs(securitySchemeElement)).toMatchSnapshot();
      });
    });
  });
});
