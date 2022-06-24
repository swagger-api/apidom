import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class StompServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'stompServerBinding';
    this.classes.push('server-binding');
  }
}

export default StompServerBinding;
