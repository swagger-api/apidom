import { expect } from 'chai';

import { ObjectElement, sexprs } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Object', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const objectElement = ObjectElement.refract({
          a: 'b',
        });

        expect(sexprs(objectElement)).toMatchSnapshot();
      });
    });
  });
});
