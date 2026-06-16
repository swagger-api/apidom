import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as a2aJsonAdapter from '../src/adapter.ts';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(a2aJsonAdapter);

  /**
   * Note: A2A has no version-discriminator field in the document, so the
   * detection regex has no `version_json` / `version_yaml` named groups. As a
   * result `ApiDOMParser.findMediaType` resolves to the generic media type
   * rather than the format-specific one. Consumers that need format-specific
   * routing should set the `mediaType` on the `File` explicitly.
   */
  context('given A2A AgentCard in JSON format', function () {
    specify('should resolve to the generic A2A media type', async function () {
      const mediaType = await parser.findMediaType(
        '{"capabilities": {"streaming": true}, "skills": [], "name": "x", "url": "https://x", "version": "1.0.0"}',
      );

      assert.strictEqual(mediaType, 'application/vnd.a2a;version=1.0.0');
    });
  });

  context('given a non-A2A JSON document', function () {
    specify('should not match A2A media type', async function () {
      const mediaType = await parser.findMediaType('{"foo": "bar"}');

      assert.notStrictEqual(mediaType, 'application/vnd.a2a;version=1.0.0');
    });
  });
});
