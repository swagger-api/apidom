import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

type Format = 'generic' | 'json' | 'yaml';

export class WorkflowsMediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? 'workflows;version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = '1.0.0', format: Format = 'generic') {
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

const mediaTypes = new WorkflowsMediaTypes(
  'application/vnd.oai.workflows;version=3.0.0',
  'application/vnd.oai.workflows+json;version=3.0.0',
  'application/vnd.oai.workflows+yaml;version=3.0.0',
);

export default mediaTypes;
