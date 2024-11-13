import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OAuthFlowElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OAuthFlowElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const oAuthFlowElement = OAuthFlowElement.refract({
          authorizationUrl: 'oauth-flow-authorizationURL',
          tokenUrl: 'oauth-flow-tokenUrl',
          refreshUrl: 'oauth-flow-refreshUrl',
          scopes: {
            'write:pets': 'modify pets in your account',
            'read:pets': 'read your pets',
          },
        });

        expect(sexprs(oAuthFlowElement)).toMatchSnapshot();
      });
    });
  });
});
