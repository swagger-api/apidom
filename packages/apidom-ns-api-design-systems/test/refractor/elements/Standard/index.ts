import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { StandardElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('StandardElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const standardElement = StandardElement.refract({
          name: 'name used to reference them standard throughout the document',
          description: 'description of the standard requirement',
          ini: 'urn:ietf:rfc:7232',
          level: 'should',
        });

        expect(sexprs(standardElement)).toMatchSnapshot();
      });
    });
  });
});
