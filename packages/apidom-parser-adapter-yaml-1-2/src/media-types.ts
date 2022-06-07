import { MediaTypes } from '@swagger-api/apidom-core';

export class YamlMediaTypes extends MediaTypes<string> {
  latest() {
    return this[1];
  }
}

const mediaTypes = new YamlMediaTypes('text/yaml', 'application/yaml');

export default mediaTypes;
