import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { StandardIdentifierElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('StandardIdentifierElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const standardIdentifierElement = StandardIdentifierElement.refract([
          'http',
          'request',
          'method',
        ]);

        expect(sexprs(standardIdentifierElement)).toMatchSnapshot();
      });
    });
  });
});
