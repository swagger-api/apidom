import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

type Format = 'generic' | 'json' | 'yaml';

export class OpenAPIMediaTypes extends MediaTypes<string> {
  forFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'openapi;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  latest(format: Format = 'generic') {
    return last(this.forFormat(format)) as string;
  }
}

const mediaTypes = new OpenAPIMediaTypes(
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+json;version=3.1.0',
  'application/vnd.oai.openapi+yaml;version=3.1.0',
);

export default mediaTypes;
