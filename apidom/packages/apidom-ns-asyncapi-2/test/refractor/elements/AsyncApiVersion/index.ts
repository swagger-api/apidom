import { expect } from 'chai';
import { sexprs } from 'apidom';

import { AsyncApiVersionElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('AsyncApiVersionElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const asyncApiVersion = AsyncApiVersionElement.refract('2.0.0');

        expect(sexprs(asyncApiVersion)).toMatchSnapshot();
      });
    });
  });
});
