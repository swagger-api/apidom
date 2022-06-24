import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class NatsServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'natsServerBinding';
    this.classes.push('server-binding');
  }
}

export default NatsServerBinding;
