import { assert } from 'chai';

import { mediaTypes } from '../src/index.ts';

describe('media-types', function () {
  context('findBy', function () {
    context('given no version and format', function () {
      specify('should return latest generic version', function () {
        const mediaType = mediaTypes.findBy();

        assert.strictEqual(mediaType, 'application/vnd.aai.apidesignsystems;version=2021-05-07');
      });
    });

    context('given version and no format', function () {
      specify('should return generic version', function () {
        const mediaType = mediaTypes.findBy('2021-05-07');

        assert.strictEqual(mediaType, 'application/vnd.aai.apidesignsystems;version=2021-05-07');
      });
    });

    context('given version and json format', function () {
      specify('should return json version', function () {
        const mediaType = mediaTypes.findBy('2021-05-07', 'json');

        assert.strictEqual(
          mediaType,
          'application/vnd.aai.apidesignsystems+json;version=2021-05-07',
        );
      });
    });

    context('given version and yaml format', function () {
      specify('should return yaml version', function () {
        const mediaType = mediaTypes.findBy('2021-05-07', 'yaml');

        assert.strictEqual(
          mediaType,
          'application/vnd.aai.apidesignsystems+yaml;version=2021-05-07',
        );
      });
    });

    context('given unknown version', function () {
      specify('should return unknown media type', function () {
        const mediaType = mediaTypes.findBy('2021-05-08');

        assert.strictEqual(mediaType, mediaTypes.unknownMediaType);
      });
    });

    context('given unknown format', function () {
      specify('should return unknown media type', function () {
        // @ts-ignore
        const mediaType = mediaTypes.findBy(undefined, 'test');

        assert.strictEqual(mediaType, mediaTypes.unknownMediaType);
      });
    });
  });
});
