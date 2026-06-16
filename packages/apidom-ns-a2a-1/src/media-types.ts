import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

/**
 * @public
 */
export type Format = 'generic' | 'json' | 'yaml';

/**
 * @public
 *
 * A2A has no IANA-registered media type. The values below follow the
 * `application/vnd.{vendor}.{type};version={ver}` convention used by other
 * ApiDOM namespaces, with `a2a` as the vendor tag.
 */
export class A2AMediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'a2a;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = '1.0.0', format: Format = 'generic') {
    const search =
      format === 'generic' ? `vnd.a2a;version=${version}` : `vnd.a2a+${format};version=${version}`;
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
const mediaTypes = new A2AMediaTypes(
  'application/vnd.a2a;version=1.0.0',
  'application/vnd.a2a+json;version=1.0.0',
  'application/vnd.a2a+yaml;version=1.0.0',
);

export default mediaTypes;
