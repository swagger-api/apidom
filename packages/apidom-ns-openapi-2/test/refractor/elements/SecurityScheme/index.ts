import { expect, assert } from 'chai';
import { sexprs, includesClasses } from '@swagger-api/apidom-core';

import { SecuritySchemeElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SecuritySchemeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const securitySchemeElement = SecuritySchemeElement.refract({
          type: 'apiKey',
          description: 'simple description',
          name: 'api_key',
          in: 'header',
          flow: 'implicit',
          authorizationUrl: 'https://swagger.io/api/oauth/dialog',
          tokenUrl: 'https://swagger.io/api/oauth/token-url',
          scopes: {
            'write:pets': 'modify pets in your account',
            'read:pets': 'read your pets',
          },
        });

        expect(sexprs(securitySchemeElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const securitySchemeElement = SecuritySchemeElement.refract({
          type: 'apiKey',
          'x-extension': 'extension',
        }) as SecuritySchemeElement;

        assert.isFalse(
          includesClasses(['specification-extension'], securitySchemeElement.getMember('type')),
        );
        assert.isTrue(
          includesClasses(
            ['specification-extension'],
            securitySchemeElement.getMember('x-extension'),
          ),
        );
      });
    });
  });
});
