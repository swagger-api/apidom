import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class PulsarOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'pulsarOperationBinding';
    this.classes.push('operation-binding');
  }
}

export default PulsarOperationBinding;
