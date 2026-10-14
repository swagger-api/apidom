import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as a2aYamlAdapter from '../src/adapter.ts';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(a2aYamlAdapter);

  /**
   * Note: A2A has no version-discriminator field. See the JSON adapter's
   * test/media-types.ts for the rationale; the generic media type is the
   * expected resolution.
   */
  context('given A2A AgentCard in YAML format', function () {
    specify('should resolve to the generic A2A media type', async function () {
      const mediaType = await parser.findMediaType(
        'capabilities:\n  streaming: true\nskills: []\nname: x\nurl: https://x\nversion: 1.0.0\n',
      );

      assert.strictEqual(mediaType, 'application/vnd.a2a;version=1.0.1');
    });
  });
});
