import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { DiscriminatorElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('DiscriminatorElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const discriminatorElement = DiscriminatorElement.refract({
          propertyName: 'prop-name',
          mapping: {
            string: 'string',
          },
        });

        expect(sexprs(discriminatorElement)).toMatchSnapshot();
      });
    });
  });
});
