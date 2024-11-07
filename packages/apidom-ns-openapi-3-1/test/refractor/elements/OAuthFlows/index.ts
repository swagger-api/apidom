import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OAuthFlowsElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OAuthFlowsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const oauthFlowsElement = OAuthFlowsElement.refract({
          implicit: {},
          password: {},
          clientCredentials: {},
          authorizationCode: {},
        });

        expect(sexprs(oauthFlowsElement)).toMatchSnapshot();
      });
    });
  });
});
