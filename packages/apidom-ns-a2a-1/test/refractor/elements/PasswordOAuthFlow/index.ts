import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PasswordOAuthFlowElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('PasswordOAuthFlowElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = PasswordOAuthFlowElement.refract({
          tokenUrl: 'https://idp.example/token',
          scopes: {},
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
