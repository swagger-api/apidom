import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MainElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MainElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mainElement = MainElement.refract({
          version: '2021-05-07',
          info: {},
          principles: [{}],
          standards: [{}],
          scenarios: [{}],
        });

        expect(sexprs(mainElement)).toMatchSnapshot();
      });
    });
  });
});
