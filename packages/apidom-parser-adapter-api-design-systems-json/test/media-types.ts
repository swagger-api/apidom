import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as apiDesignSystemsJsonAdapter from '../src/adapter';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(apiDesignSystemsJsonAdapter);

  context('given API Design Systems definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"version": "2021-05-07"}');

      assert.strictEqual(mediaType, 'application/vnd.aai.apidesignsystems+json;version=2021-05-07');
    });
  });
});
