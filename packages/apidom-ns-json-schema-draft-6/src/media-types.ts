import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

type Format = 'generic' | 'json' | 'yaml';

export class JSONSchemaDraft6MediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'schema;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = 'draft-6', format: Format = 'generic') {
    const search =
      format === 'generic' ? `schema;version=${version}` : `schema+${format};version=${version}`;
    const found = this.find((mediaType) => mediaType.includes(search));

    return found || this.unknownMediaType;
  }

  latest(format: Format = 'generic') {
    return last(this.filterByFormat(format)) as string;
  }
}

const mediaTypes = new JSONSchemaDraft6MediaTypes(
  'application/schema;version=draft-6',
  'application/schema+json;version=draft-6',
  'application/schema+yaml;version=draft-6',
);

export default mediaTypes;
