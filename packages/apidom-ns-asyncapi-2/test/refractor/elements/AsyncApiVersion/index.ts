import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AsyncApiVersionElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AsyncApiVersionElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const asyncApiVersion = AsyncApiVersionElement.refract('2.6.0');

        expect(sexprs(asyncApiVersion)).toMatchSnapshot();
      });
    });
  });
});
