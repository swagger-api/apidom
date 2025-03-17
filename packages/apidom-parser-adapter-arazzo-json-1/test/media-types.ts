import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as arazzoJsonAdapter from '../src/adapter.ts';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(arazzoJsonAdapter);

  context('given Arazzo 1.0.0 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"arazzo": "1.0.0"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.workflows+json;version=1.0.0');
    });
  });

  context('given Arazzo 1.0.1 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"arazzo": "1.0.1"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.workflows+json;version=1.0.1');
    });
  });

  context('given Arazzo 1.0.A definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"arazzo": "1.0.A"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });

  context('given Arazzo future definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"arazzo": "2.0.0"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });
});
