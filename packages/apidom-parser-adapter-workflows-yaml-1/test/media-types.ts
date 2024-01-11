import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as workflowsYamlAdapter from '../src/adapter';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(workflowsYamlAdapter);

  context('given Workflows 1.0.0 definition in YAML format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('workflowsSpec: "1.0.0"');

      assert.strictEqual(mediaType, 'application/vnd.oai.workflows+yaml;version=1.0.0');
    });
  });

  context('given Workflows 1.0.A definition in YAML format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('workflowsSpec: "1.0.A"');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });

  context('given Workflows future definition in YAML format', function () {
    specify('should not find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('workflows: "2.0.0"');

      assert.strictEqual(mediaType, 'application/octet-stream');
    });
  });
});
