import { assert } from 'chai';

import { mediaTypes } from '../src';

describe('media-types', function () {
  context('findBy', function () {
    context('given no version and format', function () {
      specify('should return latest generic version', function () {
        const mediaType = mediaTypes.findBy();

        assert.strictEqual(mediaType, 'application/vnd.aai.asyncapi;version=2.5.0');
      });
    });

    context('given version and no format', function () {
      specify('should return generic version', function () {
        const mediaType = mediaTypes.findBy('2.5.0');

        assert.strictEqual(mediaType, 'application/vnd.aai.asyncapi;version=2.5.0');
      });
    });

    context('given version and json format', function () {
      specify('should return json version', function () {
        const mediaType = mediaTypes.findBy('2.5.0', 'json');

        assert.strictEqual(mediaType, 'application/vnd.aai.asyncapi+json;version=2.5.0');
      });
    });

    context('given version and yaml format', function () {
      specify('should return yaml version', function () {
        const mediaType = mediaTypes.findBy('2.5.0', 'yaml');

        assert.strictEqual(mediaType, 'application/vnd.aai.asyncapi+yaml;version=2.5.0');
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
