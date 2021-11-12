import { Attributes, Meta } from 'minim';
import { ArrayElement } from '@swagger-api/apidom-core';

class OperationServers extends ArrayElement {
  static primaryClass = 'operation-servers';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationServers.primaryClass);
    this.classes.push('servers');
  }
}

export default OperationServers;
