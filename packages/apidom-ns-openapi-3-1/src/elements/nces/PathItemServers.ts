import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class PathItemServers extends ArrayElement {
  static primaryClass = 'path-item-servers';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(PathItemServers.primaryClass);
    this.classes.push('servers');
  }
}

export default PathItemServers;
