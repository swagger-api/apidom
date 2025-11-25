import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { TagsElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('TagsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const tagsElement = TagsElement.refract([{}, {}, { $ref: '#/path/to/tag' }]);

        expect(sexprs(tagsElement)).toMatchSnapshot();
      });
    });
  });
});
