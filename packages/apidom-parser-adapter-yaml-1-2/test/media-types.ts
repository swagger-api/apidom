import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as jsonAdapter from '../src/adapter-node';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(jsonAdapter);

  context('given string in YAML format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('key: value');

      assert.strictEqual(mediaType, 'application/yaml');
    });
  });
});
