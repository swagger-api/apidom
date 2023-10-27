import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as openApiJsonAdapter from '../src/adapter';

describe('given adapter is used in parser', function () {
  const parser = ApiDOMParser().use(openApiJsonAdapter);

  context('given OpenAPI 2.0 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"swagger": "2.0"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+json;version=2.0');
    });
  });

  context('given OpenAPI 3.0.3 definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.1.0"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });
});
