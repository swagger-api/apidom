import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SecuritySchemeElement', function () {
      specify('should refract apiKeySecurityScheme variant', function () {
        const element = SecuritySchemeElement.refract({
          apiKeySecurityScheme: { name: 'X-API-Key', location: 'header' },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });

      specify('should refract httpAuthSecurityScheme variant', function () {
        const element = SecuritySchemeElement.refract({
          httpAuthSecurityScheme: { scheme: 'bearer', bearerFormat: 'JWT' },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });

      specify('should refract mtlsSecurityScheme variant', function () {
        const element = SecuritySchemeElement.refract({
          mtlsSecurityScheme: { description: 'mTLS' },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });

      specify('should refract oauth2SecurityScheme variant', function () {
        const element = SecuritySchemeElement.refract({
          oauth2SecurityScheme: {
            flows: { clientCredentials: { tokenUrl: 'https://idp.example/token' } },
            oauth2MetadataUrl: 'https://idp.example/.well-known',
          },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });

      specify('should refract openIdConnectSecurityScheme variant', function () {
        const element = SecuritySchemeElement.refract({
          openIdConnectSecurityScheme: {
            openIdConnectUrl: 'https://idp.example/.well-known/openid-configuration',
          },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
