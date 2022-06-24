import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Responses extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'responses';
  }
}

export default Responses;
