import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as jsonSchemaJsonAdapter from '../src/adapter.ts';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(jsonSchemaJsonAdapter);

  context('given JSON Schema 2020-12 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType(
        '{"$schema": "https://json-schema.org/draft/2020-12/schema"}',
      );

      assert.strictEqual(mediaType, 'application/schema+json;version=2020-12');
    });
  });
});
