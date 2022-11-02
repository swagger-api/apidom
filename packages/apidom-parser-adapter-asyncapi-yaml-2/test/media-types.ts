import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as asyncApiYamlAdapter from '../src/adapter';

describe('given adapter is used in parser', function () {
  const parser = ApiDOMParser().use(asyncApiYamlAdapter);

  context('given AsyncAPI 2.5.0 definition in YAML format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('asyncapi: "2.5.0"');

      assert.strictEqual(mediaType, 'application/vnd.aai.asyncapi+yaml;version=2.5.0');
    });
  });
});
