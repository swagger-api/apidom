import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { InfoElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('InfoElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'A pet purchasing workflow',
          summary: 'This workflow showcases how to purchase a pet through a sequence of API calls',
          description:
            'This workflow walks you through the steps of `searching` for, `selecting`, and `purchasing` an available pet.\n',
          version: '1.0.1',
        });

        expect(sexprs(infoElement)).toMatchSnapshot();
      });
    });
  });
});
