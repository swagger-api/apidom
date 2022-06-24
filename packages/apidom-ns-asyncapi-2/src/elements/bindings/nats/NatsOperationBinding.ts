import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class NatsOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'natsOperationBinding';
    this.classes.push('operation-binding');
  }
}

export default NatsOperationBinding;
