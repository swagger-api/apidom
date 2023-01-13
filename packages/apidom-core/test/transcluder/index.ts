import { assert } from 'chai';

import { NumberElement, StringElement } from '../../src';
import { transclude } from '../../src/transcluder';

describe('transclude', function () {
  context('shorcuts', function () {
    context('given search parameter is identical with transcluding element', function () {
      specify('should return replace element', function () {
        const search = new StringElement('test');
        const replace = new NumberElement(1);
        const element = search;
        const transcluded = transclude(search, replace, element);

        assert.strictEqual(transcluded, replace);
      });
    });

    context('given search parameter is identical replace parameter', function () {
      specify('should return transcluding element', function () {
        const search = new StringElement('test');
        const replace = search;
        const element = new NumberElement(1);
        const transcluded = transclude(search, replace, element);

        assert.strictEqual(transcluded, element);
      });
    });
  });
});
