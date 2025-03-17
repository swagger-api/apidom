import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

/**
 * @public
 */
export type Format = 'generic' | 'json' | 'yaml';

/**
 * @public
 */
export class ArazzoMediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'workflows;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = '1.0.1', format: Format = 'generic') {
    const search =
      format === 'generic'
        ? `vnd.oai.workflows;version=${version}`
        : `vnd.oai.workflows+${format};version=${version}`;
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
const mediaTypes = new ArazzoMediaTypes(
  'application/vnd.oai.workflows;version=1.0.0',
  'application/vnd.oai.workflows+json;version=1.0.0',
  'application/vnd.oai.workflows+yaml;version=1.0.0',
  'application/vnd.oai.workflows;version=1.0.1',
  'application/vnd.oai.workflows+json;version=1.0.1',
  'application/vnd.oai.workflows+yaml;version=1.0.1',
);

export default mediaTypes;
