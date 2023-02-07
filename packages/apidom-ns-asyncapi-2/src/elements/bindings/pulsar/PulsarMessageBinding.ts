import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class PulsarMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'pulsarMessageBinding';
    this.classes.push('message-binding');
  }
}

export default PulsarMessageBinding;
