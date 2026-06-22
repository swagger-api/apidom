import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SecurityRequirementElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SecurityRequirementElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = SecurityRequirementElement.refract({
          schemes: { 'oauth-scheme': { list: ['read'] } },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
