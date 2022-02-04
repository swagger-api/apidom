import { MediaTypes } from '@swagger-api/apidom-core';

export class OpenAPIMediaTypes extends MediaTypes<string> {
  forFormat(format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'openapi;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  latest(format = 'generic') {
    if (format === 'json') {
      return this[1];
    }
    if (format === 'yaml') {
      return this[2];
    }

    return this[0];
  }
}

const mediaTypes = new OpenAPIMediaTypes(
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+json;version=3.1.0',
  'application/vnd.oai.openapi+yaml;version=3.1.0',
);

export default mediaTypes;
