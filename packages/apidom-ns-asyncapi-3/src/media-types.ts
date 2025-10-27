import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

export type Format = 'generic' | 'json' | 'yaml';

export class AsyncAPIMediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'asyncapi;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = '3.0.0', format: Format = 'generic') {
    const search =
      format === 'generic'
        ? `vnd.asyncapi;version=${version}`
        : `vnd.asyncapi+${format};version=${version}`;
    const found = this.find((mediaType) => mediaType.includes(search));

    return found || this.unknownMediaType;
  }

  latest(format: Format = 'generic') {
    return last(this.filterByFormat(format)) as string;
  }
}

const mediaTypes = new AsyncAPIMediaTypes(
  // Official AsyncAPI v3 vendor media types
  'application/vnd.asyncapi;version=3.0.0',
  'application/vnd.asyncapi+json;version=3.0.0',
  'application/vnd.asyncapi+yaml;version=3.0.0',
  'application/vnd.asyncapi;version=3.0.1',
  'application/vnd.asyncapi+json;version=3.0.1',
  'application/vnd.asyncapi+yaml;version=3.0.1',
  'application/vnd.aai.asyncapi;version=3.0.0',
  'application/vnd.aai.asyncapi+json;version=3.0.0',
  'application/vnd.aai.asyncapi+yaml;version=3.0.0',
  'application/vnd.aai.asyncapi;version=3.0.1',
  'application/vnd.aai.asyncapi+json;version=3.0.1',
  'application/vnd.aai.asyncapi+yaml;version=3.0.1'
);

export default mediaTypes;
