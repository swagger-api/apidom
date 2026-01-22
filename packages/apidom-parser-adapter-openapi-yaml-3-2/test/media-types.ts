import { assert } from 'chai';

import mediaTypes from '../src/media-types.ts';

describe('media-types', function () {
  specify('should expose media types', function () {
    assert.isArray(mediaTypes.latest());
    assert.lengthOf(mediaTypes.latest(), 2);
  });
});
