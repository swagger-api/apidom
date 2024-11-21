import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class HeaderContent extends ObjectElement {
  static primaryClass = 'header-content';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(HeaderContent.primaryClass);
    this.classes.push('content');
  }
}

export default HeaderContent;
