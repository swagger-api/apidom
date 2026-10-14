import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Extensions extends ArrayElement {
  static primaryClass = 'extensions';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Extensions.primaryClass);
  }
}

export default Extensions;
