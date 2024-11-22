import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsLinks extends ObjectElement {
  static primaryClass = 'components-links';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsLinks.primaryClass);
  }
}

export default ComponentsLinks;
