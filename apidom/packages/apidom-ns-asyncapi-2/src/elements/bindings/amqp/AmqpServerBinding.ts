import { Attributes, Meta, ObjectElement } from 'minim';

class AmqpServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqpServerBinding';
  }
}

export default AmqpServerBinding;
