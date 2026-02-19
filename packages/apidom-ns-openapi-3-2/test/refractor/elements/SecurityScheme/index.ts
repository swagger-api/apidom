import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SecuritySchemeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const securitySchemeElement = SecuritySchemeElement.refract({
          type: 'security-scheme-type',
          description: 'This is a sample server for a pet store.',
          name: 'security-scheme-name',
          in: 'path',
          scheme: 'security-scheme-scheme',
          bearerFormat: 'security-scheme-bearerFormat',
          flows: {},
          openIdConnectUrl: 'http://example.com',
        });

        expect(sexprs(securitySchemeElement)).toMatchSnapshot();
      });
    });
  });
});
