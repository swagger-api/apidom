import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { IdentifierElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('IdentifierElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const identifierElement = IdentifierElement.refract(
          'urn:com:smartylighting:streetlights:server',
        );

        expect(sexprs(identifierElement)).toMatchSnapshot();
      });
    });
  });
});
