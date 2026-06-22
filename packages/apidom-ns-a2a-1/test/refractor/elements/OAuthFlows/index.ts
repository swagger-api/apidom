import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OAuthFlowsElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OAuthFlowsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = OAuthFlowsElement.refract({
          authorizationCode: {
            authorizationUrl: 'https://x.example/a',
            tokenUrl: 'https://x.example/t',
          },
          clientCredentials: {
            tokenUrl: 'https://x.example/t',
          },
          deviceCode: {
            deviceAuthorizationUrl: 'https://x.example/d',
            tokenUrl: 'https://x.example/t',
          },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
