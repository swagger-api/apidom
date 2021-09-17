import { expect } from 'chai';
import { sexprs } from 'apidom';

import { TagElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('TagElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const tagElement = TagElement.refract({
          name: 'tag-name',
          description: 'tag-description',
          externalDocs: {},
        });

        expect(sexprs(tagElement)).toMatchSnapshot();
      });
    });
  });
});
