import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as openApiYamlAdapter from '../src/adapter.ts';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(openApiYamlAdapter);

  context('given OpenAPI 3.2.0 definition in YAML format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('openapi: "3.2.0"');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+yaml;version=3.2.0');
    });
  });
});
