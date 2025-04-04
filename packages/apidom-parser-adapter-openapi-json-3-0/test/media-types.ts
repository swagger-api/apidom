import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as openApiJsonAdapter from '../src/adapter.ts';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(openApiJsonAdapter);

  context('given OpenAPI 3.0.4 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.0.4"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+json;version=3.0.4');
    });
  });

  context('given OpenAPI 3.0.3 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.0.3"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+json;version=3.0.3');
    });
  });

  context('given OpenAPI 3.0.2 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.0.2"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+json;version=3.0.2');
    });
  });

  context('given OpenAPI 3.0.1 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.0.1"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+json;version=3.0.1');
    });
  });

  context('given OpenAPI 3.0.0 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.0.0"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+json;version=3.0.0');
    });
  });

  context('given OpenAPI 3.0.0-rc2 definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.0.0-rc2"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });

  context('given OpenAPI 3.0.0-rc1 definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.0.0-rc1"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });

  context('given OpenAPI 3.0.0-rc0 definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.0.0-rc0"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });

  context('given OpenAPI 3.1.0 definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.1.0"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });
});
