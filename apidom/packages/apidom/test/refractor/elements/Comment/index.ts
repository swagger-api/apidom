import { expect } from 'chai';
import { sexprs } from 'apidom';

import { CommentElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Annotation', function () {
      specify('should refract to generic ApiDOM tree', function () {
        const arrayElement = CommentElement.refract('comment');

        expect(sexprs(arrayElement)).toMatchSnapshot();
      });
    });
  });
});
