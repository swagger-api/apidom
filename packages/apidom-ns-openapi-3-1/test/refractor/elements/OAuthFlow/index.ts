import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OAuthFlowElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OAuthFlowElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const oauthFlowElement = OAuthFlowElement.refract({
          authorizationUrl: 'http://example.com/authorizatin-url',
          tokenUrl: 'http://example.com/token-url',
          refreshUrl: 'http://example.com/refresh-url',
          scopes: {
            string: 'string',
          },
        });

        expect(sexprs(oauthFlowElement)).toMatchSnapshot();
      });
    });
  });
});
