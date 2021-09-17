import { expect } from 'chai';
import { sexprs } from 'apidom';

import { DiscriminatorElement } from '../../../../src';

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
