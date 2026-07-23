import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { DeviceCodeOAuthFlowElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('DeviceCodeOAuthFlowElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = DeviceCodeOAuthFlowElement.refract({
          deviceAuthorizationUrl: 'https://idp.example/device',
          tokenUrl: 'https://idp.example/token',
          refreshUrl: 'https://idp.example/refresh',
          scopes: {},
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
