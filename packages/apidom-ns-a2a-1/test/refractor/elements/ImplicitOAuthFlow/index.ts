import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ImplicitOAuthFlowElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ImplicitOAuthFlowElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = ImplicitOAuthFlowElement.refract({
          authorizationUrl: 'https://idp.example/authorize',
          refreshUrl: 'https://idp.example/refresh',
          scopes: {},
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
