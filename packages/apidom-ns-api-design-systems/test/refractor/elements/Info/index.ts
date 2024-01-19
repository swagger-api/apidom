import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { InfoElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('InfoElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'title of API Design System',
          description: 'description of the API Design System',
        });

        expect(sexprs(infoElement)).toMatchSnapshot();
      });
    });
  });
});
