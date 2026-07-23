import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OAuth2SecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OAuth2SecuritySchemeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = OAuth2SecuritySchemeElement.refract({
          description: 'OAuth2',
          flows: {},
          oauth2MetadataUrl: 'https://idp.example/.well-known/oauth-authorization-server',
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
