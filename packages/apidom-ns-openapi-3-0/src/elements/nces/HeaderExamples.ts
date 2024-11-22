import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class HeaderExamples extends ObjectElement {
  static primaryClass = 'header-examples';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(HeaderExamples.primaryClass);
    this.classes.push('examples');
  }
}

export default HeaderExamples;
