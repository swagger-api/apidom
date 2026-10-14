import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { StringListElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('StringListElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = StringListElement.refract({ list: ['read', 'write'] });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
