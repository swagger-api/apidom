import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

type Format = 'generic' | 'json' | 'yaml';

export class ApiDesignSystemsMediaTypes extends MediaTypes<string> {
  forFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'apidesignsystems;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  latest(format: Format = 'generic') {
    return last(this.forFormat(format)) as string;
  }
}

const mediaTypes = new ApiDesignSystemsMediaTypes(
  'application/vnd.aai.apidesignsystems;version=2021-05-07',
  'application/vnd.aai.apidesignsystems+json;version=2021-05-07',
  'application/vnd.aai.apidesignsystems+yaml;version=2021-05-07',
);

export default mediaTypes;
