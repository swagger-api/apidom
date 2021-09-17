import { expect } from 'chai';
import { sexprs } from 'apidom';

import { SecurityRequirementElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SecurityRequirementElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const securityRequirementElement = SecurityRequirementElement.refract({
          petstore_auth: ['write:pets', 'read:pets'],
        });

        expect(sexprs(securityRequirementElement)).toMatchSnapshot();
      });
    });
  });
});
