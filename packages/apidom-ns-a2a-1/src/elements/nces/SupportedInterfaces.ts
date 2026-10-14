import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SupportedInterfaces extends ArrayElement {
  static primaryClass = 'supported-interfaces';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SupportedInterfaces.primaryClass);
  }
}

export default SupportedInterfaces;
