import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ArazzoSpecification1Element } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ArazzoSpecification1Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const arazzoSpecification1Element = ArazzoSpecification1Element.refract({
          arazzo: '1.0.1',
          info: {},
          sourceDescriptions: [{}],
          workflows: [{}],
          components: {},
        });

        expect(sexprs(arazzoSpecification1Element)).toMatchSnapshot();
      });
    });
  });
});
