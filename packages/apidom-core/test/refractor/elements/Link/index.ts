import { expect } from 'chai';

import { LinkElement, sexprs } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Link', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const linkElement = LinkElement.refract([]);

        expect(sexprs(linkElement)).toMatchSnapshot();
      });
    });
  });
});
