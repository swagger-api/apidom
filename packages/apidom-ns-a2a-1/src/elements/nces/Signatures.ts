import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Signatures extends ArrayElement {
  static primaryClass = 'signatures';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Signatures.primaryClass);
  }
}

export default Signatures;
