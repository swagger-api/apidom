import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as openApiJsonAdapter from '../src/adapter';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(openApiJsonAdapter);

  context('given OpenAPI 3.1.0 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.1.0"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+json;version=3.1.0');
    });
  });
});
