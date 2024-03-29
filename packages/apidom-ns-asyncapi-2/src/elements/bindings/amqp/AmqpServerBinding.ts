import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class AmqpServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqpServerBinding';
    this.classes.push('server-binding');
  }
}

export default AmqpServerBinding;
