import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ClientCredentialsOAuthFlowElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ClientCredentialsOAuthFlowElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = ClientCredentialsOAuthFlowElement.refract({
          tokenUrl: 'https://idp.example/token',
          scopes: { admin: 'Admin' },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
