import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Servers extends ArrayElement {
  static primaryClass = 'servers';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Servers.primaryClass);
  }
}

export default Servers;
