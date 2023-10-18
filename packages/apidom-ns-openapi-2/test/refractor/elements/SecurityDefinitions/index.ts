import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SecurityDefinitionsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SecurityDefinitionsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const securityDefinitionsElement = SecurityDefinitionsElement.refract({
          api_key: {},
          petstore_auth: {},
        });

        expect(sexprs(securityDefinitionsElement)).toMatchSnapshot();
      });
    });
  });
});
