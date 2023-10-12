import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Headers extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'headers';
  }
}

export default Headers;
