import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

type Format = 'generic' | 'json' | 'yaml';

export class JSONSchemaDraft4MediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'schema;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = 'draft-4', format: Format = 'generic') {
    const search =
      format === 'generic' ? `schema;version=${version}` : `schema+${format};version=${version}`;
    const found = this.find((mediaType) => mediaType.includes(search));

    return found || this.unknownMediaType;
  }

  latest(format: Format = 'generic') {
    return last(this.filterByFormat(format)) as string;
  }
}

const mediaTypes = new JSONSchemaDraft4MediaTypes(
  'application/schema;version=draft-4',
  'application/schema+json;version=draft-4',
  'application/schema+yaml;version=draft-4',
);

export default mediaTypes;
