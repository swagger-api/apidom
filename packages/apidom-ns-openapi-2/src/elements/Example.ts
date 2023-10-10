import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Example extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'example';
  }
}

export default Example;
