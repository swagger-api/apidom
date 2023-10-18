import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { DefinitionsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('DefinitionsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const definitionsElement = DefinitionsElement.refract({
          schema: {},
          jsonReference: { $ref: '#/pointer' },
        });

        expect(sexprs(definitionsElement)).toMatchSnapshot();
      });
    });
  });
});
