import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as asyncApiJsonAdapter from '../src/adapter.ts';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(asyncApiJsonAdapter);

  context('given AsyncAPI 3.0.0 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"asyncapi": "3.0.0"}');

      assert.strictEqual(mediaType, 'application/vnd.aai.asyncapi+json;version=3.0.0');
    });
  });
});
