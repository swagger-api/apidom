import { MediaTypes } from '@swagger-api/apidom-core';

export class ApiDesignSystemsMediaTypes extends MediaTypes<string> {
  forFormat(format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'apidesignsystems;version' : format;
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

const mediaTypes = new ApiDesignSystemsMediaTypes(
  'application/vnd.aai.apidesignsystems;version=2021-05-07',
  'application/vnd.aai.apidesignsystems+json;version=2021-05-07',
  'application/vnd.aai.apidesignsystems+yaml;version=2021-05-07',
);

export default mediaTypes;
