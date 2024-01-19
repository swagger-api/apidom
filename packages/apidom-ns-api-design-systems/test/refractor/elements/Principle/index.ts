import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PrincipleElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('PrincipleElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const principleElement = PrincipleElement.refract({
          name: 'name used to reference them standard throughout the document',
          description: 'description of the principle requirement',
          ini: 'urn:apidesign.systems:principle:rmm:level3',
          level: 'may',
        });

        expect(sexprs(principleElement)).toMatchSnapshot();
      });
    });
  });
});
