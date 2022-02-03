import { MediaTypes } from '@swagger-api/apidom-core';

class AsyncAPIMediaTypes extends MediaTypes<string> {
  forFormat(format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'asyncapi;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  latest(format = 'generic') {
    if (format === 'json') {
      return this[7];
    }
    if (format === 'yaml') {
      return this[8];
    }

    return this[6];
  }
}

const mediaTypes = new AsyncAPIMediaTypes(
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
  'application/vnd.aai.asyncapi+yaml;version=2.0.0',
  'application/vnd.aai.asyncapi;version=2.1.0',
  'application/vnd.aai.asyncapi+json;version=2.1.0',
  'application/vnd.aai.asyncapi+yaml;version=2.1.0',
  'application/vnd.aai.asyncapi;version=2.2.0',
  'application/vnd.aai.asyncapi+json;version=2.2.0',
  'application/vnd.aai.asyncapi+yaml;version=2.2.0',
);

export default mediaTypes;
