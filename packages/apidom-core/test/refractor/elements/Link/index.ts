import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { LinkElement } from '../../../../src';

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
