import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AuthorizationCodeOAuthFlowElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AuthorizationCodeOAuthFlowElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = AuthorizationCodeOAuthFlowElement.refract({
          authorizationUrl: 'https://idp.example/authorize',
          tokenUrl: 'https://idp.example/token',
          pkceRequired: true,
          scopes: { read: 'Read access' },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
