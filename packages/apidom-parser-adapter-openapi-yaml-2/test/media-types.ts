import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as openApiYAMLAdapter from '../src/adapter';

describe('given adapter is used in parser', function () {
  const parser = ApiDOMParser().use(openApiYAMLAdapter);

  context('given OpenAPI 2.0 definition in YAML format', function () {
    context('and single quotes are used', function () {
      specify('should find appropriate media type', async function () {
        const mediaType = await parser.findMediaType("swagger: '2.0'");

        assert.strictEqual(mediaType, 'application/vnd.oai.openapi+yaml;version=2.0');
      });
    });

    context('and double quotes are used', function () {
      specify('should find appropriate media type', async function () {
        const mediaType = await parser.findMediaType('swagger: "2.0"');

        assert.strictEqual(mediaType, 'application/vnd.oai.openapi+yaml;version=2.0');
      });
    });

    context('and no quotes are used', function () {
      specify('should not find appropriate media type', async function () {
        const mediaType = await parser.findMediaType('swagger: 2.0');

        assert.strictEqual(mediaType, 'application/octet-stream');
      });
    });
  });

  context('given OpenAPI 3.1.0 definition in YAML format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('openapi: "3.1.0"');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });
});
