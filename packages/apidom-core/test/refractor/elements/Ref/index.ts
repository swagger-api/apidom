import { expect } from 'chai';

import { sexprs, RefElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Ref', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const linkElement = RefElement.refract([]);

        expect(sexprs(linkElement)).toMatchSnapshot();
      });
    });
  });
});
