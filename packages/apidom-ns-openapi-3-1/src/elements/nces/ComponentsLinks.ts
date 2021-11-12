import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsLinks extends ObjectElement {
  static primaryClass = 'components-links';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsLinks.primaryClass);
  }
}

export default ComponentsLinks;
