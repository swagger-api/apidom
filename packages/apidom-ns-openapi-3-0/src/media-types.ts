import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

type Format = 'generic' | 'json' | 'yaml';

export class OpenAPIMediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'openapi;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = '3.0.3', format: Format = 'generic') {
    const search =
      format === 'generic'
        ? `vnd.oai.openapi;version=${version}`
        : `vnd.oai.openapi+${format};version=${version}`;
    const found = this.find((mediaType) => mediaType.includes(search));

    return found || this.unknownMediaType;
  }

  latest(format: Format = 'generic') {
    return last(this.filterByFormat(format)) as string;
  }
}

const mediaTypes = new OpenAPIMediaTypes(
  'application/vnd.oai.openapi;version=3.0.0',
  'application/vnd.oai.openapi+json;version=3.0.0',
  'application/vnd.oai.openapi+yaml;version=3.0.0',
  'application/vnd.oai.openapi;version=3.0.1',
  'application/vnd.oai.openapi+json;version=3.0.1',
  'application/vnd.oai.openapi+yaml;version=3.0.1',
  'application/vnd.oai.openapi;version=3.0.2',
  'application/vnd.oai.openapi+json;version=3.0.2',
  'application/vnd.oai.openapi+yaml;version=3.0.2',
  'application/vnd.oai.openapi;version=3.0.3',
  'application/vnd.oai.openapi+json;version=3.0.3',
  'application/vnd.oai.openapi+yaml;version=3.0.3',
);

export default mediaTypes;
