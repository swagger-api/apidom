import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

/**
 * @public
 */
export type Format = 'generic' | 'json' | 'yaml';

/**
 * @public
 */
export class JSONSchema202012MediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'schema;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = '2020-12', format: Format = 'generic') {
    const search =
      format === 'generic' ? `schema;version=${version}` : `schema+${format};version=${version}`;
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
const mediaTypes = new JSONSchema202012MediaTypes(
  'application/schema;version=2020-12',
  'application/schema+json;version=2020-12',
  'application/schema+yaml;version=2020-12',
);

export default mediaTypes;
