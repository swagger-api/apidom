import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OpenIdConnectSecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OpenIdConnectSecuritySchemeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = OpenIdConnectSecuritySchemeElement.refract({
          description: 'OIDC',
          openIdConnectUrl: 'https://idp.example/.well-known/openid-configuration',
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
