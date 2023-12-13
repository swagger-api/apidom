import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as workflowsJsonAdapter from '../src/adapter';

describe('given adapter is used in parser', function () {
  const parser = ApiDOMParser().use(workflowsJsonAdapter);

  context('given Workflows 1.0.0 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"workflowsSpec": "1.0.0"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.workflows+json;version=1.0.0');
    });
  });

  context('given Workflows 1.0.A definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"workflowsSpec": "1.0.A"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });

  context('given Workflows future definition in JSON format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"workflows": "2.0.0"}');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });
});
