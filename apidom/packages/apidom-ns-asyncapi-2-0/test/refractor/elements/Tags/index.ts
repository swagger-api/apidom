import { expect } from 'chai';
import { sexprs } from 'apidom';

import { TagsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('TagsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const tagsElement = TagsElement.refract([{}, {}]);

        expect(sexprs(tagsElement)).toMatchSnapshot();
      });
    });
  });
});
