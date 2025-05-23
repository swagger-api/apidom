import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

/**
 * @public
 */
export type Format = 'generic' | 'json' | 'yaml';

/**
 * @public
 */
export class OpenAPIMediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'openapi;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = '2.0', format: Format = 'generic') {
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

/**
 * @public
 */
const mediaTypes = new OpenAPIMediaTypes(
  'application/vnd.oai.openapi;version=2.0',
  'application/vnd.oai.openapi+json;version=2.0',
  'application/vnd.oai.openapi+yaml;version=2.0',
);

export default mediaTypes;
