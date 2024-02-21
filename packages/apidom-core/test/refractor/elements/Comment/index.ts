import { assert, expect } from 'chai';

import { CommentElement, StringElement, sexprs } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Comment', function () {
      context('given JavaScript primitive', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const commentElement = CommentElement.refract('comment');

          expect(sexprs(commentElement)).toMatchSnapshot();
        });
      });

      context('given generic ApiDOM element', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const stringElement = new StringElement('comment');
          const commentElement = CommentElement.refract(stringElement);

          expect(sexprs(commentElement)).toMatchSnapshot();
        });

        specify('should retain attributes', function () {
          const stringElement = new StringElement('comment', undefined, { attr: true });
          const commentElement = CommentElement.refract(stringElement);

          assert.isTrue(commentElement.attributes.get('attr').equals(true));
        });

        specify('should retain meta', function () {
          const stringElement = new StringElement('comment', { meta: true }, undefined);
          const commentElement = CommentElement.refract(stringElement);

          assert.isTrue(commentElement.meta.get('meta').equals(true));
        });
      });
    });
  });
});
